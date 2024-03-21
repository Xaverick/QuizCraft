import './TakeQuiz.scss'
import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

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






// const TakeQuiz = () => {
//   const [questions, setQuestions] = useState(quizData);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [responses, setResponses] = useState(Array(quizData.length).fill(null));
//   const [timer, setTimer] = useState(() => {
//     const storedTimer = localStorage.getItem('quizTimer');
//     return storedTimer ? Math.max(0, 300 - Math.floor((Date.now() - parseInt(storedTimer)) / 1000)) : 300;
//   });
//   const currentQuestion = questions[currentIndex];

//   useEffect(() => {
//     const storedTimer = localStorage.getItem('quizTimer');
//     const initialTime = Date.now();
//     if (!storedTimer) {
//       localStorage.setItem('quizTimer', initialTime);
//     } else {
//       const elapsedTime = Math.floor((initialTime - parseInt(storedTimer)) / 1000);
//       const remainingTime = Math.max(0, 300 - elapsedTime);
//       setTimer(remainingTime);
//     }

//     const timerInterval = setInterval(() => {
//       setTimer((prevTimer) => {
//         if (prevTimer === 0) {
//           clearInterval(timerInterval);
//           handleSubmit(); // Auto-submit when timer runs out
//           return prevTimer;
//         }
//         return prevTimer - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timerInterval);
//   }, []); // Empty dependency array to run only once on component mount

//   const handleOptionChange = (e) => {
//     const index = parseInt(e.target.name.split('-')[1]);
//     const optionId = parseInt(e.target.value);
//     const updatedResponses = [...responses];
//     updatedResponses[index] = optionId;
//     setResponses(updatedResponses);
//   };

//   const handleClick = () => {
//     setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
//   };

//   const handleClickAfter = () => {
//     setCurrentIndex((prevIndex) => Math.min(questions.length - 1, prevIndex + 1));
//   };

//   const handleSubmit = () => {
//     // Handle form submission here
//     console.log('Form submitted with responses:', responses);
//   };

//   return (
//     <div className='quiz_container min-h-screen'>
//       <div>
//         <h1 className='title'>Quiz Name</h1>
//         <div>
//           <h3 className='timer'>Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</h3>
//         </div>
//       </div>
//       <div className='Questions'>
//         <form>
//           {currentQuestion && (
//             <div className='grid items-start gap-4'>
//               <div className='text-xl font-semibold' key={currentQuestion.id}>
//                 {currentQuestion.id}. {currentQuestion.question}
//               </div>
//               <div className='grid items-start gap-2'>
//                 {currentQuestion.options.map((option) => (
//                   <div className='flex items-center gap-2' key={option.id}>
//                     <input
//                       className='form-tick appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-transparent dark:border-gray-700 dark:checked:bg-blue-500'
//                       id={option.text + currentQuestion.id}
//                       name={`question-${currentIndex}`}
//                       type='radio'
//                       value={option.id}
//                       checked={responses[currentIndex] === option.id}
//                       onChange={handleOptionChange}
//                     />
//                     <label className='text-sm cursor-pointer dark:text-gray-400' htmlFor={option.text}>
//                       {option.text}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </form>
//         <div className='navigation'>
//           <button className='previous' onClick={handleClick} disabled={currentIndex === 0}>
//             Previous
//           </button>
//           <button className='next' onClick={handleClickAfter} disabled={currentIndex === questions.length - 1}>
//             {currentIndex === questions.length - 1 ? 'Click Submit' : 'Next'}
//           </button>
//         </div>
//         {currentIndex === questions.length - 1 && (
//           <button className='submit' onClick={handleSubmit}>
//             Submit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TakeQuiz;


// const TakeQuiz = () => {
//   const [questions, setQuestions] = useState(quizData);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [responses, setResponses] = useState(Array(quizData.length).fill(null));
//   const [timer, setTimer] = useState(300); // Initial timer value
//   const [timerStarted, setTimerStarted] = useState(false); // Flag to track if timer has started
//   const currentQuestion = questions[currentIndex];
//   let timerInterval; // Variable to hold the interval reference

//   useEffect(() => {
//     // Initialize timer
//     initializeTimer();

//     // Clean up on component unmount
//     return () => {
//       clearInterval(timerInterval);
//     };
//   }, [currentIndex]); // Reinitialize timer when currentIndex changes

//   useEffect(() => {
//     if (timer <= 0 && timerStarted) {
//       handleSubmit();
//       setTimerStarted(false);
//     }
//   }, [timer]); // Check if timer has reached 0

//   const initializeTimer = () => {
//     const storedTimer = localStorage.getItem('quizTimer');
//     if (storedTimer && isTimerValid(storedTimer)) {
//       const initialTime = parseInt(storedTimer);
//       const elapsedTime = Math.floor((Date.now() - initialTime) / 1000);
//       const remainingTime = Math.max(0, 300 - elapsedTime);
//       setTimer(remainingTime);
//     } else {
//       localStorage.setItem('quizTimer', Date.now());
//       setTimer(300);
//     }
//     setTimerStarted(true);
//     startTimer(); // Start the timer after initialization
//   };

//   const isTimerValid = (storedTimer) => {
//     const initialTime = parseInt(storedTimer);
//     const elapsedTime = Math.floor((Date.now() - initialTime) / 1000);
//     return elapsedTime <= 300; // Check if elapsed time is within the timer duration
//   };

//   const startTimer = () => {
//     timerInterval = setInterval(() => {
//       setTimer((prevTimer) => {
//         if (prevTimer === 0) {
//           clearInterval(timerInterval);
//           handleSubmit(); // Auto-submit when timer runs out
//           return prevTimer;
//         }
//         return prevTimer - 1;
//       });
//     }, 1000);
//   };

//   const handleOptionChange = (e) => {
//     const index = parseInt(e.target.name.split('-')[1]);
//     const optionId = parseInt(e.target.value);
//     const updatedResponses = [...responses];
//     updatedResponses[index] = optionId;
//     setResponses(updatedResponses);
//   };

//   const handleClick = () => {
//     setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
//   };

//   const handleClickAfter = () => {
//     setCurrentIndex((prevIndex) => Math.min(questions.length - 1, prevIndex + 1));
//   };

//   const handleSubmit = () => {
//     // Handle form submission here
//     console.log('Form submitted with responses:', responses);
//   };

//   return (
//     <div className='quiz_container min-h-screen'>
//       <div>
//         <h1 className='title'>Quiz Name</h1>
//         <div>
//           <h3 className='timer'>Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</h3>
//         </div>
//       </div>
//       <div className='Questions'>
//         <form>
//           {currentQuestion && (
//             <div className='grid items-start gap-4'>
//               <div className='text-xl font-semibold' key={currentQuestion.id}>
//                 {currentQuestion.id}. {currentQuestion.question}
//               </div>
//               <div className='grid items-start gap-2'>
//                 {currentQuestion.options.map((option) => (
//                   <div className='flex items-center gap-2' key={option.id}>
//                     <input
//                       className='form-tick appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-transparent dark:border-gray-700 dark:checked:bg-blue-500'
//                       id={option.text + currentQuestion.id}
//                       name={`question-${currentIndex}`}
//                       type='radio'
//                       value={option.id}
//                       checked={responses[currentIndex] === option.id}
//                       onChange={handleOptionChange}
//                     />
//                     <label className='text-sm cursor-pointer dark:text-gray-400' htmlFor={option.text}>
//                       {option.text}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </form>
//         <div className='navigation'>
//           <button className='previous' onClick={handleClick} disabled={currentIndex === 0}>
//             Previous
//           </button>
//           <button className='next' onClick={handleClickAfter} disabled={currentIndex === questions.length - 1}>
//             {currentIndex === questions.length - 1 ? 'Click Submit' : 'Next'}
//           </button>
//         </div>
//         {currentIndex === questions.length - 1 && (
//           <button className='submit' onClick={handleSubmit}>
//             Submit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TakeQuiz;


