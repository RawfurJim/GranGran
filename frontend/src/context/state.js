import React, { createContext, useState, useEffect} from 'react'
import { API } from '../api'
import { useAuth } from '../hooks'

const initialState = {
	notifications: [],
	events: []
}
export const StateContext = createContext(initialState)

export const StateProvider = (props) => {
	const [events, setEvents] = useState([])
	const [notifications, setNotifications] = useState([])
	const { authUser } = useAuth()
	
	const value = {
		events,
		notifications,
		setEvents,
		setNotifications
	}

	useEffect(() => {
		if (authUser) {
			API.getNotifications().then((response) => {
				setNotifications(response)
			})
		}
	}, [authUser])

	return <StateContext.Provider value={value} {...props} />
}