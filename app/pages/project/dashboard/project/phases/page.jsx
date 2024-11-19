"use client"
import React, {useState, useEffect} from 'react';
import styles from '@/app/styles/project/project/project.module.css';
import {FaEdit, FaPlus, FaTimes, FaTrash} from "react-icons/fa";

const Phases = ({uuid,backendUrl,phases, setPhases}) => {
    const [newPhase, setNewPhase] = useState({ name: '', startDate: '', endDate: '', status: '',deliverables: [] });
    const [showPhaseInput, setShowPhaseInput] = useState(false);
    const [newPhaseDeliverable, setNewPhaseDeliverable] = useState({ name: '', status: '', assignees: [], budget: 0 });
    const [showPhaseDeliverableInput, setShowPhaseDeliverableInput] = useState(false);


// Handlers for Phases CRUD
    const [isAdding, setIsAdding] = useState(false);
    const [addPhaseError, setAddPhaseError] = useState('');

    const addPhase = async () => {
        if (newPhase.name.trim()) {
            setIsAdding(true);
            setAddPhaseError('');

            try {
                const payload = {
                    phases: [
                        {
                            name: newPhase.name,
                            startDate: new Date(newPhase.startDate).toISOString(),
                            endDate: new Date(newPhase.endDate).toISOString(),
                            status: newPhase.status,
                            deliverables: newPhase.deliverables,
                        },
                    ],
                };

                console.log("Payload:", JSON.stringify(payload)); // Confirm payload format
                const response = await fetch(`${backendUrl}/phases/${uuid}/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    const createdPhase = await response.json();
                    console.log("Created Phase:", createdPhase); // Confirm backend response
                    setPhases([...phases, createdPhase]);
                    setNewPhase({ name: '', startDate: '', endDate: '', status: '', deliverables: [] });
                    setShowPhaseInput(false);
                } else {
                    const errorText = await response.text();
                    console.error("Failed to add phase:", errorText);
                    setAddPhaseError('Failed to add phase.');
                }
            } catch (error) {
                console.error("Error in addPhase function:", error);
                setAddPhaseError('Error occurred while adding phase.');
            } finally {
                setIsAdding(false);
            }
        } else {
            alert('Phase name is required!');
        }
    };



    const deletePhase = (index) => setPhases(phases.filter((_, i) => i !== index));

    const editPhase = (index) => {
        const editedName = prompt('Edit Phase Name:');
        if (editedName) {
            const updated = [...phases];
            updated[index].name = editedName;
            setPhases(updated);
        }
    };
    const [selectedPhase, setSelectedPhase] = useState(null);

// Handle phase selection
    const handlePhaseClick = (index) => setSelectedPhase(phases[index]);

// Add new phase deliverable
    const addPhaseDeliverable = async () => {
        if (selectedPhase) {
            if (newPhaseDeliverable.name.trim()) {
                try {
                    const deliverablePayload = {
                        deliverables: [
                            {
                                name: newPhaseDeliverable.name,
                                status: newPhaseDeliverable.status,
                                startDate: newPhaseDeliverable.startDate,
                                expectedFinish: newPhaseDeliverable.expectedFinish,
                            }
                        ]
                    };

                    // Send deliverable to backend
                    const response = await fetch(`${backendUrl}/deliverables/${uuid}/${selectedPhase.uuid}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(deliverablePayload),
                    });
                    console.log('Response Status:', response.status);
                    console.log('Response Body:', await response.text());

                    if (!response.ok) {
                        throw new Error('Error adding deliverable to backend');
                    }

                    // Update local state with new deliverable
                    const updatedPhases = phases.map((phase) =>
                        phase.name === selectedPhase.name
                            ? { ...phase, deliverables: [...phase.deliverables, newPhaseDeliverable] }
                            : phase
                    );
                    setPhases(updatedPhases);

                    // Reset form fields
                    setNewPhaseDeliverable({ name: '', status: '', startDate: '', expectedFinish: '' });
                    setShowPhaseDeliverableInput(false);
                } catch (error) {
                    console.error('Failed to add deliverable:', error);
                }
            } else {
                alert('Deliverable name is required!');
            }
        } else {
            alert('Please select a phase to add a deliverable!');
        }
    };


    const handleDeletePhaseDeliverable = async (deliverableIndex) => {
        const deliverableToDelete = selectedPhase.deliverables[deliverableIndex];

        try {
            // Send DELETE request to backend
            const response = await fetch(`${backendUrl}/deliverables/${uuid}/${selectedPhase.uuid}/${deliverableToDelete.uuid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete deliverable from backend');
            }

            // Update local state to remove the deliverable
            const updatedDeliverables = selectedPhase.deliverables.filter((_, i) => i !== deliverableIndex);
            const updatedPhases = phases.map((phase) =>
                phase.uuid === selectedPhase.uuid ? { ...phase, deliverables: updatedDeliverables } : phase
            );

            setPhases(updatedPhases);
            setSelectedPhase({ ...selectedPhase, deliverables: updatedDeliverables });
        } catch (error) {
            console.error('Error deleting deliverable:', error);
        }
    };


// Edit phase deliverable
    const handleEditPhaseDeliverable = async (index) => {
        const deliverable = selectedPhase.deliverables[index];

        const editedName = prompt('Edit Deliverable Name:', deliverable.name);
        const editedStatus = prompt('Edit Deliverable Status:', deliverable.status);
        const editedStartDate = prompt('Edit Start Date (YYYY-MM-DD):', deliverable.startDate);
        const editedExpectedFinish = prompt('Edit Expected Finish Date (YYYY-MM-DD):', deliverable.expectedFinish);

        if (editedName || editedStatus || editedStartDate || editedExpectedFinish) {
            const updatedDeliverable = {
                ...deliverable,
                name: editedName ? editedName.trim() : deliverable.name,
                status: editedStatus ? editedStatus.trim() : deliverable.status,
                startDate: editedStartDate ? editedStartDate.trim() : deliverable.startDate,
                expectedFinish: editedExpectedFinish ? editedExpectedFinish.trim() : deliverable.expectedFinish,
            };

            const updatedDeliverables = selectedPhase.deliverables.map((item, idx) =>
                idx === index ? updatedDeliverable : item
            );

            const updatedPhases = phases.map((phase) =>
                phase.name === selectedPhase.name ? { ...phase, deliverables: updatedDeliverables } : phase
            );

            setPhases(updatedPhases);

            // Send the update to the backend
            try {
                const response = await fetch(`${backendUrl}/deliverables/${uuid}/${selectedPhase.uuid}/${deliverable.uuid}`, {
                    method: 'PUT', // PUT request for update
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedDeliverable),
                });

                if (response.ok) {
                    console.log("Deliverable updated successfully on the backend.");
                } else {
                    console.error("Failed to update deliverable on the backend:", await response.text());
                }
            } catch (error) {
                console.error("Error updating deliverable:", error);
            }
        }
    };


    const downloadBudgetCSV = (phase) => {
        const headers = ['Deliverable Name', 'Budget'];
        const rows = phase.deliverables.map(d => [d.name, d.budget]);

        // Generate CSV content
        let csvContent = headers.join(',') + '\n' +
            rows.map(row => row.join(',')).join('\n');

        // Create a downloadable link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${phase.name}_budget.csv`;
        link.click();
    };

    useEffect(() => {
        if (selectedPhase) {
            document.body.classList.add('noScroll');
        } else {
            document.body.classList.remove('noScroll');
        }

        return () => {
            document.body.classList.remove('noScroll');
        };
    }, [selectedPhase]);


    return (
        <div className={styles.phases}>
            <h2>Phases</h2>
            <div className={styles.phaseCards}>
                {phases.map((phase, index) => (
                    <div
                        key={index}
                        className={styles.phaseCard}
                        onClick={() => handlePhaseClick(index)}
                    >
                        <h3>{phase.name}</h3>
                        <p><strong>Start Date:</strong> {phase.startDate} </p>
                        <p><strong>End Date:</strong> {phase.endDate}</p>
                        <p><strong>Status:</strong> {phase.status}</p>
                        <div className={styles.cardActions}>
                            <FaEdit
                                className={styles.editIcon}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    editPhase(index);
                                }}
                            />
                            <FaTrash
                                className={styles.deleteIcon}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deletePhase(index);
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {selectedPhase && (
                <>
                    <div className={styles.overlay} onClick={() => setSelectedPhase(null)}/>
                    <div className={styles.phaseDetails}>
                        <button
                            className={styles.closeButtonTopRight}
                            onClick={() => setSelectedPhase(null)}
                        >
                            ✕
                        </button>
                        <div className={styles.phaseDetailsContent}>
                            <h3>Phase Details: {selectedPhase.name}</h3>
                            <div className={styles.phaseInfoRow}>
                                <p><strong>Status:</strong> {selectedPhase.status}</p>
                                <p><strong>Start:</strong> {selectedPhase.startDate}</p>
                                <p><strong>End:</strong> {selectedPhase.endDate}</p>
                                <button
                                    className={styles.updateButton}
                                    onClick={() => editPhase(selectedPhase)}
                                >
                                    Update
                                </button>
                            </div>

                            <h4>Phase Deliverables:</h4>
                            <table className={styles.deliverableTable}>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>startDate</th>
                                    <th>Expected Finish Date</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {selectedPhase.deliverables.map((deliverable, i) => (
                                    <tr key={i}>
                                        <td>{deliverable.name}</td>
                                        <td>{deliverable.status}</td>
                                        <td>{deliverable.startDate}</td>
                                        <td>${deliverable.expectedFinish}</td>
                                        <td className={styles.actionButtons}>
                                            <button
                                                onClick={() => handleEditPhaseDeliverable(i)}
                                                className={styles.editButton}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeletePhaseDeliverable(i)}
                                                className={styles.deleteButton}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            {showPhaseDeliverableInput && (
                                <div className={styles.newDeliverableForm}>
                                    <input
                                        type="text"
                                        placeholder="Deliverable Name"
                                        value={newPhaseDeliverable.name}
                                        onChange={(e) =>
                                            setNewPhaseDeliverable({
                                                ...newPhaseDeliverable,
                                                name: e.target.value,
                                            })
                                        }
                                        className={styles.inputField}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Status"
                                        value={newPhaseDeliverable.status}
                                        onChange={(e) =>
                                            setNewPhaseDeliverable({
                                                ...newPhaseDeliverable,
                                                status: e.target.value,
                                            })
                                        }
                                        className={styles.inputField}
                                    />
                                    <input
                                        type="date"
                                        placeholder="Start Date"
                                        value={newPhaseDeliverable.startDate}
                                        onChange={(e) =>
                                            setNewPhaseDeliverable({
                                                ...newPhaseDeliverable,
                                                startDate: e.target.value,
                                            })
                                        }
                                        className={styles.inputField}
                                    />
                                    <input
                                        type="date"
                                        placeholder="Expected Finish"
                                        value={newPhaseDeliverable.expectedFinish}
                                        onChange={(e) =>
                                            setNewPhaseDeliverable({
                                                ...newPhaseDeliverable,
                                                expectedFinish: e.target.value,
                                            })
                                        }
                                        className={styles.inputField}
                                    />
                                    <button
                                        onClick={addPhaseDeliverable}
                                        className={styles.primaryButton}
                                    >
                                        <FaPlus className={styles.plusIcon}/> Add Deliverable
                                    </button>
                                </div>
                            )}

                            <button
                                onClick={() =>
                                    setShowPhaseDeliverableInput(!showPhaseDeliverableInput)
                                }
                                className={styles.toggleButton}
                            >
                                {showPhaseDeliverableInput ? <FaTimes/> : <FaPlus/>}
                            </button>

                            <h4>Budget Summary</h4>
                            <table className={styles.budgetTable}>
                                <thead>
                                <tr>
                                    <th>Deliverable</th>
                                    <th>Budget ($)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {selectedPhase.deliverables.map((deliverable, i) => (
                                    <tr key={i}>
                                        <td>{deliverable.name}</td>
                                        <td>${deliverable.budget}</td>
                                    </tr>
                                ))}
                                <tr className={styles.totalRow}>
                                    <td><strong>Total Budget</strong></td>
                                    <td>
                                        <strong>
                                            ${selectedPhase.deliverables.reduce(
                                            (sum, d) => sum + parseFloat(d.budget || 0),
                                            0
                                        )}
                                        </strong>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <button
                                onClick={() => downloadBudgetCSV(selectedPhase)}
                                className={styles.downloadButton}
                            >
                                Download Budget CSV
                            </button>
                        </div>
                    </div>
                </>
            )}


            <button onClick={() => setShowPhaseInput(!showPhaseInput)} className={styles.addButton}>
                <FaPlus/> {showPhaseInput ? 'Cancel' : 'Add Phase'}
            </button>

            {showPhaseInput && (
                <>
                    <input
                        type="text"
                        value={newPhase.name}
                        onChange={(e) =>
                            setNewPhase({...newPhase, name: e.target.value})
                        }
                        placeholder="Phase Name"
                        className={styles.inputField}
                    />
                    <input
                        type="date"
                        value={newPhase.startDate}
                        onChange={(e) =>
                            setNewPhase({...newPhase, startDate: e.target.value})
                        }
                        className={styles.inputField}
                    />
                    <input
                        type="date"
                        value={newPhase.endDate}
                        onChange={(e) =>
                            setNewPhase({...newPhase, endDate: e.target.value})
                        }
                        className={styles.inputField}
                    />
                    <input
                        type="text"
                        value={newPhase.status}
                        onChange={(e) =>
                            setNewPhase({...newPhase, status: e.target.value})
                        }
                        placeholder="Status"
                        className={styles.inputField}
                    />
                    <button onClick={addPhase} className={styles.addButton} disabled={isAdding}>
                        {isAdding ? 'Adding...' : 'Confirm'}
                    </button>
                    {addPhaseError && <p className={styles.errorMessage}>{addPhaseError}</p>}
                </>
            )}
        </div>
    )
}

export default Phases;