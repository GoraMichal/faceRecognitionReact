import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLink from './components/ImageLink/ImageLink';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';

const particlesOptions = {
    particles: {
        line_linked: {
            shadow: {
                enable: true,
                color: "#3CA9D1",
                blur: 5
            }
        }

    }
}

function App() {
    return (
        <div className="App">
            <header>
                <Particles className="particles" params={particlesOptions} />
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
