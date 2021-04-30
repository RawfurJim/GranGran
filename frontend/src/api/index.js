import axios from 'axios'
const BASE_URL = 'http://localhost:4000/api/v1'

const api = axios.create({
	baseURL: BASE_URL
})

const PATHS = {
	signup: '/auth/signup',
	signin: '/auth/signin',
	me: '/auth/me',
}

const signUp = (userData) => {
	return api.post(PATHS.signup, userData)
		.then((response) => {
			return response.data
		})
		.catch((e) => {
			return null
		})
}

const signIn = (userData) => {
	return api.post(PATHS.signin, userData)
		.then((response) => {
			return response.data
		})
		.catch((e) => {
			return null
		})
}

const getAuthUser = (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	}
	return api.get(PATHS.me, config)
		.then((response) => {
			return response.data
		}).catch(() => {
			return null
		})
}

export const API = {
	signUp,
	signIn,
	getAuthUser
}