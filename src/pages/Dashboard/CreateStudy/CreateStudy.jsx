import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const CreateStudy = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();

    // const { , _id, tutorName, tutorEmail,, , , , ,, ,  } = study;

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
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="flex gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Session Title</span>
                        </label>
                        <input type="text" {...register("title", { required: true })} name="title" placeholder="Session Title" className="input input-bordered" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Session Description</span>
                        </label>
                        <textarea type="text" {...register("description", { required: true })} name="description" placeholder="Session description" className="textarea textarea-bordered" />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Registration Start Date</span>
                        </label>
                        <input type="date" {...register("date", { required: true })} name="date" placeholder="" className="input input-bordered" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Registration End Date </span>
                        </label>
                        <input type="date" {...register("date", { required: true })} name="date" placeholder="" className="input input-bordered" />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Class Start Date</span>
                        </label>
                        <input type="date" {...register("date", { required: true })} name="date" placeholder="" className="input input-bordered" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Class End Date </span>
                        </label>
                        <input type="date" {...register("date", { required: true })} name="date" placeholder="" className="input input-bordered" />
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Session Duration</span>
                        </label>
                        <input type="text" {...register("duration", { required: true })} name="duration" placeholder="session Duration" className="input input-bordered" />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Registration Fee</span>
                        </label>
                        <input type="number" {...register("fee", { required: true })} name="fee" placeholder="registration Fee" className="input input-bordered" defaultValue={'0'} readOnly />
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
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" defaultValue={user?.displayName} />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" defaultValue={user?.email} readOnly />
                    </div>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-primary" type="submit" value="Register" />
                </div>
            </form>
        </div>
    );
};

export default CreateStudy;