import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../store/auth';
import InterviewRunnerPro from '../components/InterviewRunnerPro';
import { io } from 'socket.io-client';

const DIFFICULTIES = ['Easy','Medium','Hard'];
const TOPICS = ['DSA','OOPs','DBMS','System Design'];

const DEFAULT_DURATION_MIN = 30;

const InterviewPrep = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { API, isLoggedIn } = useAuth();
  const token = localStorage.getItem('token');

  const [difficulty, setDifficulty] = useState('Easy');
  const [topic, setTopic] = useState('DSA');
  const [durationMin, setDurationMin] = useState(DEFAULT_DURATION_MIN);

  const [session, setSession] = useState(null);
  const [remainingSec, setRemainingSec] = useState(durationMin * 60);
  const [running, setRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [history, setHistory] = useState([]);
  const [hint, setHint] = useState('');
  const [socket, setSocket] = useState(null);

  // Start a session
  const start = async () => {
    try {
      console.log('Starting interview session...');
      console.log('API URL:', `${API}/interview/start`);
      console.log('Request body:', { difficulty, topic });
      
      const res = await fetch(`${API}/interview/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ difficulty, topic })
      });
      
      console.log('Response status:', res.status);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('Failed to start session:', errorData);
        alert(`Failed to start interview: ${errorData.error || res.statusText}`);
        return;
      }
      
      const data = await res.json();
      console.log('Session data received:', data);
      
      setSession(data.session);
      setRemainingSec(durationMin * 60);
      setRunning(true);
      setHint('');
      setTestResults([]);
      try {
        const s = socket || io(API, { withCredentials: false, transports: ['websocket'] });
        if (!socket) setSocket(s);
        s.emit('session:join', { sessionId: data.session._id });
      } catch {}
      // start local fallback timer; server will drive real-time ticks when connected
    } catch (e) {
      console.error('Error starting interview:', e);
      alert(`Error: ${e.message}`);
    }
  };

  // Timer
  useEffect(() => {
    if (!running) return;
    if (remainingSec <= 0) { submit(); return; }
    const id = setInterval(() => setRemainingSec((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [running, remainingSec]);

  // Socket wiring
  useEffect(() => {
    if (!API) return;
    const s = socket || io(API, { withCredentials: false, transports: ['websocket'] });
    if (!socket) setSocket(s);
    s.on('timer:tick', (payload) => {
      if (typeof payload?.remainingSec === 'number') {
        setRemainingSec(payload.remainingSec);
        if (payload.remainingSec <= 0) setRunning(false);
      }
    });
    s.on('session:update', ({ session }) => { if (session?._id) setSession(session); });
    s.on('session:hint', ({ hint, hintsUsed }) => {
      if (hint) setHint(hint);
      if (typeof hintsUsed === 'number') setSession((prev) => prev ? { ...prev, hintsUsed } : prev);
    });
    s.on('session:submitted', ({ session }) => { if (session?._id) { setSession(session); setRunning(false); } });
    return () => {
      s.off('timer:tick');
      s.off('session:update');
      s.off('session:hint');
      s.off('session:submitted');
    };
  }, [API, socket]);

  const requestHint = async () => {
    if (!session) return;
    try {
      const res = await fetch(`${API}/interview/hint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ sessionId: session._id })
      });
      const data = await res.json();
      if (res.ok) {
        setHint(data.hint);
        // also refresh the session hintsUsed count
        setSession((s) => s ? { ...s, hintsUsed: data.hintsUsed } : s);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const submit = async () => {
    if (!session || submitting) return;
    setSubmitting(true);
    try {
      // We don't have the code value here; InterviewRunner holds it.
      // For simplicity, we accept that code may be included if we store last code in localStorage or let server focus on results.
      const res = await fetch(`${API}/interview/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ sessionId: session._id, code: '', testResults })
      });
      const data = await res.json();
      if (res.ok) {
        setSession(data.session);
        setRunning(false);
        fetchHistory();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch(`${API}/interview/history`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setHistory(data.sessions || []);
    } catch (e) {
      console.error(e);
    }
  }, [API, token]);

  useEffect(() => { fetchHistory(); }, [fetchHistory]);

  const minutes = Math.floor(remainingSec / 60);
  const seconds = remainingSec % 60;

  // DEV MODE: Comment out login check for testing
  // Uncomment this when you have a working database with user authentication
  /*
  if (!isLoggedIn || !token) {
    return (
      <div className={isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}>
        <div className="max-w-7xl mx-auto px-6 py-8 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Interview Prep Mode</h1>
            <p className="text-lg opacity-80 mb-6">Please log in to access interview preparation features.</p>
            <a href="/login" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark inline-block">
              Go to Login
            </a>
          </div>
        </div>
      </div>
    );
  }
  */

  return (
    <div className={isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Interview Prep Mode</h1>
          <div className="flex items-center gap-3">
            <select value={difficulty} onChange={e=>setDifficulty(e.target.value)} className="px-3 py-2 rounded border">
              {DIFFICULTIES.map(d=> <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={topic} onChange={e=>setTopic(e.target.value)} className="px-3 py-2 rounded border">
              {TOPICS.map(t=> <option key={t} value={t}>{t}</option>)}
            </select>
            <input type="number" min={5} max={120} value={durationMin} onChange={e=>setDurationMin(Number(e.target.value)||DEFAULT_DURATION_MIN)} className="w-20 px-3 py-2 rounded border" />
            <button onClick={start} className="px-4 py-2 bg-primary text-white rounded">Start</button>
          </div>
        </div>

        {session && (
          <div className="space-y-6">
            {/* Timer Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-3 overflow-hidden">
              <div className="bg-primary h-3" style={{ width: `${Math.max(0, Math.min(100,(remainingSec/(durationMin*60))*100))}%` }} />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm opacity-80">Time Left: {minutes.toString().padStart(2,'0')}:{seconds.toString().padStart(2,'0')}</div>
              <div className="flex items-center gap-3">
                <button onClick={requestHint} className="px-3 py-1.5 rounded border">Get Hint</button>
                <button onClick={submit} disabled={submitting} className="px-4 py-2 bg-secondary text-white rounded">Submit</button>
              </div>
            </div>

            {/* Question and Editor */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={isDark ? 'bg-dark-bg-secondary p-4 rounded border border-dark-border' : 'bg-light-bg-secondary p-4 rounded border border-light-border'}>
                <h2 className="text-xl font-semibold mb-2">{session.question.title}</h2>
                <div className="flex items-center gap-2 text-xs opacity-80 mb-2">
                  <span>{session.question.difficulty}</span>
                  <span>•</span>
                  <span>{session.question.topic}</span>
                  {session.question.type && (
                    <span className="px-2 py-0.5 rounded bg-black/10 dark:bg-white/10 uppercase tracking-wide">{session.question.type}</span>
                  )}
                </div>
                <p className="mb-4 whitespace-pre-wrap">{session.question.prompt}</p>
                {hint && (
                  <div className="mt-3 p-3 border-l-4 border-primary rounded bg-black/5 dark:bg-white/5">
                    <div className="text-sm"><span className="font-semibold">Hint:</span> {hint}</div>
                  </div>
                )}
              </div>
              <div className="h-[600px]">
                <InterviewRunnerPro
                  isDark={isDark}
                  starterCode={session.question.starterCode}
                  tests={session.question.tests}
                  functionName={session.question.functionName}
                  onResults={setTestResults}
                />
              </div>
            </div>

            {/* Results Summary when submitted */}
            {session.status !== 'active' && session.result && (
              <div className={isDark ? 'bg-dark-bg-secondary p-4 rounded border border-dark-border' : 'bg-light-bg-secondary p-4 rounded border border-light-border'}>
                <h3 className="font-semibold mb-2">Feedback</h3>
                <p className="mb-2">{session.result.feedback}</p>
                <div className="text-sm opacity-80">Time: {session.durationSec}s • Passed {session.result.passedCount}/{session.result.totalTests}</div>
              </div>
            )}
          </div>
        )}

        {/* History */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-3">History</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {history.map(h => (
              <div key={h._id} className={isDark ? 'bg-dark-bg-secondary p-3 rounded border border-dark-border' : 'bg-light-bg-secondary p-3 rounded border border-light-border'}>
                <div className="font-semibold">{h.question?.title}</div>
                <div className="text-xs opacity-80 mb-1">{h.question?.difficulty} • {h.question?.topic}</div>
                <div className="text-sm">{new Date(h.createdAt).toLocaleString()} • {h.result?.passedCount || 0}/{h.result?.totalTests || 0} passed</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;