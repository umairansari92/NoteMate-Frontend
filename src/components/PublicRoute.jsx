import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function PublicRoute() {
	const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
	if (token) {
		return <Navigate to="/" replace />
	}
	return <Outlet />
}


