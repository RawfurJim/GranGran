import React, { createContext, useContext, useState, useEffect } from 'react'
import { API } from '../api'

const AuthContext = createContext(null)

export const AuthProvider = (props) => {
	const [authUser, setAuthUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const authToken = localStorage.getItem('authToken')
	
	const value = {
		authUser,
		setAuthUser,
		isLoading
	}

	useEffect(() => {
		if (authToken) {
			API.getAuthUser(authToken).then((response) => {
				setAuthUser(response)
			})
				.catch(() => setAuthUser(null))
				.finally(() => setIsLoading(false))
		} else {
			setIsLoading(false)
		}
	}, [authToken])

	return <AuthContext.Provider value={value} {...props} />
}

export const useAuth = () => {
	const context = useContext(AuthContext)

	if (context === undefined) {
		throw new Error('useAuth must be used within a AuthProvider.')
	}
	return context
}