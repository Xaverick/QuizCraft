import React from 'react'
import photo from '../../assets/homepageimages/homepagephoto.png'
import lightning from '../../assets/homepageimages/Lightning.png'
import Softstar from '../../assets/homepageimages/Softstar.png'
import photolive from '../../assets/homepageimages/photolive.png'
import { useState } from 'react';
import questions from '../../assets/data/questions.js'
import ContestData from '../../components/contestdata/ContestData.jsx'
import Contest from '../../assets/data/Contestdata.js'
import './Home.scss'
const Question = ({ questionData }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="question">
            <div className="question-header" onClick={handleToggle}>
                <img src={questionData.image} alt="Question Icon" className="question-icon" />
                <p>{questionData.question}</p>
                <img src={isOpen ? questionData.uimag1 : questionData.dimag2} alt="Toggle Icon" className="toggle-icon" />
            </div>
            {isOpen && (
                <div className="question-answer">
                    <p>{questionData.answer}</p>
                </div>
            )}
        </div>
    );
};
// const ContestData = ({ contest }) => {
//     return (
//         <>
//             <div className='contest'>
//                 <div className='contestdatabox'>
//                     <div className='contestdataimage'>
//                         <img src={contest.image} />
//                     </div>
//                     <div className='contestdatacontent'>
//                         <h3>{contest.content1}</h3>
//                         <p>{contest.content2}</p>
//                     </div>
//                     <div className='contestdatatime'>
//                         <h3>{contest.content3}</h3>
//                         <p>{contest.Date}</p>
//                     </div>
//                     <div className='contestdatabutton'>
//                         <button>{contest.button}</button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// };
const Home = () => {
    return (
        <>
            <div className='home'>
                <div className='homecontent'>
                    <div className='homephase1'>
                        <div className='homephase1left'>
                            <div className='homephase1left1'>
                                <p>Compete with Quizzers from All over the World</p>
                                <span><img src={lightning}></img></span>
                            </div>
                            <h2>Dive into a world of quizzes! From brain-teasing trivia to in-depth skill tests, we have something for everyone. Boost your knowledge with a bit of educational fun.</h2>
                            <div className='homebutton'>
                                <button>Explore Now</button>
                            </div>
                            <div className='homephase1left2'>
                                <img src={Softstar}></img>
                            </div>
                        </div>
                        <div className='homephase2left'>
                            <img src={photo} alt=''></img>
                        </div>
                        <div className='photobackground'>
                        </div>
                    </div>
                    <div className='homephase3'>
                        <div className='homephase3content'>
                            <div className='homephase3contentheading'>
                                <p>Our Community Partners</p>
                            </div>
                            <div className='home-phase3'>
                                <div className="slider">
                                    <div className="slide-track">
                                        {/* Place your images here */}
                                        <div className="slide">
                                            <img src={lightning} height="100" width="250" alt="" />
                                        </div>
                                        <div className="slide">
                                            <img src={Softstar} height="100" width="250" alt="" />
                                        </div>
                                        <div className="slide">
                                            <img src={lightning} height="100" width="250" alt="" />
                                        </div>
                                        <div className="slide">
                                            <img src={Softstar} height="100" width="250" alt="" />
                                        </div>
                                        <div className="slide">
                                            <img src={lightning} height="100" width="250" alt="" />
                                        </div>
                                        {/* Repeat the images to create infinite loop */}
                                        <div className="slide">
                                            <img src={lightning} height="100" width="250" alt="" />
                                        </div>
                                        <div className="slide">
                                            <img src={Softstar} height="100" width="250" alt="" />
                                        </div>
                                        <div className="slide">
                                            <img src={lightning} height="100" width="250" alt="" />
                                        </div>
                                        <div className="slide">
                                            <img src={Softstar} height="100" width="250" alt="" />
                                        </div>
                                        <div className="slide">
                                            <img src={lightning} height="100" width="250" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='homephase4'>
                                <div className='homephase4heading'>
                                    <p>Why Choose Us</p>
                                </div>
                                <div className='homephase4content'>
                                    <div className='homephase4contentquestions'>
                                        {questions.map((question) => (
                                            <Question key={question.id} questionData={question} />
                                        ))}
                                    </div>
                                    <div className='homephase4contentimg'>
                                        <img src={photolive} alt=''></img>
                                    </div>
                                </div>
                                <div className='homephase5'>
                                    <div className='homephase5heading'>
                                        <p>Upcoming Contest</p>
                                    </div>
                                    <div className='homephase5heading2'>
                                        <button>View All</button>
                                    </div>
                                    <div className='contestdatadetails' >
                                        {Contest.map((C) => (
                                            <ContestData key={C.id} contest={C} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home