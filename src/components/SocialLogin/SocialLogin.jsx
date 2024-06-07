import { FaGithub, FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const { googleSignIn, githubLogin } = useAuth();
    // const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location?.state?.from?.pathname || "/";

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }

                navigate(from, { replace: true });
                // axiosPublic.post('/users', userInfo)
                //     .then(res => {
                //         console.log(res.data)
                //         navigate('/')
                //     })
            })
    }

    const handleGithubLogin = () => {
        githubLogin()
            .then(result => {
                console.log(result.user)
                navigate(location?.state ? location.state : "/")
                if (result.user) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Login has been successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div className="px-8">
            <div className="mt-2">
                <p className=" text-xl font-bold text-center">--------------- OR ---------------</p>
                <div className="mt-4 text-center mb-2">
                    <button onClick={handleGoogleLogin} className="btn btn-secondary text-white"><FaGoogle className="text-xl"></FaGoogle> Continue with Google</button>
                    <button onClick={handleGithubLogin} className="btn btn-primary text-white mt-2"><FaGithub className="text-2xl"></FaGithub> Continue with Github</button>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;