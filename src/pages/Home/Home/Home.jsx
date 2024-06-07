import FrequentlyAsk from "../../../components/FrequentlyAsk/FrequentlyAsk";
import StudySection from "../../Shared/StudySection/StudySection";
import Banner from "../Banner/Banner";
import Tutor from "../Tutor/Tutor";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <StudySection></StudySection>
            <Tutor></Tutor>
            <FrequentlyAsk></FrequentlyAsk>
        </div>
    );
};

export default Home;