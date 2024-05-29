import React from 'react'
import './ContestData.scss'
import { useNavigate } from 'react-router-dom';
const ContestData = ({ contest }) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(`/contest/${contest.id}`);
    };
    return (
        <>
            <div className='contest'>
                <div className='contestdatabox'>
                    <div className='contestdataimage'>
                        <img src={contest.image} />
                    </div>
                    <div className='contestdatacontent'>
                        <h3>{contest.content1}</h3>
                        <p>{contest.content2}</p>
                    </div>
                    <div className='contestdatatime'>
                        <h3>{contest.content3}</h3>
                        <p>{contest.Date}</p>
                    </div>
                    <div className='contestdatabutton'>
                        <button onClick={handleButtonClick}>{contest.button}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContestData