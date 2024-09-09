"use client";

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import styles from "../../../ui/dashboard/cohorts/addCohort/addCohort.module.css";
import Link from 'next/link';
import { config } from '/config';

console.log(`${config.baseURL}`)

const CohortForm = () => {
  const [cohortName, setCohortName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [levels, setLevels] = useState([]);
  const [facilitators, setFacilitators] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedFacilitator, setSelectedFacilitator] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [facilitatorRoles, setFacilitatorRoles] = useState([]);

  useEffect(() => {
    const fetchFacilitators = async () => {
      try {
        const response = await fetch(`${config.baseURL}/facilitators`);
        const data = await response.json();
        // console.log('Fetched facilitators:', data);
        if (Array.isArray(data)) {
          setFacilitators(data);
        } else {
          setFacilitators([]);
        }
      } catch (error) {
        // console.error('Error fetching facilitators:', error);
        setFacilitators([]);
      }
    };

    fetchFacilitators();
  }, []);

  const handleLevels = async (cohortId) => {
    for (const level of levels) {
      // console.log('Level data:', level);

      const levelResponse = await fetch(`${config.baseURL}/levels`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...level, cohortId }),
      });

      if (!levelResponse.ok) {
        throw new Error('Failed to create level');
      }

      const levelData = await levelResponse.json();
      // console.log('Level created:', levelData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cohortResponse = await fetch(`${config.baseURL}/cohorts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cohortName, startDate, endDate }),
      });

      if (!cohortResponse.ok) {
        throw new Error('Failed to create cohort');
      }

      const cohort = await cohortResponse.json();
      const cohortId = cohort.uuid;

      console.log('Created cohort:', cohort);

      await handleLevels(cohortId);

      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        setCohortName('');
        setStartDate('');
        setEndDate('');
        setLevels([]);
      }, 3000);
    } catch (error) {
      console.error('Error creating cohort and levels:', error);
    }
  };

  const addLevel = () => {
    setLevels([...levels, { levelName: '', startDate: '', endDate: '', exam_dates: '' , exam_quotation_number: '', facilitators: [] }]);
  };

  const deleteLevel = (index) => {
    const updatedLevels = levels.filter((_, i) => i !== index);
    setLevels(updatedLevels);
  };

  const handleLevelChange = (index, field, value) => {
    const updatedLevels = [...levels];
    updatedLevels[index][field] = value || null;
    setLevels(updatedLevels);
  };

  const addFacilitatorRole = (levelIndex) => {
    if (selectedFacilitator && selectedRole) {
      const updatedLevels = [...levels];
      const updatedFacilitators = [
        ...updatedLevels[levelIndex].facilitators,
        { value: selectedFacilitator.value, label: selectedFacilitator.label, role: selectedRole.value }
      ];
      updatedLevels[levelIndex].facilitators = updatedFacilitators;
      setLevels(updatedLevels);
      setSelectedFacilitator(null);
      setSelectedRole(null);
    }
  };
  const removeFacilitatorRole = (levelIndex, facilitatorIndex) => {
    const updatedLevels = [...levels];
    updatedLevels[levelIndex].facilitators.splice(facilitatorIndex, 1);
    setLevels(updatedLevels);
  };

  const roleOptions = [
    { value: 'Theory instructor', label: 'Theory instructor' },
    { value: ' Practical Instructo', label: ' Practical Instructo' },
  ];
// console.log(facilitators)
  return (
    <div className={styles.container}>
      {showSuccessMessage && (
        <div className={styles.successMessage}>Cohort created successfully!</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Cohort Name</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter cohort name"
              value={cohortName}
              onChange={(e) => setCohortName(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Start Date</label>
            <input
              className={styles.input}
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>End Date</label>
            <input
              className={styles.input}
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          {levels.map((level, index) => (
            <div className={styles.levelGroup} key={index}>
              <h3 className={styles.title}>Level</h3>
              <div className={styles.formGroup}>
                <label className={styles.label}>Level Name</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Enter level name"
                  value={level.levelName}
                  onChange={(e) => handleLevelChange(index, 'levelName', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Start Date</label>
                <input
                  className={styles.input}
                  type="date"
                  value={level.startDate}
                  onChange={(e) => handleLevelChange(index, 'startDate', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>End Date</label>
                <input
                  className={styles.input}
                  type="date"
                  value={level.endDate}
                  onChange={(e) => handleLevelChange(index, 'endDate', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Exam Date</label>
                <input
                  className={styles.input}
                  type="date"
                  value={level.exam_dates}
                  onChange={(e) => handleLevelChange(index, 'exam_dates', e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Exam Quotation Number</label>
                <input
                  className={styles.input}
                  type="text"
                  value={level.exam_quotation_number}
                  onChange={(e) => handleLevelChange(index, 'exam_quotation_number', e.target.value)}
                />
              </div>
              <label htmlFor="">Facilitators</label>


              {level.facilitators.length > 0 && (
                <div className={styles.facilitatorRoleTable}>
                  <table>
                    <thead>
                      <tr>
                        <th>Facilitator</th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {level.facilitators.map((facilitator, i) => (
                          <tr key={i}>
                            <td>{facilitator.label}</td>
                            <td>{facilitator.role}</td>
                            <td>
                              <button onClick={() => removeFacilitatorRole(index, i)}>Remove</button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className={styles.facilitatorRoleSelection}>
                <Select
                  className={styles.select}
                  placeholder="Select Facilitator"
                  options={facilitators.map(facilitator => ({
                    value: facilitator.uuid,
                    label: `${facilitator.firstName} ${facilitator.lastName}`
                  }))}
                  value={selectedFacilitator}
                  onChange={setSelectedFacilitator}
                />
                <Select
                  className={styles.select}
                  placeholder="Select Role"
                  options={roleOptions}
                  value={selectedRole}
                  onChange={setSelectedRole}
                />
                <button
                  type="button"
                  className={styles.addFacilitatorRoleButton}
                  onClick={() => addFacilitatorRole(index)}
                >
                  Add 
                </button>
              </div>
            
            
              <button
                type="button"
                onClick={() => deleteLevel(index)}
                className={`${styles.deleteButton} ${styles.button}`}
              >
                Delete Level
              </button>
            </div>
          ))}
        </div>
        <div className={styles.buttons}>
          <button
            type="button"
            onClick={addLevel}
            className={`${styles.addButton} ${styles.button}`}
          >
            Add New Level
          </button>
          <button
            type="submit"
            className={`${styles.submitButton} ${styles.button}`}
            disabled={levels.length === 0}
          >
            Create Cohort
          </button>
        </div>
      </form>
    </div>
  );
};

export default CohortForm;
