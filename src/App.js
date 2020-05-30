import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLink from './components/ImageLink/ImageLink';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

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
            route: 'signin',
            isSignedIn: false
        }
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    onButtonSubmit = () => {
        //multi faces
        let n = 0;

        this.setState({ imageUrl: this.state.input });
        app.models
            .predict(
                Clarifai.FACE_DETECT_MODEL,
                this.state.input)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response, n)))
            .catch(err => console.log(err));
    }

    //componentDidMount() {
    //    fetch('http://localhost:3000')
    //        .then(response => response.json())
    //        .then(console.log)
    //}

    calculateFaceLocation = (data, n) => {
        const clarifaiFace = data.outputs[0].data.regions[n].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        //Number is a wrapper obj with numerical values
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

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({ isSignedIn: false })
        } else if (route === 'home') {
            this.setState({ isSignedIn: true })
        }
        this.setState({ route: route });
    }

    render() {
        const { isSignedIn, imageUrl, route, box } = this.state;
        return (
            <div className="App">
                <Particles
                    className="particles"
                    params={particlesOptions}
                />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
                {
                    route === 'home'
                        ? <div>
                            <Logo />
                            <Rank />
                            <ImageLink
                                onInputChange={this.onInputChange}
                                onButtonSubmit={this.onButtonSubmit}
                            />
                            <FaceRecognition
                                imageUrl={imageUrl}
                                box={box}
                            />
                        </div>
                        : (
                            route === 'signin'
                                ? <Signin onRouteChange={this.onRouteChange} />
                                : <Register onRouteChange={this.onRouteChange} />
                        )
            }
            </div>
        );
    }
}

export default App;
