import React, { useEffect, useState } from 'react'
import groupBy from 'lodash/groupBy'
import moment from 'moment'
import Calender from '../../components/calendar'
import { io } from 'socket.io-client'
import { API } from '../../api'
import { useGlobalState } from '../../hooks'
import './event-page.scss'

const EventPage = () => {
	const [month, setMonth] = useState(() => new Date())
	const { setEvents, events } = useGlobalState()
	const [isFetching, setIsFetching] = useState(false)

	const getFormattedEvents = (events) => {
		return groupBy(events, event => moment(event.dateTime).get('date'))
	}
	useEffect(() => {
		setIsFetching(true)
		API.getEvents({ month }).then((response) => {
			console.log(response)
			setEvents(response)
		}).finally(()=>setIsFetching(false))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [month])

	useEffect(() => {
		const socket = io('http://localhost:4000')
		socket.on('connect', () => {
			console.log('socket connected')
		})
	}, [])

	return (
		<div className='event-page'>
			<Calender
				isBusy={isFetching}
				onMonthChanged={(month) => setMonth(month)}
				events={getFormattedEvents(events)}
			/>
		</div>
	)
}

export default EventPage
