// import React from 'react'
import './Pricing.scss'
import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import Faqcompo from '../../components/faq/faq.jsx'
import faqdata from "../../assets/data/faqs.js";
// import Faqcompo from '../../components/faq/faq.jsx'

function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}
const verifyPayment = async (response) => {
    const res = await fetch('http://localhost:4000/payments/verifyPayment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
        }),
    }).then(res => res.json());
    console.log(res);
}
const Pricing = ({ plansdata }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    const [amount, setAmount] = useState(0);
    const handlePayment = async () => {
        try {
            const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

            if (!res) {
                toast.error("RazorPay SDK failed to load");
                return;
            }
            // Fetch order details from your backend
            const order = await fetch('http://localhost:4000/payments/capturePayment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',

                body: JSON.stringify({ cost: amount })
            }).then(res => res.json());
            console.log(order);

            const options = {
                key: "rzp_test_L2xGUPd25MH4Rj",
                amount: order.amount,
                currency: order.currency,
                name: 'Your Company Name',
                order_id: order.id,
                handler: (response) => {
                    //add user Id in response and then send it to backend


                    console.log('Payment Successful:', response);

                    verifyPayment(response);
                },
                prefill: {
                    name: 'Customer Name',
                    email: 'customer@example.com',
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
            paymentObject.on("payment.failed", function (response) {
                toast.error("oops, payment failed");
                console.log(response.error);
            });
        }
        catch (error) {
            console.error('Payment Error:', error);
        }
    };
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
                                    <button onClick={handlePayment}>{plan.buttontext}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='faqs'>
                    <div className='faqs-heading'>Frequently Asked Questions</div>
                    {faqdata.map((f, index) => (
                        <Faqcompo key={f.id} f={f} isOpen={openIndex == index} onClick={() => handleToggle(index)} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Pricing