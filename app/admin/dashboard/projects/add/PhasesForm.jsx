import React from "react";
import styles from "./PhasesForm.module.css";

const PhasesForm = ({ phases, setNewProject }) => {
    const handlePhaseChange = (index, field, value) => {
        const newPhases = [...phases];
        newPhases[index] = { ...newPhases[index], [field]: value };
        setNewProject((prev) => ({ ...prev, phases: newPhases }));
    };

    const handleDeliverableChange = (phaseIndex, deliverableIndex, field, value) => {
        const newPhases = [...phases];
        newPhases[phaseIndex].deliverables[deliverableIndex] = { ...newPhases[phaseIndex].deliverables[deliverableIndex], [field]: value };
        setNewProject((prev) => ({ ...prev, phases: newPhases }));
    };

    const addDeliverable = (phaseIndex) => {
        const newPhases = [...phases];
        newPhases[phaseIndex].deliverables.push({ name: "", status: "", comment: "" });
        setNewProject((prev) => ({ ...prev, phases: newPhases }));
    };

    const deletePhase = (index) => {
        const newPhases = phases.filter((_, phaseIndex) => phaseIndex !== index);
        setNewProject((prev) => ({ ...prev, phases: newPhases }));
    };

    const addPhase = () => {
        const newPhases = [...phases, { name: "", startDate: "", endDate: "", status: "", deliverables: [] }];
        setNewProject((prev) => ({ ...prev, phases: newPhases }));
    };

    return (
        <div className={styles.phasesForm}>
            {phases.map((phase, index) => (
                <div key={index} className={styles.phase}>
                    <label>
                        Phase Name:
                        <input
                            type="text"
                            value={phase.name}
                            onChange={(e) => handlePhaseChange(index, "name", e.target.value)}
                        />
                    </label>
                    <label>
                        Start Date:
                        <input
                            type="date"
                            value={phase.startDate}
                            onChange={(e) => handlePhaseChange(index, "startDate", e.target.value)}
                        />
                    </label>
                    <label>
                        End Date:
                        <input
                            type="date"
                            value={phase.endDate}
                            onChange={(e) => handlePhaseChange(index, "endDate", e.target.value)}
                        />
                    </label>
                    <label>
                        Status:
                        <select
                            value={phase.status}
                            onChange={(e) => handlePhaseChange(index, "status", e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="not started">Not Started</option>
                            <option value="in progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="on hold">On Hold</option>
                            <option value="canceled">Canceled</option>
                        </select>
                    </label>
                    <div>
                        {phase.deliverables.map((deliverable, deliverableIndex) => (
                            <div key={deliverableIndex} className={styles.deliverable}>
                                <label>
                                    Deliverable Name:
                                    <input
                                        type="text"
                                        value={deliverable.name}
                                        onChange={(e) => handleDeliverableChange(index, deliverableIndex, "name", e.target.value)}
                                    />
                                </label>
                                <label>
                                    Status:
                                    <select
                                        value={deliverable.status}
                                        onChange={(e) => handleDeliverableChange(index, deliverableIndex, "status", e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="todo">To Do</option>
                                        <option value="inProgress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </label>
                                <label>
                                    Comment:
                                    <input
                                        type="text"
                                        value={deliverable.comment}
                                        onChange={(e) => handleDeliverableChange(index, deliverableIndex, "comment", e.target.value)}
                                    />
                                </label>
                            </div>
                        ))}
                        <button type="button" onClick={() => addDeliverable(index)}>
                            + Add Deliverable
                        </button>
                    </div>
                    <button type="button" onClick={() => deletePhase(index)}>
                        Delete Phase
                    </button>
                </div>
            ))}
            <button type="button" onClick={addPhase}>
                + Add Phase
            </button>
        </div>
    );
};

export default PhasesForm;
