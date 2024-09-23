"use client";

import React from 'react';
import styles from './projectsCards.module.css';

const ProjectCard = ({ title, status, assignees, startDate, endDate }) => {
    return (
        <div className={styles.projectCard}>
            <h3>{title}</h3>
            <div className={styles.status}>
                <span className={styles[status.toLowerCase()]}>{status}</span>
            </div>
            <p className={styles.dates}>
                {startDate} - {endDate}
            </p>
            <p className={styles.assignees}>Assignees: {assignees.join(', ')}</p>
        </div>
    );
};

export default ProjectCard;
