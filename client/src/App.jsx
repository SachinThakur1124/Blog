import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegisterForm from './components/registerForm/RegisterForm'
import LoginForm from './components/loginForm/LoginForm'
import BlogHome from './components/home/HomePage'

export default function App() {
    return (
        <Routes>
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/' element={<BlogHome />} />
            <Route path='/login' element={<LoginForm />} />
        </Routes>

    )
}
