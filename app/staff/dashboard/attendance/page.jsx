"use client";

import React, { useState } from 'react';
import styles from '../../../../app/staff/ui/attendance&leave/attendanceLeave.module.css';

const AttendanceLeave = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([
        { id: 1, name: 'John Doe', present: false, arrivalTime: '' },
        { id: 2, name: 'Jane Smith', present: false, arrivalTime: '' },
    ]);


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
        </div>
    );
};

export default AttendanceLeave;
