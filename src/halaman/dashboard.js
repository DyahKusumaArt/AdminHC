import { Form, Container, Button, Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import logo from '../assets/image/D.png';
import "../App.css";
import { useHistory, Link, useLocation } from "react-router-dom";
import axios from "axios";
import LayoutDashboard from "../layout/layout";

function Dashboard() {

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
        <><LayoutDashboard>
            <div className="bgLogin">
                <div className="space">
                    <Container className=" pt-lg-5 d-flex justify-content-between">
                        <Card style={{ width: '250px', height: '150px' }}>
                            <Card.Body>
                                <Card.Title className="text-center">
                                    Jumlah Balian
                                </Card.Title>
                                <Card.Body>

                                </Card.Body>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '250px', height: '150px' }}>
                            <Card.Body>
                                <Card.Title className="text-center">
                                    Jumlah Customer
                                </Card.Title>
                                <Card.Body>

                                </Card.Body>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '250px', height: '150px', padding: '5px' }}>
                            <Card.Body>
                                <Card.Title className="text-center">
                                    Jumlah Obat
                                </Card.Title>
                                <Card.Body>

                                </Card.Body>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            </div>

        </LayoutDashboard>
        </>
    );
}


export default Dashboard;