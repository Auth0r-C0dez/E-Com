import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    try{
      const res = await axios.post('http://localhost:5000/api/auth/register',{name,email,password});
      localStorage.setItem('token', res.data.token);
      navigate('/');
    }catch(err){
      console.error(err);
      alert('Registration failed');
    }
  }

  return (
    <section className="container mx-auto px-4 py-12 max-w-md">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" className="w-full border p-2 rounded" />
        <input name="email" type="email" placeholder="Email" className="w-full border p-2 rounded" />
        <input name="password" type="password" placeholder="Password" className="w-full border p-2 rounded" />
        <button className="w-full bg-indigo-600 text-white py-2 rounded">Register</button>
      </form>
    </section>
  )
}
