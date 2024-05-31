import React, { useState } from 'react';
import './faq.scss';

const Faqcompo = ({ f }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={`faq ${isOpen ? 'open' : ''}`}>
                {/* <div className='faqnumber'>
                    <p>{f.id + 1}</p>
                </div> */}
                <div className='faqquestionanswer'>
                    <div className='faqquestion'>
                        {/* <p>{f.id + 1}</p> */}
                        <p>{f.question}</p>
                    </div>
                    <div className='faqanswer'>
                        <p>{f.answer}</p>
                    </div>
                </div>
                <div className='faqopenclose'>
                    <button><img src={isOpen ? f.close : f.open} alt='' onClick={handleToggle} /></button>
                </div>
            </div>
        </>
    );
};

export default Faqcompo;
