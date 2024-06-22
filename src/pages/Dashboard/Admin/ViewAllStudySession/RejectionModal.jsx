import { useForm } from "react-hook-form";
import useAxiosCommon from "../../../../hooks/useAxiosCommon";
import Swal from "sweetalert2";

const RejectionModal = ({id}) => {
    const { register, handleSubmit, reset } = useForm();
    const axiosCommon=useAxiosCommon()

    const onSubmit = async (data) => {
        console.log(data);
        const feedbackData={
            ...data,
            session_id: id
        }
        try {
            const response = await axiosCommon.post(`/create-feedback`, feedbackData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            if (response?.data?.insertedId) {
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'Materials added Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            reset();
        } catch (error) {
            console.error("There was an error creating the note!", error);
        }
    };
    return (
        <div className="modal-box">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Rejection Feedback!</h3>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                    <div className="">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Rejection Reason</span>
                            </label>
                            <input type="text" {...register("rejection_reason",)} name="rejection_reason" placeholder="rejection reason" className="input input-bordered" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Feedback</span>
                            </label>
                            <input type="text" {...register("feedback",)} name="feedback" placeholder="feedback" className="input input-bordered" />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Update Session" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RejectionModal;