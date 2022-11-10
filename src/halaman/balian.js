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
export const Balian = () => {
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
            name: "Address",
            sortable: true,
            selector: row => row.address,
            center: true,
        }, {
            name: "Gender",
            selector: row => row.gender,
            sortable: true,
            center: true,
        },
        {
            name: "Phone Number",
            selector: row => row.phone,
            sortable: true,
            center: true,
        },
        {
            name: "Deskripsi",
            selector: row => row.description,
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
        axios.get("http://localhost:5000/balian", { withCredentials: 'true' })
            .then((response) => {
                setData(response.data);
            })
    };
    //logout

    //hapus set modal yang masuk
    const delState = () => {
        setId('');
        setFullName('');
        setAddress('');
        setPhone('');
        setGender('');
        setAge('');
        setDes('');
        setError("");
    }
    //modal hapus
    const [tampil, setTampil] = useState(false);
    const handleHapus = (id) => {
        axios.get("http://localhost:5000/balian/" + id, { withCredentials: 'true' })
            .then((response) => {
                setId(response.data.id);
                setFullName(response.data.name);

                setTampil(true);
            }).catch((error) => {
                setError(error.response.data.msg);
            });
    };
    const deleteData = (id) => {
        axios.delete("http://localhost:5000/balian/" + id, { withCredentials: 'true' })
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
        axios.get("http://localhost:5000/balian/" + id, { withCredentials: 'true' })
            .then((response) => {
                setId(response.data.id);
                setFullName(response.data.name);
                setAddress(response.data.address);
                setPhone(response.data.phone);
                setGender(response.data.gender);
                setAge(response.data.age);
                setDes(response.data.description);
                setEdit(true);
            }).catch((error) => {
                setError(error.response.data.msg);
            });
    };
    const updateProduct = async (id) => {
        axios.patch("http://localhost:5000/balian/" + id, {
            name: full_name,
            phone: phone,
            address: address,
            age: age,
            description: description,
            gender: gender,
        }, { withCredentials: 'true' })
    }

    //modal add
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        delState();
    }
    const handleBuka = () => setOpen(true);
    const [id, setId] = useState("");
    const [user_id, setUserId] = useState("");
    const [full_name, setFullName] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [description, setDes] = useState("");
    const insertData = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/balian/', {
            name: full_name,
            user_id: user_id,
            phone: phone,
            address: address,
            age: age,
            description: description,
            gender: gender,
        }, { withCredentials: 'true' }).then(() => {
            getUser();
            handleClose();
        }).catch((error) => {
            setError(error.response.data.msg);
        });
    };

    //Balian data
    const [filterText, setFilterText] = React.useState('');

    const filteredItems = data.filter(
        item=> item.name.toLowerCase().includes(filterText.toLowerCase())
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
                        </div>
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
                                                    <Form.Label>user id </Form.Label>
                                                    <Form.Control type="text" placeholder="User Id" required
                                                        onChange={(e) => setUserId(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
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
                                                <Form.Group className="mb-3" controlId="formBasicaddress">
                                                    <Form.Label>address </Form.Label>
                                                    <Form.Control type="text" placeholder="address" required
                                                        onChange={(e) => setAddress(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Label>Gender</Form.Label>
                                                <Form.Select aria-label="Default select example" required onChange={(e) => setGender(e.target.value)}>
                                                    <option value=""> Select gender</option>
                                                    <option value="Laki-laki">Laki-laki</option>
                                                    <option value="Perempuan">Perempuan</option>

                                                </Form.Select>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicage">
                                                    <Form.Label>age</Form.Label>
                                                    <Form.Control type="number" placeholder="age" required
                                                        onChange={(e) => setAge(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicage">
                                                    <Form.Label>Deskripsi</Form.Label>
                                                    <Form.Control type="text" placeholder="Deskripsi" required
                                                        onChange={(e) => setDes(e.target.value)} />
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
                                                <Form.Group className="mb-3" controlId="formBasicaddress">
                                                    <Form.Label>address</Form.Label>
                                                    <Form.Control type="text" placeholder="address" required
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Label>Gender</Form.Label>
                                                <Form.Select aria-label="Default select example" required onChange={(e) => setGender(e.target.value)}>
                                                    <option value={gender}>{gender}</option>
                                                    <option value="Laki-laki">Laki-laki</option>
                                                    <option value="Perempuan">Perempuan</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicage">
                                                    <Form.Label>age</Form.Label>
                                                    <Form.Control type="number" placeholder="age"
                                                        value={age}
                                                        onChange={(e) => setAge(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group className="mb-3" controlId="formBasicage">
                                                    <Form.Label>Deskripsi</Form.Label>
                                                    <Form.Control type="text" placeholder="deskripsi"
                                                        value={description}
                                                        onChange={(e) => setDes(e.target.value)} />
                                                </Form.Group>
                                            </Col>
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

export default Balian;


