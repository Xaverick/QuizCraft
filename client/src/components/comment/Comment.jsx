import React from 'react'
import './Comment.scss'
import commentboxdesign from '../../assets/homepageimages/comma.svg'
const Comment = ({ ca }) => {
    return (
        <>
            <div className='comment'>
                <div className='commentbox'>
                    <div className='commentboxheadings'>
                        <div className='commentboxphoto'>
                            <img src={ca.image} />
                            <h4>{ca.name}</h4>
                        </div>
                        <div className='commentboxstyle'>
                            <img src={commentboxdesign} />
                        </div>
                    </div>
                    <div className='commentcontent'>
                        <p>{ca.comment}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comment