import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaRegStar } from "react-icons/fa";
import useAdmin from "../../hooks/useAdmin";
import useTutor from "../../hooks/useTutor";
import { useEffect, useRef, useState } from "react";

const Details = () => {
    const { user } = useAuth()
    const modalRef = useRef();
    const study = useLoaderData();
    const { title, tutorName, tutorEmail, description, registration_start_date, registration_end_date, class_start_date, class_end_date, duration, fee, status, _id } = study;
    console.log('details study', study);
    const axiosCommon = useAxiosCommon();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const [isAdmin] = useAdmin();
    const [isTutor] = useTutor();
    const [isRegistrationClosed, setIsRegistrationClosed] = useState(false);

    useEffect(() => {
        const checkRegistrationStatus = () => {
            const currentDate = new Date();
            const endDate = new Date(registration_end_date);
            if (currentDate > endDate) {
                setIsRegistrationClosed(true);
            } else {
                setIsRegistrationClosed(false);
            }
        };

        checkRegistrationStatus();

        const intervalId = setInterval(checkRegistrationStatus, 1000 * 60);

        return () => clearInterval(intervalId);
    }, [registration_end_date]);

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${_id}`)
            console.log(res.data)
            return res.data;
        }
    })

    const onSubmit = async (data) => {
        const reviewData = {
            ...data,
            name: user.displayName,
            id: _id,
        }
        console.log(reviewData);
        const res = await axiosCommon.post('/create-review', reviewData)
            .then(res => {
                if (res.data?.insertedId) {
                    refetch()
                    reset()
                    modalRef.current.close();
                    document.getElementById('my_modal_5').showModal(false)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "user created successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        return res?.data;
    }
    console.log(user)
    const handleBooked = async (fee) => {
        console.log(typeof fee)
        const { _id, ...restStudy } = study;

        const bookData = {
            ...restStudy,
            session_id: _id,
            studentEmail: user?.email
        };

        if (fee !== '0') {
            navigate('/dashboard/payment')
        } else {
            try {
                const response = await axiosCommon.post('/book-session', bookData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                if (response?.data?.insertedId) {
                    // show success popup
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'Your Session Booked Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                reset();
            } catch (error) {
                console.error("There was an error creating the note!", error);
            }
        }
    }

    return (
        <div>
            <div className=" w-full bg-base-100">
                <div className="px-3 py-5">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <div className="md:flex justify-between my-4">
                        <p>Tutor Name: {tutorName}</p>
                        <p>Tutor Email: {tutorEmail}</p>
                    </div>
                    <p> Description: {description}</p>
                    <div className="flex justify-between my-4">
                        <p>Registration Start Date: {registration_start_date}</p>
                        <p>Registration End Date: {registration_end_date}</p>
                    </div>
                    <div className="flex justify-between my-4">
                        <p>Class Start Date: {class_start_date}</p>
                        <p>Class End Date: {class_end_date}</p>
                    </div>
                    <div className="flex justify-between my-4">
                        <p>Registration Fee: {fee}</p>
                        <p> Duration: {duration}</p>
                        <p>Status: {status}</p>
                    </div>
                    <div className="card-actions justify-between">
                        <button className="btn btn-primary btn-outline" onClick={() => document.getElementById('my_modal_5').showModal()}>Review
                        </button>
                        <button onClick={() => handleBooked(fee)}
                            disabled={isAdmin || isTutor ||isRegistrationClosed}
                            className="btn btn-primary">Book Now</button>

                    </div>
                </div>
            </div>
            {/* modal */}
            <div>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" ref={modalRef}>
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Submit your Review!</h3>
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Review</span>
                                    </label>
                                    <input type="text" {...register("review", { required: true })} placeholder="review" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Rating: Out of 5</span>
                                    </label>
                                    <input type="number" {...register("rating", {
                                        required: true
                                    })} placeholder="rating" min={0} max={5} className="input input-bordered" />
                                </div>
                                <div className="form-control mt-6 ">
                                    <input className="btn btn-primary" type="submit" value="Submit Review" />
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
            {/* get review */}
            <div>
                {reviews.length > 0 ? <>
                    <h1 className=" text-3xl font-bold text-center my-16">Reviews</h1>
                </> : ' '}
                <div className="grid md:grid-cols-2 place-items-center">
                    {
                        reviews?.map(review => <div key={review._id}>
                            <div className="card w-96 bg-base-100 shadow-xl mt-10">
                                <div className="p-5">
                                    <div className="flex justify-between">
                                        <h2 className="card-title">{review?.name ? review?.name : 'anonymous'}</h2>
                                        <p className="flex gap-2"><b>Rating:</b> {review.rating} <FaRegStar></FaRegStar> </p>
                                    </div>
                                    <hr className="my-3" />
                                    <p><b>Review: </b>{review.review}</p>
                                </div>
                            </div>
                        </div>)
                    }
                </div>

            </div>
        </div>
    );
};

export default Details;