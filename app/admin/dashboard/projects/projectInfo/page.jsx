"use client";

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './ProjectInfo.module.css';
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

    const [assignees, setAssignees] = useState([
        { name: 'John Doe', gender: 'Male', access: 'Admin', role: 'Developer', dateJoined: '2023-01-15' },
        { name: 'Jane Smith', gender: 'Female', access: 'User', role: 'Designer', dateJoined: '2023-02-20' },
        { name: 'Alice Johnson', gender: 'Female', access: 'Admin', role: 'Manager', dateJoined: '2022-12-10' }
    ]);
    const [deliverables, setDeliverables] = useState(['Initial Setup', 'Feature Development', 'Testing']);


    const [phases, setPhases] = useState([
        {
            name: "Planning",
            startDate: "2024-01-01",
            endDate: "2024-01-15",
            status: "Completed",
            deliverables: [{
                name: 'Initial Setup',
                status: 'Completed',
                assignees: ['John Doe'],
                startDate: '2024-01-01',
                expectedFinish: '2024-01-05',
                budget: 5000,
            },],
        },
        {
            name: "Development",
            startDate: "2024-01-16",
            endDate: "2024-02-15",
            status: "Ongoing",
            deliverables: [{
                name: 'Feature Development',
                status: 'Ongoing',
                assignees: ['Jane Smith', 'Alice Johnson'],
                startDate: '2024-01-06',
                expectedFinish: '2024-01-20',
                budget: 15000,
            },],
        },
        {
            name: "Testing",
            startDate: "2024-02-16",
            endDate: "2024-02-28",
            status: "Not Started",
            deliverables: [{
                name: 'Feature Development',
                status: 'Ongoing',
                assignees: ['Jane Smith', 'Alice Johnson'],
                startDate: '2024-01-06',
                expectedFinish: '2024-01-20',
                budget: 15000,
            },],
        },
    ]);

    const [selectedPhase, setSelectedPhase] = useState(null); // Track the selected phase




    const [activeSection, setActiveSection] = useState('details');

    // New input states for adding items
    const [newAssignee, setNewAssignee] = useState({
        name: '',
        gender: '',
        access: '',
        role: '',
        dateJoined: ''
    });



    const [newDeliverable, setNewDeliverable] = useState('');


    // Toggle input visibility
    const [showAssigneeInput, setShowAssigneeInput] = useState(false);
    const [showDeliverableInput, setShowDeliverableInput] = useState(false);

    // Handlers for Assignees CRUD
    const addAssignee = () => {
        const { name, gender, access, role, dateJoined } = newAssignee;

        if (name.trim()) {
            setAssignees([...assignees, { name, gender, access, role, dateJoined }]);
            setNewAssignee({ name: '', gender: '', access: '', role: '', dateJoined: '' }); // Reset form
            setShowAssigneeInput(false); // Hide input form
        } else {
            alert('Name is required!');
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
    const [newPhase, setNewPhase] = useState({ name: '', startDate: '', endDate: '', status: '', deliverables: [] });
    const [showPhaseInput, setShowPhaseInput] = useState(false);

    // Handlers for Phases CRUD
    const addPhase = () => {
        if (newPhase.name.trim()) {
            setPhases([...phases, { ...newPhase }]);
            setNewPhase({ name: '', startDate: '', endDate: '', status: '', deliverables: [] }); // Reset form
            setShowPhaseInput(false); // Hide input form
        } else {
            alert('Phase name is required!');
        }
    };

    const deletePhase = (index) => {
        const updatedPhases = phases.filter((_, i) => i !== index);
        setPhases(updatedPhases);
    };

    const editPhase = (index) => {
        const editedName = prompt('Edit Phase Name:', phases[index].name);
        if (editedName !== null) {
            const updatedPhases = phases.slice();
            updatedPhases[index].name = editedName.trim();
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
                        <div className={styles.assigneesHeader}>
                            <h2>Assignees</h2>
                            <button
                                onClick={() => setShowAssigneeInput(!showAssigneeInput)}
                                className={styles.addButtonTopRight}
                            >
                                <FaPlus /> {showAssigneeInput ? 'Cancel' : 'Add Assignee'}
                            </button>
                        </div>

                        <table className={styles.assigneeTable}>
                            <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Access</th>
                                <th>Role</th>
                                <th>Date Joined</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {assignees.map((assignee, index) => (
                                <tr key={index}>
                                    <td>
                                        <img
                                            src={`https://i.pravatar.cc/150?img=${index + 1}`}
                                            alt="Profile"
                                            className={styles.profilePic}
                                        />
                                    </td>
                                    <td>{assignee.name}</td>
                                    <td>{assignee.gender}</td>
                                    <td>{assignee.access}</td>
                                    <td>{assignee.role}</td>
                                    <td>{assignee.dateJoined}</td>
                                    <td>
                                        <FaEdit
                                            className={styles.editIcon}
                                            onClick={() => editAssignee(index)}
                                        />
                                        <FaTrash
                                            className={styles.deleteIcon}
                                            onClick={() => deleteAssignee(index)}
                                        />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {showAssigneeInput && (
                            <div className={styles.inputContainer}>
                                <input
                                    type="text"
                                    value={newAssignee.name}
                                    onChange={(e) => setNewAssignee({ ...newAssignee, name: e.target.value })}
                                    placeholder="Name"
                                    className={styles.inputField}
                                />
                                <input
                                    type="text"
                                    value={newAssignee.gender}
                                    onChange={(e) => setNewAssignee({ ...newAssignee, gender: e.target.value })}
                                    placeholder="Gender"
                                    className={styles.inputField}
                                />
                                <input
                                    type="text"
                                    value={newAssignee.access}
                                    onChange={(e) => setNewAssignee({ ...newAssignee, access: e.target.value })}
                                    placeholder="Access Level"
                                    className={styles.inputField}
                                />
                                <input
                                    type="text"
                                    value={newAssignee.role}
                                    onChange={(e) => setNewAssignee({ ...newAssignee, role: e.target.value })}
                                    placeholder="Role"
                                    className={styles.inputField}
                                />
                                <input
                                    type="date"
                                    value={newAssignee.dateJoined}
                                    onChange={(e) => setNewAssignee({ ...newAssignee, dateJoined: e.target.value })}
                                    className={styles.inputField}
                                />
                                <button onClick={addAssignee} className={styles.addButton}>
                                    <FaPlus /> Confirm
                                </button>
                            </div>
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
                {/* Phases Section */}
                {activeSection === 'phases' && (
                    <div className={styles.phases}>
                        <h2>Phases</h2>
                        <div className={styles.phaseCards}>
                            {phases.map((phase, index) => (
                                <div
                                    key={index}
                                    className={styles.phaseCard}
                                    onClick={() => console.log(`Phase: ${phase.name}`)} // Log the selected phase's name
                                >
                                    <h3>{phase.name}</h3>
                                    <p><strong>Start Date:</strong> {phase.startDate}</p>
                                    <p><strong>End Date:</strong> {phase.endDate}</p>
                                    <p><strong>Status:</strong> {phase.status}</p>
                                    <div className={styles.cardActions}>
                                        <FaEdit
                                            className={styles.editIcon}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering card click
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
                        <button
                            onClick={() => setShowPhaseInput(!showPhaseInput)}
                            className={styles.addButton}
                        >
                            <FaPlus /> {showPhaseInput ? 'Cancel' : 'Add Phase'}
                        </button>
                        {showPhaseInput && (
                            <>
                                <input
                                    type="text"
                                    value={newPhase.name}
                                    onChange={(e) => setNewPhase({ ...newPhase, name: e.target.value })}
                                    placeholder="Phase Name"
                                    className={styles.inputField}
                                />
                                <input
                                    type="date"
                                    value={newPhase.startDate}
                                    onChange={(e) => setNewPhase({ ...newPhase, startDate: e.target.value })}
                                    placeholder="Start Date"
                                    className={styles.inputField}
                                />
                                <input
                                    type="date"
                                    value={newPhase.endDate}
                                    onChange={(e) => setNewPhase({ ...newPhase, endDate: e.target.value })}
                                    placeholder="End Date"
                                    className={styles.inputField}
                                />
                                <input
                                    type="text"
                                    value={newPhase.status}
                                    onChange={(e) => setNewPhase({ ...newPhase, status: e.target.value })}
                                    placeholder="Status"
                                    className={styles.inputField}
                                />
                                <button onClick={addPhase} className={styles.addButton}>
                                    <FaPlus /> Confirm
                                </button>
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
