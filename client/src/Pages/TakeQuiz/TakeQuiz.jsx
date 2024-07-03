import './TakeQuiz.scss';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TakeQuiz = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [timer, setTimer] = useState(300);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  let timerInterval;

  useEffect(() => {
    const getQuestions = async () => {
      const response = await fetch(`http://localhost:4000/quiz/getQuestions/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const storedTimer = sessionStorage.getItem(`quizTimer_${id}`);
        if (storedTimer) {
          const start = parseInt(storedTimer);
          const elapsed = Math.floor((Date.now() - start) / 1000);
          const remaining = Math.max(0, data.duration - elapsed);
          setTimer(remaining);
          setStartTime(start);
        } else {
          setTimer(data.duration);
          setStartTime(Date.now());
          sessionStorage.setItem(`quizTimer_${id}`, Date.now().toString());
        }

        setQuestions(data.questions);
        setResponses(Array(data.length).fill('')); // Initialize responses with empty strings for text inputs
      } else {
        console.log('Failed to fetch quiz data');
      }
    };

    getQuestions();
  }, [id]);

  useEffect(() => {
    const storedFormSubmitted = localStorage.getItem(`quizFormSubmitted_${id}`);
    const storedTimer = sessionStorage.getItem(`quizTimer_${id}`);
    if (storedFormSubmitted === 'true') {
      setFormSubmitted(true);
      setTimer(0); // Set timer to 0 if form is already submitted
    } else if (storedTimer) {
      const elapsed = Math.floor((Date.now() - parseInt(storedTimer)) / 1000);
      const remaining = Math.max(0, timer - elapsed);
      setTimer(remaining);
      if (!formSubmitted) {
        startTimer(parseInt(storedTimer));
      }
    } else {
      initializeQuiz();
    }

    return () => clearInterval(timerInterval);
  }, [id, formSubmitted]);

  useEffect(() => {
    if (timer <= 0 && !formSubmitted) {
      handleSubmit();
      clearInterval(timerInterval);
    }
  }, [timer]);

  const initializeQuiz = () => {
    setCurrentIndex(0);
    setResponses(Array(questions.length).fill(''));
    const start = Date.now();
    setStartTime(start);
    sessionStorage.setItem(`quizTimer_${id}`, start.toString());
    startTimer(start);
  };

  const startTimer = (start) => {
    const elapsed = Math.floor((Date.now() - start) / 1000);
    const remaining = Math.max(0, timer - elapsed);
    setTimer(remaining);
    timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(timerInterval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleOptionChange = (e) => {
    const index = parseInt(e.target.name.split('-')[1]);
    const optionText = e.target.value;
    const updatedResponses = [...responses];
    updatedResponses[index] = optionText;
    setResponses(updatedResponses);
  };

  const handleTextChange = (e) => {
    const index = parseInt(e.target.name.split('-')[1]);
    const text = e.target.value;
    const updatedResponses = [...responses];
    updatedResponses[index] = text;
    setResponses(updatedResponses);
  };

  const handleClick = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleClickAfter = () => {
    setCurrentIndex((prevIndex) => Math.min(questions.length - 1, prevIndex + 1));
  };

  const handleSubmit = async () => {
    setFormSubmitted(true);
    localStorage.setItem(`quizFormSubmitted_${id}`, 'true');
    sessionStorage.removeItem(`quizTimer_${id}`);
    setTimer(0); // Set timer to 0 upon submission
    const timeTaken = Math.floor((Date.now() - startTime) / 1000); // Calculate time taken in seconds

    const formattedResponses = questions.map((question, index) => ({
      questionId: question._id,
      response: responses[index],
      correct: question.correctOption.toLowerCase() === responses[index].toLowerCase(),
    }));

    console.log(formattedResponses);

    const response = await fetch(`http://localhost:4000/quiz/submitQuiz/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ answers: formattedResponses, timeTaken }),
    });

    if (response.ok) {
      toast.success('Quiz submitted successfully', {
        position: 'top-left',
        autoClose: 2000,
        hideProgressBar: true,
      });
    } else {
      toast.error('Failed to submit quiz', {
        position: 'top-left',
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className='quiz_container min-h-screen'>
      <div>
        <h1 className='title'>Quiz Name</h1>
        <div>
          <h3 className='timer'>
            Time Remaining: {Math.floor(timer / 60)}:
            {timer % 60 < 10 ? '0' : ''}
            {timer % 60}
          </h3>
        </div>
      </div>
      <div className='Questions'>
        <form>
          {questions.length > 0 && (
            <div className='grid items-start gap-4'>
              <div className='text-xl font-semibold'>
                {currentIndex + 1}. {questions[currentIndex].text}
              </div>
              {questions[currentIndex].type === 'radio' && (
                <div className='grid items-start gap-2'>
                  {questions[currentIndex].options.map((option) => (
                    <div className='flex items-center gap-2' key={option._id}>
                      <input
                        className='form-tick appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-transparent dark:border-gray-700 dark:checked:bg-blue-500'
                        id={option._id}
                        name={`question-${currentIndex}`}
                        type='radio'
                        value={option.text} //
                        checked={responses[currentIndex] === option.text}
                        onChange={handleOptionChange}
                        disabled={formSubmitted}
                      />
                      <label className='text-sm cursor-pointer dark:text-gray-400' htmlFor={option._id}>
                        {option.text}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {questions[currentIndex].type === 'text' && (
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
      <ToastContainer />
    </div>
  );
};

export default TakeQuiz;
