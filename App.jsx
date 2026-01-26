import { useState } from "react";
import "./App.css";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={prevMonth}>◀</button>
          <h2>{months[month]} {year}</h2>
          <button onClick={nextMonth}>▶</button>
        </div>

        <div className="calendar-days">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="day-name">{day}</div>
          ))}

          {[...Array(firstDay)].map((_, i) => (
            <div key={`empty-${i}`} className="empty"></div>
          ))}

          {[...Array(daysInMonth)].map((_, i) => (
            <div key={i} className="day">
              {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
