const backendApi = ''

async function request (route, method, body = null) {
	try {
		let headers = {}
		if(!(body instanceof FormData) && method != 'GET') {
			headers['Content-Type'] = 'application/json'
			body = JSON.stringify(body || null)
		}
	
		let response = await fetch(backendApi + route, {
			method,
			headers,
			body
		})

		if(response.status == 401) {
			response = await response.json()
			messageText.textContent = response.message

			return setTimeout(() => {
				return window.location = '/login'
			}, 1000)
			
		} else if(response.status != 200) {
			response = await response.json()
			messageText.textContent = response.message

			return setTimeout(() => {
				return window.location = '/login'
			}, 1000)
			
		} else {
			return await response.json()
		}

	} catch(error) {
		alert(error.message)

		return setTimeout(() => {
			return window.location = '/login'
		}, 1000)
	}	

}

function createElements (...elements) {
	return elements.map(el => {
		return document.createElement(el)
	})
}