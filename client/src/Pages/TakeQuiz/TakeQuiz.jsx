const quizData = [
  {
    id: 1,
    type: 'single',
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: [
      { id: 1, text: "Harper Lee", isCorrect: true },
      { id: 2, text: "J.K. Rowling", isCorrect: false },
      { id: 3, text: "Stephen King", isCorrect: false },
      { id: 4, text: "Mark Twain", isCorrect: false }
    ]
  },
  {
    id: 2,
    type: 'single',
    question: "What is the chemical symbol for water?",
    options: [
      { id: 1, text: "H2O", isCorrect: true },
      { id: 2, text: "CO2", isCorrect: false },
      { id: 3, text: "NaCl", isCorrect: false },
      { id: 4, text: "O2", isCorrect: false }
    ]
  },
  {
    id: 3,
    type: 'single', // Question type: single correct option
    question: "What is the capital of France?",
    options: [
      { id: 1, text: "Paris", isCorrect: true },
      { id: 2, text: "London", isCorrect: false },
      { id: 3, text: "Berlin", isCorrect: false },
      { id: 4, text: "Rome", isCorrect: false }
    ]
  },
  {
    id: 4,
    type: 'trueFalse', // Question type: true/false
    question: "Water boils at 100 degrees Celsius.",
    correctAnswer: true
  },
  {
    id: 5,
    type: 'fillBlank', // Question type: fill in the blank
    question: "The capital of India is __________."
  },
  // Add more questions as needed
];


import './TakeQuiz.scss';
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const TakeQuiz = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState(quizData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState(Array(quizData.length).fill(null));
  const [timer, setTimer] = useState(300);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const currentQuestion = questions[currentIndex];
  let timerInterval;

  useEffect(() => {
    initializeQuiz();
  }, [id]);

  useEffect(() => {
    if (timer <= 0 && !formSubmitted) {
      handleSubmit(); // Automatically submit the form if the timer runs out and the form hasn't been submitted
      clearInterval(timerInterval);
      setTimer(0); // Set timer to 0
    }
  }, [timer]);

  useEffect(() => {
    // Check if the form has been submitted for this quiz in session storage
    const isFormSubmitted = sessionStorage.getItem(`quizFormSubmitted_${id}`);
    if (isFormSubmitted === 'true') {
      setFormSubmitted(true);
      clearInterval(timerInterval); // Stop the timer if form already submitted
      setTimer(0); // Set timer to 0
    }
  }, []);

  const initializeQuiz = () => {
    setCurrentIndex(0);
    setResponses(Array(quizData.length).fill(null));
    setTimer(300);
    const storedTimer = localStorage.getItem(`quizTimer_${id}`);
    const startTime = storedTimer ? parseInt(storedTimer) : Date.now();
    localStorage.setItem(`quizTimer_${id}`, startTime.toString());
    startTimer(startTime);
  };

  const startTimer = (startTime) => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const remaining = Math.max(0, 300 - elapsed);
    setTimer(remaining);
    timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(timerInterval);
          return prevTimer;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleOptionChange = (e) => {
    const index = parseInt(e.target.name.split('-')[1]);
    const optionId = parseInt(e.target.value);
    const updatedResponses = [...responses];
    updatedResponses[index] = optionId;
    setResponses(updatedResponses);
  };

  const handleTextChange = (e) => {
    const index = parseInt(e.target.name.split('-')[1]);
    const text = e.target.value;
    const updatedResponses = [...responses];
    updatedResponses[index] = text;
    setResponses(updatedResponses);
  };

  const handleTrueFalseChange = (value) => {
    const updatedResponses = [...responses];
    updatedResponses[currentIndex] = value;
    setResponses(updatedResponses);
  };

  const handleClick = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleClickAfter = () => {
    setCurrentIndex((prevIndex) => Math.min(questions.length - 1, prevIndex + 1));
  };

  const handleSubmit = () => {
    setFormSubmitted(true);
    setTimer(0); // Set timer to 0
    sessionStorage.setItem(`quizFormSubmitted_${id}`, 'true'); // Set form submitted flag in session storage
    console.log('Form submitted with responses:', responses);
  };

  return (
    <div className='quiz_container min-h-screen'>
      <div>
        <h1 className='title'>Quiz Name</h1>
        <div>
          <h3 className='timer'>Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</h3>
        </div>
      </div>
      <div className='Questions'>
        <form>
          {currentQuestion && (
            <div className='grid items-start gap-4'>
              <div className='text-xl font-semibold' key={currentQuestion.id}>
                {currentQuestion.id}. {currentQuestion.question}
              </div>
              {currentQuestion.type === 'single' && (
                <div className='grid items-start gap-2'>
                  {currentQuestion.options.map((option) => (
                    <div className='flex items-center gap-2' key={option.id}>
                      <input
                        className='form-tick appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-transparent dark:border-gray-700 dark:checked:bg-blue-500'
                        id={option.text + currentQuestion.id}
                        name={`question-${currentIndex}`}
                        type='radio'
                        value={option.id}
                        checked={responses[currentIndex] === option.id}
                        onChange={handleOptionChange}
                        disabled={formSubmitted}
                      />
                      <label className='text-sm cursor-pointer dark:text-gray-400' htmlFor={option.text}>
                        {option.text}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {currentQuestion.type === 'trueFalse' && (
                <div className='flex items-center gap-2'>
                  <input
                    type='radio'
                    id={`true-${currentQuestion.id}`}
                    name={`question-${currentIndex}`}
                    value='true'
                    checked={responses[currentIndex] === true}
                    onChange={() => handleTrueFalseChange(true)}
                    disabled={formSubmitted}
                  />
                  <label className='text-sm cursor-pointer dark:text-gray-400' htmlFor={`true-${currentQuestion.id}`}>True</label>
                  <input
                    type='radio'
                    id={`false-${currentQuestion.id}`}
                    name={`question-${currentIndex}`}
                    value='false'
                    checked={responses[currentIndex] === false}
                    onChange={() => handleTrueFalseChange(false)}
                    disabled={formSubmitted}
                  />
                  <label className='text-sm cursor-pointer dark:text-gray-400' htmlFor={`false-${currentQuestion.id}`}>False</label>
                </div>
              )}
              {currentQuestion.type === 'fillBlank' && (
                <input
                  type='text'
                  name={`question-${currentIndex}`}
                  value={responses[currentIndex] || ''}
                  onChange={handleTextChange}
                  disabled={formSubmitted}
                />
              )}
            </div>
          )}
        </form>
        <div className='navigation'>
          <button className='previous' onClick={handleClick} disabled={currentIndex === 0 || formSubmitted}>
            Previous
          </button>
          <button className='next' onClick={handleClickAfter} disabled={currentIndex === questions.length - 1 || formSubmitted}>
            {currentIndex === questions.length - 1 ? 'Click Submit' : 'Next'}
          </button>
        </div>
        {currentIndex === questions.length - 1 && (
          <button className='submit' onClick={handleSubmit} disabled={formSubmitted}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default TakeQuiz;

