import React from "react";
import styles from "@/app/styles/project/projectInfo.module.css";

const ProjectInfo = ({ newProject, setNewProject }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProject((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.projectInfo}>
            <label>
                Project Name:
                <input
                    type="text"
                    name="projectName"
                    value={newProject.projectName}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Start Date:
                <input
                    type="date"
                    name="startDate"
                    value={newProject.startDate}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                End Date:
                <input
                    type="date"
                    name="endDate"
                    value={newProject.endDate}
                    onChange={handleChange}
                />
            </label>
            <label>
                Status:
                <select
                    name="status"
                    value={newProject.status}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Status</option>
                    <option value="not started">Not Started</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="on hold">On Hold</option>
                    <option value="canceled">Canceled</option>
                </select>
            </label>
            <label>
                Comments:
                <input
                    type="text"
                    name="comments"
                    value={newProject.comments}
                    onChange={handleChange}
                />
            </label>
        </div>
    );
};

export default ProjectInfo;