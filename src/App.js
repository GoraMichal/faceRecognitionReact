import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLink from './components/ImageLink/ImageLink';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';

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
            imageUrl: '',
            box: {},
        }
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    onButtonSubmit = () => {
        let n = 0;
        this.setState({ imageUrl: this.state.input });
        app.models
            .predict(
                Clarifai.FACE_DETECT_MODEL,
                this.state.input)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response, n)))
            .catch(err => console.log(err));
    }

    calculateFaceLocation = (data, n) => {
        const clarifaiFace = data.outputs[0].data.regions[n].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);

        console.log(data);
        //console.log(width, height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height),
        }
    }

    displayFaceBox = (box) => {
        console.log(box);
        this.setState({ box: box });
    }

    render() {
        return (
            <div className="App">
                <Particles
                    className="particles"
                    params={particlesOptions}
                />
                <Navigation />
                <Signin />
                <Logo />
                <Rank />
                <ImageLink
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition
                    imageUrl={this.state.imageUrl}
                    box={this.state.box}
                />
            </div >
        );
    }
}

export default App;
