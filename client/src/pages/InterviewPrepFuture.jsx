import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../store/auth';
import InterviewRunnerPro from '../components/InterviewRunnerPro';

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
const TOPICS = ['DSA', 'OOPs', 'DBMS', 'System Design'];
const DEFAULT_DURATION_MIN = 30;

// Particle background component
const ParticleBackground = ({ isDark }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = isDark ? 'rgba(100, 200, 255, 0.5)' : 'rgba(100, 100, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        // Connect particles
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = isDark 
              ? `rgba(100, 200, 255, ${0.2 - distance / 500})` 
              : `rgba(100, 100, 255, ${0.15 - distance / 500})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

const InterviewPrepFuture = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { API } = useAuth();
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
  const [showHintAnimation, setShowHintAnimation] = useState(false);
  
  // New futuristic features
  const [codeQuality, setCodeQuality] = useState({ score: 0, issues: [] });
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [sessionEvents, setSessionEvents] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    linesWritten: 0,
    timeToFirstRun: 0,
    averageTestTime: 0,
    passRate: 0
  });

  // Start a session with enhanced tracking
  const start = async () => {
    try {
      console.log('🚀 Initializing interview session...');
      
      const res = await fetch(`${API}/interview/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ difficulty, topic })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        alert(`Failed to start interview: ${errorData.error || res.statusText}`);
        return;
      }

      const data = await res.json();
      console.log('✅ Session initialized:', data.session.question.title);

      setSession(data.session);
      setRemainingSec(durationMin * 60);
      setRunning(true);
      setHint('');
      setTestResults([]);
      setSessionEvents([{ type: 'start', timestamp: Date.now(), message: 'Session started' }]);
      setCodeQuality({ score: 100, issues: [] });
      setPerformanceMetrics({ linesWritten: 0, timeToFirstRun: 0, averageTestTime: 0, passRate: 0 });
    } catch (e) {
      console.error('Error starting interview:', e);
      alert(`Error: ${e.message}`);
    }
  };

  // Timer with enhanced tracking
  useEffect(() => {
    if (!running) return;
    if (remainingSec <= 0) {
      submit();
      return;
    }
    const id = setInterval(() => setRemainingSec((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [running, remainingSec]);

  // Smart AI hint system
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
        setShowHintAnimation(true);
        setTimeout(() => setShowHintAnimation(false), 500);
        setSession((s) => s ? { ...s, hintsUsed: data.hintsUsed } : s);
        setSessionEvents(prev => [...prev, { 
          type: 'hint', 
          timestamp: Date.now(), 
          message: `Hint ${data.hintsUsed} requested` 
        }]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const submit = async () => {
    if (!session || submitting) return;
    setSubmitting(true);
    try {
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
        setSessionEvents(prev => [...prev, { 
          type: 'submit', 
          timestamp: Date.now(), 
          message: 'Solution submitted' 
        }]);
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

  // Update test results with metrics
  const handleResults = useCallback((results) => {
    setTestResults(results);
    const passed = results.filter(r => r.passed).length;
    const total = results.length;
    setPerformanceMetrics(prev => ({
      ...prev,
      passRate: total > 0 ? ((passed / total) * 100).toFixed(1) : 0,
      averageTestTime: results.length > 0 
        ? (results.reduce((sum, r) => sum + (r.executionTime || 0), 0) / results.length).toFixed(2)
        : 0
    }));
    setSessionEvents(prev => [...prev, { 
      type: 'test', 
      timestamp: Date.now(), 
      message: `Tests run: ${passed}/${total} passed` 
    }]);
  }, []);

  const minutes = Math.floor(remainingSec / 60);
  const seconds = remainingSec % 60;
  const timePercent = ((remainingSec / (durationMin * 60)) * 100).toFixed(1);

  return (
    <div className={`min-h-screen relative overflow-hidden ${
      isDark ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <ParticleBackground isDark={isDark} />

      <div className="relative z-10 max-w-[1800px] mx-auto px-6 py-8">
        {/* Futuristic Header */}
        <div className={`mb-8 backdrop-blur-xl rounded-3xl p-6 border-2 ${
          isDark 
            ? 'bg-black/20 border-cyan-500/30 shadow-[0_0_50px_rgba(0,255,255,0.1)]' 
            : 'bg-white/40 border-purple-300/50 shadow-[0_0_30px_rgba(138,43,226,0.1)]'
        }`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className={`text-4xl font-bold mb-2 bg-gradient-to-r ${
                isDark 
                  ? 'from-cyan-400 via-blue-400 to-purple-400' 
                  : 'from-purple-600 via-pink-600 to-red-600'
              } bg-clip-text text-transparent animate-pulse`}>
                🚀 AI Interview Prep Studio
              </h1>
              <p className={`text-sm ${isDark ? 'text-cyan-300/80' : 'text-purple-600/80'}`}>
                Next-generation coding interview platform powered by AI
              </p>
            </div>

            {!session && (
              <div className="flex items-center gap-3 flex-wrap">
                <select 
                  value={difficulty} 
                  onChange={e => setDifficulty(e.target.value)}
                  className={`px-4 py-3 rounded-xl backdrop-blur-md border-2 transition-all font-semibold ${
                    isDark
                      ? 'bg-gray-800/50 border-cyan-500/50 text-cyan-300 hover:border-cyan-400'
                      : 'bg-white/50 border-purple-400/50 text-purple-700 hover:border-purple-500'
                  }`}
                >
                  {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>

                <select 
                  value={topic} 
                  onChange={e => setTopic(e.target.value)}
                  className={`px-4 py-3 rounded-xl backdrop-blur-md border-2 transition-all font-semibold ${
                    isDark
                      ? 'bg-gray-800/50 border-cyan-500/50 text-cyan-300 hover:border-cyan-400'
                      : 'bg-white/50 border-purple-400/50 text-purple-700 hover:border-purple-500'
                  }`}
                >
                  {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>

                <input 
                  type="number" 
                  min={5} 
                  max={120} 
                  value={durationMin} 
                  onChange={e => setDurationMin(Number(e.target.value) || DEFAULT_DURATION_MIN)}
                  className={`w-24 px-4 py-3 rounded-xl backdrop-blur-md border-2 transition-all font-semibold text-center ${
                    isDark
                      ? 'bg-gray-800/50 border-cyan-500/50 text-cyan-300 hover:border-cyan-400'
                      : 'bg-white/50 border-purple-400/50 text-purple-700 hover:border-purple-500'
                  }`}
                />

                <button 
                  onClick={start}
                  className={`px-8 py-3 rounded-xl font-bold text-lg transition-all transform hover:scale-105 hover:shadow-2xl ${
                    isDark
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_30px_rgba(0,255,255,0.3)]'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_20px_rgba(138,43,226,0.3)]'
                  }`}
                >
                  ⚡ Start Session
                </button>
              </div>
            )}
          </div>
        </div>

        {session && (
          <div className="space-y-6">
            {/* Enhanced Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Timer Card */}
              <div className={`backdrop-blur-xl rounded-2xl p-4 border-2 ${
                isDark 
                  ? 'bg-black/20 border-cyan-500/30' 
                  : 'bg-white/40 border-purple-300/50'
              }`}>
                <div className="text-xs opacity-60 mb-1">TIME REMAINING</div>
                <div className={`text-3xl font-bold ${
                  remainingSec < 300 ? 'text-red-500 animate-pulse' : isDark ? 'text-cyan-400' : 'text-purple-600'
                }`}>
                  {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      remainingSec < 300 ? 'bg-red-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                    }`}
                    style={{ width: `${timePercent}%` }}
                  />
                </div>
              </div>

              {/* Pass Rate Card */}
              <div className={`backdrop-blur-xl rounded-2xl p-4 border-2 ${
                isDark 
                  ? 'bg-black/20 border-green-500/30' 
                  : 'bg-white/40 border-green-400/50'
              }`}>
                <div className="text-xs opacity-60 mb-1">PASS RATE</div>
                <div className="text-3xl font-bold text-green-500">
                  {performanceMetrics.passRate}%
                </div>
                <div className="text-xs mt-1 opacity-80">
                  {testResults.filter(r => r.passed).length}/{testResults.length} tests
                </div>
              </div>

              {/* Code Quality Card */}
              <div className={`backdrop-blur-xl rounded-2xl p-4 border-2 ${
                isDark 
                  ? 'bg-black/20 border-yellow-500/30' 
                  : 'bg-white/40 border-yellow-400/50'
              }`}>
                <div className="text-xs opacity-60 mb-1">CODE QUALITY</div>
                <div className="text-3xl font-bold text-yellow-500">
                  {codeQuality.score}
                </div>
                <div className="text-xs mt-1 opacity-80">
                  {codeQuality.issues.length} issues found
                </div>
              </div>

              {/* Hints Used Card */}
              <div className={`backdrop-blur-xl rounded-2xl p-4 border-2 ${
                isDark 
                  ? 'bg-black/20 border-purple-500/30' 
                  : 'bg-white/40 border-pink-400/50'
              }`}>
                <div className="text-xs opacity-60 mb-1">HINTS USED</div>
                <div className="text-3xl font-bold text-purple-500">
                  {session.hintsUsed}
                </div>
                <button 
                  onClick={requestHint}
                  className={`mt-2 w-full py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isDark
                      ? 'bg-purple-600 hover:bg-purple-500 text-white'
                      : 'bg-purple-500 hover:bg-purple-600 text-white'
                  }`}
                >
                  💡 Get AI Hint
                </button>
              </div>
            </div>

            {/* Question and Editor Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Question Panel */}
              <div className={`backdrop-blur-xl rounded-2xl p-6 border-2 ${
                isDark 
                  ? 'bg-black/20 border-cyan-500/30' 
                  : 'bg-white/40 border-purple-300/50'
              }`}>
                <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {session.question.title}
                </h2>
                <div className="flex gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    session.question.difficulty === 'Easy' ? 'bg-green-500/20 text-green-500' :
                    session.question.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {session.question.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-500">
                    {session.question.topic}
                  </span>
                </div>
                
                <div className="prose prose-sm dark:prose-invert max-w-none mb-4">
                  <pre className="whitespace-pre-wrap text-sm opacity-90">
                    {session.question.prompt}
                  </pre>
                </div>

                {hint && (
                  <div className={`p-4 rounded-xl border-l-4 transition-all ${
                    showHintAnimation ? 'scale-105' : 'scale-100'
                  } ${
                    isDark
                      ? 'bg-purple-900/30 border-purple-500'
                      : 'bg-purple-100 border-purple-500'
                  }`}>
                    <div className="flex items-start gap-2">
                      <span className="text-2xl">💡</span>
                      <div>
                        <div className="font-semibold text-purple-500 mb-1">AI Hint</div>
                        <div className="text-sm opacity-90">{hint}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Session Events Timeline */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold opacity-60 mb-2">SESSION ACTIVITY</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {sessionEvents.slice().reverse().map((event, idx) => (
                      <div key={idx} className={`text-xs p-2 rounded-lg ${
                        isDark ? 'bg-gray-800/50' : 'bg-white/50'
                      }`}>
                        <span className="opacity-60">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </span>
                        {' • '}
                        <span>{event.message}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <button 
                    onClick={submit}
                    disabled={submitting}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all transform hover:scale-105 ${
                      isDark
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]'
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-xl'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {submitting ? '⏳ Submitting...' : '✓ Submit Solution'}
                  </button>
                </div>
              </div>

              {/* Code Editor - Takes 2 columns */}
              <div className="xl:col-span-2">
                <div className={`backdrop-blur-xl rounded-2xl overflow-hidden border-2 ${
                  isDark 
                    ? 'bg-black/20 border-cyan-500/30 shadow-[0_0_50px_rgba(0,255,255,0.1)]' 
                    : 'bg-white/40 border-purple-300/50 shadow-[0_0_30px_rgba(138,43,226,0.1)]'
                }`}>
                  <InterviewRunnerPro
                    isDark={isDark}
                    starterCode={session.question.starterCode}
                    tests={session.question.tests}
                    functionName={session.question.functionName}
                    onResults={handleResults}
                  />
                </div>
              </div>
            </div>

            {/* Results Summary */}
            {session.status !== 'active' && session.result && (
              <div className={`backdrop-blur-xl rounded-2xl p-6 border-2 ${
                isDark 
                  ? 'bg-black/20 border-green-500/30' 
                  : 'bg-white/40 border-green-400/50'
              }`}>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span>🎯</span>
                  <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    Performance Analysis
                  </span>
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm opacity-60">Feedback</div>
                    <div className="font-semibold">{session.result.feedback}</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-60">Tests Passed</div>
                    <div className="font-semibold text-2xl text-green-500">
                      {session.result.passedCount}/{session.result.totalTests}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm opacity-60">Time Taken</div>
                    <div className="font-semibold text-2xl">{session.durationSec}s</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* History Section */}
        <div className="mt-10">
          <h2 className={`text-2xl font-bold mb-4 ${
            isDark ? 'text-cyan-400' : 'text-purple-600'
          }`}>
            📚 Session History
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.map(h => (
              <div key={h._id} className={`backdrop-blur-xl rounded-xl p-4 border-2 transition-all hover:scale-105 ${
                isDark 
                  ? 'bg-black/20 border-cyan-500/20 hover:border-cyan-500/50' 
                  : 'bg-white/40 border-purple-300/30 hover:border-purple-400/70'
              }`}>
                <div className="font-semibold text-lg mb-1">{h.question?.title}</div>
                <div className="flex gap-2 mb-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-500">
                    {h.question?.difficulty}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-500">
                    {h.question?.topic}
                  </span>
                </div>
                <div className="text-sm opacity-80">
                  {new Date(h.createdAt).toLocaleDateString()} • 
                  <span className="ml-1 text-green-500 font-semibold">
                    {h.result?.passedCount || 0}/{h.result?.totalTests || 0} passed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrepFuture;
