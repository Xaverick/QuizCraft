
    


        import React, { useEffect, useState } from "react";

const Responses = () => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const dummySubmissions = [
            {
                _id: "1",
                userId: "user1",
                answers: [
                    { questionId: "q1", response: "A", correct: true },
                    { questionId: "q2", response: "B", correct: false },
                    { questionId: "q3", response: "C", correct: true },
                    { questionId: "q4", response: "D", correct: false },
                    { questionId: "q5", response: "E", correct: false },
                ],
            },
            {
                _id: "2",
                userId: "user2",
                answers: [
                    { questionId: "q1", response: "A", correct: true },
                    { questionId: "q2", response: "D", correct: false },
                    { questionId: "q3", response: "C", correct: true },
                    { questionId: "q4", response: "B", correct: false },
                    { questionId: "q5", response: "E", correct: true },
                ],
            },
            {
                _id: "3",
                userId: "user3",
                answers: [
                    { questionId: "q1", response: "B", correct: false },
                    { questionId: "q2", response: "A", correct: true },
                    { questionId: "q3", response: "C", correct: true },
                    { questionId: "q4", response: "D", correct: false },
                    { questionId: "q5", response: "E", correct: true },
                ],
            },
            {
                _id: "4",
                userId: "user4",
                answers: [
                    { questionId: "q1", response: "C", correct: true },
                    { questionId: "q2", response: "B", correct: false },
                    { questionId: "q3", response: "A", correct: true },
                    { questionId: "q4", response: "D", correct: false },
                    { questionId: "q5", response: "E", correct: true },
                ],
            },
            {
                _id: "5",
                userId: "user5",
                answers: [
                    { questionId: "q1", response: "D", correct: false },
                    { questionId: "q2", response: "C", correct: true },
                    { questionId: "q3", response: "A", correct: true },
                    { questionId: "q4", response: "B", correct: false },
                    { questionId: "q5", response: "E", correct: true },
                ],
            },
        ];

        setSubmissions(dummySubmissions);
    }, []);

    const calculateScore = (submission) => {
        let correctCount = 0;
        submission.answers.forEach((answer) => {
            if (answer.correct) {
                correctCount++;
            }
        });
        return {
            correctCount,
            totalCount: submission.answers.length,
        };
    };

    return (
        <div className="text-black bg-yellow-300 h-screen w-screen overflow-auto flex flex-col items-center">
            <h1 className="text-4xl font-extrabold">Responses</h1>
            <div className="mt-4">
                {submissions.map((submission, index) => {
                    const { correctCount, totalCount } = calculateScore(submission);
                    const percentage = totalCount > 0 ? (correctCount / totalCount) * 100 : 0;
                    return (
                        <div key={index} className="border p-4 rounded mb-2 flex flex-col items-center">
                            <p>Submission ID: {submission._id}</p>
                            <p>User ID: {submission.userId}</p>
                            <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden mt-2 relative">
                                <div className="absolute inset-0 flex justify-center items-center">
                                    <div className="w-20 h-20 rounded-full bg-green-500" style={{ transform: `rotate(${percentage * 3.6}deg)` }}></div>
                                </div>
                                <div className="absolute inset-0 flex justify-center items-center text-2xl font-bold">{correctCount}/{totalCount}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Responses;
