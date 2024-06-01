import React from "react";

function Progress({ answer, questionsNum, index, totalPoints, points }) {
  const hasAnswered = answer !== null;
  return (
    <div className="progress">
      <progress value={hasAnswered ? index + 1 : index} max={questionsNum}></progress>
      <p>
        <strong>{hasAnswered ? index + 1 : index}</strong>/{questionsNum} Questions
      </p>
      <p>
        <strong>{points}</strong>/{totalPoints} Points
      </p>
    </div>
  );
}

export default Progress;
