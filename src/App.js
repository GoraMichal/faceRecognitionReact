import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLink from './components/ImageLink/ImageLink';
import Rank from './components/Rank/Rank';

function App() {
    return (
        <div className="App">
            <header>
                <Navigation />
                <Logo />
                <Rank />
                <ImageLink />
                {/*
                    <FaceRecoLogic />
                */}
            </header >
        </div >
    );
}

export default App;