// const TakeQuiz = ({ match }) => {
//   const quizId = match.params.id; // Get the quiz ID from the route
//   const [questions, setQuestions] = useState(quizData);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [responses, setResponses] = useState(Array(quizData.length).fill(null));
//   const [timer, setTimer] = useState(() => {
//     const storedTimer = localStorage.getItem(`quizTimer_${quizId}`);
//     return storedTimer ? Math.max(0, 300 - Math.floor((Date.now() - parseInt(storedTimer)) / 1000)) : 300;
//   });
//   const [timerStarted, setTimerStarted] = useState(false); // Flag to track if timer has started
//   const currentQuestion = questions[currentIndex];
//   let timerInterval; // Variable to hold the interval reference

//   useEffect(() => {
//     initializeQuiz();
//   }, [match.params.id]); // Reinitialize quiz when match.params.id changes

//   useEffect(() => {
//     if (timer <= 0 && timerStarted) {
//       handleSubmit();
//       setTimerStarted(false);
//     }
//   }, [timer]); // Check if timer has reached 0

//   const initializeQuiz = () => {
//     setCurrentIndex(0);
//     setResponses(Array(quizData.length).fill(null));
//     setTimer(300);
//     setTimerStarted(false);
//     localStorage.setItem(`quizTimer_${quizId}`, Date.now());
//   };

//   useEffect(() => {
//     localStorage.setItem(`quizTimer_${quizId}`, Date.now()); // Update localStorage when a new quiz starts
//   }, [match.params.id]); // Update localStorage when match.params.id changes

//   const startTimer = () => {
//     timerInterval = setInterval(() => {
//       setTimer((prevTimer) => {
//         if (prevTimer === 0) {
//           clearInterval(timerInterval);
//           handleSubmit(); // Auto-submit when timer runs out
//           return prevTimer;
//         }
//         return prevTimer - 1;
//       });
//     }, 1000);
//     setTimerStarted(true);
//   };

//   const handleOptionChange = (e) => {
//     const index = parseInt(e.target.name.split('-')[1]);
//     const optionId = parseInt(e.target.value);
//     const updatedResponses = [...responses];
//     updatedResponses[index] = optionId;
//     setResponses(updatedResponses);
//   };

//   const handleClick = () => {
//     setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
//   };

//   const handleClickAfter = () => {
//     setCurrentIndex((prevIndex) => Math.min(questions.length - 1, prevIndex + 1));
//   };

//   const handleSubmit = () => {
//     // Handle form submission here
//     console.log('Form submitted with responses:', responses);
//   };

//   return (
//     <div className='quiz_container min-h-screen'>
//       <div>
//         <h1 className='title'>Quiz Name</h1>
//         <div>
//           <h3 className='timer'>Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</h3>
//         </div>
//       </div>
//       <div className='Questions'>
//         <form>
//           {currentQuestion && (
//             <div className='grid items-start gap-4'>
//               <div className='text-xl font-semibold' key={currentQuestion.id}>
//                 {currentQuestion.id}. {currentQuestion.question}
//               </div>
//               <div className='grid items-start gap-2'>
//                 {currentQuestion.options.map((option) => (
//                   <div className='flex items-center gap-2' key={option.id}>
//                     <input
//                       className='form-tick appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-transparent dark:border-gray-700 dark:checked:bg-blue-500'
//                       id={option.text + currentQuestion.id}
//                       name={`question-${currentIndex}`}
//                       type='radio'
//                       value={option.id}
//                       checked={responses[currentIndex] === option.id}
//                       onChange={handleOptionChange}
//                     />
//                     <label className='text-sm cursor-pointer dark:text-gray-400' htmlFor={option.text}>
//                       {option.text}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </form>
//         <div className='navigation'>
//           <button className='previous' onClick={handleClick} disabled={currentIndex === 0}>
//             Previous
//           </button>
//           <button className='next' onClick={handleClickAfter} disabled={currentIndex === questions.length - 1}>
//             {currentIndex === questions.length - 1 ? 'Click Submit' : 'Next'}
//           </button>
//         </div>
//         {currentIndex === questions.length - 1 && (
//           <button className='submit' onClick={handleSubmit}>
//             Submit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TakeQuiz;


