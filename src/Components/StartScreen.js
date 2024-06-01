import React from "react";

function StartScreen({ questionsNum, dispatcher }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz !</h2>
      <h3>{questionsNum} Questions to test your react mastery</h3>
      <button className="btn" onClick={() => dispatcher({ type: "start" })}>
        let's start
      </button>
    </div>
  );
}

export default StartScreen;
