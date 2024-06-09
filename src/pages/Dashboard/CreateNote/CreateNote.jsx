import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const CreateNote = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('', data, {
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
            <h1 className="text-4xl font-bold text-center">Create Note</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input type="text" {...register("title", { required: true })} placeholder="title" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea {...register("description", { required: true })} placeholder="description" className="textarea textarea-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email", { required: true })} placeholder="email" defaultValue={user?.email} className="input input-bordered" readOnly />
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-primary" type="submit" value="Create Note" />
                </div>
            </form>
        </div>
    );
};

export default CreateNote;