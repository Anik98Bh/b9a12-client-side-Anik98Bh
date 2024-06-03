import { FaGithub, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    // const { googleSignIn } = useAuth();
    // const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        navigate('/')
                    })
            })
    }

    const handleGithubLogin=()=>{}

    return (
        <div className="p-8">

            <div className="mt-2">
                <p className=" text-xl font-bold text-center">--------------- OR ---------------</p>
                <div className="mt-4 text-center">
                    <button onClick={handleGoogleLogin} className="btn btn-secondary text-white"><FaGoogle className="text-xl"></FaGoogle> Continue with Google</button>
                    <button onClick={handleGithubLogin} className="btn btn-primary text-white mt-2"><FaGithub className="text-2xl"></FaGithub> Continue with Github</button>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;