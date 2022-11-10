import { Form, Container, Button, Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import logo from '../assets/image/D.png';
import "../App.css";
import { useHistory, Link, useLocation } from "react-router-dom";
import axios from "axios";

function LForm() {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    //login
    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/login/', {
            email: email,
            password: password,
        }, { withCredentials: 'true' }).then(() => {
            localStorage.setItem('email', email);
            history.push("/muser");
        }).catch((error) => {
            console.log(error)
            setMsg(error.response.data.msg)
        });
    }
    return (
        <div className="bgLogin">
            <div className="space">
                <Container className="w-40 pt-lg-5">
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center">
                                <img src={logo} alt="logo awal" className="logoD rounded-circle" />
                                <div className="text-muted p-2">Dashboard</div>
                                <h3>Log In to Dasboard</h3>
                                <div className="text-muted p-2 mt-3">Enter your email and password below</div>
                            </Card.Title>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <p className="has-text-centered"></p>
                                    {msg ? (
                                        <div className="alert alert-danger text-center" role="alert">
                                            {msg}
                                        </div>)
                                        : (<></>)}
                                    <Form.Group className="mb-4" controlId="formBasicEmail">
                                        <Form.Label>EMAIL</Form.Label>
                                        <Form.Control type="email" placeholder="Email address" className="formColor"
                                            required onChange={(e) => setEmail(e.target.value)} />

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword" >
                                        <Form.Label className="d-flex justify-content-between">
                                            <div>PASSWORD </div>
                                            <Link to="/forget" className="text-decoration-none text-dark coba ">Forgot password?</Link>
                                        </Form.Label>
                                        <Form.Control type="password" placeholder="Password" className="formColor"
                                            required onChange={(e) => setPassword(e.target.value)} />
                                    </Form.Group>
                                    <div className="d-grid pb-lg-5" >
                                        <Button type="submit" className="button btn btn-lg is-success coba is-fullwidth kuning"
                                        >
                                            Log In
                                        </Button>
                                    </div>
                                    <div>
                                        tidak punya akun? <span style={{paddingLeft:"50px"}} ><Link to={"/SignUp"} className="text-decoration-none">Sign Up</Link></span>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </div>
    );
}


export default LForm;