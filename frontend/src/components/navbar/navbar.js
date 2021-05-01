import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth, useGlobalState } from '../../hooks'
import { FaBell } from 'react-icons/fa'

import './navbar.scss'

const navItems = [
	{
		label: 'Login',
		pathname: '/login'
	},
	{
		label: 'Register',
		pathname: '/register'
	}
]

const Navbar = () => {
	const { pathname } = useLocation()
	const { authUser, setAuthUser, isLoading } = useAuth()
	const { notifications } = useGlobalState()
	
	const signOut = () => {
		localStorage.removeItem('authToken')
		setAuthUser(null)
	}

	return (
		<nav className='nav'>
			<div className="nav-container">
				<Link className='logo' to='/'>GranGran</Link>
				{
					authUser || isLoading?
						<ul className='nav-items'>
							<li className='item notification'>
								<FaBell className='bell-icon' size='20' />
								{
									notifications.length > 0 ?
										<div className='dot'/> : null
								}
							</li>
							<li className='item'>
								{authUser?.name}
							</li>
							<li
								className='item'
								style={{ cursor: 'pointer'}}
								onClick={signOut}
							>
								Sign out
							</li>
						</ul>
						:
						<ul className='nav-items'>
							{
								navItems.map(item => (
									<li className='item' key={item.pathname}>
										<Link
											className={`nav-link ${pathname === item.pathname ? 'active' : ''}`}
											to={item.pathname}
										>
											{item.label}
										</Link>
									</li>
								))
							}
						</ul>
				}
			</div>
		</nav>
	)
}

export default Navbar
