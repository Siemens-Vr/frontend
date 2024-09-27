"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styles from './ProjectInfo.module.css';

const ProjectInfo = () => {





    const searchParams = useSearchParams();
    const router = useRouter();

    const projectName = searchParams.get('projectName') || '';
    const status = searchParams.get('status') || '';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';
    const comments = searchParams.get('comments') || '';
    const deliverables = searchParams.get('deliverables') || '';
    const phases = searchParams.get('phases') || '';
    const description = searchParams.get('description') || '';
    const assignees = searchParams.get('assignees') || '';
    const budget = searchParams.get('budget') || '';
    const funding = searchParams.get('funding') || '';

    const phasesArray = phases ? phases.split(', ') : [];
    const assigneesArray = assignees ? assignees.split(', ') : [];

    const [activeSection, setActiveSection] = useState('default');

    const handleProjectNameClick = () => {
        setActiveSection('default');
    };

    return (
        <div className={styles.projectInfoContainer}>
            {/* Navbar */}
            <div className={styles.navbar}>
                <h1
                    className={styles.projectName}
                    onClick={handleProjectNameClick}
                    style={{ cursor: 'pointer', color: '#1e90ff' }}
                >
                    {projectName}
                </h1>
                <div className={styles.navButtons}>
                    <button onClick={() => setActiveSection('assignees')}>Assignees</button>
                    <button onClick={() => setActiveSection('deliverables')}>Deliverables</button>
                    <button onClick={() => setActiveSection('phases')}>Phases</button>
                </div>
            </div>

            {activeSection === 'default' && (
                <div className={styles.projectDetails}>
                    <p><strong>Status:</strong> {status}</p>
                    <p><strong>Description:</strong> {description}</p>
                    <p><strong>Top Contributors:</strong> {assigneesArray.join(', ')}</p>
                </div>
            )}

            <div className={styles.contentWrapper}>
                {activeSection === 'phases' && (
                    <div className={styles.phasesSidebar}>
                        <h2>Phases</h2>
                        {phasesArray.map((phase, index) => (
                            <button key={index} className={styles.phaseButton}>
                                {phase}
                            </button>
                        ))}
                    </div>
                )}

                <div className={styles.mainContent}>
                    {activeSection === 'assignees' && (
                        <div>
                            <h2>Assignees</h2>
                            <p>{assigneesArray.join(', ')}</p>
                        </div>
                    )}
                    {activeSection === 'deliverables' && (
                        <div>
                            <h2>Deliverables</h2>
                            <p>{deliverables}</p>
                        </div>
                    )}
                    {activeSection === 'phases' && (
                        <div>
                            <h2>Phase Details</h2>
                            <p>Click a phase button on the left to see details.</p>
                        </div>
                    )}
                </div>

                <div className={styles.budgetSidebar}>
                    <h2>Budget and Funding</h2>
                    <p><strong>Budget:</strong> {budget}</p>
                    <p><strong>Funding:</strong> {funding}</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectInfo;
