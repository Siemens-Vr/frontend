// projects/page.jsx
"use client";

import React, { useState } from 'react';
import ProjectCard from '../../ui/dashboard/projects/page';
import styles from './projects.module.css';
import AddProjectModal from '../projects/add/page';

export default function Projects() {
    const [availableProjects, setAvailableProjects] = useState([
        {
            projectName: "SIFA",
            status: "active",
            startDate: "2024-08-01",
            endDate: "2024-10-01",
            comments: "Initial setup",
            deliverables: "Phase 1 deliverables",
            phases: "Phase 1, Phase 2",
            budget: "10000",
            funding: "5000",
            description: "Project SIFA involves initial setup and phase planning.",
            assignees: ["John Doe", "Jane Smith"]
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const addProject = (newProject) => {
        setAvailableProjects([...availableProjects, newProject]);
    };

    return (
        <>
            <div className={styles.projectsContainer}>
                <div className={styles.projectsHeader}>
                    <h1 className={styles.projectsTitle}>Projects</h1>
                    <button className={styles.projectsAdd} onClick={openModal}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="white" d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        ADD PROJECT
                    </button>
                </div>

                <div className={styles.projectsCards}>
                    {availableProjects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            projectName={project.projectName}
                            status={project.status}
                            startDate={project.startDate}
                            endDate={project.endDate}
                            comments={project.comments}
                            deliverables={project.deliverables}
                            phases={project.phases}
                            budget={project.budget}
                            funding={project.funding}
                            description={project.description}
                            assignees={project.assignees}
                        />
                    ))}
                </div>
            </div>

            <AddProjectModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                addProject={addProject}
            />
        </>
    );
}
