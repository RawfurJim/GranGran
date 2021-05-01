import React, { createContext, useState, useEffect } from 'react'
import { API } from '../api'

export const AuthContext = createContext(null)

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