// const TakeQuiz = ({ quizId }) => {
//   const [questions, setQuestions] = useState(quizData);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [responses, setResponses] = useState(Array(quizData.length).fill(null));
//   const [timer, setTimer] = useState(300);
//   const currentQuestion = questions[currentIndex];
//   let timerInterval;

//   useEffect(() => {
//     initializeQuiz();
//   }, [quizId]);

//   useEffect(() => {
//     if (timer <= 0) {
//       handleSubmit();
//       clearInterval(timerInterval);
//     }
//   }, [timer]);

//   const initializeQuiz = () => {
//     setCurrentIndex(0);
//     setResponses(Array(quizData.length).fill(null));
//     setTimer(300);
//     const storedTimer = localStorage.getItem(`quizTimer_${quizId}`);
//     const startTime = storedTimer ? parseInt(storedTimer) : Date.now();
//     localStorage.setItem(`quizTimer_${quizId}`, startTime.toString());
//     startTimer(startTime);
//   };

//   const startTimer = (startTime) => {
//     const elapsed = Math.floor((Date.now() - startTime) / 1000);
//     const remaining = Math.max(0, 300 - elapsed);
//     setTimer(remaining);
//     timerInterval = setInterval(() => {
//       setTimer((prevTimer) => {
//         if (prevTimer === 0) {
//           clearInterval(timerInterval);
//           return prevTimer;
//         }
//         return prevTimer - 1;
//       });
//     }, 1000);
//   };

//   const handleOptionChange = (e) => {
//     const index = parseInt(e.target.name.split('-')[1]);
//     const optionId = parseInt(e.target.value);
//     const updatedResponses = [...responses];
//     updatedResponses[index] = optionId;
//     setResponses(updatedResponses);
//   };

//   const handleClick = () => {
//     setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
//   };

//   const handleClickAfter = () => {
//     setCurrentIndex((prevIndex) => Math.min(questions.length - 1, prevIndex + 1));
//   };

//   const handleSubmit = () => {
//     console.log('Form submitted with responses:', responses);
//   };

//   return (
//     <div className='quiz_container min-h-screen'>
//       <div>
//         <h1 className='title'>Quiz Name</h1>
//         <div>
//           <h3 className='timer'>Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</h3>
//         </div>
//       </div>
//       <div className='Questions'>
//         <form>
//           {currentQuestion && (
//             <div className='grid items-start gap-4'>
//               <div className='text-xl font-semibold' key={currentQuestion.id}>
//                 {currentQuestion.id}. {currentQuestion.question}
//               </div>
//               <div className='grid items-start gap-2'>
//                 {currentQuestion.options.map((option) => (
//                   <div className='flex items-center gap-2' key={option.id}>
//                     <input
//                       className='form-tick appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-transparent dark:border-gray-700 dark:checked:bg-blue-500'
//                       id={option.text + currentQuestion.id}
//                       name={`question-${currentIndex}`}
//                       type='radio'
//                       value={option.id}
//                       checked={responses[currentIndex] === option.id}
//                       onChange={handleOptionChange}
//                     />
//                     <label className='text-sm cursor-pointer dark:text-gray-400' htmlFor={option.text}>
//                       {option.text}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </form>
//         <div className='navigation'>
//           <button className='previous' onClick={handleClick} disabled={currentIndex === 0}>
//             Previous
//           </button>
//           <button className='next' onClick={handleClickAfter} disabled={currentIndex === questions.length - 1}>
//             {currentIndex === questions.length - 1 ? 'Click Submit' : 'Next'}
//           </button>
//         </div>
//         {currentIndex === questions.length - 1 && (
//           <button className='submit' onClick={handleSubmit}>
//             Submit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TakeQuiz;


