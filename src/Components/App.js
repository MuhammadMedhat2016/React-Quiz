import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  answer: null,
  index: 0,
  points: 0,
  highScore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataError":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const { correctOption, points } = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points: correctOption === action.payload ? state.points + points : state.points,
      };
    case "moveNext":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        highScore: Math.max(state.points, state.highScore),
        status: "finished",
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function App() {
  const [{ questions, status, index, answer, points, highScore }, dispatcher] = useReducer(reducer, initialState);

  const questionsNum = questions.length;
  const totalPoints = questions.reduce((acc, { points }) => acc + points, 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((resHeaders) => resHeaders.json())
      .then((data) => dispatcher({ type: "dataReceived", payload: data }))
      .catch(() => dispatcher({ type: "dataError" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen questionsNum={questionsNum} dispatcher={dispatcher} />}
        {status === "active" && (
          <>
            <Progress
              index={index}
              answer={answer}
              questionsNum={questionsNum}
              totalPoints={totalPoints}
              points={points}
            />
            <Question data={questions[index]} dispatcher={dispatcher} answer={answer} />
            <Timer startTime={10} dispatcher={dispatcher}/>
            <NextButton isFinal={index === questionsNum - 1} answer={answer} dispatcher={dispatcher} />
          </>
        )}
        {status === "finished" && (
          <FinishScreen points={points} totalPoints={totalPoints} highScore={highScore} dispatcher={dispatcher} />
        )}
      </Main>
    </div>
  );
}

export default App;
