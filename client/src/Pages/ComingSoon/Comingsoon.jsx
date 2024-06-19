// import React from 'react';
import React from 'react';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './Comingsoon.scss';

const Comingsoon = () => {
    return (
        <main className="app">
            <Topbar />
            <div className="main">
                <Sidebar />
                <div className="content">
                    {/* Add your main content here */}
                     <h1>Leaderboard</h1>
                </div>
            </div>
        </main>
    );
}

export default Comingsoon;
