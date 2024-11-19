"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import ProjectCard from '@/app/components/project/projectCard';
import AddProjectModal from '@/app/components/project/add/AddProjectModal';
import styles from '@/app/styles/dashboards/project/dashboard.module.css';

const Dashboard = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
    const [filter, setFilter] = useState('All Projects');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null); // To store the selected project for actions

    // Fetch projects from backend
    const fetchProjects = async () => {
        setLoading(true); // Start loading state
        try {
            const response = await fetch("https://erpbackend-6vez.onrender.com/projects");
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setProjects(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects(); // Fetch projects on mount
    }, []);

    function handleSearch(term) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        router.replace(`${pathname}?${params.toString()}`);
    }

    const filteredProjects = projects.filter((project) => {
        if (!project.name || !project.status) return false;

        const search = searchTerm.toLowerCase();
        const projectName = project.name.trim().toLowerCase();
        const projectStatus = project.status.trim().toLowerCase();

        const matchStatus =
            filter === 'All Projects' ||
            (filter.toLowerCase() === 'active' && projectStatus === 'progress') ||
            projectStatus === filter.toLowerCase();
        const matchSearch = projectName.includes(search);
        return matchStatus && matchSearch;
    });

    const groupedProjects = {
        todo: filteredProjects.filter((project) => project.status.trim().toLowerCase() === 'todo'),
        active: filteredProjects.filter(
            (project) =>
                project.status.trim().toLowerCase() === 'active' ||
                project.status.trim().toLowerCase() === 'progress'
        ),
        completed: filteredProjects.filter((project) => project.status.trim().toLowerCase() === 'completed'),
    };

    const handleCardClick = (project) => {
        console.log(project.uuid)
        router.push(`/pages/project/dashboard/project?uuid=${project.uuid}`);
    };


    const handleDelete = async (uuid) => {
        // Call the delete API endpoint
        const response = await fetch(`https://erpbackend-6vez.onrender.com/projects/${uuid}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setProjects((prevProjects) => prevProjects.filter((project) => project.uuid !== uuid));
        } else {
            console.error('Failed to delete the project');
        }
        setSelectedProject(null); // Reset selected project
    };

    const openModal = () => setIsModalOpen(true);

    // Update closeModal to fetch projects
    const closeModal = () => {
        setIsModalOpen(false);
        fetchProjects(); // Refresh project list when modal closes
    };

    const addProject = async (newProject) => {
        // Call the API to add the new project
        const response = await fetch("https://erpbackend-6vez.onrender.com/projects", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProject),
        });

        if (response.ok) {
            // Optionally you can call fetchProjects here too
        } else {
            console.error('Failed to add the project');
        }
        closeModal(); // Call closeModal to close and refresh
    };

    const handleMenuClick = (project) => {
        setSelectedProject(project); // Set the selected project for actions
    };

    if (loading) return <p>Loading projects...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.breadcrumb}>
                <span><a href="/pages/project/dashboard">Dashboard</a> Projects</span>
            </div>

            <div className={styles.mainContent}>
                <header className={styles.header}>
                    <h1>Project Management Dashboard</h1>
                    <div className={styles.controls}>
                        <input
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            type="text"
                            placeholder="Search projects..."
                            className={styles.searchInput}
                        />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className={styles.filterDropdown}
                        >
                            <option value="All Projects">All Projects</option>
                            <option value="Todo">Todo</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <button className={styles.addProjectBtn} onClick={openModal}>
                            + Add Project
                        </button>
                    </div>
                </header>

                <section className={styles.boardView}>
                    {Object.entries(groupedProjects).map(([status, projects]) => (
                        <div className={styles.column} key={status}>
                            <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
                            <div className={styles.cardContainer}>
                                {projects.length > 0 ? (
                                    projects.map((project) => (
                                        <div key={project.uuid} className={styles.projectCard}>
                                            <div className={styles.cardContent} onClick={() => handleCardClick(project)}>
                                                <ProjectCard
                                                    title={project.name}
                                                    status={project.status}
                                                    assignees={project.assignees}
                                                    startDate={project.startDate}
                                                    endDate={project.endDate}
                                                />
                                                <div className={styles.menuButton} onClick={(e) => {
                                                    e.stopPropagation(); // Prevent card click
                                                    handleMenuClick(project);
                                                }}>
                                                    &#x022EE; {/* Three dots icon */}
                                                </div>
                                            </div>
                                            {selectedProject === project && (
                                                <div className={styles.menuOptions}>
                                                    <button onClick={() => handleCardClick(project)}>View</button>
                                                    <button onClick={() => handleDelete(project.uuid)}>Delete</button>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p>No {status} projects available.</p>
                                )}
                            </div>
                        </div>
                    ))}
                </section>
            </div>

            <AddProjectModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                addProject={addProject}
            />
        </div>
    );
};

export default Dashboard;
