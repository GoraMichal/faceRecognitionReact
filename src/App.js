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

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        password: '',
        email: '',
        entries: 0,
        joined: ''
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                password: data.password,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    onImageSubmit = () => {
        this.setState({ imageUrl: this.state.input });
        fetch('http://localhost:3000/imageurl', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(response => response.json())

            .then(response => {
                if (response) {
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        //zwracanie odpowiedzi w formatach: response.text, response.formData, response.blob, response.arrayBuffer
                        //object assign - kopiuje wartosci z obieku/ow do obiektu docelowego (cel, ...zrodla)
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, { entries: count }))

                            //this.setState({
                            //    user: {
                            //        entries: count
                            //    }
                        })
                        .catch(console.log);
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
    }

    //componentDidMount() {
    //    fetch('http://localhost:3000')
    //        .then(response => response.json())
    //        .then(console.log)
    //}

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
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
            this.setState(initialState)
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
                            <Rank
                                name={this.state.user.name}
                                entries={this.state.user.entries}
                            />
                            <ImageLink
                                onInputChange={this.onInputChange}
                                onImageSubmit={this.onImageSubmit}
                            />
                            <FaceRecognition
                                imageUrl={imageUrl}
                                box={box}
                            />
                        </div>
                        : (
                            route === 'signin'
                                ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                        )
                }
            </div>
        );
    }
}

export default App;
