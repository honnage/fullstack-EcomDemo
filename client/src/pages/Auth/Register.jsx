import React, { useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (event) => { 
    // console.log(event.target.name, event.target.value)
    setForm({
      ...form, 
      [event.target.name]: event.target.value
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (form.password !== form.confirmPassword){
      return alert('Confirm Password is not match')
    }
    console.log(form.data)

    try {
      const res = await  axios.post('http://localhost:3000/api/register', form)
      console.log(res.data)

      toast.success(res.data)


    } catch (error) {
      const effMsg = error.response?.data?.message
      toast.error(effMsg)
      console.log(error)
    }
  }

  return (
    <div>
      Register

      <form onSubmit={handleSubmit}>
        Email 
        <input  
          onChange={handleOnChange}
          className="border" 
          name="email" 
          type="email">
        </input>
        
        Password 
        <input  
          onChange={handleOnChange} 
          className="border" 
          name="password" 
          type="text"  
        ></input>
        
        Confirm Password{" "}
        <input  
          onChange={handleOnChange} 
          className="border" 
          name="confirmPassword" 
          type="text"
        ></input>
        
        <button className="bg-blue-500 rounded-md">Register</button>

      </form>
    </div>
  );
};

export default Register;
