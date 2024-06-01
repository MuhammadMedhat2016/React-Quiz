import React from "react";

function FinishScreen({ points, totalPoints, highScore, dispatcher }) {
  const percentage = Math.ceil((points / totalPoints) * 100);
  let emoji;
  if (percentage === 100) emoji = "🥇";
  else if (percentage >= 80 && percentage < 100) emoji = "🎉";
  else if (percentage >= 50 && percentage < 80) emoji = "🙃";
  else if (percentage > 0 && percentage < 50) emoji = "🤨";
  else emoji = "🙆‍♂️";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You've Scored <strong>{points}</strong> out of {totalPoints} ({percentage}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button className="btn btn-ui" onClick={() => dispatcher({type: "restart"})} >Restart</button>
    </>
  );
}

export default FinishScreen;
