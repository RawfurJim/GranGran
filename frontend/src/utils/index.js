// import ColorHash from 'color-hash';
import moment from 'moment';

export const getHexColor = (str) => {
	// const color = new ColorHash().hex(str)
	return 'green';
}

export const dateUtil = {
	addMonths: (date, number = 0) => {
		return moment(date).add(number, 'months').toDate()
	},
	subMonths: (date, number = 0) => {
		return moment(date).subtract(number, 'months').toDate()
	},
	addDays: (date, number = 0) => {
		return moment(date).add(number, 'days').toDate()
	},
	subDays: (date, number = 0) => {
		return moment(date).subtract(number, 'days').toDate()
	},
	startOfMonth: (date) => {
		return moment(date).startOf('month').toDate()
	},
	startOfWeek: (date) => {
		return moment(date).startOf('week').toDate()
	},
	endOfMonth: (date) => {
		return moment(date).endOf('month').toDate()
	},
	endOfWeek: (date) => {
		return moment(date).endOf('week').toDate()
	},
	isBeforeDay: (date, dateToCompare) => {
		return moment(date).isBefore(dateToCompare, 'day')
	},
	isSameDay: (date, dateToCompare) => {
		return moment(date).isSame(dateToCompare, 'day')
	},
	isSameMonth: (date, dateToCompare) => {
		return moment(date).isSame(dateToCompare, 'month')
	},
	format: (date, pattern='') => {
		return moment(date).format(pattern)
	},
	newDate: () => new Date()
}