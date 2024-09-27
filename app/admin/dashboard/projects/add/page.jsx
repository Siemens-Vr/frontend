// AddProjectModal.jsx
"use client";

import React, { useState } from "react";
import PhasesForm from "./PhasesForm";
import AssigneeForm from "./AssigneesForm"; // Import AssigneeForm
import ProjectInfo from "./ProjectInfoPage";
import BudgetFundingForm from "./BudgetFundingForm";
import styles from "./AddProjectModal.module.css"; // Import CSS modules correctly

const AddProjectModal = ({ isModalOpen, closeModal, addProject }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [newProject, setNewProject] = useState({
        projectName: "",
        status: "",
        startDate: "",
        endDate: "",
        comments: "",
        phases: [{ name: "", deliverables: [{ name: "", status: "", comment: "" }] }],
        description: "",
        budget: "",
        funding: "",
        assignees: [],
    });

    const steps = [
        { title: "Project Info", component: <ProjectInfo newProject={newProject} setNewProject={setNewProject} /> },
        { title: "Assignees", component: <AssigneeForm assignees={newProject.assignees} setNewProject={setNewProject} /> }, // Add Assignees step
        { title: "Phases", component: <PhasesForm phases={newProject.phases} setNewProject={setNewProject} /> },
        { title: "Budget & Funding", component: <BudgetFundingForm newProject={newProject} setNewProject={setNewProject} /> },
    ];

    const nextStep = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const handleSubmit = () => {
        console.log(newProject);
        addProject(newProject); // Add the new project to the list
        closeModal(); // Close the modal after submission
    };

    // Close modal when clicking outside the modal content
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    if (!isModalOpen) return null; // Do not render the modal if it's not open

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalLeft}>
                    <ul className={styles.navList}>
                        {steps.map((step, index) => (
                            <li
                                key={index}
                                className={`${styles.navItem} ${index === currentStep ? styles.active : ""}`}
                                onClick={() => setCurrentStep(index)}
                            >
                                {step.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.modalRight}>
                    <h2>{steps[currentStep].title}</h2>
                    {steps[currentStep].component}
                    <div className={styles.modalButtons}>
                        <button onClick={prevStep} disabled={currentStep === 0}>
                            Back
                        </button>
                        {currentStep < steps.length - 1 ? (
                            <button onClick={nextStep}>Next</button>
                        ) : (
                            <button onClick={handleSubmit}>Submit</button>
                        )}
                    </div>
                    <button className={styles.closeButton} onClick={closeModal}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProjectModal;
