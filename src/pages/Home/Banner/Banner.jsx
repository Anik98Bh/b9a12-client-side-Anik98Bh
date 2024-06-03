import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import bImg1 from "../../../assets/Banner/alexis-brown-omeaHbEFlN4-unsplash.jpg"
import bImg2 from "../../../assets/Banner/cdc-GDokEYnOfnE-unsplash.jpg"
import bImg3 from "../../../assets/Banner/dylan-gillis-KdeqA3aTnBY-unsplash.jpg"
import bImg4 from "../../../assets/Banner/jessica-lewis-thepaintedsquare--fP2-cL-6_U-unsplash.jpg"
import bImg5 from "../../../assets/Banner/kenny-eliason-1-aA2Fadydc-unsplash.jpg"
import bImg6 from "../../../assets/Banner/kenny-eliason-zFSo6bnZJTw-unsplash.jpg"
import Typewriter from 'react-ts-typewriter';

const Banner = () => {
    return (
        <div>
            <Carousel className="text-center">
                <div className="relative">
                    <img src={bImg1}  />
                    <div className="absolute rounded-xl h-full flex justify-center w-full items-center left-0 top-0 bg-[#151515B3]">
                        <div className="text-white space-y-7 px-32 ">
                            <h2 className="text-6xl font-bold">
                                <Typewriter loop='true' speed={100} text='Collaborative Learning: Harness the Power of a Collaborative Learning Platform' />
                            </h2>
                            <p>Leverage social and collaborative learning to engage learners, promotes accountability, and <br /> strengthen and sustain learning across your organization.</p>
                            <div>
                                <button className="btn btn-primary mr-5 text-white">Bid Now!</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <img src={bImg2} />
                    <div className="absolute rounded-xl h-full flex justify-center w-full items-center left-0 top-0 bg-[#151515B3]">
                        <div className="text-white space-y-7 px-32 ">
                            <h2 className="text-6xl font-bold">
                                <Typewriter loop='true' speed={100} text='Best Collaboration Platforms for Education Students' />
                            </h2>
                            <p>Leverage social and collaborative learning to engage learners, promotes accountability, and <br /> strengthen and sustain learning across your organization.</p>
                            <div>
                                <button className="btn btn-primary mr-5 text-white">Bid Now!</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <img src={bImg3} />
                    <div className="absolute rounded-xl h-full flex justify-center w-full items-center left-0 top-0 bg-[#151515B3]">
                        <div className="text-white space-y-7 px-32 ">
                            <h2 className="text-6xl font-bold">
                                <Typewriter loop='true' speed={100} text='Collaborative Learning: Harness the Power of a Collaborative Learning Platform' />
                            </h2>
                            <p>Leverage social and collaborative learning to engage learners, promotes accountability, and <br /> strengthen and sustain learning across your organization.</p>
                            <div>
                                <button className="btn btn-primary mr-5 text-white">Bid Now!</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <img src={bImg4} />
                    <div className="absolute rounded-xl h-full flex justify-center w-full items-center left-0 top-0 bg-[#151515B3]">
                        <div className="text-white space-y-7 px-32 ">
                            <h2 className="text-6xl font-bold">
                                <Typewriter loop='true' speed={100} text='Best Collaboration Platforms for Education Students' />
                            </h2>
                            <p>Leverage social and collaborative learning to engage learners, promotes accountability, and <br /> strengthen and sustain learning across your organization.</p>
                            <div>
                                <button className="btn btn-primary mr-5 text-white">Bid Now!</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <img src={bImg5} />
                    <div className="absolute rounded-xl h-full flex justify-center w-full items-center left-0 top-0 bg-[#151515B3]">
                        <div className="text-white space-y-7 px-32 ">
                            <h2 className="text-6xl font-bold">
                                <Typewriter loop='true' speed={100} text='Collaborative Learning: Harness the Power of a Collaborative Learning Platform' />
                            </h2>
                            <p>Leverage social and collaborative learning to engage learners, promotes accountability, and <br /> strengthen and sustain learning across your organization.</p>
                            <div>
                                <button className="btn btn-primary mr-5 text-white">Bid Now!</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <img src={bImg6} />
                    <div className="absolute rounded-xl h-full flex justify-center w-full items-center left-0 top-0 bg-[#151515B3]">
                        <div className="text-white space-y-7 px-32 ">
                            <h2 className="text-6xl font-bold">
                                <Typewriter loop='true' speed={100} text='Best Collaboration Platforms for Education Students' />
                            </h2>
                            <p>Leverage social and collaborative learning to engage learners, promotes accountability, and <br /> strengthen and sustain learning across your organization.</p>
                            <div>
                                <button className="btn btn-primary mr-5 text-white">Bid Now!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;