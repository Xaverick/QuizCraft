// import React, { useState } from 'react';
import './faq.scss';

const Faqcompo = ({ f, isOpen, onClick }) => {


    return (
        <>
            <div className={`faq ${isOpen ? 'open' : ''}`} onClick={onClick}>
                {/* <div className='faqnumber'>
                    <p>{f.id + 1}</p>
                </div> */}
                <div className='faqquestionanswer'>
                    <div className='faqquestion'>
                        {/* <p>{f.id + 1}</p> */}
                        <p>{f.question}</p>
                        <button ><img src={isOpen ? f.close : f.open} alt='' /></button>

                    </div>
                    <div className='faqanswer'>
                        <p>{f.answer}</p>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Faqcompo;
