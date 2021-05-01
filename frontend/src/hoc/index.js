import React from 'react'
import { Route, useHistory } from 'react-router-dom'
import { useAuth } from '../hooks'

export const PrivateRoute = (props) => {
	const { authUser, isLoading } = useAuth()
	const history = useHistory()

	if (!authUser && !isLoading) {
		history.push('/login')
		return null
	}
	return <Route {...props}/>
	
}

export const PublicRoute = (props) => {
	const { authUser, isLoading} = useAuth()
	if (authUser || isLoading) {
		return null
	}
	return <Route {...props}/>
}

