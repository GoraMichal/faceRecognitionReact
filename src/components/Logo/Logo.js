// JavaScript source code
import React from 'react';
import Tilt from 'react-tilt'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max: 25 }} style={{ height: 250, width: 250 }} >

                <div className="Tilt-inner pa3"><img style={{ paddingTop: '5px', width: '100%' }} alt='logo'
                    src="https://img.icons8.com/wired/64/000000/small-smile.png" /></div>
            </Tilt>
        </div>
    );
}

export default Logo;