// const TakeQuiz = ({ quizId }) => {
//   const [questions, setQuestions] = useState(quizData);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [responses, setResponses] = useState(Array(quizData.length).fill(null));
//   const [timer, setTimer] = useState(300);
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const currentQuestion = questions[currentIndex];
//   let timerInterval;

//   useEffect(() => {
//     initializeQuiz();
//   }, [quizId]);

//   useEffect(() => {
//     if (timer <= 0) {
//       handleSubmit();
//       clearInterval(timerInterval);
//     }
//   }, [timer]);

//   const initializeQuiz = () => {
//     setCurrentIndex(0);
//     setResponses(Array(quizData.length).fill(null));
//     setTimer(300);
//     setFormSubmitted(false);
//     const storedTimer = localStorage.getItem(`quizTimer_${quizId}`);
//     const startTime = storedTimer ? parseInt(storedTimer) : Date.now();
//     localStorage.setItem(`quizTimer_${quizId}`, startTime.toString());
//     startTimer(startTime);
//   };

//   const startTimer = (startTime) => {
//     const elapsed = Math.floor((Date.now() - startTime) / 1000);
//     const remaining = Math.max(0, 300 - elapsed);
//     setTimer(remaining);
//     timerInterval = setInterval(() => {
//       setTimer((prevTimer) => {
//         if (prevTimer === 0) {
//           clearInterval(timerInterval);
//           return prevTimer;
//         }
//         return prevTimer - 1;
//       });
//     }, 1000);
//   };

//   const handleOptionChange = (e) => {
//     const index = parseInt(e.target.name.split('-')[1]);
//     const optionId = parseInt(e.target.value);
//     const updatedResponses = [...responses];
//     updatedResponses[index] = optionId;
//     setResponses(updatedResponses);
//   };

//   const handleClick = () => {
//     setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
//   };

//   const handleClickAfter = () => {
//     setCurrentIndex((prevIndex) => Math.min(questions.length - 1, prevIndex + 1));
//   };

//   const handleSubmit = () => {
//     setFormSubmitted(true);
//     console.log('Form submitted with responses:', responses);
//   };

//   return (
//     <div className='quiz_container min-h-screen'>
//       <div>
//         <h1 className='title'>Quiz Name</h1>
//         <div>
//           <h3 className='timer'>Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</h3>
//         </div>
//       </div>
//       <div className='Questions'>
//         <form>
//           {currentQuestion && (
//             <div className='grid items-start gap-4'>
//               <div className='text-xl font-semibold' key={currentQuestion.id}>
//                 {currentQuestion.id}. {currentQuestion.question}
//               </div>
//               <div className='grid items-start gap-2'>
//                 {currentQuestion.options.map((option) => (
//                   <div className='flex items-center gap-2' key={option.id}>
//                     <input
//                       className='form-tick appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-transparent dark:border-gray-700 dark:checked:bg-blue-500'
//                       id={option.text + currentQuestion.id}
//                       name={`question-${currentIndex}`}
//                       type='radio'
//                       value={option.id}
//                       checked={responses[currentIndex] === option.id}
//                       onChange={handleOptionChange}
//                       disabled={formSubmitted}
//                     />
//                     <label className='text-sm cursor-pointer dark:text-gray-400' htmlFor={option.text}>
//                       {option.text}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </form>
//         <div className='navigation'>
//           <button className='previous' onClick={handleClick} disabled={currentIndex === 0 || formSubmitted}>
//             Previous
//           </button>
//           <button className='next' onClick={handleClickAfter} disabled={currentIndex === questions.length - 1 || formSubmitted}>
//             {currentIndex === questions.length - 1 ? 'Click Submit' : 'Next'}
//           </button>
//         </div>
//         {currentIndex === questions.length - 1 && (
//           <button className='submit' onClick={handleSubmit} disabled={formSubmitted}>
//             Submit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TakeQuiz;




// const TakeQuiz = () => {
//   const { id } = useParams();
//   const [questions, setQuestions] = useState(quizData);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [responses, setResponses] = useState(Array(quizData.length).fill(null));
//   const [timer, setTimer] = useState(300);
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const currentQuestion = questions[currentIndex];
//   let timerInterval;

