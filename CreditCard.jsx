import "./credit-card.css";

function CreditCard() {
  return (
    <div className="card">
      <div className="top">
        <div className="brand">
          <div className="mc-logo">
            <span className="red"></span>
            <span className="orange"></span>
          </div>
          <span className="brand-text">Master Card</span>
        </div>

        <div className="chip">
          <span></span>
          <span className="v"></span>
        </div>
      </div>

      <div className="number-section">
        <p className="label">Card Number</p>
        <p className="number">5432&nbsp;1098&nbsp;7654&nbsp;3210</p>
      </div>

      <div className="bottom">
        <div>
          <p className="label">Card Holder</p>
          <p className="value">Anshul Revuru</p>
        </div>

        <div className="valid">
          <p className="label">Valid Thru</p>
          <p className="value">05/34</p>
        </div>
      </div>
    </div>
  );
}

export default CreditCard;
