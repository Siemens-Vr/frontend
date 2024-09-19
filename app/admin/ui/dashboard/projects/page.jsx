"use client";

import Link from 'next/link';
import styles from './projectsCards.module.css';

const getRemainingTime = (startDate, endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.ceil(diffDays / 30); // Approximate months
    return {
        days: diffDays > 0 ? diffDays : 0,
        months: diffMonths > 0 ? diffMonths : 0,
    };
};

const ProjectCard = ({ projectName, status, startDate, endDate, comments, deliverables, phases, budget, funding, description, assignees }) => {
    const { days, months } = getRemainingTime(startDate, endDate);

    // Add description and assignees to the query string
    const queryString = new URLSearchParams({
        projectName,
        status,
        startDate,
        endDate,
        comments,
        deliverables,
        phases,
        budget,
        funding,
        description,
        assignees: assignees.join(', ')  // Join array into a comma-separated string
    }).toString();

    return (
        <Link href={`/admin/dashboard/projects/projectInfo?${queryString}`} className={styles.cardContainer}>
            <div className={`${styles.projectName} ${styles[status]}`}>
                {projectName}
                <div className={styles.statusCircle} />
            </div>
            <div className={styles.cardFooter}>
                <div className={styles.dates}>
                    <p>Start Date: {startDate}</p>
                    <p>End Date: {endDate}</p>
                </div>
                {status === 'active' && (
                    <div className={styles.statusContainer}>
                        <p className={styles.footerText}>
                            {months > 0 ? `${months} months remaining` : `${days} days remaining`}
                        </p>
                    </div>
                )}
                {status === 'rejected' && (
                    <p className={styles.footerText}>Rejected</p>
                )}
            </div>
        </Link>
    );
};

export default ProjectCard;
