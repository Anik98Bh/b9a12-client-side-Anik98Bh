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
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        tutor.map(item => <SwiperSlide key={item._id}>
                            <div>
                                <div className="card w-96 shadow-xl">
                                    <figure className="px-10 pt-10">
                                        <img src={item?.image} alt="" className="rounded-full" />
                                    </figure>
                                    <div className="card-body items-center text-center">
                                        <h2 className="text-2xl font-bold">{item.tutorName}</h2>
                                        <p>{item?.tutorEmail}</p>
                                        <p>{item?.subjectsTaught[0]}, {item?.subjectsTaught[1]}, {item?.subjectsTaught[2]}</p>
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