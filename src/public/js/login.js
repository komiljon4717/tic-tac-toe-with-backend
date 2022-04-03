form.onsubmit = async event => {
	event.preventDefault()

	const username = usernameInput.value.trim()
	const file = fileInput.files[0]

	if(
		!file ||
		!username ||
		username.length > 50
	) return

	const formData = new FormData()
	formData.append('username', username)
	formData.append('file', file)

	let response = await request('/login', 'POST', formData)

	// window.localStorage.setItem('admin', response.admin)
	window.location = '/'
}