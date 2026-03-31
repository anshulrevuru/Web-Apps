const { useState } = React;

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

    return React.createElement('div', { className: 'calendar-container' },
        React.createElement('div', { className: 'calendar' },
            React.createElement('div', { className: 'calendar-header' },
                React.createElement('button', { onClick: prevMonth }, '◀'),
                React.createElement('h2', null, `${months[month]} ${year}`),
                React.createElement('button', { onClick: nextMonth }, '▶')
            ),
            React.createElement('div', { className: 'calendar-days' },
                // Day names
                ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day =>
                    React.createElement('div', {
                        key: day,
                        className: 'day-name'
                    }, day)
                ),
                // Empty slots
                [...Array(firstDay)].map((_, i) =>
                    React.createElement('div', {
                        key: `empty-${i}`,
                        className: 'empty'
                    })
                ),
                // Actual days
                [...Array(daysInMonth)].map((_, i) =>
                    React.createElement('div', {
                        key: i + 1,
                        className: 'day'
                    }, i + 1)
                )
            )
        )
    );
}

// Render the calendar
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Calendar));
