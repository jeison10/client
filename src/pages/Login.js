import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Login.css'




function App() {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	//const [login, setLogin] = useState(false)



	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:3001/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			window.location.href = '/alluser'
		} else {
			alert('Please check your username and password')
			//setLogin(true)
		}

	
	}



	
	return (
		
		<div className="Auth-form-container">
		<form className="Auth-form">
		  <div className="Auth-form-content">
			<h3 className="Auth-form-title">Welcome</h3>
			<div className="form-group mt-3">
			  <label>Email address</label>
			  <input
				type="email"
				className="form-control mt-1"
				placeholder="Enter email"
				value={email} onChange={(e) => setEmail(e.target.value)}
			  />
			</div>
			<div className="form-group mt-3">
			  <label>Password</label>
			  <input
				type="password"
				className="form-control mt-1"
				placeholder="Enter password"
				value={password} onChange={(e) => setPassword(e.target.value)}
			  />
			</div>
			<div className="d-grid gap-2 mt-3">
			  <button type="submit" className="btn btn-primary" onClick={loginUser}>
				Login
			  </button>
			</div>
			<div className="d-grid gap-2 mt-3">
			  <a className="btn btn-dark" href='/register' >
				Sing up
			  </a>
			</div>
			
			
		  </div>
		</form>
	  </div>
	)
}

export default App

