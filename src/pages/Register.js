import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'
import "./Login.css"
import userImage from './user.png'



function App() {

	let navigate = useNavigate();

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [image, setimage] = useState('')
	const [idc, setidc] = useState(userImage)

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:3001/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
				idc
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			alert("Usuário cadastrado!")
			navigate('/login');
		}
	}

	const uploadImage = async () =>{
		try {
			const formData= new FormData()
			formData.append("file", image)
			formData.append("upload_preset","ml_default")
			
			Axios.post("https://api.cloudinary.com/v1_1/dnbpmrxun/image/upload", formData)
			.then ((response) =>  {
				const imageID= response.data.public_id
				const url = 'https://res.cloudinary.com/dnbpmrxun/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1665071083/'
				setidc(url+imageID)
				console.log(idc)})}
	 
		catch (err){
				console.log(err)
	}

}


	return (
		<div className="Auth-form-container">
		<form className="Auth-form">
		  <div className="Auth-form-content">
			<h3 className="Auth-form-title">Register</h3>

			


			<div className="form-group mt-2">
				
			  <label>Full Name</label>
			  <input
				type="text"
				className="form-control mt-1"
				placeholder="Maria Alves"
				value={name} onChange={(e) => setName(e.target.value)}
			  />
			</div>
			<div className="form-group mt-3">
			  <label>Email address</label>
			  <input
				type="email"
				className="form-control mt-1"
				placeholder="Email Address"
				value={email} onChange={(e) => setEmail(e.target.value)}
			  />
			</div>
			<div className="form-group mt-3">
			  <label>Password</label>
			  <input
				type="password"
				className="form-control mt-1"
				placeholder="Password"
				value={password} onChange={(e) => setPassword(e.target.value)}
			  />
			</div>
			

			<div className="imageUpload p-3">
				
				<img src = {idc} class="rounded float-left" alt="" width={125} height={125}/>
	
				<div className="form-group mt-3">
				<input type="file"  onChange={(e) => {setimage(e.target.files[0])}}/>
	
				<div className="form-group mt-2">
				<button type="file"  onClick={uploadImage} className="btn btn-dark">upload</button>
				</div>
				</div>
				</div>

			<div className="d-grid gap-2 mt-3">
			  <button type="submit" className="btn btn-primary" onClick={registerUser}>
				Register
			  </button>
			</div>
			
		  </div>
		</form>
	  </div>
	)
}

export default App




