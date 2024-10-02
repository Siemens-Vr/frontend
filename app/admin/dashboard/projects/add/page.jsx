// AddProjectModal.jsx
"use client";

import React, { useState } from "react";
import PhasesForm from "./PhasesForm";
import AssigneeForm from "./AssigneesForm";
import ProjectInfo from "./ProjectInfoPage";
import BudgetFundingForm from "./BudgetFundingForm";
import styles from "./AddProjectModal.module.css";

const AddProjectModal = ({ isModalOpen, closeModal, addProject }) => {

    const projectData = {
        projectName: "",
        status: "",
        startDate: "",
        endDate: "",
        comments: "",
        phases: [{ name: "",startDate:"",endDate:"", deliverables: [{ name: "", status: "", comment: "" , assignee:""}] }],
        budget: "",
        funding: "",
        assignees: [],
    }

    const [currentStep, setCurrentStep] = useState(0);
    const [newProject, setNewProject] = useState({
        projectName: "",
        status: "",
        startDate: "",
        endDate: "",
        comments: "",
        phases: [{ name: "",startDate:"",endDate:"", deliverables: [{ name: "", status: "", comment: "", assignee:"" }] }],
        description: "",
        budget: "",
        funding: "",
        assignees: [],
    });

    const [errors, setErrors] = useState({});
    const [isProjectInfoCompleted, setIsProjectInfoCompleted] = useState(false);

    const steps = [
        { title: "Project Info", component: <ProjectInfo newProject={newProject} setNewProject={setNewProject} /> },
        { title: "Assignees", component: <AssigneeForm assignees={newProject.assignees} setNewProject={setNewProject} /> },
        { title: "Phases", component: <PhasesForm phases={newProject.phases} setNewProject={setNewProject} /> },
        { title: "Budget & Funding", component: <BudgetFundingForm newProject={newProject} setNewProject={setNewProject} /> },
    ];

    const validateProjectInfo = () => {
        const newErrors = {};
        if (!newProject.projectName) newErrors.projectName = "Project name is required";
        if (!newProject.startDate) newErrors.startDate = "Start date is required";
        if (!newProject.endDate) newErrors.endDate = "End date is required";
        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;
        setIsProjectInfoCompleted(isValid); // Set completion status
        return isValid;
    };

    const nextStep = () => {
        if (currentStep === 0) {
            if (!validateProjectInfo()) return; // Only proceed if validation passes
        }
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
                                // Only allow clicking if it's the current step or if project info is completed
                                onClick={() => {
                                    if (index === 0 || isProjectInfoCompleted) {
                                        setCurrentStep(index);
                                    }
                                }}
                                // Disable the steps after "Project Info" if validation hasn't passed
                                style={{
                                    cursor: index === 0 || isProjectInfoCompleted ? "pointer" : "not-allowed",
                                    color: index !== 0 && !isProjectInfoCompleted ? "gray" : "inherit",
                                }}
                            >
                                {step.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.modalRight}>
                    <h2>{steps[currentStep].title}</h2>
                    {steps[currentStep].component}
                    {currentStep === 0 && (
                        <div className={styles.errorMessages}>
                            {errors.projectName && <p>{errors.projectName}</p>}
                            {errors.startDate && <p>{errors.startDate}</p>}
                            {errors.endDate && <p>{errors.endDate}</p>}
                        </div>
                    )}
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
