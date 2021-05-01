import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { API } from '../../api'
import { useAuth } from '../../hooks'

import './login-page.scss'

const LoginPage = () => {
	const [state, setState] = useState({ email: 'jim@jim.com', password: 'test1234' })
	const [isLogging, setIslogging] = useState(false)
	const { setAuthUser } = useAuth()
	const history = useHistory()

	const login = (e) => {
		e.preventDefault()
		if (state.email && state.password) {
			setIslogging(true)
			API.signIn({ ...state }).then((response) => {
				setAuthUser(response.user)
				localStorage.setItem('authToken', response.token)
				history.push('/events')
			}).finally(()=>setIslogging(false))
		}
	}

	const inputHandler = (e) => {
		setState({...state, [e.target.name]: e.target.value })
	}

	return (
		<div className='login-page'>
			<form className='login-form' onSubmit={login}>
				<h2>Login</h2>
				<div className="form-group">
					<label htmlFor='email' >Email</label>
					<input
						placeholder='email@example.com'
						id='email'
						name='email'
						type="email"
						value={state.email}
						onChange={inputHandler} />
				</div>
				<div className="form-group">
					<label htmlFor='email'>Password</label>
					<input
						placeholder='Password'
						id='password'
						name='password'
						type="password"
						value={state.password}
						onChange={inputHandler} />
				</div>
				<button type='submit' className='btn login-btn'>
					{
						isLogging ? 'Logging...' : 'Login'
					}
				</button>
			</form>
		</div>
	)
}

export default LoginPage
