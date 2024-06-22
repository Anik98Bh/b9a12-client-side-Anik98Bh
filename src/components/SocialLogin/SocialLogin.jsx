import { FaGithub, FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const SocialLogin = () => {
    const { googleSignIn, githubLogin } = useAuth();
    const axiosCommon = useAxiosCommon();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location?.state?.from?.pathname || "/";

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const loggedUser = result.user;
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "user Login successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                const userInfo = {
                    ...loggedUser
                }

                navigate(from, { replace: true });
                axiosCommon.post('/users', userInfo)
                    .then(res => {
                        navigate('/')
                    })
            })
    }

    const handleGithubLogin = () => {
        githubLogin()
            .then(result => {
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