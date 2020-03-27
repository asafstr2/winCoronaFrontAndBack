import React, { Component } from 'react'
import "./login.css"
import { Link } from "react-router-dom";
import axios from 'axios';


export class login extends Component {
    state={
        username:"",
        password:""
    }





 login= async(e)=> {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        "email": this.state.username,
        "password": this.state.password
      });
      let token=response.data.token
      localStorage.setItem("token", token);
      console.log(token);
    } catch (error) {
      console.error(error.response.data);
    }
  }
handleChange=(e)=> {
    this.setState({[e.target.name]: e.target.value});
  }
    render() {
        return (
       
<div className="container">
	<div className="d-flex justify-content-center h-100">
		<div className="card">
			<div className="card-header">
				<h3>Sign In</h3>
				<div className="d-flex justify-content-end social_icon">
					<span><i className="fab fa-facebook-square"></i></span>
					<span><i className="fab fa-google-plus-square"></i></span>
					<span><i className="fab fa-twitter-square"></i></span>
				</div>
			</div>
			<div className="card-body">
				<form onSubmit={this.login}>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-user"></i></span>
						</div>
						<input  name ="username" type="text" className="form-control" placeholder="username" value={this.state.username} onChange={this.handleChange} />
						
					</div>
					<div className="input-group form-group">
						<div className="input-group-prepend">
							<span className="input-group-text"><i className="fas fa-key"></i></span>
						</div>
						<input name ="password" type="password" className="form-control" placeholder="password" value={this.state.password} onChange={this.handleChange}/>
					</div>
					<div className="row align-items-center remember">
						<input type="checkbox"/>Remember Me
					</div>
					<div className="form-group">
						<input type="submit" value="Login" className="btn float-right login_btn"/>
					</div>
				</form>
			</div>
			<div className="card-footer">
				<div className="d-flex justify-content-center links">
					Don't have an account?<Link to="/signup">Sign Up</Link>
				</div>
				<div className="d-flex justify-content-center">
					<Link to="#">Forgot your password?</Link>
				</div>
			</div>
		</div>
	</div>
</div>
        )
    }
}

export default login
