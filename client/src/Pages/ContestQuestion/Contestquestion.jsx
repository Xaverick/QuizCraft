import { useState, useEffect } from 'react';
import './Contestquestion.scss';
import { Link, useParams } from 'react-router-dom';
import logo from '../../assets/GeekClash.svg'
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";


const RenderQuestion = ({question, index}) => {
    return (
  
      <pre className="whitespace-pre-wrap" key={index}>
         {index}. <code>{question?.text}</code>
      </pre>
  
    );
  };

const ContestQuestion = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const userId = JSON.parse(localStorage.getItem('user')).userId || null;
    const [timer, setTimer] = useState(1);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [responses, setResponses] = useState([]);
    const navigate = useNavigate();
    let timerInterval;

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const response = await axios.get(`/quiz/getQuestions/${id}`);
                const { questions, duration } = response.data;

                const storedTimer = sessionStorage.getItem(`quizTimer_${userId}_${id}`);
                if (storedTimer) {
                    const startTime = parseInt(storedTimer);
                    const elapsed = Math.floor((Date.now() - startTime) / 1000);
                    const remaining = Math.max(0, duration - elapsed);
                    setTimer(remaining);
                } else {
                    setTimer(duration);
                }

                setQuestions(questions);

            } catch (err) {
                console.log(err);
            }

        };

        getQuestions();
    }, [id]);

    useEffect(() => {
        const storedFormSubmitted = localStorage.getItem(`quizFormSubmitted_${userId}_${id}`);
        const storedTimer = sessionStorage.getItem(`quizTimer_${userId}_${id}`);
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
        setCurrentIndex(0);
        const startTime = Date.now();
        sessionStorage.setItem(`quizTimer_${userId}_${id}`, startTime.toString());
        startTimer(startTime);
    };


    const startTimer = (startTime) => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = Math.max(0, timer - elapsed);
        // console.log(remaining);
        // console.log(timer);
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
        localStorage.setItem(`quizFormSubmitted_${userId}_${id}`, 'true');
        sessionStorage.removeItem(`quizTimer_${userId}_${id}`);
        setTimer(0); // Set timer to 0 upon submission

        const formattedResponses = questions.map((question, index) => ({
            questionId: question._id,
            response: responses[index],

            correct: question.correctOption.toLowerCase() === responses[index]?.toLowerCase()
        }));

        try {
            const response = await axios.post(`/quiz/submitQuiz/${id}`, {
                answers: formattedResponses
            });

            if (response.status === 200) {
                toast.success('Quiz submitted successfully', {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: true,
                })
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            console.error('Error submitting quiz:', error);
            console.log(error.response.data);
            toast.error(error.response.data, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: true,
            })
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }

    };

    const currentQuestion = questions[currentIndex];
    const progressPercentage = ((currentIndex + 1) / questions.length) * 100;

    return (
        <main>

            <nav className="navbarcontestquestion">
                <div className="navbar-brand">
                    <Link to="/">
                        <img className='ig' src={logo} alt="Logo" />
                    </Link>
                </div>
                <div className="time-remaining">
                    <p>{Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60} Min</p>
                    <button onClick={handleSubmit} className="navbar-button" disabled={formSubmitted}>
                        End Test
                    </button>
                </div>

            </nav>
            {/* <span><hr /></span> */}
            <div className="container">
                {/* <h1 className="quiz-title">Quiz Title</h1> */}
                <section className="questions-nav-section">
                    <div className="d-flex">
                        <ul className="question-nums-list">
                            {questions.map((question, index) => (
                                <li key={question._id}>
                                    <a
                                        className={index < currentIndex ? 'done' : index === currentIndex ? 'active' : ''}
                                        href="#"
                                        onClick={() => {
                                            setCurrentIndex(index);

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
                    <div className="progress-bar-container">
                        <div className="progress-text">
                            {currentIndex + 1}/{questions.length}
                            <br />
                            <span>Completed</span>
                        </div>
                        <div className='progress-background'>
                            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                    </div>
                    <div className="question">
                        <h2 className="question-num">
                            <RenderQuestion question={currentQuestion} index={currentIndex + 1} />
                            {/* Question {currentIndex + 1}: {currentQuestion?.text} */}
                        </h2>
                    </div>
                    <div className="answer " >
                        {currentQuestion?.type === 'radio' && (
                            currentQuestion?.options?.map((option) => (
                                <label
                                    key={option._id}
                                    className={`answer-item ${responses[currentIndex] === option.text ? 'selected' : ''}`}
                                >
                                    <input
                                        // className='form-tick appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-transparent dark:border-gray-700 dark:checked:bg-blue-500'
                                        id={option._id}
                                        name={`question-${currentIndex}`}
                                        type='radio'
                                        value={option.text}
                                        checked={responses[currentIndex] === option.text}
                                        onChange={handleOptionChange}
                                        disabled={formSubmitted}
                                    />
                                    <span>{option.text}</span>
                                </label>
                            ))
                        )}

                        {currentQuestion?.type === 'text' && (
                            currentQuestion?.options?.map((option) => (
                                <>
                                    <input
                                        className='border-black active:border-black'
                                        type='text'
                                        name={`question-${currentIndex}`}
                                        value={responses[currentIndex] || ''}
                                        onChange={handleTextChange}
                                        disabled={formSubmitted}
                                        placeholder='Enter your answer here...'
                                    />
                                </>

                            ))
                        )}
                    </div>
                    <div className="action">
                        <button
                            className="btn"
                            onClick={handleClick}
                            disabled={currentIndex === 0}
                            style={{
                                fontSize: window.innerWidth < 500 ? '0.8rem' : '1.2rem',
                                padding: window.innerWidth < 500 ? '0.5rem 1.2rem' : '0.5rem 1.2rem'
                            }}
                        >
                            <MdOutlineKeyboardArrowLeft fontSize={window.innerWidth < 500 ? "1rem" : "1.5rem"} /> Previous
                        </button>
                        <button
                            className="btn"
                            onClick={handleClickAfter}
                            disabled={currentIndex === questions.length - 1}
                            style={{
                                fontSize: window.innerWidth < 500 ? '0.8rem' : '1.2rem',
                                padding: window.innerWidth < 500 ? '0.5rem 1.2rem' : '0.5rem 1.2rem'
                            }}
                        >
                            Next <MdOutlineKeyboardArrowRight fontSize={window.innerWidth < 500 ? "1rem" : "1.5rem"} />
                        </button>

                    </div>
                </section>
            </div>
            <ToastContainer />
        </main>
    );
};

export default ContestQuestion;
