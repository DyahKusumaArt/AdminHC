import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "../App.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import DataTable from "react-data-table-component";
import axios from "axios";
import { useHistory } from "react-router-dom";
import LayoutDashboard from "../layout/layout";

// paginasi
const paginationComponentOptions = {
    rowsPerPageText: 'Rows for Page',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'ALL',

};
const customStyles = {
    headRow: {
        style: {

        }
    },
    rows: {
        style: {
            // override the row height
            borderBottomStyle: 'none !important',
            borderBottomColor: 'none',
            margin: '3px 0px ',
        },
    },
    pagination: {
        style: {
            borderBlockStart: 'none',
            margin: '7px 0px 0px 0px'
        }
    },
};

//Crud, select, search
export const Obat = () => {
    const history = useHistory();
    const [error, setError] = useState('');
    //menampilkan kolom dan isi tabel.
    const columns = [
        {
            name: "Name",
            sortable: true,
            selector: row => row.name,
            center: true,
        },
        {
            name: "Deskripsi",
            selector: row => row.deskripsi,
            sortable: true,
            center: true,
        },
        {
            name: "Stock",
            selector: row => row.stock,
            sortable: true,
            center: true,
        },
        {
            name: "Price",
            selector: row => row.price,
            sortable: true,
            center: true,
            
        },
        {
            name: "Edit",
            center: true,
            cell: row => (
                <div>
                    <Row>
                        <Col>
                            <FontAwesomeIcon size="lg" icon={faEdit} onClick={() => HandleEdit(row.id)} />
                        </Col>
                        <Col>
                            <FontAwesomeIcon size="lg" icon={faTrashAlt} onClick={() => handleHapus(row.id)} />
                        </Col>
                    </Row>
                </div>
            )
        }
    ];

    //CRUD User Management
    const [data, setData] = useState([]);
    //get data user
    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        axios.get("http://localhost:5000/obat", { withCredentials: 'true' })
            .then((response) => {
                setData(response.data);
            })
    };
    //logout
    const logOut = async () => {
        axios.delete("http://localhost:3000/logout", { withCredentials: 'true' })
            .then((response) => {
                history.push("/muser");
            })
    };

    //hapus set modal yang masuk
    const delState = () => {
        setId('');
        setFullName('');
        setEmail('');
        setPhone('');
        setRole('');
        setPassword('');
        setConfPassword('');
        setError("");
    }
    //modal hapus
    const [tampil, setTampil] = useState(false);
    const handleHapus = (id) => {
        axios.get("http://localhost:5000/users/" + id, { withCredentials: 'true' })
            .then((response) => {
                setId(response.data.id);
                setFullName(response.data.name);
                setEmail(response.data.email);
                setPhone(response.data.phone);
                setRole(response.data.role);
                setPassword(response.data.password);
                setConfPassword(response.data.password);
                setTampil(true);
            }).catch((error) => {
                setError(error.response.data.msg);
            });
    };
    const deleteData = (id) => {
        axios.delete("http://localhost:5000/users/" + id, { withCredentials: 'true' })
            .then(() => {
                getUser();
                handleTtp();
            }).catch((error) => {
                setError(error.response.data.msg);
            });
    };
    const handleTtp = () => {
        setTampil(false);
        delState();
    };

    //modal Edit
    const [edit, setEdit] = useState(false);
    const handleTutup = () => {
        setEdit(false);
        delState();
    }
    const HandleEdit = (id) => {
        axios.get("http://localhost:5000/users/" + id, { withCredentials: 'true' })
            .then((response) => {
                setId(response.data.id);
                setFullName(response.data.name);
                setEmail(response.data.email);
                setPhone(response.data.phone);
                setRole(response.data.role);
                setPassword(response.data.password);
                setConfPassword(response.data.password);
                setEdit(true);
            }).catch((error) => {
                setError(error.response.data.msg);
            });
    };
    const updateProduct = async (id) => {
        axios.patch("http://localhost:5000/users/" + id, {
            name: full_name,
            phone: phone,
            email: email,
            password: password,
            confPassword: confPassword,
            role: role,
        }, { withCredentials: 'true' })
        // if (role == "Employee") {
        //     axios.patch("http://localhost:5000/employee-edit/" + id, {
        //         name_employee: full_name,
        //         phone: phone,
        //     }, { withCredentials: 'true' })
        //         .then((res) => {
        //             handleTutup();
        //         })
        // } else if (role == "Student") {
        //     axios.patch("http://localhost:5000/students-edit/" + id, {
        //         name_student: full_name,
        //         phone: phone,
        //     }, { withCredentials: 'true' })
        //         .then((res) => {
        //             handleTutup();
        //         })
        // }
    }

    //modal add
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        delState();
    }
    const handleBuka = () => setOpen(true);
    const [id, setId] = useState("");
    const [full_name, setFullName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const insertData = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/users/', {
            name: full_name,
            phone: phone,
            email: email,
            password: password,
            confPassword: confPassword,
            role: role,
        }, { withCredentials: 'true' }).then(() => {
            getUser();
            handleClose();
        }).catch((error) => {
            setError(error.response.data.msg);
        });
    };

    //Obat data
    const [filterText, setFilterText] = React.useState('');
    const [filterE, setFilterE] = React.useState('');
    const [filterS, setFilterS] = React.useState('');

    const filterPerm = [...new Set(data.map(item => item.role))];
    const filteredItems = data.filter(
        item => item.email.toLowerCase().includes(filterE.toLowerCase()) &&
            item.name.toLowerCase().includes(filterText.toLowerCase()) &&
            item.role.includes(filterS),
    );

    return (
        <>
            <LayoutDashboard>
                <div className="back mt-4">
                    <div className="content d-flex justify-content-between mb-3">
                        <div>
                            <input className="content1 rounded-5 shadow"
                                id="search"
                                type="text"
                                placeholder="Search Name"
                                aria-label="Search Input"
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                            />
                            <select
                                onChange={(e) => setFilterS(e.target.value)}
                                className="content1 rounded-5 shadow"
                                aria-label="Filter user">
                                <option value="">Permissions ALL</option>
                                {filterPerm.map((item) => (
                                    <option value={item}>{item}</option>
                                ))}
                            </select>
                            <input
                                className="content1 rounded-5 shadow"
                                id="search"
                                type="text"
                                placeholder="Search Email"
                                aria-label="Search Input"
                                value={filterE}
                                onChange={(e) => setFilterE(e.target.value)}
                            /></div>
                        <div>
                          
                            <span><Button className="content3 rounded-5 shadow" onClick={handleBuka}> + New User </Button></span>
                            <Modal //modal tambah
                                show={open}
                                backdrop="static"
                                size="lg"
                                keyboard={false}
                                centered
                            >
                                <Modal.Header className="d-flex flex-column">
                                    <div closeButton></div>
                                    <Modal.Title>New User</Modal.Title>
                                    {error ? (
                                        <div className="alert alert-danger text-center" role="alert">
                                            {error}
                                        </div>)
                                        : (<></>)}

                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={insertData}>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicName">
                                                    <Form.Label>Name </Form.Label>
                                                    <Form.Control type="text" placeholder="Full Name" required
                                                        onChange={(e) => setFullName(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicPhone">
                                                    <Form.Label>Phone Number</Form.Label>
                                                    <Form.Control type="number" placeholder="Phone number" required
                                                        onChange={(e) => setPhone(e.target.value)} />
                                                </Form.Group>

                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Email </Form.Label>
                                                    <Form.Control type="email" placeholder="Email" required
                                                        onChange={(e) => setEmail(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Label>Permissions</Form.Label>
                                                <Form.Select aria-label="Default select example" required onChange={(e) => setRole(e.target.value)}>
                                                    <option value=""> Select Role</option>
                                                    <option value="Balian">Balian</option>
                                                    <option value="Admin">Admin</option>
                                                    <option value="Customer">Customer</option>
                                                    <option value="Guest">Guest</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Password" required
                                                        onChange={(e) => setPassword(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Confirm Password" required
                                                        onChange={(e) => setConfPassword(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row className="mx-auto d-flex justify-content-between">
                                            <Button variant="danger" onClick={() => handleClose()} className="w-45">
                                                Cancel
                                            </Button>
                                            <Button variant="success" type="submit" className="w-45" >
                                                Save
                                            </Button>
                                        </Row>
                                    </Form>
                                </Modal.Body>
                            </Modal>

                            <Modal //delete
                                show={tampil}
                                onHide={handleTtp}
                                backdrop="static"
                                size="lg"
                                keyboard={false}
                                centered
                            >
                                <Modal.Header closeButton>

                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={() => deleteData(id)}>
                                        <img className="text-center d-flex justify-content-center mx-auto" style={{ alignItems: 'center', width: '100px', height: '100px' }}
                                            src="https://cdn-icons-png.flaticon.com/512/4201/4201973.png" alt="drive image" />
                                        <Row>
                                            <h2 className="text-center">Are You Sure?</h2>
                                        </Row>
                                        <Row className="pb-3">
                                            <Col className="text-center">
                                                <h4>Do you want to delete "{full_name}"?</h4>
                                            </Col>
                                        </Row>
                                        {/* <Row>
                                        <Col className="text-center mb-4">
                                            <h2>email: {item.email}</h2>
                                        </Col>
                                    </Row> */}
                                        <Row className=" mx-auto">
                                            <Button className="red" key={id} variant="danger" type="submit">
                                                Delete
                                            </Button>
                                        </Row>
                                    </Form>

                                </Modal.Body>
                            </Modal>

                            <Modal //modal edit
                                show={edit}

                                backdrop="static"
                                size="lg"
                                keyboard={false}
                                centered
                            >
                                <Modal.Header className="d-flex justify-content-center">
                                    <Modal.Title>Edit User</Modal.Title>
                                    {error ? (
                                        <div className="alert alert-danger text-center" role="alert">
                                            {error}
                                        </div>)
                                        : (<></>)}
                                </Modal.Header>
                                <Modal.Body>

                                    <Form onSubmit={() => updateProduct(id)}>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicName">
                                                    <Form.Label>Full Name</Form.Label>
                                                    <Form.Control type="text" placeholder="Full Name" required
                                                        value={full_name}
                                                        onChange={(e) => setFullName(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicPhone">
                                                    <Form.Label>Phone Number</Form.Label>
                                                    <Form.Control type="number" placeholder="ex: 081" required
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="email" placeholder="Email" required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Label>Permissions</Form.Label>
                                                <Form.Select aria-label="Default select example" required onChange={(e) => setRole(e.target.value)}>
                                                    <option value={role}>{role}</option>
                                                    <option value="Employee">Employee</option>
                                                    <option value="Admin">Admin</option>
                                                    <option value="Student">student</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                        <Row>
                                            {/* <Col>
                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Password"
                                                        value={confPassword}
                                                        onChange={(e) => setConfPassword(e.target.value)} />
                                                </Form.Group>
                                            </Col> */}
                                        </Row>
                                        <Row className="mx-auto d-flex justify-content-between">
                                            <Button variant="danger" onClick={() => handleTutup()} className="w-45">
                                                Cancel
                                            </Button>
                                            <Button variant="success" type="submit" className="w-45" >
                                                Save
                                            </Button>
                                        </Row>
                                    </Form>

                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                    <div className="shadow">
                        <DataTable
                            keyField='id'
                            key={'id'}
                            title="User"
                            columns={columns}
                            data={filteredItems}
                            pagination
                            paginationComponentOptions={paginationComponentOptions}
                            fixedHeader
                            highlightOnHover
                            pointerOnHover
                            responsive
                            noHeader
                            customStyles={customStyles}
                        />
                    </div>
                </div >

            </LayoutDashboard>
        </>
    );
};

export default Obat;


