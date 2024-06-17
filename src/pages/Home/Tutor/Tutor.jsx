import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';

const Tutor = () => {
    const [tutor, setTutor] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/tutor')
            .then(res => res.json())
            .then(data => setTutor(data))
    }, [])
    return (
        <>
            <div className='mt-20'>
                <h2 className='text-4xl text-center font-bold mb-5'>Our Tutors</h2>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={50}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        tutor?.map(item => <SwiperSlide key={item._id}>
                            <div>
                                <div className="card w-96 shadow-xl">
                                    <figure className="px-10 pt-10">
                                        <img src={item?.photoURL ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7rlHILcxkNp4iwSUhRCeGjQAnZcisSGs9txj5d4FvFr782-NoItG0iDd0GD0eK4WITxU&usqp=CAU"} alt="" className="rounded-full" />
                                    </figure>
                                    <div className="card-body items-center text-center">
                                        <h2 className="text-2xl font-bold">{item.displayName}</h2>
                                        <p>{item?.email}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </>
    );
};

export default Tutor;