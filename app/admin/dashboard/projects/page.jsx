"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import ProjectCard from '../../ui/dashboard/projects/page'; // Ensure correct path
import AddProjectModal from '../projects/add/page'; // Ensure correct path
import styles from './projects.module.css';

const Dashboard = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    // State for search term, filter, modal visibility, and projects list
    const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
    const [filter, setFilter] = useState('All Projects');
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [projects, setProjects] = useState([
        {
            projectName: 'Alpha',
            status: "todo",
            assignees: ["Kimani", "John"],
            startDate: "2024-09-01",
            endDate: "2024-09-15",
            comments: "Good",
            description: "Very well",
            phases: [{ name: '', startDate:"", endDate:"", deliverables: [{ name: '', status: '', comment: '', assignee: '' }] }],
            budget: '', // Add budget if needed
            funding: '', // Add funding if needed
            expectedBudget: 1000
        },
        {
            projectName: "Gamma",
            status: "completed",
            assignees: ['Alice', 'Bob'],
            startDate: "2024-07-01",
            endDate: "2024-09-01",
            description: "Project completed successfully",
            phases: [{ name: '', deliverables: [{ name: '', status: '', comment: '', assignee: '' }] }],
            budget: '', // Add budget if needed
            funding: '', // Add funding if needed
            expectedBudget: 3000
        },
    ]);

    // Handle search and update the query string in URL
    function handleSearch(term) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        router.replace(`${pathname}?${params.toString()}`);
    }

    // Filter projects based on search term and selected filter (status)
    const filteredProjects = projects.filter(project => {
        const search = searchTerm.toLowerCase();
        const matchStatus = filter === 'All Projects' || project.status.toLowerCase() === filter.toLowerCase();
        const matchSearch = project.projectName.toLowerCase().includes(search);
        return matchStatus && matchSearch;
    });

    const breadcrumb = [
        { label: 'Dashboard', link: '/admin/dashboard' },
        { label: 'Projects', link: '/admin/dashboard/projects' },
    ];

    // Update the search term when input changes
    useEffect(() => {
        handleSearch(searchTerm);
    }, [searchTerm]);

    // Group filtered projects by status
    const groupedProjects = {
        todo: filteredProjects.filter(project => project.status.toLowerCase() === 'todo'),
        active: filteredProjects.filter(project => project.status.toLowerCase() === 'active'),
        completed: filteredProjects.filter(project => project.status.toLowerCase() === 'completed')
    };

    // Navigate to project info page on click
    const handleCardClick = (project) => {
        const query = new URLSearchParams({
            projectName: project.projectName,
            status: project.status,
            assignees: project.assignees.join(', '),
            startDate: project.startDate,
            endDate: project.endDate,
            comments: project.comments,
            description: project.description,
        });
        router.push(`/admin/dashboard/projects/projectInfo?${query.toString()}`);
    };

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Function to add a new project
    const addProject = (newProject) => {
        setProjects((prevProjects) => [...prevProjects, newProject]); // Update projects with the new project
        closeModal(); // Close the modal after adding the project
    };

    return (
        <div className={styles.dashboardContainer}>
            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
                {breadcrumb.map((crumb, index) => (
                    <span key={index}>
                        <a href={crumb.link}>{crumb.label}</a>
                        {index < breadcrumb.length - 1 && ' > '}
                    </span>
                ))}
            </div>

            {/* Main Content */}
            <div className={styles.mainContent}>
                {/* Header Section */}
                <header className={styles.header}>
                    <h1>Project Management Dashboard</h1>
                    <div className={styles.controls}>
                        {/* Search Input */}
                        <input
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            type="text"
                            placeholder="Search projects..."
                            className={styles.searchInput}
                        />

                        {/* Filter Dropdown */}
                        <select value={filter} onChange={(e) => setFilter(e.target.value)} className={styles.filterDropdown}>
                            <option value="All Projects">All Projects</option>
                            <option value="Todo">Todo</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <button className={styles.addProjectBtn} onClick={openModal}>+ Add Project</button>
                    </div>
                </header>

                {/* Board View */}
                <section className={styles.boardView}>
                    {/* Todo Column */}
                    {groupedProjects.todo.length > 0 && (
                        <div className={styles.column}>
                            <h2>Todo</h2>
                            {groupedProjects.todo.map((project) => (
                                <div key={project.projectName} onClick={() => handleCardClick(project)}>
                                    <ProjectCard
                                        title={project.projectName}
                                        status={project.status}
                                        assignees={project.assignees}
                                        startDate={project.startDate}
                                        endDate={project.endDate}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Active Column */}
                    {groupedProjects.active.length > 0 && (
                        <div className={styles.column}>
                            <h2>Active</h2>
                            {groupedProjects.active.map((project) => (
                                <div key={project.projectName} onClick={() => handleCardClick(project)}>
                                    <ProjectCard
                                        title={project.projectName}
                                        status={project.status}
                                        assignees={project.assignees}
                                        startDate={project.startDate}
                                        endDate={project.endDate}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Completed Column */}
                    {groupedProjects.completed.length > 0 && (
                        <div className={styles.column}>
                            <h2>Completed</h2>
                            {groupedProjects.completed.map((project) => (
                                <div key={project.projectName} onClick={() => handleCardClick(project)}>
                                    <ProjectCard
                                        title={project.projectName}
                                        status={project.status}
                                        assignees={project.assignees}
                                        startDate={project.startDate}
                                        endDate={project.endDate}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {/* Add Project Modal */}
            <AddProjectModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                addProject={addProject} // Pass addProject function to the modal
            />
        </div>
    );
};

export default Dashboard;
