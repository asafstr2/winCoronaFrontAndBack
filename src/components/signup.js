import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  
 

    state = {
     friends:[{}]
    }
  

    handleChange=(e)=> {
      this.setState({[e.target.name]: e.target.value});
    }


    handleChangearr=(e)=> {
      this.setState({friends: [{friend:e.target.value}]});
    }

  signup= async(e)=> {
    e.preventDefault();
    const user =await  JSON.stringify({...this.state})
    const config={headers: {'Content-Type': 'application/json'}}
    console.log(user);
    try {
      const response = await axios.post('http://localhost:5000/api/signin', user,config);
      console.log(response);
    } catch (error) {
      console.error(error.response.data);
    }
  }










  render() {
    return (
<div className="span3 well">
      <legend>New to WebApp? Sign up!</legend>
    <form acceptCharset="UTF-8" onSubmit={this.signup}>
		    <input className="span3" name="firstName" placeholder="first Name" type="text" value={this.state.firstName} onChange={this.handleChange}/> 
        <input className="span3" name="lastName" placeholder="last name" type="text" value={this.state.lastName} onChange={this.handleChange}/>
        <input className="span3" name="password" placeholder="Password" type="password" value={this.state.password} onChange={this.handleChange}/> 
        <input className="span3" name="email" placeholder="email" type="email" value={this.state.email} onChange={this.handleChange}/> 
        <input className="span3" name="friends" placeholder="friends" type="text" value={this.state.friends[0].friend} onChange={this.handleChangearr}/> 

        <button className="btn btn-warning" type="submit">Sign up for WebApp</button>
    </form>
</div>
    )
  }
}