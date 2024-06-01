
function Question({ data, answer, dispatcher }) {
  const hasAnswered = answer !== null;
  return (
    <div>
      <h4>{data.question}</h4>
      <div className="options">
        {data.options.map((option, index) => (
          <button
            key={option}
            className={`btn-option btn ${answer === index ? "answer" : ""} ${
              hasAnswered ? (index === data.correctOption ? "correct" : "wrong") : ""
            }`}
            onClick={() => dispatcher({ type: "newAnswer", payload: index })}
            disabled={hasAnswered}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
