"use client";

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '@/app/styles/project/project/project.module.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
    FaUsers,
    FaTasks,
    FaRegChartBar,
    FaCalendarAlt,
    FaDollarSign,
    FaEdit,
    FaTrash,
    FaPlus
} from 'react-icons/fa';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const ProjectInfo = () => {
    const searchParams = useSearchParams();

    // Extract query parameters or set default values
    const projectName = searchParams.get('projectName') || 'Project Alpha';
    const status = searchParams.get('status') || 'Active';
    const description = searchParams.get('description') || 'This project aims to develop a comprehensive management tool.';
    const budget = searchParams.get('budget') || '$50,000';
    const funding = searchParams.get('funding') || '$30,000';

    const [assignees, setAssignees] = useState(['John Doe', 'Jane Smith', 'Alice Johnson']);
    const [deliverables, setDeliverables] = useState(['Initial Setup', 'Feature Development', 'Testing']);
    const [phases, setPhases] = useState(['Planning', 'Development', 'Testing']);
    const [activeSection, setActiveSection] = useState('details');

    // New input states for adding items
    const [newAssignee, setNewAssignee] = useState('');
    const [newDeliverable, setNewDeliverable] = useState('');
    const [newPhase, setNewPhase] = useState('');

    // Toggle input visibility
    const [showAssigneeInput, setShowAssigneeInput] = useState(false);
    const [showDeliverableInput, setShowDeliverableInput] = useState(false);
    const [showPhaseInput, setShowPhaseInput] = useState(false);

    // Handlers for Assignees CRUD
    const addAssignee = () => {
        if (newAssignee.trim()) {
            setAssignees([...assignees, newAssignee]);
            setNewAssignee('');
            setShowAssigneeInput(false);
        }
    };

    const deleteAssignee = (index) => {
        const updatedAssignees = assignees.filter((_, i) => i !== index);
        setAssignees(updatedAssignees);
    };

    const editAssignee = (index) => {
        const edited = prompt('Edit Assignee:', assignees[index]);
        if (edited !== null) {
            const updatedAssignees = assignees.slice();
            updatedAssignees[index] = edited.trim();
            setAssignees(updatedAssignees);
        }
    };

    // Handlers for Deliverables CRUD
    const addDeliverable = () => {
        if (newDeliverable.trim()) {
            setDeliverables([...deliverables, newDeliverable]);
            setNewDeliverable('');
            setShowDeliverableInput(false);
        }
    };

    const deleteDeliverable = (index) => {
        const updatedDeliverables = deliverables.filter((_, i) => i !== index);
        setDeliverables(updatedDeliverables);
    };

    const editDeliverable = (index) => {
        const edited = prompt('Edit Deliverable:', deliverables[index]);
        if (edited !== null) {
            const updatedDeliverables = deliverables.slice();
            updatedDeliverables[index] = edited.trim();
            setDeliverables(updatedDeliverables);
        }
    };

    // Handlers for Phases CRUD
    const addPhase = () => {
        if (newPhase.trim()) {
            setPhases([...phases, newPhase]);
            setNewPhase('');
            setShowPhaseInput(false);
        }
    };

    const deletePhase = (index) => {
        const updatedPhases = phases.filter((_, i) => i !== index);
        setPhases(updatedPhases);
    };

    const editPhase = (index) => {
        const edited = prompt('Edit Phase:', phases[index]);
        if (edited !== null) {
            const updatedPhases = phases.slice();
            updatedPhases[index] = edited.trim();
            setPhases(updatedPhases);
        }
    };

    // Sample data for charts
    const budgetData = [
        { month: 'Jan', Budget: 4000, Funding: 2400 },
        { month: 'Feb', Budget: 3000, Funding: 1398 },
        { month: 'Mar', Budget: 2000, Funding: 9800 },
        { month: 'Apr', Budget: 2780, Funding: 3908 },
        { month: 'May', Budget: 1890, Funding: 4800 },
        { month: 'Jun', Budget: 2390, Funding: 3800 },
        { month: 'Jul', Budget: 3490, Funding: 4300 },
    ];

    return (
        <div className={styles.projectInfoContainer}>
            {/* Sidebar Navigation */}
            <div className={styles.sidebar}>
                <h2 className={styles.sidebarTitle}>Dashboard</h2>
                <ul className={styles.navList}>
                    <li
                        className={`${styles.navItem} ${activeSection === 'details' ? styles.active : ''}`}
                        onClick={() => setActiveSection('details')}
                    >
                        <FaUsers className={styles.icon} />
                        Project Details
                    </li>
                    <li
                        className={`${styles.navItem} ${activeSection === 'assignees' ? styles.active : ''}`}
                        onClick={() => setActiveSection('assignees')}
                    >
                        <FaUsers className={styles.icon} />
                        Assignees
                    </li>
                    <li
                        className={`${styles.navItem} ${activeSection === 'deliverables' ? styles.active : ''}`}
                        onClick={() => setActiveSection('deliverables')}
                    >
                        <FaTasks className={styles.icon} />
                        Deliverables
                    </li>
                    <li
                        className={`${styles.navItem} ${activeSection === 'phases' ? styles.active : ''}`}
                        onClick={() => setActiveSection('phases')}
                    >
                        <FaRegChartBar className={styles.icon} />
                        Phases
                    </li>
                    <li
                        className={`${styles.navItem} ${activeSection === 'calendar' ? styles.active : ''}`}
                        onClick={() => setActiveSection('calendar')}
                    >
                        <FaCalendarAlt className={styles.icon} />
                        Calendar
                    </li>
                </ul>
            </div>

            {/* Main Content Area */}
            <div className={styles.mainContent}>
                {/* Navbar */}
                <div className={styles.navbar}>
                    <h1 className={styles.projectName} onClick={() => setActiveSection('details')} style={{ cursor: 'pointer' }}>
                        {projectName}
                    </h1>
                </div>

                {/* Content Sections */}
                {activeSection === 'details' && (
                    <div className={styles.projectDetails}>
                        <div className={styles.card}>
                            <h2>Status</h2>
                            <p>{status}</p>
                        </div>
                        <div className={styles.card}>
                            <h2>Description</h2>
                            <p>{description}</p>
                        </div>
                        <div className={styles.card}>
                            <h2>Budget Allocation</h2>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={budgetData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="Budget" stroke="#1e90ff" />
                                    <Line type="monotone" dataKey="Funding" stroke="#ff4081" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Assignees Section */}
                {activeSection === 'assignees' && (
                    <div className={styles.assignees}>
                        <h2>Assignees</h2>
                        <ul>
                            {assignees.map((assignee, index) => (
                                <li key={index}>
                                    {assignee}
                                    <FaEdit className={styles.editIcon} onClick={() => editAssignee(index)} />
                                    <FaTrash className={styles.deleteIcon} onClick={() => deleteAssignee(index)} />
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => setShowAssigneeInput(!showAssigneeInput)} className={styles.addButton}>
                            <FaPlus /> {showAssigneeInput ? 'Cancel' : 'Add Assignee'}
                        </button>
                        {showAssigneeInput && (
                            <>
                                <input
                                    type="text"
                                    value={newAssignee}
                                    onChange={(e) => setNewAssignee(e.target.value)}
                                    placeholder="Add new assignee"
                                    className={styles.inputField}
                                />
                                <button onClick={addAssignee} className={styles.addButton}><FaPlus /> Confirm</button>
                            </>
                        )}
                    </div>
                )}

                {/* Deliverables Section */}
                {activeSection === 'deliverables' && (
                    <div className={styles.deliverables}>
                        <h2>Deliverables</h2>
                        <ul>
                            {deliverables.map((deliverable, index) => (
                                <li key={index}>
                                    {deliverable}
                                    <FaEdit className={styles.editIcon} onClick={() => editDeliverable(index)} />
                                    <FaTrash className={styles.deleteIcon} onClick={() => deleteDeliverable(index)} />
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => setShowDeliverableInput(!showDeliverableInput)} className={styles.addButton}>
                            <FaPlus /> {showDeliverableInput ? 'Cancel' : 'Add Deliverable'}
                        </button>
                        {showDeliverableInput && (
                            <>
                                <input
                                    type="text"
                                    value={newDeliverable}
                                    onChange={(e) => setNewDeliverable(e.target.value)}
                                    placeholder="Add new deliverable"
                                    className={styles.inputField}
                                />
                                <button onClick={addDeliverable} className={styles.addButton}><FaPlus /> Confirm</button>
                            </>
                        )}
                    </div>
                )}

                {/* Phases Section */}
                {activeSection === 'phases' && (
                    <div className={styles.phases}>
                        <h2>Phases</h2>
                        <ul>
                            {phases.map((phase, index) => (
                                <li key={index}>
                                    {phase}
                                    <FaEdit className={styles.editIcon} onClick={() => editPhase(index)} />
                                    <FaTrash className={styles.deleteIcon} onClick={() => deletePhase(index)} />
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => setShowPhaseInput(!showPhaseInput)} className={styles.addButton}>
                            <FaPlus /> {showPhaseInput ? 'Cancel' : 'Add Phase'}
                        </button>
                        {showPhaseInput && (
                            <>
                                <input
                                    type="text"
                                    value={newPhase}
                                    onChange={(e) => setNewPhase(e.target.value)}
                                    placeholder="Add new phase"
                                    className={styles.inputField}
                                />
                                <button onClick={addPhase} className={styles.addButton}><FaPlus /> Confirm</button>
                            </>
                        )}
                    </div>
                )}

                {/* Calendar Section */}
                {activeSection === 'calendar' && (
                    <div className={styles.calendarSection}>
                        <h2>Project Calendar</h2>
                        <Calendar />
                    </div>
                )}
            </div>

            {/* Right Sidebar */}
            <div className={styles.rightSidebar}>
                <div className={styles.budgetCard}>
                    <FaDollarSign className={styles.budgetIcon} />
                    <h3>Budget and Funding</h3>
                    <p><strong>Budget:</strong> {budget}</p>
                    <p><strong>Funding:</strong> {funding}</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectInfo;