import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CreateNote = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        console.log(data)
        const noteItem={
            ...data
        }
        const res = await axiosSecure.post('/create-note', noteItem);
        console.log(res.data)
        if (res.data.insertedId) {
            // show success popup
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Note created Successfully',
                showConfirmButton: false,
                timer: 1500
            });
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