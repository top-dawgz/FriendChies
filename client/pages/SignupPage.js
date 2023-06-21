import React, { useState, useRef, useEffect } from 'react';
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from 'react-bootstrap'
import axios from 'axios';

export default function SignupPage() {

    //get username and password value
    const [userVal, setUserVal] = useState("");
    const [passVal, setPassVal] = useState("");
    const [passConfirmationVal, setPassConfirmationVal] = useState("");
    const navigate = useNavigate();
      
      
    async function signup() {
       try {
        console.log('signup function activated');
        console.log('USERNAME IS', userVal)
        console.log('PASSWORD IS', passVal)
        console.log('PASSWORD CONFIRMATION IS', passConfirmationVal)
       
        console.log('before redirect')
        // return redirect("/login");
        navigate("/login")

        await axios.post('/api/user/signup', {
            username: userVal,
            password: passVal
            }) 
            
        
        
    }
        catch(err){
            console.log('signupERROR', err)
        }
    };

    async function handleSubmit(e) {
        console.log('SIGN UP handleSubmit has been clicked')
        e.preventDefault()
        await signup();
    }

    return (
        <>
        <div className="w-100" style={{ maxWidth: "400px"}}>
         <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                <Form>
                    <Form.Group id="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={(e) => setUserVal(e.target.value)} type="username" value={userVal} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e) => setPassVal(e.target.value)} type="password" value={passVal} required />
                    </Form.Group>
                    <Form.Group id="passwordConfirmation">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control onChange={(e) => setPassConfirmationVal(e.target.value)} type="password" value={passConfirmationVal} required />
                    </Form.Group>
                    <Button className="w-100 mt-3" type="submit" onClick={handleSubmit}>Sign Up</Button>
                </Form>
            </Card.Body>
         </Card>
         <div className="w-100 text-center mt-2">Already have an account? Log in</div>
        </div>
        </>
    )
}
