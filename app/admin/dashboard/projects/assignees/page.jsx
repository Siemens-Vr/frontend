"use client";

import React, { useState } from "react";
import styles from "./assignees.module.css"; // Import the CSS module
import Search from "../../../../student/ui/dashboard/search/search";

export default function Assignees() {
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownIndex, setDropdownIndex] = useState(null); // Track which user dropdown is open

    const availableAssignees = [
        { name: 'Kimani Nyutu', role: 'Admin', gender: 'Male', lastActive: 'Mar 4, 2024', joined: 'July 4, 2022' },
        { name: 'Amélie Laurent', role: 'Data Expert', gender: 'Female', lastActive: 'Mar 4, 2024', joined: 'July 4, 2022' },
        { name: 'Armour Foley', role: 'Data Expert', gender: 'Male', lastActive: 'Mar 2, 2024', joined: 'July 4, 2022' },
        // Add more users as needed
    ];

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredAssignees = availableAssignees.filter((assignee) =>
        assignee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleDropdown = (index) => {
        setDropdownIndex(dropdownIndex === index ? null : index); // Toggle the dropdown
    };

    const handleEdit = (index) => {
        // Handle edit logic for the user
        console.log("Edit user at index", index);
    };

    const handleDelete = (index) => {
        // Handle delete logic for the user
        console.log("Delete user at index", index);
    };

    return (
        <div className={styles.assigneeContainer}>
            <h1 className={styles.assigneeHeading}>User Management</h1>
            <h3 className={styles.description}>Manage your team members and their role permissions here</h3>
            <div className={styles.assignees}>
                <div className={styles.topBar}>
                    <p>All Users ({availableAssignees.length})</p>
                    <Search
                        placeholder="Search for assignee"
                        value={searchTerm}
                        onChange={handleChange}
                        className={styles.searchInput}
                    />
                    <button className={styles.addUserButton}>+ Add user</button>
                </div>

                {filteredAssignees.length > 0 ? (
                    <table className={styles.assigneesTable}>
                        <thead>
                        <tr>
                            <th className={styles.tableHeader}>Username</th>
                            <th className={styles.tableHeader}>Role</th>
                            <th className={styles.tableHeader}>Gender</th>
                            <th className={styles.tableHeader}>Last Active</th>
                            <th className={styles.tableHeader}>Joined</th>
                            <th className={styles.tableHeader}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredAssignees.map((assignee, index) => (
                            <tr key={index}>
                                <td className={styles.tableCell}>{assignee.name}</td>
                                <td className={styles.tableCell}>{assignee.role}</td>
                                <td className={styles.tableCell}>{assignee.gender}</td>
                                <td className={styles.tableCell}>{assignee.lastActive}</td>
                                <td className={styles.tableCell}>{assignee.joined}</td>
                                <td className={styles.tableCell}>
                                    <div className={styles.actionsContainer}>
                                        <button
                                            className={styles.actionButton}
                                            onClick={() => toggleDropdown(index)}
                                        >
                                            ...
                                        </button>
                                        {dropdownIndex === index && (
                                            <div className={styles.dropdownMenu}>
                                                <p
                                                    className={styles.dropdownItem}
                                                    onClick={() => handleEdit(index)}
                                                >
                                                    Edit
                                                </p>
                                                <p
                                                    className={styles.dropdownItem}
                                                    onClick={() => handleDelete(index)}
                                                >
                                                    Delete
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p className={styles.noUsers}>No users found</p>
                )}
            </div>
        </div>
    );
}
