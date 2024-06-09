import React from "react";
import logo from "./assets/images/logo.svg";
import "./App.css";
import Calculator from "./components/Calculator";
import Result from "./components/Result";

function App() {
  return (
    <main className="outer-container">
      <Calculator />
    </main>
  );
}

export default App;
