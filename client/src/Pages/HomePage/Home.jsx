import React from 'react'
import photo from '../../assets/homepageimages/homepagephoto.png'
import lightning from '../../assets/homepageimages/Lightning.png'
import Softstar from '../../assets/homepageimages/Softstar.png'
import photolive from '../../assets/homepageimages/photolive.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import questions from '../../assets/data/questions.js'
import ContestData from '../../components/contestdata/ContestData.jsx'
import Contest from '../../assets/data/Contestdata.js'
import './Home.scss'
import sample from '../../assets/homepageimages/sample.png';
import Comment from '../../components/comment/Comment.jsx';
import commentdata from '../../assets/data/commentdata.js';
import Faqcompo from '../../components/faq/faq.jsx'
import faqdata from "../../assets/data/faqs.js";


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

const Home = () => {
    const navigate = useNavigate();

    // Only show the first 3 contests initially
    const initialContests = Contest.slice(0, 3);

    const handleViewAllClick = () => {
        navigate('/contest');
    };

    const midIndex = Math.ceil(commentdata.length / 2);
    const leftComments = commentdata.slice(0, midIndex);
    const rightComments = commentdata.slice(midIndex);
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
                                <button onClick={handleViewAllClick}>View All</button>
                            </div>
                            <div className='contestdatadetails' >
                                {initialContests.map((contest) => (
                                    <ContestData key={contest.id} contest={contest} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='homephase6'>
                        <div className='homephase6content'>
                            <div className='homephase6content1'>
                                <p>Instant Results & Global Ranking</p>
                            </div>
                            <div className='homephase6content2' >
                                <p>See your results instantly and compare your knowledge with learners worldwide. You can also filter leaderboards to see how you rank within your region.</p>
                            </div>
                            <div className='homephase6content3'>
                                <div className='homephasecont3image'>
                                    <img src={sample} alt='' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='homephase7'>
                        <div className='homephase7content'>
                            <div className='homephase7heading'>
                                <p>What our Students say About us</p>
                            </div>
                        </div>
                        <div className='homephase7comments'>

                            <div className="comment-slider first-row">
                                {commentdata.concat(commentdata).map((c, index) => (
                                    <Comment key={index} ca={c} />
                                ))}
                            </div>
                            <div className="comment-slider second-row">
                                {commentdata.concat(commentdata).map((c, index) => (
                                    <Comment key={index} ca={c} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='homephase8faq'>
                        <div className='homephase8faqcontent'>
                            <div className='homephase8faqheading'>
                                <p>Frequently Asked Questions</p>
                            </div>
                            <div className='faqs'>
                                {faqdata.map((f) => (
                                    <Faqcompo key={f.id} f={f} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home