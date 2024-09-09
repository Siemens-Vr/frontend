"use client";

import React, { useState, useEffect } from 'react';
import styles from "@/app/ui/dashboard/cohorts/addCohort/addCohort.module.css";

const CohortForm = () => {
  const [cohortName, setCohortName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [levels, setLevels] = useState([]);
  const [facilitators, setFacilitators] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchFacilitators = async () => {
      try {
        const response = await fetch('https://erp-api-jz0q.onrender.com/facilitators');
        const data = await response.json();
        console.log('Fetched facilitators:', data);
        if (Array.isArray(data)) {
          setFacilitators(data);
        } else {
          setFacilitators([]);
        }
      } catch (error) {
        console.error('Error fetching facilitators:', error);
        setFacilitators([]);
      }
    };

    fetchFacilitators();
  }, []);

  const handleLevels = async (cohortId) => {
    for (const level of levels) {
      console.log('Level data:', level);

      const levelResponse = await fetch('https://erp-api-jz0q.onrender.com/levels', {
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
      console.log('Level created:', levelData);

      for (const facilitatorId of level.facilitatorIds) {
        await fetch('https://erp-api-jz0q.onrender.com/levels/facilitators', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ levelId: levelData.uuid, facilitatorId }),
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cohortResponse = await fetch('https://erp-api-jz0q.onrender.com/cohorts', {
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
    setLevels([...levels, { levelName: '', startDate: '', endDate: '', exam_dates: '', exam_quotation_number: '', facilitatorIds: [] }]);
  };

  const deleteLevel = (index) => {
    const updatedLevels = levels.filter((_, i) => i !== index);
    setLevels(updatedLevels);
  };

  const handleLevelChange = (index, field, value) => {
    const updatedLevels = [...levels];
    updatedLevels[index][field] = value;
    setLevels(updatedLevels);
  };

  const handleFacilitatorChange = (levelIndex, facilitatorId, isChecked) => {
    const updatedLevels = [...levels];
    const level = updatedLevels[levelIndex];
    const facilitatorIds = [...level.facilitatorIds];

    if (isChecked) {
      facilitatorIds.push(facilitatorId);
    } else {
      const index = facilitatorIds.indexOf(facilitatorId);
      facilitatorIds.splice(index, 1);
    }

    level.facilitatorIds = facilitatorIds;
    updatedLevels[levelIndex] = level;
    setLevels(updatedLevels);
  };

  return (
    <div className={styles.container}>
      {showSuccessMessage && (
        <div className={styles.successMessage}>Cohort created successfully!</div>
      )}
      <form  onSubmit={handleSubmit}>
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
            <div className={styles.formGroup}>
              <label className={styles.label}>Facilitators</label>
              {facilitators.length === 0 ? (
                <p>No facilitators available</p>
              ) : (
                facilitators.map((facilitator) => (
                  <div key={facilitator.uuid} className={styles.facilitatorCheckbox}>
                    <input
                      type="checkbox"
                      id={`facilitator-${facilitator.uuid}`}
                      checked={level.facilitatorIds.includes(facilitator.uuid)}
                      onChange={(e) =>
                        handleFacilitatorChange(index, facilitator.uuid, e.target.checked)
                      }
                    />
                    <label htmlFor={`facilitator-${facilitator.uuid}`}>
                      {facilitator.firstName} {facilitator.lastName}
                    </label>
                  </div>
                ))
              )}
            </div>
            <div className={styles.btn}>
              <button
                type="button"
                onClick={() => deleteLevel(index)}
                className={`${styles.deleteButton} ${styles.button}`}
              >
                Delete Level
              </button>
              </div>
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




