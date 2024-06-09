import React, { useState, useEffect } from "react";
import iconDollar from "../assets/images/icon-dollar.svg";
import iconPerson from "../assets/images/icon-person.svg";
import "./css/calc.css";
import Result from "./Result";

function Calculator() {
  const [formData, setFormData] = useState({
    bill: null,
    tip: "",
    customTip: null,
    people: null,
  });

  const [isCustomUsed, setCustom] = useState(false);
  const [tipAmountPerPerson, setTipAmountPerPerson] = useState(0);
  const [totalAmountPerPerson, setTotalAmountPerPerson] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const bill = parseFloat(formData.bill || 0);
    const tipPercentage = isCustomUsed
      ? parseFloat(formData.customTip || 0)
      : parseFloat(formData.tip || 0);
    const people = parseFloat(formData.people || 0);

    if (people > 0) {
      const totalTipAmount = (tipPercentage / 100) * bill;
      const tipAmountPerPerson = totalTipAmount / people;
      const totalAmountPerPerson = (bill + totalTipAmount) / people;

      setTipAmountPerPerson(tipAmountPerPerson.toFixed(2));
      setTotalAmountPerPerson(totalAmountPerPerson.toFixed(2));
    } else {
      setTipAmountPerPerson(0);
      setTotalAmountPerPerson(0);
    }
  }, [formData, isCustomUsed]);

  function handleChange(e) {
    const { value, name, type, id } = e.target;

    if (type === "radio") {
      if (id === "custom") {
        setCustom(true);
        setFormData((prevVal) => ({
          ...prevVal,
          tip: "",
        }));
      } else {
        setCustom(false);
        setFormData((prevVal) => ({
          ...prevVal,
          tip: Number(value),
          customTip: null,
        }));
      }
    } else {
      if (name === "people") {
        if (value === "" || value <= 0) {
          setError(true);
        } else {
          setError(false);
        }
      }

      setFormData((prevVal) => ({
        ...prevVal,
        [name]: Number(value),
      }));
    }
  }

  function handleReset() {
    setFormData({
      bill: "",
      tip: "",
      customTip: "",
      people: "",
    });
    setTipAmountPerPerson(0);
    setTotalAmountPerPerson(0);
    setCustom(false);
  }

  return (
    <div className="inner-container">
      <form className="calculator-container" noValidate autoFocus="off">
        <div className="item bill">
          <label htmlFor="bill">Bill</label>
          <div className="input-container">
            <img src={iconDollar} alt="icon-dollar" className="icon-dollar" />
            <input
              value={formData.bill}
              name="bill"
              id="bill"
              type="number"
              className="my-input bill"
              onChange={handleChange}
            />
          </div>
        </div>

        {/*---------------- Tips Options Section ------------------*/}
        <div className="item tip-options">
          <label>Select Tip %</label>
          <div className="tip-options-container">
            <input
              name="tip"
              type="radio"
              id="5%"
              className="option"
              value="5"
              checked={isCustomUsed === false && formData.tip === 5}
              onChange={handleChange}
            />
            <label htmlFor="5%">5%</label>

            <input
              name="tip"
              type="radio"
              id="10%"
              className="option"
              value="10"
              checked={isCustomUsed === false && formData.tip === 10}
              onChange={handleChange}
            />
            <label htmlFor="10%">10%</label>

            <input
              name="tip"
              type="radio"
              id="15%"
              className="option"
              value="15"
              checked={isCustomUsed === false && formData.tip === 15}
              onChange={handleChange}
            />
            <label htmlFor="15%">15%</label>

            <input
              name="tip"
              type="radio"
              id="25%"
              className="option"
              value="25"
              checked={isCustomUsed === false && formData.tip === 25}
              onChange={handleChange}
            />
            <label htmlFor="25%">25%</label>

            <input
              name="tip"
              type="radio"
              id="50%"
              className="option"
              value="50"
              checked={isCustomUsed === false && formData.tip === 50}
              onChange={handleChange}
            />
            <label htmlFor="50%">50%</label>

            <input
              name="tip"
              type="radio"
              id="custom"
              className="option custom-radio"
              checked={isCustomUsed}
              onChange={handleChange}
            />
            <label htmlFor="custom" className="custom-label">
              Custom
            </label>

            {/* Custom Input field */}
            {isCustomUsed && (
              <input
                name="customTip"
                type="number"
                className="my-input custom-tip"
                id="customTip"
                value={formData.customTip}
                onChange={handleChange}
              />
            )}
          </div>
        </div>

        {/*---------------- Number of People Section ------------------*/}
        <div className="item number-of-people">
          <label htmlFor="people">Number of people</label>
          <div className={`input-container ${error ? "error" : ""}`}>
            <img src={iconPerson} alt="icon-person" className="icon-person" />
            <input
              value={formData.people}
              name="people"
              id="people"
              type="number"
              className="my-input people"
              onChange={handleChange}
            />
          </div>
          {error && (
            <p className="error-message">Number of people must be greater than zero</p>
          )}
        </div>
      </form>
      <Result
        tipAmountPerPerson={tipAmountPerPerson}
        totalAmountPerPerson={totalAmountPerPerson}
        onReset={handleReset}
      />
    </div>
  );
}

export default Calculator;
