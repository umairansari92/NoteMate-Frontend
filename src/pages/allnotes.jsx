import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { FiEdit, FiTrash2, FiSearch } from 'react-icons/fi'


const AllNotes = () => {
	const [notes, setNotes] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [query, setQuery] = useState('')
	const [editingId, setEditingId] = useState(null)
	const [editTitle, setEditTitle] = useState('')
	const [editContent, setEditContent] = useState('')

	const token = localStorage.getItem('token')
	const API = 'https://note-mate-backend-six.vercel.app/notes'

	async function fetchNotes() {
		setLoading(true)
		setError('')
		try {
			const res = await axios.get(`${API}/all`, {
				headers: { Authorization: `Bearer ${token}` }
			})
			setNotes(res.data.notes || [])
		} catch (e) {
			setError(e.response?.data?.message || e.message || 'Failed to load notes')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchNotes()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const filteredNotes = useMemo(() => {
		if (!query.trim()) return notes
		const q = query.toLowerCase()
		return notes.filter(n => (n.title || '').toLowerCase().includes(q) || (n.content || '').toLowerCase().includes(q))
	}, [notes, query])

	async function handleDelete(id) {
		try {
			await axios.delete(`${API}/${id}`, { headers: { Authorization: `Bearer ${token}` } })
			setNotes(prev => prev.filter(n => n._id !== id))
		} catch (e) {
			alert(e.response?.data?.message || e.message || 'Delete failed')
		}
	}

	function handleStartEdit(note) {
		setEditingId(note._id)
		setEditTitle(note.title || '')
		setEditContent(note.content || '')
	}

	function handleCancelEdit() {
		setEditingId(null)
		setEditTitle('')
		setEditContent('')
	}

	async function handleUpdateNote() {
		if (!editingId) return
		try {
			const res = await axios.put(
				`${API}/${editingId}`,
				{ title: editTitle, content: editContent },
				{ headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
			)
			const updated = res.data.note
			setNotes(prev => prev.map(n => (n._id === updated._id ? updated : n)))
			handleCancelEdit()
		} catch (e) {
			alert(e.response?.data?.message || e.message || 'Update failed')
		}
	}

	return (
		<div>
			<Navbar />
				<div className="px-6 py-6 max-w-6xl mx-auto">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
					<h1 className="text-2xl font-semibold">All Notes</h1>
					<div className="relative w-full sm:w-96">
						<FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
						<input
							type="text"
							placeholder="Search notes..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/90 dark:bg-slate-800/70 text-gray-900 dark:text-slate-100 border border-gray-200 dark:border-slate-700 outline-none focus:border-indigo-500 dark:focus:border-indigo-500 shadow-inner placeholder:text-gray-400 dark:placeholder:text-slate-400 transition-colors"
						/>
					</div>
				</div>

				{loading && <div className="text-gray-500">Loading notes...</div>}
				{!loading && error && <div className="text-red-500">{error}</div>}
				{!loading && !error && filteredNotes.length === 0 && (
					<div className="text-gray-500">No notes found.</div>
				)}

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{filteredNotes.map(note => (
						<div key={note._id} className="bg-white dark:bg-slate-900/70 border border-slate-700 p-5 rounded-2xl shadow-lg ring-1 ring-indigo-500/5 hover:ring-indigo-500/15 transition-all hover:shadow-xl hover:-translate-y-0.5">
							{editingId === note._id ? (
								<div className="space-y-2">
									<input
										type="text"
										className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 outline-none"
										value={editTitle}
										onChange={e => setEditTitle(e.target.value)}
									/>
									<textarea
										rows={3}
										className="w-full px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 outline-none"
										value={editContent}
										onChange={e => setEditContent(e.target.value)}
									/>
								</div>
							) : (
								<>
									<h3 className="font-bold text-lg text-gray-900 dark:text-slate-100 wrap-break-word">{note.title}</h3>
									<p className="text-gray-700 dark:text-slate-300 mt-1 whitespace-pre-wrap wrap-break-word">{note.content}</p>
								</>
							)}

									<span className="text-sm text-gray-400 dark:text-slate-400 block mt-2">
								{new Date(note.updatedAt).toLocaleDateString()}
							</span>

							<div className="flex justify-end gap-3 mt-3">
								{editingId === note._id ? (
									<>
										<button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full" onClick={handleUpdateNote}>Save</button>
										<button className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded-full" onClick={handleCancelEdit}>Cancel</button>
									</>
								) : (
									<>
										<button className="p-2 rounded-full text-blue-500 bg-blue-500/10 hover:bg-blue-500/20 transition" onClick={() => handleStartEdit(note)}><FiEdit /></button>
										<button className="p-2 rounded-full text-red-500 bg-red-500/10 hover:bg-red-500/20 transition" onClick={() => handleDelete(note._id)}><FiTrash2 /></button>
									</>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default AllNotes
