"use client";
import { useEffect, useState } from "react";
import styles from "../ui/components/addLevelPopup.module.css";
import { config } from "../../../config";

const AddLevelPopup = ({ studentId, onClose }) => {
  const [cohorts, setCohorts] = useState([]);
  const [levels, setLevels] = useState([]);
  const [levelId, setLevelId] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCohorts = async () => {
      try {
        const response = await fetch(`${config.baseURL}/cohorts`);
        if (!response.ok) throw new Error("Failed to fetch cohorts");
        const data = await response.json();
        setCohorts(data);
      } catch (error) {
        setError("Failed to load cohorts");
        console.error(error);
      }
    };

    getCohorts();
  }, []);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await fetch(`${config.baseURL}/levels/${selectedCohort}`);
        if (!response.ok) throw new Error("Failed to fetch levels");
        const data = await response.json();
        setLevels(data);
      } catch (error) {
        setError("Failed to load levels");
        console.error(error);
      }
    };

    if (selectedCohort) {
      fetchLevels();
    }
  }, [selectedCohort]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (levelId) {
      try {
        const response = await fetch(`${config.baseURL}/students/addLevel`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ studentId, levelId })
        });
        if (!response.ok) throw new Error("Failed to add level");

        // Show success alert
        window.alert("Level has been added successfully.");
      } catch (error) {
        setError("Failed to add level");
        console.error(error);
      }
      onClose();
    }
  };

  return (
    <div className={styles.popup} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <h2>Select Level</h2>
        {error && <p className={styles.error}>{error}</p>}
        <select
          name="cohort"
          value={selectedCohort}
          onChange={(e) => setSelectedCohort(e.target.value)}
          required
        >
          <option value="">Select Cohort</option>
          {cohorts.length > 0 ? (
            cohorts.map((cohort) => (
              <option key={cohort.uuid} value={cohort.uuid}>
                {cohort.cohortName}
              </option>
            ))
          ) : (
            <option value="" disabled>Loading cohorts...</option>
          )}
        </select>
        <select
          value={levelId}
          onChange={(e) => setLevelId(e.target.value)}
        >
          <option value="">Select a level</option>
          {levels.length > 0 ? (
            levels.map((level) => (
              <option key={level.uuid} value={level.uuid}>{level.levelName}</option>
            ))
          ) : (
            <option value="">Loading levels...</option>
          )}
        </select>
        <button onClick={handleSubmit}>Add Level</button>
      </div>
    </div>
  );
};

export default AddLevelPopup;
