import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLink from './components/ImageLink/ImageLink';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: 'e5cfe46a4d4249f78042737e94c25c0b'
});

const particlesOptions = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800,
            }
        }
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
        }
    }

    onInputChange = (event) => {
        console.log(event);
    }

    onButtonSubmit = (click) => {
        app.models.predict("c0c0ac362b03416da06ab3fa36fb58e3", "https://samples.clarifai.com/demographics.jpg").then(
            function (response) {
                console.log(response);
            },
            function (err) {
                // there was an error
            }
        );
    }

    render() {
        return (
            <div className="App">
                <Particles className="particles" params={particlesOptions} />
                <Navigation />
                <Logo />
                <Rank />
                <ImageLink
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                />
                {/*
                    <FaceRecoLogic />
                */}
            </div >
        );
    }
}

export default App;
