import FrequentlyAsk from "../../../components/FrequentlyAsk/FrequentlyAsk";
import StudySection from "../../Shared/StudySection/StudySection";
import Banner from "../Banner/Banner";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <StudySection></StudySection>
            <FrequentlyAsk></FrequentlyAsk>
        </div>
    );
};

export default Home;