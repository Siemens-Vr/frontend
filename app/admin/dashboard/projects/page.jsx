"use client";

import React, { useState, useEffect } from 'react';
import ProjectCard from '../../ui/dashboard/projects/page';
import styles from './projects.module.css';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Dashboard = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // State for search term and filter
    const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
    const [filter, setFilter] = useState('All Projects');

    // Handle search and update the query string in URL
    function handleSearch(term) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    }

    // Available projects data with updated status
    const availableProjects = [
        { title: 'Alpha', status: "todo", assignees: ["Kimani", "John"], startDate: "01/09/2024", endDate: "15/09/2024" },
        { title: "Beta", status: "active", assignees: ['Jake', 'Sara'], startDate: "01/08/2024", endDate: "30/09/2024" },
        { title: "Gamma", status: "completed", assignees: ['Alice', 'Bob'], startDate: "01/07/2024", endDate: "01/09/2024" }
    ];

    // Breadcrumb for navigation
    const breadcrumb = [
        { label: 'Dashboard', link: '' },
        { label: 'Projects', link: '/admin/dashboard/projects' },
    ];

    // Filter projects based on search term and selected filter (status)
    const filteredProjects = availableProjects.filter(project => {
        const search = searchTerm.toLowerCase();
        const matchStatus = filter === 'All Projects' || project.status.toLowerCase() === filter.toLowerCase();
        const matchSearch = project.title.toLowerCase().includes(search) ||
            project.assignees.some(assignee => assignee.toLowerCase().includes(search));

        return matchStatus && matchSearch;
    });

    // Update the search term when input changes
    useEffect(() => {
        if (searchTerm) {
            handleSearch(searchTerm);
        }
    }, [searchTerm]);

    // Group filtered projects by status
    const groupedProjects = {
        todo: filteredProjects.filter(project => project.status.toLowerCase() === 'todo'),
        active: filteredProjects.filter(project => project.status.toLowerCase() === 'active'),
        completed: filteredProjects.filter(project => project.status.toLowerCase() === 'completed')
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

            {/* Navbar */}
            <nav className={styles.navbar}>
                <ul>
                    <li><a href="/admin/dashboard">Dashboard</a></li>
                    <li><a href="/admin/dashboard/projects">Projects</a></li>
                    <li><a href="">Teams</a></li>
                    <li><a href="">Settings</a></li>
                </ul>
            </nav>

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
                        <button className={styles.addProjectBtn}>+ Add Project</button>
                    </div>
                </header>

                {/* Board View */}
                <section className={styles.boardView}>
                    {/* Todo Column */}
                    {groupedProjects.todo.length > 0 && (
                        <div className={styles.column}>
                            <h2>Todo</h2>
                            {groupedProjects.todo.map((project) => (
                                <ProjectCard
                                    key={project.title}
                                    title={project.title}
                                    status={project.status}
                                    assignees={project.assignees}
                                    startDate={project.startDate}
                                    endDate={project.endDate}
                                />
                            ))}
                        </div>
                    )}

                    {/* Active Column */}
                    {groupedProjects.active.length > 0 && (
                        <div className={styles.column}>
                            <h2>Active</h2>
                            {groupedProjects.active.map((project) => (
                                <ProjectCard
                                    key={project.title}
                                    title={project.title}
                                    status={project.status}
                                    assignees={project.assignees}
                                    startDate={project.startDate}
                                    endDate={project.endDate}
                                />
                            ))}
                        </div>
                    )}

                    {/* Completed Column */}
                    {groupedProjects.completed.length > 0 && (
                        <div className={styles.column}>
                            <h2>Completed</h2>
                            {groupedProjects.completed.map((project) => (
                                <ProjectCard
                                    key={project.title}
                                    title={project.title}
                                    status={project.status}
                                    assignees={project.assignees}
                                    startDate={project.startDate}
                                    endDate={project.endDate}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
