import './QuizPage.css'
import { useState } from 'react'

const quizData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: [
      { id: 1, text: "Paris", isCorrect: true },
      { id: 2, text: "London", isCorrect: false },
      { id: 3, text: "Berlin", isCorrect: false },
      { id: 4, text: "Rome", isCorrect: false }
    ]
  },
  {
    id: 2,
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: [
      { id: 1, text: "Harper Lee", isCorrect: true },
      { id: 2, text: "J.K. Rowling", isCorrect: false },
      { id: 3, text: "Stephen King", isCorrect: false },
      { id: 4, text: "Mark Twain", isCorrect: false }
    ]
  },
  {
    id: 3,
    question: "What is the chemical symbol for water?",
    options: [
      { id: 1, text: "H2O", isCorrect: true },
      { id: 2, text: "CO2", isCorrect: false },
      { id: 3, text: "NaCl", isCorrect: false },
      { id: 4, text: "O2", isCorrect: false }
    ]
  },
  {
    id: 4,
    question: "Which planet is known as the Red Planet?",
    options: [
      { id: 1, text: "Mars", isCorrect: true },
      { id: 2, text: "Venus", isCorrect: false },
      { id: 3, text: "Jupiter", isCorrect: false },
      { id: 4, text: "Mercury", isCorrect: false }
    ]
  },
  {
    id: 5,
    question: "Who painted the Mona Lisa?",
    options: [
      { id: 1, text: "Leonardo da Vinci", isCorrect: true },
      { id: 2, text: "Pablo Picasso", isCorrect: false },
      { id: 3, text: "Vincent van Gogh", isCorrect: false },
      { id: 4, text: "Michelangelo", isCorrect: false }
    ]
  },
  // Add more questions as needed
];




const QuizPage = () => {
  const [questions, setQuestions] = useState(quizData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState(Array(quizData.length).fill(null));
  const currentQuestion = questions[currentIndex];

  const handleOptionChange = (e) => {
    const index = parseInt(e.target.name.split('-')[1]);
    const optionId = parseInt(e.target.value);
    const updatedResponses = [...responses];
    updatedResponses[index] = optionId;
    setResponses(updatedResponses);
  };

  const handleClick = () => {
    setCurrentIndex(currentIndex === 0 ? questions.length - 1 : currentIndex - 1);
  };

  const handleClickAfter = () => {
    setCurrentIndex(currentIndex === questions.length - 1 ? 0 : currentIndex + 1);
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log("Form submitted with responses:", responses);
  };

  return (
    <div className='quiz_container min-h-screen'>
      <div>
        <h1 className="title">Quiz Name</h1>
        <div>
          <h3 className="timer">timer</h3>
        </div>
      </div>
      <div className="Questions">
        <form>
          {currentQuestion && (
            <div className="grid items-start gap-4">
              <div className="text-xl font-semibold" key={currentQuestion.id}>
                {currentQuestion.id}. {currentQuestion.question}
              </div>
              <div className="grid items-start gap-2">
                {currentQuestion.options.map((option) => (
                  <div className="flex items-center gap-2" key={option.id}>
                    <input
                      className="form-tick appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-transparent dark:border-gray-700 dark:checked:bg-blue-500"
                      id={option.text + currentQuestion.id}
                      name={`question-${currentIndex}`}
                      type="radio"
                      value={option.id}
                      checked={responses[currentIndex] === option.id}
                      onChange={handleOptionChange}
                    />
                    <label className="text-sm cursor-pointer dark:text-gray-400" htmlFor={option.text}>
                      {option.text}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
        <div className="navigation">
          <button className="previous" onClick={handleClick} disabled={currentIndex === 0}>
            Previous
          </button>
          <button className="next" onClick={handleClickAfter} disabled={currentIndex === questions.length - 1}>
            {currentIndex === questions.length - 1 ? 'Click Submit' : 'Next'}
          </button>
        </div>
        {currentIndex === questions.length - 1 && (
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;