import React from "react";
import "./css/result.css"

function Result(props) {
  return (
    <div className="result-container">
      <div className="tip-amount-container">
        <p>
          Tip Amount<span>/ person</span>
        </p>
        <p className="amount">${props.tipAmountPerPerson}</p>
      </div>
      <div className="total-container">
        <p>
          Total <span>/ person</span>
        </p>
        <p className="amount">${props.totalAmountPerPerson}</p>
      </div>
      <div className="button-container">
        <button onClick={()=>{props.onReset()}}>RESET</button>
      </div>
      
    </div>
  );
}
export default Result;
