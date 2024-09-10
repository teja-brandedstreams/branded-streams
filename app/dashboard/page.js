"use client"
import Link from "next/link";
import useStore from "../store/brandedStreamsStore";
import styles from "../ui/dashboard/dashboard.module.css";
import Card from "../ui/dashboard/card/card";
import { Dropdown, DropdownButton, Table } from "react-bootstrap";


export default function Dashboard() {
    const { noData, cardsData } = useStore();
    return (
        <div className={styles.container}>
            {/* {
                noData.map(data => (
                    <div key={data.title} className={styles.noDataSection}>
                        <div className={styles.title}>{data.title}</div>
                        <div className={styles.description}>{data.description}</div>
                        <Link href={data.actionURL} className={styles.link}>{data.actionText}</Link>
                    </div>
                ))
            } */}
            <div className={styles.scriptsTable}>
                <div className={styles.heading}>PPOs</div>
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
                                    <Dropdown.Item href="/dashboard/view">Action</Dropdown.Item>
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
                                    <Dropdown.Item href="/dashboard/view">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </DropdownButton>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className={styles.rightContent}>
                {cardsData.map(card => (
                    <Card card={card} key={card.title} />
                ))}
            </div>
        </div>
    )
}