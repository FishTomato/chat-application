import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { loginRoute } from '../utils/APIRoutes'

const KEY = 'chat-app-user';

export default function Login() {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    username: "",
    password: ""
  })

  useEffect(() => {
    if (localStorage.getItem(KEY)) {
      navigate('/')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { username, password } = user
    if (handleValidation()) {
      const { data } = await axios.post(loginRoute, {
        username,
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
    const { username, password } = user
    if (password === '') {
      return false
    } else if (username === '') {
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
            className='username-login'
            type="text"
            placeholder="Username"
            name="username"
            min='4'
            onChange={handleChange} />
          <input
            className='password-login'
            type="password"
            placeholder="Password"
            name="password"
            min='6'
            onChange={handleChange} />
        </form>
        <button type="submit"
          onClick={handleSubmit}
          className='form-button'>
          Login
        </button>
        <span
        className='login-text'>
          {'Don\'t have an account? '}
          <Link
            style={{ color: 'inherit'}}
            to="/register" >
            Reigster
          </Link>
        </span>
      </div>
    </div>
  )
}
