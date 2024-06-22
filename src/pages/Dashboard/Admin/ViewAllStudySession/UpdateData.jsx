import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";

const UpdateData = ({updateSession}) => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            title: updateSession?.title,
            description: updateSession?.description,
            registration_start_date: updateSession?.registration_start_date,
            registration_end_date: updateSession?.registration_end_date,
            class_start_date: updateSession?.class_start_date,
            class_end_date: updateSession?.class_end_date,
            duration: updateSession?.duration,
            fee: updateSession?.fee,
            status: updateSession?.status,
        }
    });

    const onSubmit = async (data) => {
        // try {
        //     const response = await axiosCommon.patch(`/update-session/${updateId}`, data, {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     refetch()
        //     reset();
        // } catch (error) {
        //     console.error("There was an error creating the note!", error);
        // }
    };
    return (
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Update!</h3>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="flex flex-wrap gap-5">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Session Title</span>
                                </label>
                                <input type="text" {...register("title")} name="title" placeholder="Session Title" className="input input-bordered" defaultValue={updateSession?.title} />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Session Description</span>
                                </label>
                                <textarea type="text" {...register("description")} name="description" placeholder="Session description" className="textarea textarea-bordered" defaultValue={updateSession?.description} />
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Registration Start Date</span>
                                </label>
                                <input type="date" {...register("registration_start_date")} name="registration_start_date" placeholder="" className="input input-bordered" defaultValue={updateSession?.registration_start_date} />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Registration End Date </span>
                                </label>
                                <input type="date" {...register("registration_end_date")} name="registration_end_date" placeholder="" className="input input-bordered" defaultValue={updateSession?.registration_end_date} />
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Class Start Date</span>
                                </label>
                                <input type="date" {...register("class_start_date")} name="class_start_date" placeholder="" className="input input-bordered" defaultValue={updateSession?.class_start_date} />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Class End Date </span>
                                </label>
                                <input type="date" {...register("class_end_date")} name="class_end_date" placeholder="" className="input input-bordered" defaultValue={updateSession?.class_end_date} />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-5">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Session Duration</span>
                                </label>
                                <input type="number" {...register("duration")} name="duration" placeholder="session Duration" className="input input-bordered" defaultValue={updateSession?.duration} />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Registration Fee</span>
                                </label>
                                <input type="number" {...register("fee")} name="fee" placeholder="registration Fee" className="input input-bordered" defaultValue={updateSession?.fee} />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Status</span>
                                </label>
                                <input type="text" {...register("status")} name="status" placeholder="status" className="input input-bordered" value={updateSession?.status} />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-5">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Tutor Name</span>
                                </label>
                                <input type="text" {...register("tutorName")} name="tutorName" placeholder="name" className="input input-bordered" defaultValue={user?.displayName} />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("tutorEmail")} name="tutorEmail" placeholder="email" className="input input-bordered" defaultValue={user?.email} readOnly />
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

export default UpdateData;