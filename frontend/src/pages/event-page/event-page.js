import React, { useEffect, useState } from 'react'
import groupBy from 'lodash/groupBy'
import moment from 'moment'
import Calender from '../../components/calendar'
import { io } from 'socket.io-client'
import { API } from '../../api'
import { useGlobalState } from '../../hooks'
import { getHexColor, dateUtil } from '../../utils'
import './event-page.scss'

const EventPage = () => {
	const [month, setMonth] = useState(() => new Date())
	const { setEvents, events } = useGlobalState()
	const [isFetching, setIsFetching] = useState(false)
	const [selectedDate, setSelectedDate] = useState(null)
	const [selectedEvents, setSelectedEvents] = useState([])

	const isBackDated = (date) => {
		return dateUtil.isBeforeDay(date, new Date())
	}

	const getFormattedEvents = (events) => {
		return groupBy(events, event => moment(event.dateTime).get('date'))
	}

	const onDateSelected = (date, events) => {
		
		setSelectedEvents(events ? events : [])	
		setSelectedDate(date)
	}
	useEffect(() => {
		setIsFetching(true)
		API.getEvents({ month }).then((response) => {
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
				onDateSelected={onDateSelected}
			/>
			{
				selectedDate ?
					<div className='event-list'>
						<h3 className='day'>{moment(selectedDate).get('date')}</h3>
						<div className="event-list-container">
							{
								selectedEvents.length === 0 ?
									<div className='empty-text'>
										<p>No reminders.</p>
									</div> : null
							}
							{
								selectedEvents.map(event => (
									<div
										key={event._id}
										className='list-item'
										style={
											{
												border: `1px solid ${getHexColor(event._id)}`,
												backgroundColor: `${getHexColor(event._id)+'22'}`
											}
										}
									>
										<div className='title'>{event.title}</div>
										<div className='description'>{event.description}</div>
										<div className="reminder-title">
											Reminder
										</div>
										<div className='reminder'>
											<span>Time: </span>
											<span>
												{
													moment(event.reminderStartDateTime)
														.format('hh:mm a')
												}
											</span>
										</div>
										<div className='reminder'>
											<span>Date: </span>
											<span>
												{
													moment(event.reminderStartDateTime)
														.format('MMM DD, YYYY')
												}
											</span>
										</div>
										<div className='reminder'>
											<span>Day: </span>
											<span>
												{
													moment(event.reminderStartDateTime)
														.format('dddd')
												}
											</span>
										</div>
									</div>
								))
							}
						</div>
						<div className='add-reminder'>
							<button
								className={`btn ${isBackDated(selectedDate) ? 'disabled' : ''}`}
								onClick={()=>{}}
							>
								Set New Reminder
							</button>
						</div>
					</div>
					: null
			}
		</div>
	)
}

export default EventPage
