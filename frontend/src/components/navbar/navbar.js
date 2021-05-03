import React, { useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useAuth, useGlobalState } from '../../hooks'
import { FaBell } from 'react-icons/fa'
import moment from 'moment'

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
	const history = useHistory()
	const { authUser, setAuthUser, isLoading } = useAuth()
	const { notifications } = useGlobalState()
	const [showNotification, setShowNotification] = useState(false)

	const signOut = () => {
		localStorage.removeItem('authToken')
		setAuthUser(null)
		history.push('/login')
	}

	const renderNotifications = () => {
		return (
			<div className='notifications-list'>
				{
					notifications.length === 0 ?
						<div className='empty-text'>
							No notifications.
						</div> : null
				}
				{
					notifications.map((notification) => (
						<div key={notification._id} className='notification-item'>
							<p className='content'>{notification.content}</p>
							<p className='time'>
								<span>At:</span>
								<span className='format'>{moment(notification.meta.dateTime).format("MMM DD, YYYY, hh:mm a")}</span>
							</p>
							
							<div className='read'>
								{
									notification.isRead ?
										null : <button className='btn mark-as-read'>Mark as read</button>
								}
							</div>
						</div>
					))
				}
			</div>
		)
	}

	return (
		<nav className='nav'>
			<div className="nav-container">
				<Link className='logo' to='/'>GranGran</Link>
				{
					authUser || isLoading?
						<ul className='nav-items'>
							<li
								className='item notification'
								onMouseEnter={() => setShowNotification(true)}
								onMouseLeave={() => setShowNotification(false)}
							>
								<FaBell className='bell-icon' size='20' />
								{
									notifications.length > 0 ?
										<div className='dot'/> : null
								}
								{
									showNotification ?
										renderNotifications() : null
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
