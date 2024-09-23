"use client";

import React, { useState } from 'react';
import ProjectCard from '../../ui/dashboard/projects/page';
import styles from './projects.module.css'

const Dashboard = () => {

    // Breadcrumb for navigation
    const breadcrumb = [
        { label: 'Dashboard', link: '/dashboard' },
        { label: 'Projects', link: '/dashboard/projects' },
    ];

    // Define filter state
    const [filter, setFilter] = useState('All Projects');

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
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/dashboard/projects">Projects</a></li>
                    <li><a href="/dashboard/team">Teams</a></li>
                    <li><a href="/dashboard/settings">Settings</a></li>
                </ul>
            </nav>

            {/* Main Content */}
            <div className={styles.mainContent}>
                {/* Header Section */}
                <header className={styles.header}>
                    <h1>Project Management Dashboard</h1>
                    <div className={styles.controls}>
                        <input type="text" placeholder="Search projects..." className={styles.searchInput} />
                        {/* Filter Dropdown */}
                        <select value={filter} onChange={(e) => setFilter(e.target.value)} className={styles.filterDropdown}>
                            <option value="All Projects">All Projects</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <button className={styles.addProjectBtn}>+ Add Project</button>
                    </div>
                </header>

                {/* Board View */}
                <section className={styles.boardView}>
                    <div className={styles.column}>
                        <h2>To Do</h2>
                        <ProjectCard title="Alpha" status="todo" assignees={['John', 'Jane']} startDate="01/09/2024" endDate="15/09/2024" />
                    </div>
                    <div className={styles.column}>
                        <h2>In Progress</h2>
                        <ProjectCard title="Beta" status="inprogress" assignees={['Jake', 'Sara']} startDate="01/08/2024" endDate="30/09/2024" />
                    </div>
                    <div className={styles.column}>
                        <h2>Completed</h2>
                        <ProjectCard title="Gamma" status="completed" assignees={['Alice', 'Bob']} startDate="01/07/2024" endDate="01/09/2024" />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
