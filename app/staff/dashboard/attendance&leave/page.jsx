"use client";

import React, { useState } from 'react';
import styles from '../../../../app/staff/ui/attendance&leave/attendanceLeave.module.css';

const AttendanceLeave = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([
        { id: 1, name: 'John Doe', present: false, arrivalTime: '' },
        { id: 2, name: 'Jane Smith', present: false, arrivalTime: '' },
    ]);

    const [leaveForm, setLeaveForm] = useState({
        employeeNumber: '',
        startDate: '',
        endDate: '',
        reason: ''
    });

    const handleCheckboxChange = (id) => {
        setAttendanceRecords(records =>
            records.map(record =>
                record.id === id
                    ? { ...record, present: !record.present }
                    : record
            )
        );
    };

    const handleTimeChange = (id, time) => {
        setAttendanceRecords(records =>
            records.map(record =>
                record.id === id
                    ? { ...record, arrivalTime: time }
                    : record
            )
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLeaveForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

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

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <h2 className={styles.subHeading}>Attendance Records</h2>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th className={styles.tableHead}>Name</th>
                        <th className={styles.tableHead}>Present</th>
                        <th className={styles.tableHead}>Arrival Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {attendanceRecords.map(record => (
                        <tr key={record.id} className={styles.tableRow}>
                            <td className={styles.tableData}>{record.name}</td>
                            <td className={styles.tableData}>
                                <input
                                    type="checkbox"
                                    checked={record.present}
                                    onChange={() => handleCheckboxChange(record.id)}
                                />
                            </td>
                            <td className={styles.tableData}>
                                {record.present && (
                                    <input
                                        type="time"
                                        value={record.arrivalTime}
                                        onChange={(e) => handleTimeChange(record.id, e.target.value)}
                                        className={styles.input}
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.section}>
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

export default AttendanceLeave;
