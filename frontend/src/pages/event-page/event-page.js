import React, { useEffect } from 'react'
import Calender from '../../components/calendar'
import { io } from 'socket.io-client'
import './event-page.scss'

const EventPage = () => {

	useEffect(() => {
		const socket = io('http://localhost:4000')
		socket.on('connect', () => {
			console.log('socket connected')
		})
	}, [])

	return (
		<div className='event-page'>
			<Calender/>
		</div>
	)
}

export default EventPage
