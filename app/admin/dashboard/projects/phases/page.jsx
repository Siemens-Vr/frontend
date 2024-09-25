"use client";
import React, { useState } from 'react';
import styles from './deliverablesTable.module.css';

const Phases = () => {
    const [activePhase, setActivePhase] = useState(1);
    const phases = ['Phase 1', 'Phase 2', 'Phase 3'];

    const deliverables = [
        { id: 1, status: 'Completed', comment: 'Good job', assignee: 'John' },
        { id: 2, status: 'In Progress', comment: 'Needs review', assignee: 'Jane' },
        { id: 3, status: 'Pending', comment: '', assignee: 'Doe' }
    ];

    return (
        <div className={styles.container}>
            <h1>Project Phases</h1>
            <div className={styles.tabs}>
                {phases.map((phase, index) => (
                    <button
                        key={index}
                        className={activePhase === index + 1 ? styles.activeTab : styles.tab}
                        onClick={() => setActivePhase(index + 1)}
                    >
                        {phase}
                    </button>
                ))}
            </div>

            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Deliverable</th>
                    <th>Status</th>
                    <th>Comment</th>
                    <th>Assignee</th>
                </tr>
                </thead>
                <tbody>
                {deliverables.map(deliverable => (
                    <tr key={deliverable.id}>
                        <td>{deliverable.id}</td>
                        <td>{deliverable.status}</td>
                        <td>{deliverable.comment}</td>
                        <td>{deliverable.assignee}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className={styles.budgetSummary}>
                <h2>Budget Summary</h2>
                <p>Total Budget: $5000</p>
                <p>Spent: $3000</p>
                <p>Remaining: $2000</p>
            </div>
        </div>
    );
};

export default Phases;
