// projects/add/page.jsx
"use client";

import React, { useState } from 'react';
import styles from './AddProjectModal.module.css';

const AddProjectModal = ({ isModalOpen, closeModal, addProject }) => {
    const [newProject, setNewProject] = useState({
        projectName: '',
        status: '',
        startDate: '',
        endDate: '',
        comments: '',
        deliverables: '',
        phases: [''], // Initialize with one phase input
        description: '',
        assignees: [''] // Initialize with one assignee input
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProject({ ...newProject, [name]: value });
    };

    const handlePhaseChange = (index, value) => {
        const newPhases = [...newProject.phases];
        newPhases[index] = value;
        setNewProject({ ...newProject, phases: newPhases });
    };

    const addPhase = () => {
        setNewProject({ ...newProject, phases: [...newProject.phases, ''] });
    };

    const removePhase = (index) => {
        const newPhases = newProject.phases.filter((_, i) => i !== index);
        setNewProject({ ...newProject, phases: newPhases });
    };

    const handleAssigneeChange = (index, value) => {
        const newAssignees = [...newProject.assignees];
        newAssignees[index] = value;
        setNewProject({ ...newProject, assignees: newAssignees });
    };

    const addAssignee = () => {
        setNewProject({ ...newProject, assignees: [...newProject.assignees, ''] });
    };

    const removeAssignee = (index) => {
        const newAssignees = newProject.assignees.filter((_, i) => i !== index);
        setNewProject({ ...newProject, assignees: newAssignees });
    };

    const handleAddProject = () => {
        addProject({ ...newProject, phases: newProject.phases.join(', '), assignees: newProject.assignees.join(', ') });
        closeModal();
    };

    return (
        <>
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={`${styles.modalContent} ${styles.scrollable}`}>
                        <h2>Add New Project</h2>

                        <label>Project Name</label>
                        <input
                            type="text"
                            name="projectName"
                            value={newProject.projectName}
                            onChange={handleInputChange}
                        />

                        <label>Status</label>
                        <select
                            name="status"
                            value={newProject.status}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Status</option>
                            <option value="active">Active</option>
                            <option value="not started">Not Started</option>
                        </select>

                        <label>Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={newProject.startDate}
                            onChange={handleInputChange}
                        />

                        <label>End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={newProject.endDate}
                            onChange={handleInputChange}
                        />

                        <label>Comments</label>
                        <input
                            type="text"
                            name="comments"
                            value={newProject.comments}
                            onChange={handleInputChange}
                        />

                        <label>Deliverables</label>
                        <input
                            type="text"
                            name="deliverables"
                            value={newProject.deliverables}
                            onChange={handleInputChange}
                        />

                        <label>Phases</label>
                        {newProject.phases.map((phase, index) => (
                            <div key={index} className={styles.phaseContainer}>
                                <input
                                    type="text"
                                    value={phase}
                                    onChange={(e) => handlePhaseChange(index, e.target.value)}
                                    placeholder={`Phase ${index + 1}`}
                                />
                                <button
                                    type="button"
                                    className={styles.removeButton}
                                    onClick={() => removePhase(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <div className={styles.phaseButtonContainer}>
                            <button type="button" className={styles.addPhaseButton} onClick={addPhase}>
                                Add Phase
                            </button>
                        </div>

                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            value={newProject.description}
                            onChange={handleInputChange}
                        />

                        <label>Assignees</label>
                        {newProject.assignees.map((assignee, index) => (
                            <div key={index} className={styles.assigneeContainer}>
                                <input
                                    type="text"
                                    value={assignee}
                                    onChange={(e) => handleAssigneeChange(index, e.target.value)}
                                    placeholder={`Assignee ${index + 1}`}
                                />
                                <button
                                    type="button"
                                    className={styles.removeButton}
                                    onClick={() => removeAssignee(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <div className={styles.assigneeButtonContainer}>
                            <button type="button" className={styles.addAssigneeButton} onClick={addAssignee}>
                                Add Assignee
                            </button>
                        </div>

                        <label>Budget</label>
                        <input
                            type="text"
                            name="budget"
                            value={newProject.budget}
                            onChange={handleInputChange}
                        />

                        <label>Funding</label>
                        <input
                            type="text"
                            name="funding"
                            value={newProject.funding}
                            onChange={handleInputChange}
                        />

                        <div className={styles.buttonContainer}>
                            <button onClick={closeModal} className={styles.closeButton}>Cancel</button>
                            <button onClick={handleAddProject} className={styles.addButton}>
                                <span className={styles.addButtonIcon}>+</span> Add Project
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddProjectModal;
