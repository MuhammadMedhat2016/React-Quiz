import { type } from "@testing-library/user-event/dist/type";
import React from "react";

function NextButton({ isFinal, answer, dispatcher }) {
  if (answer === null) return;
  const action = !isFinal ? { type: "moveNext" } : { type: "finish" };
  return (
    <button className="btn btn-ui" onClick={() => dispatcher(action)}>
      {isFinal ? "Finish" : "Next"}
    </button>
  );
}

export default NextButton;
