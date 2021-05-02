import React, { useState } from 'react'
import { API } from '../../api'
import DatePicker from 'react-datepicker'
import { setMinutes, setHours } from 'date-fns'
import "react-datepicker/dist/react-datepicker.css";
import './event-form.scss'

const EventForm = ({eventDate, onEventCreated}) => {
	const [state, setState] = useState({
		title: "",
		description: '',
		dateTime: setHours(setMinutes(eventDate, new Date().getMinutes()), new Date().getHours()),
		reminderStartBefore: 30
	})
	const [isCreating, setIsCreating] = useState(false)
	const [error, setError] = useState('')

	const createEvent = (e) => {
		e.preventDefault()
		if (state.title.trim() === '') {
			setError("Please enter title.")
			return
		}
		if (!state.dateTime || !(state.dateTime instanceof Date)) {
			setError("Please provide a valid time.")
			return
		}
		if (state.description.trim() === '') {
			setError("Please decribe your reminder.")
			return
		}
		if (!state.reminderStartBefore) {
			setError("Please enter minutes.")
			return
		}
		setIsCreating(true)
		API.createEvent({ ...state })
			.then((response) => {
				onEventCreated(response)
			})
			.finally(() => setIsCreating(false))
	}

	const setDateTime = (date) => {
		setState({ ...state, dateTime: date })
		setError('')
	}

	const inputHandler = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
		setError('')
	}

	return (
		<div className='form-container'>
			<form className='event-form' onSubmit={createEvent}>
				<h2>New Reminder</h2>
				<div className="form-group">
					<label htmlFor='title' >Title</label>
					<input
						placeholder='Enter a title'
						id='title'
						name='title'
						type="text"
						value={state.title}
						onChange={inputHandler} />
				</div>
				<div className="form-group">
					<label htmlFor='email'>Appointment Time</label>
					<DatePicker
						selected={state.dateTime}
						onChange={date => setDateTime(date)}
						showTimeSelect
						showTimeSelectOnly
						timeIntervals={10}
						timeCaption="Time"
						dateFormat="h:mm aa"
					/>
				</div>
				<div className="form-group">
					<label htmlFor='reminderStartBefore'>Reminder Start Before(in minutes)</label>
					<input
						id='reminderStartBefore'
						name='reminderStartBefore'
						type="number"
						step='5'
						value={state.reminderStartBefore}
						onChange={inputHandler} />
				</div>
				<div className="form-group">
					<label htmlFor='description' >Description</label>
					<textarea
						placeholder='Type description here..'
						id='description'
						name='description'
						value={state.description}
						onChange={inputHandler}
						rows='8'
					/>
				</div>
				{
					error ?
						<div className="error-message">{error}</div> : null
				}
				<button type='submit' className='btn login-btn'>
					{
						isCreating ? 'Submitting...' : 'Submit'
					}
				</button>
			</form>
		</div>
	)
}

EventForm.defaultProps = {
	onEventCreated: () => { }, 
}

export default EventForm
