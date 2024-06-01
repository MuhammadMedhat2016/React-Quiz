import React, { useEffect, useState } from "react";

function Timer({ startTime, dispatcher }) {
  const [tick, setTick] = useState(startTime);
  useEffect(
    function () {
      const id = setInterval(() => {
        if (tick <= 0) {
          dispatcher({ type: "finish" });
        }
        setTick((tick) => tick - 1);
      }, 1000);
      return () => clearInterval(id);
    },
    [tick, dispatcher]
  );
  return <div className="timer">{tick}</div>;
}

export default Timer;
