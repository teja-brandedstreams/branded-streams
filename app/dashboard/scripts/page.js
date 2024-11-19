"use client"
import { useRef, useState } from "react";
import styles from "../../ui/dashboard/scripts/scripts.module.css";
import { BiUpload } from "react-icons/bi";
import useStore from "@/app/store/brandedStreamsStore";
import Link from "next/link";
import Form from 'react-bootstrap/Form';
import Card from "@/app/ui/dashboard/card/card";
import { Button, Dropdown, DropdownButton, Modal, Table } from "react-bootstrap";
import { uploadScript } from "@/app/lib/actions";
import axios from "axios";


export default function Scripts() {
    const [showModal, setShowModal] = useState(false);
    const [handleSuccessfulModal, setHandleSuccessfulModal] = useState(false);
    const scriptName = useRef();
    const fileName = useRef();
    const { cardsData } = useStore();
    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSuccessCloseModal = () => {
        setHandleSuccessfulModal(false);
    }

    const handleScriptUpload = async () => {
        const formData = new FormData();
        const file = fileName.current.files[0]; // Get the single file

        if (!file) {
            console.error('No file selected');
            return;
        }


        formData.append('file', file); // Append the file
        // Append other fields as necessary
        formData.append('user_file_name', scriptName.current.value);
        formData.append('user_content_type', 1);
        const result = await uploadScript(formData);
        console.log(result);
        if (result) {
            setShowModal(false);
            setHandleSuccessfulModal(true);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftContent}>
                <div className={styles.uploadScriptSection}>
                    <h2>Welcome John Doe to the</h2>
                    <h2>Branded Streams Script Management Center</h2>
                    <h3>Please upload a script to get started</h3>
                    <button className={styles.uploadScript} onClick={handleButtonClick}><BiUpload size={50} /></button>
                </div>
                <div className={styles.scriptsTable}>
                    <div className={styles.heading}>Existing Scripts</div>
                    <Table className={styles.dataTable} variant="dark">
                        <thead>
                            <tr>
                                <td>Script Name</td>
                                <td>Status</td>
                                <td>Last Updated</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>The past life</td>
                                <td>PPO Report Generated</td>
                                <td>2nd Aug 2024</td>
                                <td>
                                    <DropdownButton variant="secondary">
                                        <Dropdown.Item href="/dashboard/view">View</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Re-Upload</Dropdown.Item>
                                    </DropdownButton>
                                </td>
                            </tr>
                            <tr>
                                <td>The past life</td>
                                <td>Script Score Generated</td>
                                <td>2nd Aug 2024</td>
                                <td>
                                    <DropdownButton variant="secondary">
                                        <Dropdown.Item href="/dashboard/view">View</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </DropdownButton>
                                </td>
                            </tr>
                            <tr>
                                <td>Wicked Wickets</td>
                                <td>Script Uploaded</td>
                                <td>2nd Aug 2024</td>
                                <td>
                                    <DropdownButton variant="secondary">
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </DropdownButton>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
            <div className={styles.rightContent}>
                {cardsData.map(card => (
                    <Card card={card} key={card.title} />
                ))}
            </div>

            <Modal show={handleSuccessfulModal} onHide={handleSuccessCloseModal} backdrop="static" className={styles.uploadModal}>
                <Modal.Header className={styles.modalHeader} closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <div>Script uploaded successfully!!</div>
                </Modal.Body>
                <Modal.Footer className={styles.modalHeader}>
                    <Button variant="secondary" onClick={handleSuccessCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModal} onHide={handleCloseModal} backdrop="static" className={styles.uploadModal}>
                <Modal.Header className={styles.modalHeader} closeButton>
                    <Modal.Title>Upload Script</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <Form.Group controlId="fromScriptName" className="mb-3">
                        <Form.Label>Script Name</Form.Label>
                        <Form.Control type="text" ref={scriptName} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Script</Form.Label>
                        <Form.Control type="file" ref={fileName} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className={styles.modalHeader}>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleScriptUpload}>
                        Upload File
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}