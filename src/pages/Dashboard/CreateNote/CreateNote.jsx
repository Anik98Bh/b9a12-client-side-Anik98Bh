import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const CreateNote = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        console.log(data);
        // createUser(data?.email, data?.password)
        //     .then((result) => {
        //         const loggedUser = result.user;
        //         console.log(loggedUser);
        //         updateUserProfile(data?.name, data?.photoUrl)
        //             .then(() => {
        //                 const userInfo = {
        //                     name: data?.name,
        //                     email: data?.email
        // }
        // create user entry in the database
        // axiosPublic.post('/users', userInfo)
        //     .then(res => {
        //         if (res.data.insertedId) {
        //             console.log('user added to the database')
        //             reset()
        //             Swal.fire({
        //                 position: "top-end",
        //                 icon: "success",
        //                 title: "user created successfully",
        //                 showConfirmButton: false,
        //                 timer: 1500
        //             });
        //             navigate('/')
        //         }
        //     })

        //         })
        //         .catch((error) => {
        //             console.log(error)
        //         });
        // })
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-center">Create Note</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input type="text" {...register("title", { required: true })} name="title" placeholder="title" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea type="text" {...register("description", { required: true })} name="description" placeholder="description" className="textarea textarea-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email", { required: true })} name="email" placeholder="email" defaultValue={user?.email} className="input input-bordered" readOnly />
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-primary" type="submit" value="Create Note" />
                </div>
            </form>
        </div>
    );
};

export default CreateNote;