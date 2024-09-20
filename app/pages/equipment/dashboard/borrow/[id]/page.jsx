// SinglePage.jsx
"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import styles from '@/app/styles/borrow/singlepage/singlepage.module.css';
import { config } from "/config";

const SinglePage = () => {
  const params = useParams();
  const uuid = params.id;

  const [borrowerData, setBorrowerData] = useState(null);
  const [editableFields, setEditableFields] = useState({
    actualReturnDate: false,
    status: false,
    condition: false,
    conditionDetails: false,
  });
  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch borrower data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.baseURL}/borrow/${uuid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch borrower data.");
        }
        const data = await response.json();
        setBorrowerData(data);
        initializeEditableFields(data);
        setFormValues(extractFormValues(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (uuid) {
      fetchData();
    }
  }, [uuid]);

  // Initialize which fields are editable based on fetched data
  const initializeEditableFields = (data) => {
    setEditableFields({
      actualReturnDate: !data.actualReturnDate,
      status: true,
      condition: data.component?.condition !== "Okay",
      conditionDetails: data.component?.condition === "Not Okay",
    });
  };

  // Extract initial form values from borrower data
  const extractFormValues = (data) => {
    return {
      actualReturnDate: data.actualReturnDate || "",
      status: data.component?.status ? "Borrowed" : "Not Borrowed",
      condition: data.component?.condition || "",
      conditionDetails: data.component?.conditionDetails || "",
    };
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Enable editing for a specific field
  const enableEdit = (fieldName) => {
    setEditableFields((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  // Cancel editing for a specific field
  const cancelEdit = (fieldName) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: borrowerData.component?.[fieldName] || "",
    }));
    setEditableFields((prev) => ({
      ...prev,
      [fieldName]: false,
    }));
  };

  // Save the updated field
  const saveField = async (fieldName) => {
    const updatedValue = formValues[fieldName];
    const payload =
      fieldName === "status"
        ? { component: { ...borrowerData.component, status: updatedValue === "Borrowed" } }
        : fieldName === "actualReturnDate"
        ? { actualReturnDate: updatedValue }
        : { component: { ...borrowerData.component, [fieldName]: updatedValue } };

    try {
      const response = await fetch(`${config.baseURL}/borrow/${uuid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update the field.");
      }

      const updatedData = await response.json();
      setBorrowerData(updatedData);
      initializeEditableFields(updatedData);
      setFormValues(extractFormValues(updatedData));
    } catch (err) {
      alert(err.message);
    }
  };

  if (isLoading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!borrowerData) {
    return <div className={styles.noData}>No Data Available.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {/* Borrower Information */}
        <div className={styles.formSection}>
          <h2>Borrower&rsquo;s Information</h2>
          <div className={styles.fieldGroup}>
            <label>Full Name</label>
            <input type="text" value={borrowerData.fullName || ""} readOnly />
          </div>
          <div className={styles.fieldGroup}>
            <label>Contact</label>
            <input type="text" value={borrowerData.borrowerContact || ""} readOnly />
          </div>
          <div className={styles.fieldGroup}>
            <label>ID Number</label>
            <input type="text" value={borrowerData.borrowerID || ""} readOnly />
          </div>
          <div className={styles.fieldGroup}>
            <label>Department</label>
            <input type="text" value={borrowerData.departmentName || ""} readOnly />
          </div>
          <div className={styles.fieldGroup}>
            <label>Date of Issue</label>
            <input
              type="text"
              value={
                borrowerData.dateOfIssue
                  ? new Date(borrowerData.dateOfIssue).toLocaleDateString()
                  : ""
              }
              readOnly
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Expected Return Date</label>
            <input
              type="text"
              value={
                borrowerData.expectedReturnDate
                  ? new Date(borrowerData.expectedReturnDate).toLocaleDateString()
                  : ""
              }
              readOnly
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Return Date</label>
            {borrowerData.actualReturnDate ? (
              <input
                type="text"
                value={new Date(borrowerData.actualReturnDate).toLocaleDateString()}
                readOnly
              />
            ) : (
              <div className={styles.editableField}>
                <input
                  type="date"
                  name="actualReturnDate"
                  value={formValues.actualReturnDate}
                  readOnly={!editableFields.actualReturnDate}
                  onChange={handleChange}
                />
                {editableFields.actualReturnDate ? (
                  <div className={styles.actionButtons}>
                    <button onClick={() => saveField("actualReturnDate")}>Save</button>
                    <button onClick={() => cancelEdit("actualReturnDate")}>Cancel</button>
                  </div>
                ) : (
                    <div className={styles.actionButtons}>
                  <button className={styles.actionButtons} onClick={() => enableEdit("actualReturnDate")}>Edit</button>

                    </div>
                )}
              </div>
            )}
          </div>
          <div className={styles.fieldGroup}>
            <label>Purpose</label>
            <input type="text" value={borrowerData.purpose || ""} readOnly />
          </div>
          <div className={styles.fieldGroup}>
            <label>Reason for Borrowing</label>
            <input type="text" value={borrowerData.reasonForBorrowing || ""} readOnly />
          </div>
        </div>

        {/* Component Information */}
        <div className={styles.formSection}>
          <h2>Component Information</h2>
          <div className={styles.fieldGroup}>
            <label>Component Name</label>
            <input type="text" value={borrowerData.component?.componentName || ""} readOnly />
          </div>
          <div className={styles.fieldGroup}>
            <label>Component Type</label>
            <input type="text" value={borrowerData.component?.componentType || ""} readOnly />
          </div>
          <div className={styles.fieldGroup}>
            <label>Part Number</label>
            <input type="text" value={borrowerData.component?.partNumber || ""} readOnly />
          </div>
          <div className={styles.fieldGroup}>
            <label>Status</label>
            <div className={styles.editableField}>
              <select
                name="status"
                value={formValues.status}
                disabled={!editableFields.status}
                onChange={handleChange}
              >
                <option value="Borrowed">Borrowed</option>
                <option value="Not Borrowed">Not Borrowed</option>
              </select>
              {editableFields.status && (
                <div className={styles.actionButtons}>
                  <button onClick={() => saveField("status")}>Save</button>
                  <button onClick={() => cancelEdit("status")}>Cancel</button>
                </div>
              )}
              {!editableFields.status && (
                <button onClick={() => enableEdit("status")}>Edit</button>
              )}
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label>Condition</label>
            <div className={styles.editableField}>
              <select
                name="condition"
                value={formValues.condition}
                disabled={!editableFields.condition}
                onChange={handleChange}
              >
                <option value="Okay">Okay</option>
                <option value="Not Okay">Not Okay</option>
              </select>
              {editableFields.condition && (
                <div className={styles.actionButtons}>
                  <button onClick={() => saveField("condition")}>Save</button>
                  <button onClick={() => cancelEdit("condition")}>Cancel</button>
                </div>
              )}
              {!editableFields.condition && (
                <button onClick={() => enableEdit("condition")}>Edit</button>
              )}
            </div>
          </div>
          {formValues.condition === "Not Okay" && (
            <div className={styles.fieldGroup}>
              <label>Condition Details</label>
              <div className={styles.editableField}>
                <input
                  type="text"
                  name="conditionDetails"
                  value={formValues.conditionDetails}
                  disabled={!editableFields.conditionDetails}
                  onChange={handleChange}
                />
                {editableFields.conditionDetails && (
                  <div className={styles.actionButtons}>
                    <button onClick={() => saveField("conditionDetails")}>Save</button>
                    <button onClick={() => cancelEdit("conditionDetails")}>Cancel</button>
                  </div>
                )}
                {!editableFields.conditionDetails && (
                  <button onClick={() => enableEdit("conditionDetails")}>Edit</button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
