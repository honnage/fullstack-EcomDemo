import React, { useState } from "react";
import { toast } from 'react-toastify';
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate()
  const actionLogin = useEcomStore((state) => state.actionLogin)
  const user = useEcomStore((state) => state.user)
  const token = useEcomStore((state) => state.token)

  console.log(user, token)


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
    // console.log(form.data)
    try {
      const res = await actionLogin(form)
      // console.log(res)
      if (res.status == 200) {
        const role = res.data.payload.role
        console.log('role', role)
        toast.success('Welcome Back')
        roleRedirect(role)
      }
    } catch (error) {
      console.log(error)
      const errMsg = error.response?.data?.message
      toast.error(errMsg)
    }
  }

  const roleRedirect = (role) => {
    if (role === 'admin'){
      navigate('/admin')
   } else {
      navigate('/user')
    }
  }

  return (
    <div>
      Login 

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
        
        <button className="bg-blue-500 rounded-md">Login</button>

      </form>
    </div>
  );
};

export default Login;
