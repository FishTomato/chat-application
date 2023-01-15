import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes'

const KEY = 'chat-app-user';

export default function Register() {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    useEffect(() => {
        if (localStorage.getItem(KEY)) {
            navigate('/')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { username, email, password, confirmPassword } = user
        if (handleValidation()) {
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password
            }).catch(error => {
                console.log(error.message)
            })

            if (data.status === false) {
                alert("error")
            } if (data.status === true) {
                localStorage.setItem(KEY, JSON.stringify(data.user))
                navigate("/")
            }
        }
    }

    const handleValidation = () => {
        const { username, email, password, confirmPassword } = user
        if (password !== confirmPassword) {
            return false
        } else if (username.length <= 3) {
            return false
        } else if (password.length < 6) {
            return false
        }
        return true
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <div className='login-form-container'>
            <div className='login-container'>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className='login-form'>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={handleChange} />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange} />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange} />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={handleChange} />
                </form>
                <button type="submit"
                    onClick={handleSubmit}>
                    Create User
                </button>
                <span
                    className='login-text'>
                    {'Already have an account? '}
                    <Link
                        style={{ color: 'inherit' }}
                        to="/login" >
                        Login
                    </Link>
                </span>
            </div>
        </div>
    )
}
