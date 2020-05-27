// JavaScript source code
import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signout')} className='f4 link dim black underline pa3 pt0 pointer'>Wyloguj</p>
            </nav>
        );
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signin')} className='f4 link dim black underline pa3 pt0 pointer'>Zaloguj</p>
                <p onClick={() => onRouteChange('register')} className='f4 link dim black underline pa3 pt0 pointer'>Zarejestruj</p>
            </nav>
        );
    }
}

export default Navigation;