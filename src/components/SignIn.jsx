import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './SignIn.css'
const SignIn = () => {

    let [username,setUsername]=useState("")
    let [password,setPassword]=useState("")
    let [loading,setLoading] =useState("")
    let [error, setError] = useState("")


    let navigate =useNavigate()

    const submitForm  =async (e) => {
        e.preventDefault();
        try {
            setError("")
            setLoading("please wait ...")

          const data = new FormData()
          data.append("username", username)
          data.append("password", password)

          const response = await axios.post("https://TrevorKinyanjui.pythonanywhere.com/api/signin", data)

          if(response.data.user){
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/")
          } else{
            setLoading("")
            setError(response.data.Message)
          }
        } catch (error) {
            setLoading("")
            setError(error.message)
            
        }
    }

    return ( 
        <div className="row justify-content-center signin-container">
            <div className="col-md-6 signin-card">
            <h2>Sign In</h2>
            <p className="text-danger">{error}</p>
            <p className="text-warning">{loading}</p>
            <form onSubmit={submitForm}>
                <input type="text" className="form-control" placeholder="Username" required onChange={(e)=>setUsername(e.target.value)}/>
                <br />
                <input type="password" className="form-control" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)} />
                <br />
                <button className="btn btn-success">Sign Up</button> <br /> 
            </form>
            <br />
            <p>Don't have an account ? <br />
                <Link to="/signup"> Sign Up</Link></p>
            </div>
            
        </div>
    );
}
 
export default SignIn;