// import Razorpay from "razorpay";
import { toast } from "react-toastify";

function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

export async function buyCourse(token, userDetails) {
    // const toastId = toast.loading("Loading...");
    try{
        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        //initiate the order
        const orderResponse = fetch(`http://localhost:4000/payments/capturePayment`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            },
            credentials: 'include',
            
        });

        if(orderResponse.ok) {
            throw new Error(orderResponse.message);
        }
        console.log("PRINTING orderResponse", orderResponse);
        //options
        
        // const options = {
        //     key: 'rzp_test_L2xGUPd25MH4Rj',
        //     currency: `${orderResponse.data.data.currency}`,
        //     amount: `${orderResponse.data.data.amount}`,
        //     order_id:orderResponse.data.id,
        //     name:"QuizCraft",
        //     description: "Thank You for Purchasing ",
        //     image:rzpLogo,
        //     prefill: {
        //         name:`${userDetails.firstName}`,
        //         email:userDetails.email
        //     },
        //     handler: function(response) {
        //         //send successful wala mail
        //         // sendPaymentSuccessEmail(response, orderResponse.data.message.amount,token );
        //         //verifyPayment
        //         // verifyPayment({...response, courses}, token, navigate, dispatch);
        //     }
        // }
       
        // const paymentObject = new window.Razorpay(options);
        // paymentObject.open();
        // paymentObject.on("payment.failed", function(response) {
        //     toast.error("oops, payment failed");
        //     console.log(response.error);
        // })

    }
    catch(error) {
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make Payment");
    }
  
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response  = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success("payment Successful, ypou are addded to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}