"use client";

import React, {useEffect, useState} from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './ProjectInfo.module.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
    FaUsers,
    FaRegFileAlt,
    FaTasks,
    FaRegChartBar,
    FaCalendarAlt,
    FaDollarSign,
    FaEdit,
    FaUpload,
    FaFolder,
    FaTrash,
    FaArrowLeft,
    FaEllipsisV,
    FaPlus, FaTimes
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
        { name: 'Alice Johnson', gender: 'Female', access: 'Admin', role: 'Manager', dateJoined: '2022-12-10' },
    ]);

    const [deliverables, setDeliverables] = useState(['Initial Setup', 'Feature Development', 'Testing']);


    const [phases, setPhases] = useState([
        {
            name: "Planning",
            startDate: "2024-01-01",
            endDate: "2024-01-15",
            status: "Completed",
            deliverables: [{
                name: 'Initial Setup', status: 'Completed', assignees: ['John Doe'],
                startDate: '2024-01-01', expectedFinish: '2024-01-05', budget: 5000
            }],
        },
        {
            name: "Development",
            startDate: "2024-01-16",
            endDate: "2024-02-15",
            status: "Ongoing",
            deliverables: [{
                name: 'Feature Development', status: 'Ongoing',
                assignees: ['Jane Smith', 'Alice Johnson'],
                startDate: '2024-01-06', expectedFinish: '2024-01-20', budget: 15000
            }],
        },
        {
            name: "Testing",
            startDate: "2024-02-16",
            endDate: "2024-02-28",
            status: "Not Started",
            deliverables: [{
                name: 'Feature Development', status: 'Ongoing',
                assignees: ['Jane Smith', 'Alice Johnson'],
                startDate: '2024-01-06', expectedFinish: '2024-01-20', budget: 15000
            }],
        },
    ]);

    const [activeSection, setActiveSection] = useState('details');
    const [newAssignee, setNewAssignee] = useState({ name: '', gender: '', access: '', role: '', dateJoined: '' });
    const [newDeliverable, setNewDeliverable] = useState('');
    const [showAssigneeInput, setShowAssigneeInput] = useState(false);
    const [showDeliverableInput, setShowDeliverableInput] = useState(false);
    const [newPhase, setNewPhase] = useState({ name: '', startDate: '', endDate: '', status: '', deliverables: [] });
    const [showPhaseInput, setShowPhaseInput] = useState(false);
    const [selectedPhase, setSelectedPhase] = useState(null);
    const [newPhaseDeliverable, setNewPhaseDeliverable] = useState({ name: '', status: '', assignees: [], budget: 0 });
    const [showPhaseDeliverableInput, setShowPhaseDeliverableInput] = useState(false);

