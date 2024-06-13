import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosCommon from "../../../hooks/useAxiosCommon";

const CreateStudy = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const axiosCommon=useAxiosCommon();

    const onSubmit = async(data) => {
        console.log(data);
        try {
            const response = await axiosCommon.post('/create-session', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            reset();
        } catch (error) {
            console.error("There was an error creating the note!", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="flex gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Session Title</span>
                        </label>
                        <input type="text" {...register("sessionTitle", { required: true })} name="sessionTitle" placeholder="Session Title" className="input input-bordered" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Session Description</span>
                        </label>
                        <textarea type="text" {...register("sessionDescription", { required: true })} name="sessionDescription" placeholder="Session description" className="textarea textarea-bordered" />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Registration Start Date</span>
                        </label>
                        <input type="date" {...register("registrationStartDate", { required: true })} name="registrationStartDate" placeholder="" className="input input-bordered" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Registration End Date </span>
                        </label>
                        <input type="date" {...register("registrationEndDate", { required: true })} name="registrationEndDate" placeholder="" className="input input-bordered" />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Class Start Date</span>
                        </label>
                        <input type="date" {...register("classStartDate", { required: true })} name="classStartDate" placeholder="" className="input input-bordered" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Class End Date </span>
                        </label>
                        <input type="date" {...register("classEndDate", { required: true })} name="classEndDate" placeholder="" className="input input-bordered" />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Session Duration</span>
                        </label>
                        <input type="text" {...register("sessionDuration", { required: true })} name="sessionDuration" placeholder="session Duration" className="input input-bordered" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Registration Fee</span>
                        </label>
                        <input type="number" {...register("registrationFee", { required: true })} name="registrationFee" placeholder="registration Fee" className="input input-bordered" defaultValue={'0'} readOnly />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Status</span>
                        </label>
                        <input type="text" {...register("status", { required: true })} name="status" placeholder="status" className="input input-bordered" value={'pending'} />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Tutor Name</span>
                        </label>
                        <input type="text" {...register("tutorName", { required: true })} name="tutorName" placeholder="name" className="input input-bordered" defaultValue={user?.displayName} />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("tutorEmail", { required: true })} name="tutorEmail" placeholder="email" className="input input-bordered" defaultValue={user?.email} readOnly />
                    </div>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-primary" type="submit" value="Create Study" />
                </div>
            </form>
        </div>
    );
};

export default CreateStudy;