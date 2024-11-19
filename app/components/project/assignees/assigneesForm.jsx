// AssigneesForm.jsx
import React from 'react';
import styles from '@/app/styles/project/assignees/assigneesForm.module.css';
import { FaTrash, FaPlus } from 'react-icons/fa'; // Importing trash and plus icons

const AssigneeForm = ({ assignees, setNewProject }) => {
    const handleAssigneeChange = (index, field, value) => {
        const newAssignees = [...assignees];
        newAssignees[index] = { ...newAssignees[index], [field]: value };
        setNewProject(prev => ({ ...prev, assignees: newAssignees }));
    };

    const addAssignee = () => {
        setNewProject(prev => ({
            ...prev,
            assignees: [...prev.assignees, { name: '', role: '',access:'',dateJoined:'', gender: '' }],
        }));
    };

    const removeAssignee = (index) => {
        const newAssignees = assignees.filter((_, i) => i !== index);
        setNewProject(prev => ({ ...prev, assignees: newAssignees }));
    };

    return (
        <div className={styles.assigneesForm}>
            <h3>Assignees</h3>
            {assignees.map((assignee, index) => (
                <div key={index} className={styles.assigneeSection}>
                    <div className={styles.assigneeInputs}>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={assignee.name}
                                onChange={(e) => handleAssigneeChange(index, 'name', e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Gender:
                            <select
                                value={assignee.gender}
                                onChange={(e) => handleAssigneeChange(index, 'gender', e.target.value)}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                {/*<option value="other">Other</option>*/}
                            </select>
                        </label>
                    </div>
                    <div className={styles.roleAgeInputs}>
                        <label>
                            Role:
                            <input
                                type="text"
                                value={assignee.role}
                                onChange={(e) => handleAssigneeChange(index, 'role', e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Access:
                            <input
                                type="text"
                                value={assignee.access}
                                onChange={(e) => handleAssigneeChange(index, 'access', e.target.value)}
                                required
                            />
                        </label>

                        <label>
                            Date Joined:
                            <input
                                type="date"
                                className={styles.ageInput} // Class for the age input
                                value={assignee.dateJoined}
                                onChange={(e) => handleAssigneeChange(index, 'dateJoined', e.target.value)}
                            />
                        </label>
                    </div>
                    <button type="button" onClick={() => removeAssignee(index)} className={styles.removeButton}>
                        <FaTrash />
                    </button>
                </div>
            ))}
            <button type="button" onClick={addAssignee} className={styles.addButton}>
                <FaPlus />
            </button>
        </div>
    );
};

export default AssigneeForm;