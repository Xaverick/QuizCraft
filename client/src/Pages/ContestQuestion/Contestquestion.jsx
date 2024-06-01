import React, { useState, useEffect } from 'react';
import './Contestquestion.scss';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContestQuestion = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [responses, setResponses] = useState([]);
    const [timer, setTimer] = useState(300);
    const [formSubmitted, setFormSubmitted] = useState(false);
    let timerInterval;

    useEffect(() => {
        const getQuestions = async () => {
            const response = await fetch(`http://localhost:4000/quiz/getQuestions/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setQuestions(data.questions);
                setResponses(Array(data.questions.length).fill(''));
                const storedTimer = sessionStorage.getItem(`quizTimer_${id}`);
                if (storedTimer) {
                    const startTime = parseInt(storedTimer);
                    const elapsed = Math.floor((Date.now() - startTime) / 1000);
                    const remaining = Math.max(0, data.duration - elapsed);
                    setTimer(remaining);
                } else {
                    setTimer(data.duration);
                }
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
            setTimer(0);
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
        setCurrentQuestionIndex(0);
        setResponses(Array(questions.length).fill(''));
        const startTime = Date.now();
        sessionStorage.setItem(`quizTimer_${id}`, startTime.toString());
        startTimer(startTime);
    };

    const startTimer = (startTime) => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
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
        const optionText = e.target.value;
        const updatedResponses = [...responses];
        updatedResponses[currentQuestionIndex] = optionText;
        setResponses(updatedResponses);
        setSelectedOption(optionText);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption(null);
        }
    };

    const handleSubmit = async () => {
        setFormSubmitted(true);
        localStorage.setItem(`quizFormSubmitted_${id}`, 'true');
        sessionStorage.removeItem(`quizTimer_${id}`);
        setTimer(0);
        const formattedResponses = questions.map((question, index) => ({
            questionId: question._id,
            response: responses[index],
            correct: question.correctOption.toLowerCase() === responses[index].toLowerCase()
        }));

        const response = await fetch(`http://localhost:4000/quiz/submitQuiz/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ answers: formattedResponses })
        });

        if (response.ok) {
            toast.success('Quiz submitted successfully', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
            });
        } else {
            toast.error('Failed to submit quiz', {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
            });
        }
    };

    const currentQuestion = questions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <main>
            <div className="container">
                <div className="progress-bar-container">
                    <div className="progress-text">
                        {currentQuestionIndex + 1}/{questions.length} Questions Attempted
                    </div>
                    <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <section className="questions-nav-section">
                    <div className="d-flex">
                        <ul className="question-nums-list">
                            {questions.map((question, index) => (
                                <li key={question._id}>
                                    <a
                                        className={index < currentQuestionIndex ? 'done' : index === currentQuestionIndex ? 'active' : ''}
                                        href="#"
                                        onClick={() => {
                                            setCurrentQuestionIndex(index);
                                            setSelectedOption(responses[index] || null);
                                        }}
                                    >
                                        {question.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                {currentQuestion && (
                    <section className="question-section">
                        <div className="question">
                            <h2 className="question-num">
                                Question {currentQuestionIndex + 1}: {currentQuestion.text}
                            </h2>
                        </div>
                        <div className="answer">
                            {currentQuestion.options.map((option, index) => (
                                <label
                                    key={index}
                                    className={`answer-item ${selectedOption === option ? 'selected' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name="quizOption"
                                        value={option}
                                        onChange={handleOptionChange}
                                        checked={selectedOption === option}
                                    />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                        <div className="action">
                            <button className="btn" onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
                                Previous
                            </button>
                            <button className="btn" onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>

                                Next
                            </button>
                        </div>
                    </section>
                )}
                {currentQuestionIndex === questions.length - 1 && (
                    <button className="submit" onClick={handleSubmit} disabled={formSubmitted}>
                        Submit
                    </button>
                )}
            </div>
            <ToastContainer />
        </main>
    );
};

export default ContestQuestion;
