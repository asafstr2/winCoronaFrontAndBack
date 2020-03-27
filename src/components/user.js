import React, { Component } from 'react'
import axios from "axios"
export class user extends Component {
    


state={}

    componentDidMount() {
        this.getUser()
    }

    getUser = async () => {
        let token=localStorage.getItem("token");
        let  base_URI = `http://localhost:5000/api/protected/user?token=${token}`
        try {
            const response = await axios.get(base_URI);
            console.log(response.data);
            this.setState(response.data)
        } catch (error) {
            console.error(error);
        }
    }


    deletetUser = async () => {
        let token=localStorage.getItem("token");
        let  base_URI = `http://localhost:5000/api/protected/user?token=${token}`
        try {
            const response = await axios.delete(this.base_URI);
            console.log(response.data);
            this.setState(response.data)
        } catch (error) {
            console.error(error);
        }
    }



    render() {
        return (
            <div>
            <p>{this.state.firstName}</p>
            <p>{this.state.lastName}</p>
            <p>{this.state.email}</p>

            </div>
        )
    }
}

export default user
