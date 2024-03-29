import React from 'react'
import withAuth from '../utils/AuthHeader'

import { Link } from 'react-router-dom'

class UserDashboard extends React.Component {

    constructor() {
        super()

        this.state = {
            username: ''
        }
    }

    changeName = e => {
        e.preventDefault()
        
        withAuth()
            .put ('https://over9000be2.herokuapp.com/api/users/5', {username: this.state.username})
            .then (res => {
                console.log(res)
                // localStorage.setItem('token', res.data.token)
            })
            .catch(err => console.log(err))
    }

    deleteUser = e => {
        e.preventDefault()
        
        withAuth()
            .delete ('https://over9000be2.herokuapp.com/api/users/5')
            .then (res => {
                console.log(res)
                localStorage.removeItem('token')
            })
            .catch(err => console.log(err))
            this.props.history.push('/login')
    }

    handleChanges = e => {
        e.preventDefault()
        this.setState ({
            [e.target.name] : e.target.value
        })
    }

    render() {
    const username = localStorage.getItem('user')
    return (
        <div>
            <div className="navbar">
                <Link to="/account">Account</Link>
                <Link to="/chess"><h2>It's Over 9000!</h2></Link>
                <div className="menu" onClick={this.logout}>Log Out</div>
            </div>
            <div className="user-dashboard">
                <h1 className="account-h1">Hi there {username}</h1>
                <form onSubmit={this.changeName} className="login-form">
                    <button type="submit" className="changename-btn">Change my username</button>
                        <input 
                        value={this.state.username}
                        name="username"
                        placeholder="New name"
                        onChange={this.handleChanges}
                        />
                    </form>
                <button onClick={this.deleteUser} className="delete-btn">Delete my account</button>
            </div>
        </div>
    )
    }
}

export default UserDashboard