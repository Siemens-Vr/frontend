"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "@/app/styles/project/project/project.module.css";
import Navbar from "@/app/components/project/navbar/navbar";
import RightSidebar from "@/app/components/project/rightSidebar/rightSidebar";
import Details from "app/pages/project/dashboard/project/details/page";
import Documents from "app/pages/project/dashboard/project/documents/page";
import Assignees from "app/pages/project/dashboard/project/assignees/page";
import Phases from "app/pages/project/dashboard/project/phases/page";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ProjectInfo = () => {
  const searchParams = useSearchParams();
  const uuid = searchParams.get("uuid");
  
  const [assignees, setAssignees] = useState([]);
  const [phases, setPhases] = useState([]);
  const [deliverables, setDeliverables] = useState([]);
 
  const [projectDetails, setProjectDetails] = useState({
    projectName: "",
    status: "",
    description: "",
    budget: 0,
    funding: 0,
  });
  const [activeSection, setActiveSection] = useState("details");

  const backendUrl = "https://erpbackend-6vez.onrender.com";

  // Fetch project details
  useEffect(() => {
    const fetchProjectData = async () => {
      if (!uuid) return;

      try {
        const projectRes = await fetch(`${backendUrl}/projects/${uuid}`);
        if (!projectRes.ok) throw new Error("Error fetching project data");

        const projectData = await projectRes.json();
        console.log(projectData)
        setProjectDetails({
          projectName: projectData.name,
          status: projectData.status,
          description: projectData.description,
          budget: projectData.budget,
          funding: projectData.funding,
        });
        setAssignees(projectData.assignees || []);
        setDeliverables(projectData.deliverables || []);
        setPhases(projectData.phases || []);
      } catch (error) {
        console.error("Failed to fetch project data:", error);
      }
    };

    fetchProjectData();
  }, [uuid]);

  return (
    <div className={styles.projectInfoContainer}>
      {/* Navbar */}
      <Navbar
        projectName={projectDetails.projectName}
        onSectionChange={setActiveSection}
        activeSection={activeSection}
      />

      <div className={styles.content}>
        {/* Main Content */}
        <div className={styles.mainContent}>
        {activeSection === "details" && (
                        <Details projectDetails={projectDetails} />
                    )}
          {activeSection === "documents" && <Documents uuid={uuid} />}
          {activeSection === "assignees" &&  <Assignees
                            uuid={uuid}
                            backendUrl={backendUrl}
                        />}
          {activeSection === "phases" &&      <Phases uuid={uuid}
                            phases={phases}
                            backendUrl={backendUrl}
                            setPhases={setPhases}
                            />}
          {activeSection === "calendar" && <Calendar />}
        </div>

        {/* Conditionally Render Right Sidebar */}
        {activeSection === "details" && (
          <div className={styles.rightBar}>
            <RightSidebar
              budget={projectDetails.budget}
              funding={projectDetails.funding}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectInfo;