//   useEffect(() => {
//     initializeQuiz();
//   }, [id]);

//   useEffect(() => {
//     if (timer <= 0) {
//       handleSubmit();
//       clearInterval(timerInterval);
//     }
//   }, [timer]);

//   const initializeQuiz = () => {
//     setCurrentIndex(0);
//     setResponses(Array(quizData.length).fill(null));
//     setTimer(300);
//     setFormSubmitted(false);
//     const storedTimer = localStorage.getItem(`quizTimer_${id}`);
//     const startTime = storedTimer ? parseInt(storedTimer) : Date.now();
//     localStorage.setItem(`quizTimer_${id}`, startTime.toString());
//     startTimer(startTime);
//   };

//   const startTimer = (startTime) => {
//     const elapsed = Math.floor((Date.now() - startTime) / 1000);
//     const remaining = Math.max(0, 300 - elapsed);
//     setTimer(remaining);
//     timerInterval = setInterval(() => {
//       setTimer((prevTimer) => {
//         if (prevTimer === 0) {
//           clearInterval(timerInterval);
//           return prevTimer;
//         }
//         return prevTimer - 1;
//       });
//     }, 1000);
//   };

//   const handleOptionChange = (e) => {
//     const index = parseInt(e.target.name.split('-')[1]);
//     const optionId = parseInt(e.target.value);
//     const updatedResponses = [...responses];
//     updatedResponses[index] = optionId;
//     setResponses(updatedResponses);
//   };

//   const handleClick = () => {
//     setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
//   };

//   const handleClickAfter = () => {
//     setCurrentIndex((prevIndex) => Math.min(questions.length - 1, prevIndex + 1));
//   };

//   const handleSubmit = () => {
//     setFormSubmitted(true);
//     clearInterval(timerInterval); // Stop the timer interval
//     console.log('Form submitted with responses:', responses);
//   };

//   return (
//     <div className='quiz_container min-h-screen'>
//       <div>
//         <h1 className='title'>Quiz Name</h1>
//         <div>
//           <h3 className='timer'>Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</h3>
//         </div>
//       </div>
//       <div className='Questions'>
//         <form>
//           {currentQuestion && (
//             <div className='grid items-start gap-4'>
//               <div className='text-xl font-semibold' key={currentQuestion.id}>
//                 {currentQuestion.id}. {currentQuestion.question}
//               </div>
//               <div className='grid items-start gap-2'>
//                 {currentQuestion.options.map((option) => (
//                   <div className='flex items-center gap-2' key={option.id}>
//                     <input
//                       className='form-tick appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-transparent dark:border-gray-700 dark:checked:bg-blue-500'
//                       id={option.text + currentQuestion.id}
//                       name={`question-${currentIndex}`}
//                       type='radio'
//                       value={option.id}
//                       checked={responses[currentIndex] === option.id}
//                       onChange={handleOptionChange}
//                       disabled={formSubmitted}
//                     />
//                     <label className='text-sm cursor-pointer dark:text-gray-400' htmlFor={option.text}>
//                       {option.text}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </form>
//         <div className='navigation'>
//           <button className='previous' onClick={handleClick} disabled={currentIndex === 0 || formSubmitted}>
//             Previous
//           </button>
//           <button className='next' onClick={handleClickAfter} disabled={currentIndex === questions.length - 1 || formSubmitted}>
//             {currentIndex === questions.length - 1 ? 'Click Submit' : 'Next'}
//           </button>
//         </div>
//         {currentIndex === questions.length - 1 && (
//           <button className='submit' onClick={handleSubmit} disabled={formSubmitted}>
//             Submit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TakeQuiz;


// const TakeQuiz = () => {
//   const { id } = useParams();
//   const [questions, setQuestions] = useState(quizData);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [responses, setResponses] = useState(Array(quizData.length).fill(null));
//   const [timer, setTimer] = useState(300);
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const currentQuestion = questions[currentIndex];
//   let timerInterval;

