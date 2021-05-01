import { useContext} from 'react'
import { AuthContext } from '../context/auth'
import { StateContext } from '../context/state'



export const useAuth = () => {
	const context = useContext(AuthContext)

	if (context === undefined) {
		throw new Error('useAuth must be used within a AuthProvider.')
	}
	return context
}

export const useGlobalState = () => {
	const context = useContext(StateContext)

	if (context === undefined) {
		throw new Error('useGlobalState must be used within a StateProvider.')
	}
	return context
}