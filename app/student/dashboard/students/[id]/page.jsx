"use client";
import styles from "../../../ui/dashboard/students/singleStudent/sStudent.module.css";
import { useState, useEffect } from "react";
import { config } from "/config";

const SinstudentPage = ({ params }) => {
  const [student, setStudent] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({});
  const { id } = params;

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`${config.baseURL}/students/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStudent(data);
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          regNo: data.regNo,
          kcseNo: data.kcseNo,
          gender: data.gender,
          feePayment: data.feePayment,
          examResults: data.examResults,
        });
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };
    fetchStudent();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.baseURL}/students/${id}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update student information");
      }

      const updatedStudent = await response.json();
      setStudent(updatedStudent);
      alert("Student information updated successfully!")
      // setSuccessMessage("Student information updated successfully!");
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}
      <div className={styles.contentContainer}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatarName}>
            <img
              src="/noavatar.png"
              alt={`${student.firstName} ${student.lastName}`}
              className={styles.avatar}
            />
            <h3 className={styles.name}>
              {student.firstName} {student.lastName}
            </h3>
          </div>
          <div className={styles.studentLevelInfo}>
            {student.levels && student.levels.length > 0 ? (
              student.levels.map((level, index) => (
                <div key={index} className={styles.levelInfo}>
                  <h3>{level.levelName}</h3>
                  <p>Start Date: {level.startDate}</p>
                  <p>End Date: {level.endDate}</p>
                  <p>Cohort: {level.Cohort.cohortName}</p>
                  <button>DONE</button>
                </div>
              ))
            ) : (
              <p>No levels found</p>
            )}
          </div>
        </div>

        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleUpdate}>
            <div className={styles.formGroup}>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Registration Number</label>
              <input
                type="text"
                name="regNo"
                value={formData.regNo}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>KCSE Number</label>
              <input
                type="text"
                name="kcseNo"
                value={formData.kcseNo}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Fee Payment Status</label>
              <select
                name="feePayment"
                value={formData.feePayment}
                onChange={handleInputChange}
              >
                <option value="">Fee Payment Status</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Exam Result Status</label>
              <select
                name="examResults"
                value={formData.examResults}
                onChange={handleInputChange}
              >
                <option value="">Exam Result Status</option>
                <option value="pass">Pass</option>
                <option value="fail">Fail</option>
                <option value="no-show">No Show</option>
              </select>
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SinstudentPage;
