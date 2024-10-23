"use client";

import React from 'react';
import styles from '@/app/styles/project/projectInfo.module.css';

const ProjectCard = ({ title, status, assignees, startDate, endDate }) => {
    const statusClass = styles[status.toLowerCase()] || styles.todo; // Fallback class

    return (
        <div className={styles.projectCard}>
            <h3>{title}</h3>
            <div className={styles.status}>
                <span className={statusClass}>{status}</span>
            </div>
            <p className={styles.dates}>
                {startDate} - {endDate}
            </p>
            <p className={styles.assignees}>Assignees: {assignees.join(', ')}</p>
        </div>
    );
};

export default ProjectCard;