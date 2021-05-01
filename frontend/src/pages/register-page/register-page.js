import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { API } from '../../api'
import { useAuth } from '../../hooks'

import './register-page.scss'

const RegisterPage = () => {
	const [state, setState] = useState({
		name: "",
		email: '',
		password: '',
		mobile: ''
	})
	const [isRegistering, setIsRegistering] = useState(false)
	const { setAuthUser } = useAuth()
	const history = useHistory()

	const register = (e) => {
		e.preventDefault()
		if (state.email && state.password && state.mobile && state.name) {
			setIsRegistering(true)
			API.signUp({ ...state }).then((response) => {
				setAuthUser(response.user)
				localStorage.setItem('authToken', response.token)
				history.push('/events')
			}).finally(()=>setIsRegistering(false))
		}
	}

	const inputHandler = (e) => {
		setState({...state, [e.target.name]: e.target.value })
	}
	return (
		<div className='register-page'>
			<form className='login-form' onSubmit={register}>
				<h2>Register</h2>
				<div className="form-group">
					<label htmlFor='email' >Name</label>
					<input
						placeholder='Your name'
						id='name'
						name='name'
						type="text"
						value={state.name}
						onChange={inputHandler} />
				</div>
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
					<label htmlFor='email'>Phone Number</label>
					<input
						placeholder='Phone number'
						id='mobile'
						name='mobile'
						type="text"
						value={state.mobile}
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
						isRegistering ? 'Submitting...' : 'Submit'
					}
				</button>
			</form>
		</div>
	)
}

export default RegisterPage
