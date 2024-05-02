import React, { useState } from 'react';
// Make sure you have installed this package

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
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    }),
  }).then(res => res.json());
  console.log(res);
}

const App = () => {
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
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',

        body: JSON.stringify({ cost: amount}) 
      }).then(res => res.json());
      console.log(order);

      const options = {
        key: "rzp_test_L2xGUPd25MH4Rj",
        amount: order.amount,
        currency: order.currency,
        name: 'Your Company Name',
        order_id: order.id,
        handler: (response) => {
          console.log('Payment Successful:', response);
          // Handle successful payment (e.g., update order status)
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
        },
      };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      paymentObject.on("payment.failed", function(response) {
          toast.error("oops, payment failed");
          console.log(response.error);
      });

     
      
      

     
          

      }
     catch (error) {
      console.error('Payment Error:', error);
    }
  };

  return (
    <div className="premium-features-container p-6 bg-gray-100 rounded-lg shadow-md max-w-sm mx-auto mt-6">
    <h2 className="text-xl font-bold mb-4">Unlock Premium Analytics</h2>
  
    <div className="feature-item mb-6">
      <div className="feature-title text-lg font-semibold mb-2">In-Depth Performance Reports</div>
      <div className="feature-description text-gray-700">
        Understand how users interact with your quizzes, identify knowledge gaps, and improve question effectiveness.
      </div>
    </div>
  
    <div className="feature-item mb-6">
      <div className="feature-title text-lg font-semibold mb-2">Customizable Dashboards</div>
      <div className="feature-description text-gray-700">
        Track key metrics, visualize trends, and get tailored insights to optimize your quiz content.
      </div>
    </div>
  
    <div className="feature-item mb-6">
      <div className="feature-title text-lg font-semibold mb-2">Cohort Analysis</div>
      <div className="feature-description text-gray-700">
        Compare the performance of different user groups to better target your quizzes and learning materials.
      </div>
    </div>
  
    <input 
      className="w-full p-3 border border-gray-300 rounded-md mb-3"
      value={amount} 
      onChange={(e) => setAmount(e.target.value)} 
    />
    <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md"
      onClick={handlePayment}
    >
      Upgrade Now
    </button>
  </div>
  
  
  );
};

export default App;
