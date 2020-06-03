// JavaScript source code
import React from 'react';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: ''
        }
    }

    //Get email, pass
    registerEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    registerName = (event) => {
        this.setState({ name: event.target.value })
    }

    registerPassword = (event) => {
        this.setState({ password: event.target.value })
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                name: this.state.name,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
        //console.log(this.state);
    }

    render() {
        return (
            <article className="br2 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 fw6 ph0 mh0">Zarejestruj</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Imie</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={this.registerName}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.registerEmail}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Haslo</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.registerPassword}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Zarejestruj"
                            />
                        </div>
                    </form>
                </main>
            </article>
        );
    }
}

export default Register;