//   useEffect(() => {
//     initializeQuiz();
//   }, [id]);

//   useEffect(() => {
//     if (timer <= 0) {
//       handleSubmit();
//       clearInterval(timerInterval);
//     }
//   }, [timer]);

//   useEffect(() => {
//     // Check if the form has been submitted for this quiz in session storage
//     const isFormSubmitted = sessionStorage.getItem(`quizFormSubmitted_${id}`);
//     if (isFormSubmitted === 'true') {
//       setFormSubmitted(true);
//     }
//   }, []);

//   const initializeQuiz = () => {
//     setCurrentIndex(0);
//     setResponses(Array(quizData.length).fill(null));
//     setTimer(300);
//     const storedTimer = localStorage.getItem(`quizTimer_${id}`);
//     const startTime = storedTimer ? parseInt(storedTimer) : Date.now();
//     localStorage.setItem(`quizTimer_${id}`, startTime.toString());
//     startTimer(startTime);
//   };

//   const startTimer = (startTime) => {
//     const elapsed = Math.floor((Date.now() - startTime) / 1000);
//     const remaining = Math.max(0, 300 - elapsed);
//     setTimer(remaining);
//     timerInterval = setInterval(() => {
//       setTimer((prevTimer) => {
//         if (prevTimer === 0) {
//           clearInterval(timerInterval);
//           return prevTimer;
//         }
//         return prevTimer - 1;
//       });
//     }, 1000);
//   };

//   const handleOptionChange = (e) => {
//     const index = parseInt(e.target.name.split('-')[1]);
//     const optionId = parseInt(e.target.value);
//     const updatedResponses = [...responses];
//     updatedResponses[index] = optionId;
//     setResponses(updatedResponses);
//   };

//   const handleClick = () => {
//     setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
//   };

//   const handleClickAfter = () => {
//     setCurrentIndex((prevIndex) => Math.min(questions.length - 1, prevIndex + 1));
//   };

//   const handleSubmit = () => {
//     setFormSubmitted(true);
//     clearInterval(timerInterval); // Stop the timer interval
//     sessionStorage.setItem(`quizFormSubmitted_${id}`, 'true'); // Set form submitted flag in session storage
//     console.log('Form submitted with responses:', responses);
//   };

//   return (
//     <div className='quiz_container min-h-screen'>
//       <div>
//         <h1 className='title'>Quiz Name</h1>
//         <div>
//           <h3 className='timer'>Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</h3>
//         </div>
//       </div>
//       <div className='Questions'>
//         <form>
//           {currentQuestion && (
//             <div className='grid items-start gap-4'>
//               <div className='text-xl font-semibold' key={currentQuestion.id}>
//                 {currentQuestion.id}. {currentQuestion.question}
//               </div>
//               <div className='grid items-start gap-2'>
//                 {currentQuestion.options.map((option) => (
//                   <div className='flex items-center gap-2' key={option.id}>
//                     <input
//                       className='form-tick appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-blue-600 checked:border-transparent dark:border-gray-700 dark:checked:bg-blue-500'
//                       id={option.text + currentQuestion.id}
//                       name={`question-${currentIndex}`}
//                       type='radio'
//                       value={option.id}
//                       checked={responses[currentIndex] === option.id}
//                       onChange={handleOptionChange}
//                       disabled={formSubmitted}
//                     />
//                     <label className='text-sm cursor-pointer dark:text-gray-400' htmlFor={option.text}>
//                       {option.text}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </form>
//         <div className='navigation'>
//           <button className='previous' onClick={handleClick} disabled={currentIndex === 0 || formSubmitted}>
//             Previous
//           </button>
//           <button className='next' onClick={handleClickAfter} disabled={currentIndex === questions.length - 1 || formSubmitted}>
//             {currentIndex === questions.length - 1 ? 'Click Submit' : 'Next'}
//           </button>
//         </div>
//         {currentIndex === questions.length - 1 && (
//           <button className='submit' onClick={handleSubmit} disabled={formSubmitted}>
//             Submit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TakeQuiz;


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