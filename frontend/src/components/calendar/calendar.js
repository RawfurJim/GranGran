import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { getHexColor, dateUtil } from '../../utils'
import {
	FiChevronLeft as ChevronLeftIcon,
	FiChevronRight as ChevronRightIcon,
	FiMoreHorizontal as MoreIcon
} from 'react-icons/fi'
import './calendar.scss'

const WEEK_LENGTH = 7

const Calendar = ({ onDateSelected, onMonthChanged, events, isBusy }) => {
	const [currentDate, setCurrentDate] = useState(() => new Date())
	const [selectedDate, setSelectedDate] = useState(null)
	const today = new Date()

	const onDateClick = (date, events) => {
		if (isBusy) {
			return
		}
		onDateSelected(date, events)
		setSelectedDate(date)
	}
	const nextMonth = () => {
		const nextMonth = dateUtil.addMonths(currentDate, 1)
		onMonthChanged(nextMonth)
		setCurrentDate(nextMonth)
		setSelectedDate(null)
	}
	const prevMonth = () => {
		const prevMonth = dateUtil.subMonths(currentDate, 1)
		onMonthChanged(prevMonth)
		setCurrentDate(prevMonth)
		setSelectedDate(null)
	}

	const renderCells = () => {
		const monthStartDate = dateUtil.startOfMonth(currentDate)
		const monthEndDate = dateUtil.endOfMonth(currentDate)
		const weekStartDate = dateUtil.startOfWeek(monthStartDate)
		const weekEndDate = dateUtil.endOfWeek(monthEndDate)
		const dateFormat = 'D'
		const rows = []
		let day = weekStartDate

		while (day <= weekEndDate) {
			let days = []
			for (let i = 0; i < WEEK_LENGTH; i++) {
				const clonedDay = day
				const formattedDate = dateUtil.format(day, dateFormat)
				const isSameMonthDate = dateUtil.isSameMonth(day, monthStartDate)
				const isSameDate = dateUtil.isSameDay(day, selectedDate)
				const isToday = dateUtil.isSameDay(day, today)
				const isBeforeDate = dateUtil.isBeforeDay(selectedDate, today)
				days.push(
					<div
						key={day}
						className={`col cell ${!isSameMonthDate ? 'disabled' : ''}`}
						onClick={() => onDateClick(clonedDay, events[formattedDate])}
					>
						<div
							style={{
								visibility: !isSameMonthDate ? 'hidden' : 'visible'
							}}
							className={`
								day-number
								${isSameDate ? ' selected' : ''}
								${isBeforeDate ? ' before' : ''}
								${isToday ? ' today' : ''}
							`}
						>
							{formattedDate}
						</div>
						<div
							style={{ visibility: !isSameMonthDate ? 'hidden' : 'visible' }}
							className='events'
						>
							{
								events[formattedDate]?.slice(0, 3).map((event) => {
									const id = event._id
									return (
										<div
											key={id}
											className='event-identifier'
											style={{ background: getHexColor(id) }}
										>
											{id}
										</div>
									)
								})
							}
							{
								events[formattedDate]?.length > 3 ?
									<div className='more-events'>
										<MoreIcon className='more-event-icon' />
									</div> : null
							}
						</div>
					</div>
				)
				day = dateUtil.addDays(day, 1)
			}
			rows.push(
				<div className='row' key={day}>
					{days}
				</div>
			)
		}
		return <div className='date-cells'>{rows}</div>
	}

	const renderHeader = () => {

		return (
			<div className='calendar-header row row-middle'>
				<div className='col col-start'>
					<div className='icon' onClick={prevMonth}>
						<ChevronLeftIcon className='chevron'/>
					</div>
				</div>
				<div className='col col-center'>
					<div>
						{dateUtil.format(currentDate, 'MMMM yyyy')}
					</div>
				</div>
				<div className='col col-end'>
					<div className='icon' onClick={nextMonth}>
						<ChevronRightIcon className='chevron'/>
					</div>
				</div>
			</div>
		)
	}

	const renderWeekDays = () => {
		const dateFormat = 'ddd'
		const weekDays = []
		let startDate = dateUtil.startOfWeek(currentDate)
		for (let i = 0; i < WEEK_LENGTH; i++) {
			weekDays.push(
				<div className='col col-center' key={i}>
					{dateUtil.format(dateUtil.addDays(startDate, i), dateFormat)}
				</div>
			)
		}
		return <div className='week-days row'>{weekDays}</div>
	}

	return (
		<div className='big-calendar-container'>
			{renderHeader()}
			{renderWeekDays()}
			{renderCells()}
		</div>
	)
}

Calendar.defaultProps = {
	onDateSelected: () => { },
	onMonthChanged: () => { },
	events: {},
	isBusy: false
}

Calendar.propTypes = {
	onDateSelected: PropTypes.func,
	onMonthChanged: PropTypes.func,
	events: PropTypes.object,
	isBusy: PropTypes.bool
}

export default Calendar
