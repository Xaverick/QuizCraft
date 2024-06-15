import { useState, useEffect } from 'react';
import './Contestquestion.scss';
import { Link, useParams } from 'react-router-dom';
import logo from '../../assets/homepageimages/navbarlogo.png'
import { toast } from 'react-toastify';

const ContestQuestion = () => {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timer, setTimer] = useState(1);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [responses, setResponses] = useState([]);
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
        setCurrentIndex(0);
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
        const formattedResponses = questions.map((question, index) => ({
            questionId: question._id,
            response: responses[index],
            correct: question.correctOption.toLowerCase() === responses[index].toLowerCase()
        }));

        console.log(formattedResponses);

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
                    <button onClick={handleSubmit} className="navbar-button">
                        End Test
                    </button>
                </div>

            </nav>
            <span><hr /></span>
            <div className="container">
                {/* <h1 className="quiz-title">Quiz Title</h1> */}
                <div className="progress-bar-container">
                    <div className="progress-text">
                        {currentIndex + 1}/{questions.length} Questions Attempted
                    </div>
                    <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                </div>
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
                                            setSelectedOption(responses[index] || null);
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
                            Question {currentIndex + 1}: {currentQuestion?.text}
                        </h2>
                    </div>
                    <div className="answer">
                        {currentQuestion?.type === 'radio' && (
                            currentQuestion?.options?.map((option) => (
                                <label
                                    key={option._id}
                                    className={`answer-item ${selectedOption === option.text ? 'selected' : ''}`}
                                >
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
                                    <span>{option.text}</span>
                                </label>
                            ))
                        )}

                        {currentQuestion?.type === 'text' && (
                            currentQuestion?.options?.map((option) => (
                                <label
                                    key={option._id}
                                    className={`answer-item ${selectedOption === option.text ? 'selected' : ''}`}
                                >
                                    <input
                                        type='text'
                                        name={`question-${currentIndex}`}
                                        value={responses[currentIndex] || ''}
                                        onChange={handleTextChange}
                                        disabled={formSubmitted}
                                    />

                                </label>
                            ))
                        )}
                    </div>
                    <div className="action">
                        <button className="btn" onClick={handleClick} disabled={currentIndex === 0}>
                            Previous
                        </button>
                        <button className="btn" onClick={handleClickAfter} disabled={currentIndex === questions.length - 1}>
                            Next
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ContestQuestion;
