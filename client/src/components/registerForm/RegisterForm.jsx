// src/components/RegisterForm.js
import React, { useState } from "react";
import "./RegisterForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",

    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        // console.log("Form submitted:", formData);
        try {
            const res = await axios.post("/api/v1/auth/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
            console.log("Fetched", res)
            if (res.data.success) {
                alert("Registered Successfully")
                navigate("/login");
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.username}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <button type="submit">Register</button>
                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
