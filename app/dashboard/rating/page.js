"use client";
import { useState } from "react";
import styles from "../../ui/dashboard/scripts/scripts.module.css";
import { BiUpload } from "react-icons/bi";
import useStore from "@/app/store/brandedStreamsStore";
import Link from "next/link";
import Form from 'react-bootstrap/Form';
import Card from "@/app/ui/dashboard/card/card";
import { Button, Dropdown, DropdownButton, Modal, Table } from "react-bootstrap";


export default function Scripts() {
    const [showModal, setShowModal] = useState(false);
    const { cardsData } = useStore();
    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

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
                                <td>Script Rating Generated</td>
                                <td>2nd Aug 2024</td>
                                <td>
                                    <DropdownButton variant="secondary">
                                        <Dropdown.Item href="/dashboard/view">View</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Re-Upload</Dropdown.Item>
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

            <Modal show={showModal} onHide={handleCloseModal} backdrop="static" className={styles.uploadModal}>
                <Modal.Header className={styles.modalHeader} closeButton>
                    <Modal.Title>Upload Script</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <Form.Group controlId="fromScriptName" className="mb-3">
                        <Form.Label>Script Name</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Script</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className={styles.modalHeader}>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleCloseModal}>
                        Upload File
                    </Button>
                </Modal.Footer>
            </Modal>

        </div >
    )
}