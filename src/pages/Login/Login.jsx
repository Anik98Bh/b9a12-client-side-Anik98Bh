import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import pic from '../../assets/login/login.svg'
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    // const { signIn } = useContext(AuthContext);
    // const navigate = useNavigate();
    const location = useLocation();

    // const from = location?.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state)

    useEffect(() => {
        // loadCaptchaEnginge(6);
    }, [])

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        // signIn(email, password)
        // .then((result) => {
        //     const user = result.user;
        //     console.log(user)
        //     Swal.fire({
        //         title: "User Login Successfully",
        //         showClass: {
        //             popup: `
        //             animate__animated
        //             animate__fadeInUp
        //             animate__faster
        //           `
        //         },
        //         hideClass: {
        //             popup: `
        //             animate__animated
        //             animate__fadeOutDown
        //             animate__faster
        //           `
        //         }
        //     });
        //     navigate(from, { replace: true });
        // })
        //   .catch((error) => {
        //   });
    }

    const handleValidateCaptcha = (e) => {
        // const user_captcha_value = e.target.value;
        // if (validateCaptcha(user_captcha_value)) {
        //     setDisabled(false)
        // }
        // else {
        //     setDisabled(true)
        // }
    }

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Login </title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-1/2 mr-12">
                        <img src={pic} alt="" />
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    {/* <LoadCanvasTemplate /> */}
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the text above" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                {/* TODO: apply disabled for re captcha */}
                                <input disabled={false} className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className="text-center mt-2">New to here? Please <Link className="text-blue-600 font-bold" to="/register">Register</Link></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;