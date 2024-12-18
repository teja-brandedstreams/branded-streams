"use client"
import { useEffect, useRef, useState } from "react";
import styles from "../../ui/dashboard/scripts/scripts.module.css";
import { BiUpload } from "react-icons/bi";
import useStore from "@/app/store/brandedStreamsStore";
import Link from "next/link";
import Form from 'react-bootstrap/Form';
import Card from "@/app/ui/dashboard/card/card";
import { Button, Dropdown, DropdownButton, Modal, Table } from "react-bootstrap";
import { getScriptDetails, uploadScript } from "@/app/lib/actions";
import SpinnerOverlay from "@/app/ui/overlay/overlay";


export default function Scripts({ user }) {
    const [showModal, setShowModal] = useState(false);
    const [overlay, setOverlay] = useState(true);
    const [scriptDetails, setScriptDetails] = useState([]);
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
        (result);
        if (result) {
            setShowModal(false);
            setHandleSuccessfulModal(true);
        }
    }

    const formatDate = (dateString) => {
        // const dateString = "2024-11-01T18:12:03.615978";
        const date = new Date(dateString);

        // Create an array of month names
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Get individual components
        const day = ("0" + date.getDate()).slice(-2); // Day in two digits
        const month = months[date.getMonth()];       // Month name
        const year = date.getFullYear();             // Full year
        let hours = date.getHours();                 // Hours
        const minutes = ("0" + date.getMinutes()).slice(-2); // Minutes in two digits
        const ampm = hours >= 12 ? 'pm' : 'am';      // AM/PM
        hours = hours % 12;                          // Convert to 12-hour format
        hours = hours ? ("0" + hours).slice(-2) : '12';  // Ensure two digits for hour, show 12 for midnight/noon

        // Format the string as desired
        return `${month} ${day} ${year} ${hours}:${minutes} ${ampm}`;
    }


    useEffect(() => {
        const fetchScriptDetails = async () => {
            ("Scripts page..");
            try {
                const result = await getScriptDetails();
                setScriptDetails(result.data);
                setOverlay(false); // Set overlay state after the component has mounted

            } catch {
                setOverlay(false);
                alert("Unable to fetch script details. Please try again!");
            }
        };

        fetchScriptDetails();
    }, []); // Empty dependency array ensures this only runs once on mount

    return (
        <div className={styles.container}>
            <SpinnerOverlay loading={overlay} />
            <div className={styles.leftContent}>
                <div className={styles.uploadScriptSection}>
                    <h2>Welcome {user.firstName} {user.lastName} to the</h2>
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
                            {
                                scriptDetails && scriptDetails.length > 0 ? (
                                    scriptDetails.map((script, index) => (
                                        <tr key={index}>
                                            <td>{script.FileName}</td>
                                            <td>{script.Jobs && script.Jobs.length > 0 ? 'Reports Generated' : 'Script Uploaded'}</td>
                                            <td>{formatDate(script.UploadDate)}</td>
                                            <td>
                                                <DropdownButton variant="secondary">
                                                    <Dropdown.Item href="/dashboard/view">View</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">Delete</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Re-Upload</Dropdown.Item>
                                                </DropdownButton>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No scripts found</td>
                                    </tr>
                                )
                            }
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