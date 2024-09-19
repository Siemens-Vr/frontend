"use client";

import React, { useState } from 'react';
import styles from '../../../../app/staff/ui/attendance&leave/attendanceLeave.module.css';

const Leave = () => {

    const [leaveForm, setLeaveForm] = useState({
        employeeNumber: '',
        startDate: '',
        endDate: '',
        reason: ''
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Leave request submitted:', leaveForm);
        // Here you can add the logic to handle the leave request, such as sending it to a server
        // For now, just clear the form
        setLeaveForm({
            employeeNumber: '',
            startDate: '',
            endDate: '',
            reason: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLeaveForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };


    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <h2 className={styles.subHeading}>Leave Status</h2>

                <h2 className={styles.subHeading}>Leave Request</h2>
                <form onSubmit={handleSubmit} className={styles.leaveForm}>
                    <div className={styles.formGroupRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="employeeNumber" className={styles.label}>Employee Number</label>
                            <input
                                type="text"
                                id="employeeNumber"
                                name="employeeNumber"
                                value={leaveForm.employeeNumber}
                                onChange={handleInputChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="startDate" className={styles.label}>Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={leaveForm.startDate}
                                onChange={handleInputChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="endDate" className={styles.label}>End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={leaveForm.endDate}
                                onChange={handleInputChange}
                                className={styles.input}
                            />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="reason" className={styles.label}>Reason</label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={leaveForm.reason}
                            onChange={handleInputChange}
                            className={styles.textarea}
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>Request</button>
                </form>
            </div>
        </div>
    );
};

export default Leave;
