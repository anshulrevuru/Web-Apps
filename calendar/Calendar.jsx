import { useState } from "react";

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
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
                {/* Header */}
                <div className="calendar-header">
                    <button onClick={prevMonth}>◀</button>
                    <h2>{months[month]} {year}</h2>
                    <button onClick={nextMonth}>▶</button>
                </div>

                {/* Days grid */}
                <div className="calendar-days">
                    {/* Day names */}
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                        <div key={day} className="day-name">
                            {day}
                        </div>
                    ))}

                    {/* Empty slots before the 1st */}
                    {[...Array(firstDay)].map((_, i) => (
                        <div key={`empty-${i}`} className="empty"></div>
                    ))}

                    {/* Actual days */}
                    {[...Array(daysInMonth)].map((_, i) => (
                        <div key={i + 1} className="day">
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Calendar;
