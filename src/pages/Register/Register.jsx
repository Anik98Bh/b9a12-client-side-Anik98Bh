import { Helmet } from "react-helmet-async";
import pic from '../../assets/login/login.svg'
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import Swal from "sweetalert2";


const Register = () => {
    const { createUser, updateUserProfile } = useAuth();
    const { register, handleSubmit,reset, formState: { errors }, } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const axiosCommon = useAxiosCommon();
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data);
        createUser(data?.email, data?.password)
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data?.name, data?.photoUrl)
                    .then(() => {
                        const userInfo = {
                            ...loggedUser,
                            role: data?.role
                        }
                        // create user entry in the database
                        axiosCommon.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    reset()
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "user created successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/')
                                }
                            })

                    })
                    .catch((error) => {
                        console.log(error)
                    });
            })
    };

    return (
        <>
            <Helmet>
                <title>StudyBuddyHub | Sign Up </title>
            </Helmet>
            <div className='bg-base-200 mt-2 p-2'>
                <h1 className="text-5xl font-bold text-center">Register now!</h1>
            </div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-1/2 mr-12">
                        <img src={pic} alt="" />
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="file" {...register("photoUrl", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoUrl && <span className="text-red-600">Photo URL is required</span>}
                            </div> */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Role</span>
                                </label>
                                <select defaultValue="default" {...register("role", { required: true })}
                                    className="select select-bordered ">
                                    <option disabled value="default">Select a Role</option>
                                    <option value="student">Student</option>
                                    <option value="tutor">Tutor</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showPassword ? "text" : "password"} {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,})/
                                })} name="password" placeholder="password" className="input input-bordered" />
                                <span className="absolute top-12 left-3/4 ml-11 text-xl" onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </span>
                                {errors.password?.type === "required" && (
                                    <p className="text-red-600">Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-600">Password must be 6 Characters</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className="text-red-600">Password must be 20 Characters</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className="text-red-600">Password must have one uppercase, one lowercase, one number and one special characters</p>
                                )}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Register" />
                            </div>
                        </form>
                        <p className="text-center mt-2 pb-2">Already Have an Account ? Please <Link className="text-blue-600 font-bold" to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;