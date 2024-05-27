import React, { useState, useEffect } from 'react';
import './Allcontest.scss';
import down from '../../assets/Questionsimages/down.png';
import ContestData from '../../components/contestdata/ContestData.jsx';
import Contest from '../../assets/data/Contestdata.js';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

const Allcont = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

    // Determine the number of items per page based on screen width
    function getItemsPerPage() {
        return window.innerWidth > 768 ? 12 : 5;
    }

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(getItemsPerPage());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculate the total number of pages
    const totalPages = Math.ceil(Contest.length / itemsPerPage);

    // Get the current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Contest.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <>
            <div className='Allcontest'>
                <div className='Allcontestcontent'>
                    <div className='Allcontestcontentheading'>
                        <p>Upcoming Contest</p>
                    </div>
                    <div className='Allcontestcontentpharagraph'>
                        <p>Challenge yourself with our expertly crafted quizzes and compete with fellow learners from around the globe.</p>
                    </div>
                </div>
                <div className='Allcontestbuttons'>
                    <button>Category<span><img src={down} alt='' /></span></button>
                    <button>Status<span><img src={down} alt='' /></span></button>
                </div>
                <div className='AllContests'>
                    {currentItems.map((C) => (
                        <ContestData key={C.id} contest={C} />
                    ))}
                </div>
                <Stack spacing={5} className='pagination'>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        shape="rounded"
                        variant="outlined"
                        // color='#08AAA2'
                        sx={{
                            color: 'black', // Text color
                            '& .MuiPaginationItem-root': {
                                border: '1px solid #A7D7D5', // Border color
                                backgroundColor: 'inherit', // Background color
                            },
                            '& .Mui-selected': {
                                backgroundColor: '#08AAA2', // Selected background color
                                color: 'black', // Selected text color
                                '&:hover': {
                                    backgroundColor: '#08AAA2', // Selected background color on hover
                                },
                            },
                        }}
                        renderItem={(item) => (
                            <PaginationItem
                                {...item}
                                sx={{
                                    color: 'black', // Text color
                                    '&:hover': {
                                        backgroundColor: '#56AFB2', // Background color on hover
                                        // Text color on hover
                                    },
                                }}
                            />
                        )}

                    />
                </Stack>
            </div>
        </>
    );
};

export default Allcont;
