import React, { Component } from "react"
import facade from "./apiFacade";

export let user = 'Not logged in';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "" }
    }
    login = (evt) => {
        user=this.state.username;
        evt.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }
    register = (evt) => {        
        evt.preventDefault();
        facade.register(this.state.username, this.state.password);
    }
    onChange = (evt) => {
        this.setState({ [evt.target.id]: evt.target.value })
    }
    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onChange={this.onChange} >
                    <input placeholder="Username" id="username" />
                    <input type="password" placeholder="Password" id="password" />
                    <button onClick={this.login}>Login</button>
                    <button onClick={this.register}>Register</button>
                </form>
            </div>
        )
    }
}
class LoggedIn extends Component {
    constructor(props) {
        super(props);
        this.state = { dataFromServer: "Fetching!!" };
    }
    componentDidMount() { facade.fetchData().then(res => this.setState({ dataFromServer: res })); }
    render() {
        return (
            <div>
                <h2>Data Received from server</h2>
                <h3>{this.state.dataFromServer}</h3>
            </div>
        )
    }
}
class Jwt extends Component {
   
    constructor(props) {
        super(props);
        this.state = { loggedIn: false }
    }
    logout = () => {
        facade.logout();
        user = 'Not logged in'
        this.setState({ loggedIn: false });
    } //TODO
    login = (user, pass) => {
        facade.login(user, pass)
            .then(res => this.setState({ loggedIn: true }));
    } //TODO
    register = (user, pass) => {
        facade.register(user, pass)
            .then(res => this.setState({ loggedIn: true }));
    }
    render() {
        return (
            <div>
                {!this.state.loggedIn ? (<LogIn login={this.login} />) :
                    (<div>
                        <LoggedIn />
                        <button onClick={this.logout}>Logout</button>
                    </div>)}
            </div>
        )
    }
}


export default Jwt;
