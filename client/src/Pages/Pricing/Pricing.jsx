// import React from 'react'
import './Pricing.scss'
import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import Faqcompo from '../../components/faq/faq.jsx'
import faqdata from "../../assets/data/faqs.js";
// import Faqcompo from '../../components/faq/faq.jsx'
const Pricing = ({ plansdata }) => {
    const [checked, setChecked] = useState(true);
    const filteredPlans = plansdata.filter(plan =>
        checked ? plan.type === 'Monthly' : plan.type === 'Yearly'
    );
    return (
        <>
            <div>
                <div className='pricing'>
                    <div className='pricingdetail'>
                        <span className='pricingdetailmainheading'><p>Find The Plan That Suits Your Needs</p></span>
                        <span className='pricingdeatailheading'><p>We offer a variety of plans to fit your learning needs and budget. All plans include access to our vast quiz library, instant results, and global leaderboards.</p></span>
                    </div>
                    <div className='pricingpagebuttons'>
                        <div className='pricingbuttonbutton'>
                            <p className={!checked ? 'active' : 'notactive'}>Yearly</p>
                            <div className="app-container">
                                <div className="switch-container">
                                    <input
                                        checked={checked}
                                        onChange={() => setChecked(!checked)}
                                        className="switch-checkbox"
                                        id="switch"
                                        type="checkbox"
                                    />
                                    <label
                                        style={{ background: checked ? '#0F9F99' : '#0F9F99' }}
                                        className="switch-label"
                                        htmlFor="switch"
                                    >
                                        <span className="switch-button" />
                                    </label>
                                </div>
                            </div>
                            <p className={checked ? 'active' : 'notactive'}>Monthly</p>
                        </div>
                        <div className='pricingbuttonheading'>
                            <p>Save 25% on Yearly</p>
                        </div>
                    </div>
                </div>
                <div className='pricingboxfull'>
                    <div className='pricingbox'>
                        {filteredPlans.map((plan, index) => (
                            <div className='pricingboxbasic' key={index}>
                                <div className='pricingcontent'>
                                    <div className='pricingboxbasicname'>{plan.name}</div>
                                    <div className='pricingboxbasicprice'>
                                        <div className='price'>{plan.price}</div>
                                    </div>
                                </div>

                                <div className='pricingboxpoints'>
                                    <ul>
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                                <span className='pricingline'></span>
                                <div className='pricingboxbutton'>
                                    <button>{plan.buttontext}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='faqs'>
                    <div className='faqs-heading'>Frequently Asked Questions</div>
                    {faqdata.map((f) => (
                        <Faqcompo key={f.id} f={f} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Pricing