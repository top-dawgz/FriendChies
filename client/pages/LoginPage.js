import React, { useState, useRef } from 'react';
import { redirect } from "react-router-dom";
import { Form, Button, Card } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function LoginPage() {

    const [userVal, setUserVal] = useState("");
    const [passVal, setPassVal] = useState("");
    const navigate = useNavigate();

    async function login() {
        try {

            await axios.post('/api/user/login', {
                username: userVal,
                password: passVal
            })

        // return redirect("/login");
            navigate("/profile")
        }
        catch(e) {
            return e;
        }
        
    };

    async function handleSubmit(e) {
        e.preventDefault()
        await login();

        // if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
        //     return 'Passwords do not match'
        // }
        
    }


    return (
        <>
        <div className="w-100" style={{ maxWidth: "400px"}}>
         <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                <Form>
                    <Form.Group id="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={(e) => setUserVal(e.target.value)} type="username" value={userVal} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e) => setPassVal(e.target.value)} type="password" value={passVal} required />
                    </Form.Group>
                    <Button className="w-100 mt-3" type="submit" onClick={handleSubmit}>Log In</Button>
                </Form>
            </Card.Body>
         </Card>
         <div className="w-100 text-center mt-2">Forgot username or password? Click here</div>
        </div>
        </>
    )
}