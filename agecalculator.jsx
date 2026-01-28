import { useState } from "react";
import "./age-calculator.css";

function App() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState(null);

  const calculateAge = () => {
    if (!dob) return;

    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonthDays = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      days += prevMonthDays;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Age Calculator</h2>

        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <button onClick={calculateAge}>Calculate Age</button>

        {age && (
          <div className="result">
            <p><strong>Years:</strong> {age.years}</p>
            <p><strong>Months:</strong> {age.months}</p>
            <p><strong>Days:</strong> {age.days}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
