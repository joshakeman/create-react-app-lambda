import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { login } from '../actions'

class Register extends React.Component {
    state = {
            username: '',
            password: '',
            welcomeMessage: ''
        }
    

    register = e => {
        e.preventDefault()
        // this.props.login(this.state.username).then(() =>{
        //     this.props.history.push('/chess')
        // })
        axios 
            .post ( 'https://over9000be2.herokuapp.com/api/register', {username: this.state.username, password: this.state.password})
            .then (res => {
                console.log(res)
                localStorage.setItem('token', res.data.token)
                this.setState({
                    welcomeMessage: res.data.message
                })
            })
            .catch(err => console.log(err))
            this.props.history.push('/chess')
    }

    handleChanges = e => {
        e.preventDefault()
        this.setState ({
            [e.target.name] : e.target.value
        })
    }

    render() {
        return (

        <div className="login-wrapper-container">
            <div className="login-form-wrapper">
                <form onSubmit={this.register} className="login-form">
                    <input 
                    value={this.state.username}
                    name="username"
                    placeholder="user"
                    onChange={this.handleChanges}
                    />
                    <input 
                    value={this.state.password}
                    name="password"
                    placeholder="password"
                    onChange={this.handleChanges}
                    />
                    <button type="submit" className="login-btn">Register</button>
                </form>
                <h2>{this.state.welcomeMessage}</h2>
            </div>

        </div>
        )
    }
}



// export default connect(null, { login })(Login)
export default Register