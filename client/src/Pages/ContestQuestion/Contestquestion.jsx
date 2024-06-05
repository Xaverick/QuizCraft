import React, { useState, useEffect } from 'react';
import './Contestquestion.scss';
import { Link, useParams } from 'react-router-dom';
import logo from '../../assets/homepageimages/navbarlogo.png'
const NavBar = ({ timeRemaining, contestStartTime, handleEndTest }) => {
    const calculateTimeRemaining = (endTime) => {
        if (isNaN(endTime)) return ''; // Handle invalid or NaN contest start time
        const now = new Date().getTime();
        console.log(now);
        console.log(endTime);
        const difference = endTime - now;
        if (difference < 0) return ''; // Contest already started
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <nav className="navbarcontestquestion">
            <div className="navbar-brand">
                <Link to="/">
                    <img src={logo} alt="Logo" />
                </Link>
            </div>
            <div className="time-remaining">
                <p>{timeRemaining} seconds</p>
                <Link to="/" className="navbar-button">
                    End Test
                </Link>
            </div>

        </nav>
    );
};


const ContestQuestion = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timer, setTimer] = useState(0);
    const [contestStartTime, setContestStartTime] = useState(0);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [answers, setAnswers] = useState({});
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
                const storedTimer = sessionStorage.getItem(`quizTimer_${id}`);
                console.log('stored timer:', storedTimer);
                if (storedTimer) {
                    const startTime = parseInt(storedTimer);
                    console.log('start time:', startTime)
                    const elapsed = Math.floor((Date.now() - startTime) / 1000);
                    console.log('elapsed:', elapsed);
                    const remaining = Math.max(0, data.duration - elapsed);
                    console.log('remaining:', remaining);
                    setTimer(remaining);
                } else {

                    setTimer(data.duration);
                    console.log('timer:', data.duration);
                }
                setContestStartTime(data.contestStartTime);
                setQuestions(data.questions);
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
            // handleSubmit();
            clearInterval(timerInterval);
        }
    }, [timer]);

    const initializeQuiz = () => {
        setCurrentQuestionIndex(0);
        const startTime = Date.now();
        sessionStorage.setItem(`quizTimer_${id}`, startTime.toString());
        startTimer(startTime);
    };

    const startTimer = (startTime) => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = Math.max(0, timer - elapsed);
        console.log(remaining);
        console.log(timer);
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
        setSelectedOption(e.target.value);
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [currentQuestionIndex]: e.target.value,
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(answers[currentQuestionIndex + 1] || null);
            // setSelectedOption(null); // Reset selected option
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption(answers[currentQuestionIndex - 1] || null);
            // setSelectedOption(null); // Reset selected option
        }
    };

    const handleEndTest = () => {
        setFormSubmitted(true);
        localStorage.setItem(`quizFormSubmitted_${id}`, 'true');
        // Implement logic for ending the test
    };

    const currentQuestion = questions[currentQuestionIndex];
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
        <main>
            <NavBar timeRemaining={timer} contestStartTime={contestStartTime} handleEndTest={handleEndTest} />
            <span><hr /></span>
            <div className="container">
                {/* <h1 className="quiz-title">Quiz Title</h1> */}
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
                                            setSelectedOption(answers[index] || null);
                                            // setSelectedOption(null); // Reset selected option
                                        }}
                                    >
                                        {index + 1}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                <section className="question-section">
                    <div className="question">
                        <h2 className="question-num">
                            Question {currentQuestionIndex + 1}: {currentQuestion?.text}
                        </h2>
                    </div>
                    <div className="answer">
                        {currentQuestion?.options?.map((option) => (
                            <label
                                key={option._id}
                                className={`answer-item ${selectedOption === option.text ? 'selected' : ''}`}
                            >
                                <input
                                    type="radio"
                                    name="quizOption"
                                    value={option.text}
                                    onChange={handleOptionChange}
                                    checked={selectedOption === option.text}
                                />
                                <span>{option.text}</span>
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
            </div>
        </main>
    );
};

export default ContestQuestion;