// Handlers for Assignees CRUD
    const addAssignee = () => {
        if (newAssignee.name.trim()) {
            setAssignees([...assignees, newAssignee]);
            setNewAssignee({ name: '', gender: '', access: '', role: '', dateJoined: '' });
            setShowAssigneeInput(false);
        } else {
            alert('Name is required!');
        }
    };

    const deleteAssignee = (index) => setAssignees(assignees.filter((_, i) => i !== index));

    const editAssignee = (index) => {
        const edited = prompt('Edit Assignee:', assignees[index].name);
        if (edited) {
            const updated = [...assignees];
            updated[index].name = edited.trim();
            setAssignees(updated);
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

    const deleteDeliverable = (index) => setDeliverables(deliverables.filter((_, i) => i !== index));

    const editDeliverable = (index) => {
        const edited = prompt('Edit Deliverable:', deliverables[index]);
        if (edited) {
            const updated = [...deliverables];
            updated[index] = edited.trim();
            setDeliverables(updated);
        }
    };

// Handlers for Phases CRUD
    const addPhase = () => {
        if (newPhase.name.trim()) {
            setPhases([...phases, newPhase]);
            setNewPhase({ name: '', startDate: '', endDate: '', status: '', deliverables: [] });
            setShowPhaseInput(false);
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

// Handle phase selection
    const handlePhaseClick = (index) => setSelectedPhase(phases[index]);

// Add new phase deliverable
    const addPhaseDeliverable = () => {
        if (selectedPhase && newPhaseDeliverable.name.trim()) {
            const updatedPhases = phases.map((phase) =>
                phase.name === selectedPhase.name
                    ? { ...phase, deliverables: [...phase.deliverables, newPhaseDeliverable] }
                    : phase
            );
            setPhases(updatedPhases);
            setNewPhaseDeliverable({ name: '', status: '', assignees: [], budget: 0 });
            setShowPhaseDeliverableInput(false);
        } else {
            alert('Deliverable name is required!');
        }
    };

// Delete phase deliverable
    const handleDeletePhaseDeliverable = (index) => {
        const updatedDeliverables = selectedPhase.deliverables.filter((_, i) => i !== index);
        const updatedPhases = phases.map((phase) =>
            phase.name === selectedPhase.name ? { ...phase, deliverables: updatedDeliverables } : phase
        );
        setPhases(updatedPhases);
    };

// Edit phase deliverable
    const handleEditPhaseDeliverable = (index) => {
        const deliverable = selectedPhase.deliverables[index];

        const editedName = prompt('Edit Deliverable Name:', deliverable.name);
        const editedStatus = prompt('Edit Deliverable Status:', deliverable.status);
        const editedAssignees = prompt('Edit Assignees (comma-separated):', deliverable.assignees.join(', '));
        const editedBudget = prompt('Edit Deliverable Budget:', deliverable.budget);

        // Check if any edited values are present
        if (editedName || editedStatus || editedAssignees || editedBudget) {
            const updatedDeliverables = selectedPhase.deliverables.map((item, idx) => {
                if (idx === index) {
                    return {
                        ...item,
                        name: editedName ? editedName.trim() : item.name,
                        status: editedStatus ? editedStatus.trim() : item.status,
                        assignees: editedAssignees ? editedAssignees.split(',').map(a => a.trim()) : item.assignees,
                        budget: editedBudget ? editedBudget.trim() : item.budget,
                    };
                }
                return item; // Return unchanged item
            });

            const updatedPhases = phases.map((phase) =>
                phase.name === selectedPhase.name ? { ...phase, deliverables: updatedDeliverables } : phase
            );

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


    let projectDetails, setProjectDetails;
    // eslint-disable-next-line no-unused-vars
    [projectDetails, setProjectDetails] = useState({
        name: '',
        description: '',
        status: '',
        budget: '',
        funding: '',
        startDate: '',
        endDate: '',
        assignees: [
            {
                name: '',
                gender: '',
                access: '',
                role: '',
                dateJoined: '',
            },
        ],

        phases: [
            {
                name: '',
                startDate: '',
                endDate: '',
                status: '',
                deliverables: [
                    {
                        name: '',
                        status: '',
                        budget: 0,
                        assignees: [
                            {
                                name: '',
                                gender: '',
                                access: '',
                                role: '',
                                dateJoined: '',
                            },
                        ],
                        startDate: '',
                        expectedFinish: '',
                    },
                ],
            },
        ],
    });

    const [folders, setFolders] = useState([]); // Root-level folders
    const [isFolderModalOpen, setFolderModalOpen] = useState(false);
    const [isFileModalOpen, setFileModalOpen] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [folderDescription, setFolderDescription] = useState('');
    const [currentFolder, setCurrentFolder] = useState(null); // Current folder context
    const [showOptions, setShowOptions] = useState({}); // Track open menus

    // Helper to create a folder
    const handleCreateFolder = () => {
        if (!folderName.trim()) return alert('Folder name is required.');

        const newFolder = {
            id: Date.now(), // Unique ID
            name: folderName,
            description: folderDescription,
            files: [],
            subfolders: [],
        };

        if (currentFolder) {
            const updatedFolder = {
                ...currentFolder,
                subfolders: [...currentFolder.subfolders, newFolder],
            };
            updateFolderInHierarchy(currentFolder.id, updatedFolder);
        } else {
            setFolders([...folders, newFolder]);
        }

        setFolderName('');
        setFolderDescription('');
        setFolderModalOpen(false);
    };

    // Handle file upload to the current folder
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const fileName = prompt('Enter file name (optional) or press OK to use the original:', file.name);
        const fileDescription = prompt('Enter a description (optional):', '');

        const newFile = {
            id: Date.now(), // Unique ID
            name: fileName || file.name,
            description: fileDescription || '',
            url: URL.createObjectURL(file),
        };

        if (currentFolder) {
            const updatedFolder = {
                ...currentFolder,
                files: [...currentFolder.files, newFile],
            };
            updateFolderInHierarchy(currentFolder.id, updatedFolder);
        }
        setFileModalOpen(false);
    };

    // Helper to update a folder in the hierarchy
    const updateFolderInHierarchy = (folderId, updatedFolder) => {
        const updateFolders = (folders) =>
            folders.map((folder) =>
                folder.id === folderId
                    ? updatedFolder
                    : { ...folder, subfolders: updateFolders(folder.subfolders) }
            );

        setFolders((prevFolders) => updateFolders(prevFolders));
        setCurrentFolder(updatedFolder); // Ensure UI reflects the change
    };

    // Navigate to a folder
    const handleOpenFolder = (folder) => setCurrentFolder(folder);

    // Navigate back to the parent folder
    const handleBackToParent = () => {
        const parent = findParentFolder(currentFolder, folders);
        setCurrentFolder(parent || null);
    };

    // Helper to find a folder's parent
    const findParentFolder = (child, folderList) => {
        for (const folder of folderList) {
            if (folder.subfolders.includes(child)) return folder;
            const found = findParentFolder(child, folder.subfolders);
            if (found) return found;
        }
        return null;
    };

    // Toggle options for a folder or file
    const toggleOptions = (e, id) => {
        e.stopPropagation(); // Prevent folder click
        setShowOptions((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Handle folder or file edits
    const handleEdit = (item) => {
        const newName = prompt("Enter new name:", item.name);
        const newDescription = prompt("Enter new description:", item.description || "");

        if (newName || newDescription) {
            const updatedItem = { ...item, name: newName, description: newDescription };
            if (item.files) {
                updateFolderInHierarchy(item.id, updatedItem);
            } else {
                const updatedFiles = currentFolder.files.map((f) =>
                    f.id === item.id ? updatedItem : f
                );
                setCurrentFolder({ ...currentFolder, files: updatedFiles });
            }
        }
    };

    // Handle delete operations
    const handleDeleteFolder = (folder) => {
        if (window.confirm(`Delete folder "${folder.name}"?`)) {
            setFolders((prev) => prev.filter((f) => f.id !== folder.id));
        }
    };

    const handleDeleteFile = (file) => {
        if (window.confirm(`Delete file "${file.name}"?`)) {
            const updatedFiles = currentFolder.files.filter((f) => f.id !== file.id);
            setCurrentFolder({ ...currentFolder, files: updatedFiles });
        }
    };







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
                        <FaUsers className={styles.icon}/>
                        Project Details
                    </li>
                    <li
                        className={`${styles.navItem} ${activeSection === 'assignees' ? styles.active : ''}`}
                        onClick={() => setActiveSection('assignees')}
                    >
                        <FaUsers className={styles.icon}/>
                        Assignees
                    </li>
                    <li
                        className={`${styles.navItem} ${activeSection === 'deliverables' ? styles.active : ''}`}
                        onClick={() => setActiveSection('deliverables')}
                    >
                        <FaTasks className={styles.icon}/>
                        Deliverables
                    </li>
                    <li
                        className={`${styles.navItem} ${activeSection === 'phases' ? styles.active : ''}`}
                        onClick={() => setActiveSection('phases')}
                    >
                        <FaRegChartBar className={styles.icon}/>
                        Phases
                    </li>
                    <li
                        className={`${styles.navItem} ${activeSection === 'documents' ? styles.active : ''}`}
                        onClick={() => setActiveSection('documents')}
                    >
                        <FaRegFileAlt className={styles.icon}/> {/* Option 1 */}
                        {/* <AiOutlineFile className={styles.icon} /> */} {/* Option 2 */}
                        Documents
                    </li>

                    <li
                        className={`${styles.navItem} ${activeSection === 'calendar' ? styles.active : ''}`}
                        onClick={() => setActiveSection('calendar')}
                    >
                        <FaCalendarAlt className={styles.icon}/>
                        Calendar
                    </li>
                </ul>
            </div>

            {/* Main Content Area */}
            <div className={styles.mainContent}>
                {/* Navbar */}
                <div className={styles.navbar}>
                    <h1 className={styles.projectName} onClick={() => setActiveSection('details')}
                        style={{cursor: 'pointer'}}>
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

                {activeSection === 'documents' && (
                    <div className={styles.inputDocumentSection}>
                        {/* Header Section */}
                        <div className={styles.inputDocumentHeader}>
                            <button
                                className={styles.inputDocumentBackButton}
                                onClick={handleBackToParent}
                                disabled={!currentFolder} // Disable if no parent to go back to
                            >
                                <FaArrowLeft /> Back
                            </button>

                            <h2 className={styles.folderName}>
                                {currentFolder ? currentFolder.name : 'Documents'}
                            </h2>

                            <div className={styles.inputDocumentButtonsContainer}>
                                <button onClick={() => setFolderModalOpen(true)}>
                                    <FaPlus /> Create Folder
                                </button>
                                <button onClick={() => setFileModalOpen(true)}>
                                    <FaUpload /> Upload File
                                </button>
                            </div>
                        </div>

                        {/* Folder Creation Modal */}
                        {isFolderModalOpen && (
                            <div className={styles.inputDocumentModal}>
                                <div className={styles.inputDocumentModalContent}>
                                    <h2>Create Folder</h2>
                                    <input
                                        type="text"
                                        placeholder="Folder Name"
                                        value={folderName}
                                        onChange={(e) => setFolderName(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Description (Optional)"
                                        value={folderDescription}
                                        onChange={(e) => setFolderDescription(e.target.value)}
                                    />
                                    <div className={styles.inputDocumentModalButtons}>
                                        <button onClick={handleCreateFolder}>Create</button>
                                        <button onClick={() => setFolderModalOpen(false)}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* File Upload Modal */}
                        {isFileModalOpen && (
                            <div className={styles.inputDocumentModal}>
                                <div className={styles.inputDocumentModalContent}>
                                    <h2>Upload File</h2>
                                    <input type="file" onChange={handleFileUpload} />
                                    <div className={styles.inputDocumentModalButtons}>
                                        <button onClick={() => setFileModalOpen(false)}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Render Content */}
                        <div className={styles.inputDocumentCardsContainer}>
                            {currentFolder ? (
                                <>
                                    <p>{currentFolder.description}</p>

                                    {/* Subfolders */}
                                    {currentFolder.subfolders.map((folder) => (
                                        <div
                                            key={folder.id}
                                            className={styles.inputDocumentCard}
                                            onClick={() => handleOpenFolder(folder)}
                                        >
                                            <FaFolder className={styles.inputDocumentCardIcon} />
                                            <h3>{folder.name}</h3>
                                            {folder.description && <p>{folder.description}</p>}
                                            <div className={styles.optionsMenu}>
                                                <button
                                                    className={styles.optionsButton}
                                                    onClick={(e) => toggleOptions(e, folder.id)}
                                                >
                                                    <FaEllipsisV />
                                                </button>
                                                {showOptions[folder.id] && (
                                                    <div className={styles.menu}>
                                                        <button onClick={() => handleEdit(folder)}>Edit</button>
                                                        <button onClick={() => handleDeleteFolder(folder)}>Delete</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Files */}
                                    {currentFolder.files.map((file) => (
                                        <div key={file.id} className={styles.inputDocumentCard}>
                                            <FaRegFileAlt className={styles.inputDocumentCardIcon} />
                                            <a
                                                href={file.url}
                                                download={file.name}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {file.name}
                                            </a>
                                            {file.description && <p>{file.description}</p>}
                                            <div className={styles.optionsMenu}>
                                                <button
                                                    className={styles.optionsButton}
                                                    onClick={(e) => toggleOptions(e, file.id)}
                                                >
                                                    <FaEllipsisV />
                                                </button>
                                                {showOptions[file.id] && (
                                                    <div className={styles.menu}>
                                                        <button onClick={() => handleEdit(file)}>Edit</button>
                                                        <button onClick={() => handleDeleteFile(file)}>Delete</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {folders.length === 0 ? (
                                        <p>No folders or files available.</p>
                                    ) : (
                                        folders.map((folder) => (
                                            <div
                                                key={folder.id}
                                                className={styles.inputDocumentCard}
                                                onClick={() => handleOpenFolder(folder)}
                                            >
                                                <FaFolder className={styles.inputDocumentCardIcon} />
                                                <h3>{folder.name}</h3>
                                                {folder.description && <p>{folder.description}</p>}
                                                <div className={styles.optionsMenu}>
                                                    <button
                                                        className={styles.optionsButton}
                                                        onClick={(e) => toggleOptions(e, folder.id)}
                                                    >
                                                        <FaEllipsisV />
                                                    </button>
                                                    {showOptions[folder.id] && (
                                                        <div className={styles.menu}>
                                                            <button onClick={() => handleEdit(folder)}>Edit</button>
                                                            <button onClick={() => handleDeleteFolder(folder)}>Delete</button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </>
                            )}
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
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
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
                {activeSection === 'phases' && (
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
                                <div className={styles.overlay} onClick={() => setSelectedPhase(null)} />
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
                                                <th>Assignees</th>
                                                <th>Budget ($)</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {selectedPhase.deliverables.map((deliverable, i) => (
                                                <tr key={i}>
                                                    <td>{deliverable.name}</td>
                                                    <td>{deliverable.status}</td>
                                                    <td>{deliverable.assignees.join(', ')}</td>
                                                    <td>${deliverable.budget}</td>
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
                                                    type="text"
                                                    placeholder="Assignees (comma-separated)"
                                                    value={newPhaseDeliverable.assignees}
                                                    onChange={(e) =>
                                                        setNewPhaseDeliverable({
                                                            ...newPhaseDeliverable,
                                                            assignees: e.target.value.split(',').map(a => a.trim()),
                                                        })
                                                    }
                                                    className={styles.inputField}
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Budget"
                                                    value={newPhaseDeliverable.budget}
                                                    onChange={(e) =>
                                                        setNewPhaseDeliverable({
                                                            ...newPhaseDeliverable,
                                                            budget: e.target.value,
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


                        <button
                            onClick={() => setShowPhaseInput(!showPhaseInput)}
                            className={styles.addButton}
                        >
                            <FaPlus/> {showPhaseInput ? 'Cancel' : 'Add Phase'}
                        </button>

                        {showPhaseInput && (
                            <>
                                <input
                                    type="text"
                                    value={newPhase.name}
                                    onChange={(e) =>
                                        setNewPhase({ ...newPhase, name: e.target.value })
                                    }
                                    placeholder="Phase Name"
                                    className={styles.inputField}
                                />
                                <input
                                    type="date"
                                    value={newPhase.startDate}
                                    onChange={(e) =>
                                        setNewPhase({ ...newPhase, startDate: e.target.value })
                                    }
                                    className={styles.inputField}
                                />
                                <input
                                    type="date"
                                    value={newPhase.endDate}
                                    onChange={(e) =>
                                        setNewPhase({ ...newPhase, endDate: e.target.value })
                                    }
                                    className={styles.inputField}
                                />
                                <input
                                    type="text"
                                    value={newPhase.status}
                                    onChange={(e) =>
                                        setNewPhase({ ...newPhase, status: e.target.value })
                                    }
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
