import React from 'react'
import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import { FiX as CloseIcon } from 'react-icons/fi'
import './modal.scss'


const Modal = ({ children, onClose, isOpen }) => {
	if (!isOpen) return null
	return createPortal(
		<>
			<div onClick={onClose} id='modal-overlay'/>
			<div id='modal'>
				<CloseIcon
					size='32px'
					className='close-icon-button'
					onClick={onClose}
				/>
				{children}
			</div>
		</>,
		document.getElementById('modal-root')
	)
}

Modal.defaultProps = {
	onClose: () => { },
	isOpen: false
}

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
	isOpen: PropTypes.bool,
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node)
	])
}

export default Modal
