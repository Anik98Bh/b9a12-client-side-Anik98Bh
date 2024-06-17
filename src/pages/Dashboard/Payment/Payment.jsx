import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

//TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-center my-8">Payment Here</h1>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;