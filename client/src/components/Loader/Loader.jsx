
import React from 'react';
import SVGComponent from './Svgcomponent';
import './Loader.scss';

const hexStyles = {
    width: '104px',
    height: '56px',
    margin: '500px auto ',
    position: 'relative',

    // backgroundcolor: '#000000',

};

const hexItemStyles = [
    { marginLeft: '0px' },
    { marginLeft: '29px' },
    { marginLeft: '58px' },
    { marginLeft: '14px', marginTop: '24px' },
    { marginLeft: '43px', marginTop: '24px' },
    { marginLeft: '72px', marginTop: '24px' },
];

const Loader = () => {
    return (
        <div className='Loader'>
            <div style={hexStyles} className="hex">
                {hexItemStyles.map((style, index) => (
                    <div
                        key={index}
                        style={{
                            ...style,
                            position: 'absolute',
                            animation: `blink ease-in 1.5s infinite ${index * 0.1}s`,
                        }}
                    >
                        <SVGComponent />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Loader;
