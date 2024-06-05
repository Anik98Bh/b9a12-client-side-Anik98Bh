
const FrequentlyAsk = () => {
    return (
        <div className="px-5">
            <div className="text-center mt-20 mb-5">
                <h2 className="text-4xl font-bold mb-2">Frequently Asked Questions</h2>
                <p>Take a look at our most commonly asked questions.</p>
            </div>
            <div className="collapse collapse-plus bg-base-200 mt-3">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                What is a collaborative learning?
                </div>
                <div className="collapse-content">
                    <p>Learning is often more effective and engaging when it occurs through social interaction and cooperation rather than in isolation. Collaborative learning enables your learners to work together in groups or teams to achieve a common learning goal or objective and creates a culture of knowledge sharing.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200 mt-3">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                What is a social learning platform?
                </div>
                <div className="collapse-content">
                    <p>A social learning platform like Thirst creates a dynamic learning environment where learners can connect, engage, and learn from each other. Thirst helps you to build a learning community, promote active participation, and enhance the learning experience by using the collective knowledge, experiences, and perspectives of the people within your organisation to increase learner engagement, and make knowledge transfer and retainment easier.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200 mt-3">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                What is a collaborative learning platform?
                </div>
                <div className="collapse-content">
                    <p>A collaborative learning platform promotes active learning, critical thinking, problem-solving, and peer-to-peer interaction. They can be particularly useful when you have learners based around the country (or globe!) or when you need a blended learning approach (in-person and online learning)</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200 mt-3">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                How does Thirst ensure the quality of shared content and discussions?
                </div>
                <div className="collapse-content">
                    <p>Learners can flag inappropriate content themselves and admins can easily monitor and review user-generated content, ensuring adherence to company guidelines and values.</p>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200 mt-3">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">
                What are the benefits of collaborative learning for my organisation?
                </div>
                <div className="collapse-content">
                    <p>Collaborative learning offers opportunities for learners to develop essential skills such as communication, teamwork, problem-solving, and critical thinking. Working together on tasks and projects hones these skills and prepares learners for real-world situations that require collaboration and cooperation.</p>
                </div>
            </div>
        </div>
    );
};

export default FrequentlyAsk;