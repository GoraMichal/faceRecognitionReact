// JavaScript source code
import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0 center'>
            <Tilt className="Tilt br2 shadow-2" options={{ max: 25 }} style={{ height: 200, width: 200 }} >
                <div className="Tilt-inner pa3">
                    <img style={{ paddingTop: '5px', width: '100%' }} alt='logo' src="https://cdn3.iconfinder.com/data/icons/new-apple-product-line/24/face_recognition-512.png" />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;