import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.postimg.cc/Y0JrZC1B/istockphoto-1207750534-2048x2048.jpg)' }}>
            <Link to="/" className="btn btn-warning mb-96 -mt-40">Go Back to Home</Link>
        </div>
    );
};

export default ErrorPage;