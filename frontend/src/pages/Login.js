import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login(){
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try{
      const res = await axios.post('http://localhost:5000/api/auth/login',{email,password});
      localStorage.setItem('token', res.data.token);
      navigate('/');
    }catch(err){
      console.error(err);
      alert('Login failed');
    }
  }

  return (
    <section className="container mx-auto px-4 py-12 max-w-md">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="Email" className="w-full border p-2 rounded" />
        <input name="password" type="password" placeholder="Password" className="w-full border p-2 rounded" />
        <button className="w-full bg-indigo-600 text-white py-2 rounded">Login</button>
      </form>
    </section>
  )
}
