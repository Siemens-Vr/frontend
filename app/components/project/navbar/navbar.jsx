// components/Navbar.js
"use client";
import React from "react";
import Link from "next/link";
import styles from "@/app/styles/project/navbar/navbar.module.css"; // Create a CSS module for the Navbar styles

const Navbar = ({ projectName, onSectionChange, activeSection }) => {
  return (
    <div className={styles.navbarPage}>
      <div className={styles.top}>
        <h1>{projectName}</h1>
      </div>
      <nav className={styles.navbar}>
        <div className={styles.brand}>
          <h1>Dashboard</h1>
        </div>
        <div className={styles.navLinks}>
          <button
            className={activeSection === "details" ? styles.active : ""}
            onClick={() => onSectionChange("details")}
          >
            Project Details
          </button>
          <button
            className={activeSection === "assignees" ? styles.active : ""}
            onClick={() => onSectionChange("assignees")}
          >
            Assignees
          </button>
          <button
            className={activeSection === "phases" ? styles.active : ""}
            onClick={() => onSectionChange("phases")}
          >
            Phases
          </button>
          <button
              className={activeSection === "deliverables" ? styles.active : ""}
              onClick={() => onSectionChange("deliverables")}
          >
            Deliverables
          </button>
          <button
            className={activeSection === "documents" ? styles.active : ""}
            onClick={() => onSectionChange("documents")}
          >
            Documents
          </button>
          <button
            className={activeSection === "calendar" ? styles.active : ""}
            onClick={() => onSectionChange("calendar")}
          >
            Calendar
          </button>
        </div>
    </nav>
    </div>
  );
};

export default Navbar;
