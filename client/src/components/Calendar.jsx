import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { usePopup } from "../context/PopupContext";

export default function Calendarcompo() {
  const { showCalendar, closeAll } = usePopup();

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const gridRef = useRef(null);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  // Animate days on month change
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.03,
          duration: 0.25,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [currentMonth, currentYear]);

  if (!showCalendar) return null;

  return (
    <div className="p-4 rounded-2xl shadow-card bg-white dark:bg-dark-bg-primary transition-colors w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevMonth}
              className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primary-dark shadow-md transition flex items-center gap-1"
            >
              &lt; Prev
            </button>

            <h2 className="text-xl font-bold text-black dark:text-white">
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
              })}{" "}
              {currentYear}
            </h2>

            <button
              onClick={nextMonth}
              className="px-4 py-2 rounded-full bg-primary text-white hover:bg-primary-dark shadow-md transition flex items-center gap-1"
            >
              Next &gt;
            </button>
          </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-center font-semibold text-gray-600 dark:text-dark-text-secondary mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div ref={gridRef} className="grid grid-cols-7 gap-2 text-center">
        {days.map((day, i) => {
          if (!day) return <div key={i} className="p-2" />;

          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          return (
            <div
              key={i}
              className={`p-2 rounded-lg border 
                border-gray-300 dark:border-dark-border 
                ${isToday ? "bg-primary text-white" : "bg-gray-50 dark:bg-dark-bg-secondary text-black dark:text-white"}
                flex flex-col items-center justify-center`}
            >
              <div>{day}</div>
            </div>
          );
        })}
      </div>

      {/* Close button */}
      <div className="flex justify-end mt-2">
        <button
          onClick={closeAll}
          className="text-sm text-gray-500 dark:text-dark-text-secondary hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
