// src/components/ScrollToTop/ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SmoothScroll from 'smooth-scroll';

const scroll = new SmoothScroll();

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        scroll.animateScroll(0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
