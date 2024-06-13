import { Link, useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import Swal from "sweetalert2";

const Details = () => {
    const study = useLoaderData();
    const { sessionTitle, tutorName, tutorEmail, sessionDescription, registrationStartDate, registrationEndDate, classStartDate, classEndDate, sessionDuration, registrationFee, status, _id } = study;
    const axiosCommon = useAxiosCommon();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        console.log(data)
        const reviewData = {
            ...data,
            _id
        }
        const res = await axiosCommon.post('/create-review', reviewData)
            .then(res => {
                if (res.data?.insertedId) {
                    console.log('Review added to the database')
                    reset()
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


    return (
        <div>
            <div className=" w-full bg-base-100 shadow-xl">
                <div className="px-3 py-5">
                    <h2 className="text-3xl font-bold">{sessionTitle}</h2>
                    <div className="flex justify-between my-4">
                        <p>Tutor Name: {tutorName}</p>
                        <p>Tutor Email: {tutorEmail}</p>
                    </div>
                    <p> Description: {sessionDescription}</p>
                    <div className="flex justify-between my-4">
                        <p>Registration Start Date: {registrationStartDate}</p>
                        <p>Registration End Date: {registrationEndDate}</p>
                    </div>
                    <div className="flex justify-between my-4">
                        <p>Class Start Date: {classStartDate}</p>
                        <p>Class End Date: {classEndDate}</p>
                    </div>
                    <div className="flex justify-between my-4">
                        <p>Registration Fee: {registrationFee}</p>
                        <p> Duration: {sessionDuration}</p>
                        <p>Status: {status}</p>
                    </div>
                    <div className="card-actions justify-between">
                        <button className="btn btn-primary btn-outline" onClick={() => document.getElementById('my_modal_5').showModal()}>Review
                        </button>
                        <Link to="/dashboard/payment">
                            <button className="btn btn-primary">Book Now</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
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
        </div>
    );
};

export default Details;