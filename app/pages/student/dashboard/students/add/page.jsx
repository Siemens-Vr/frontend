"use client";

import { useEffect, useState } from "react";
import styles from '@/app/styles/students/addStudent/addStudent.module.css'
import { config } from "/config";

const AddStudentPage = () => {
  const [cohorts, setCohorts] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedCohortUuid, setSelectedCohortUuid] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    regNo: "",
    kcseNo: "",
    gender: "",
    cohort: "",
    level: "",
    feePayment: "",
    examResults: ""
  });

  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const response = await fetch(`${config.baseURL}/cohorts`);
        const data = await response.json();
        // console.log(data);
        setCohorts(data);
      } catch (error) {
        console.error("Error fetching cohorts:", error);
      }
    };
    fetchCohorts();
  }, []);

  useEffect(() => {
    if (selectedCohortUuid) {
      const fetchLevels = async () => {
        try {
          const url =`${config.baseURL}/levels/${selectedCohortUuid}`
          console.log(url)
          const response = await fetch(url);
          const data = await response.json();
          console.log(data);
          setLevels(data);
        } catch (error) {
          console.error("Error fetching levels:", error);
        }
      };
      fetchLevels();
    }
  }, [selectedCohortUuid]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCohortChange = (e) => {
    const uuid = e.target.value;
    setSelectedCohortUuid(uuid);
    setFormData({ ...formData, cohort: uuid });
  };

  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form data:", formData); // Log the form data being sent
  
      const response = await fetch(`${config.baseURL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      console.log("Response status:", response.status); // Log the response status code
  
      if (response.ok) {
        console.log("Student added successfully");
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000); // Hide after 3 seconds
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          regNo: "",
          kcseNo: "",
          gender: "",
          cohort: "",
          level: "",
          feePayment: "",
          examResults: ""
        });
        setLevels([]);
        setSelectedCohortUuid("");
      } else {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json(); // Parse JSON response
          console.error("Error response:", errorData);
        } else {
          console.error("Unexpected response format. Response might be an HTML error page.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // console.log("Submitting form data:", formData); // Log the form data being sent

  //     const response = await fetch(`${config.baseURL}/students`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     console.log("Response status:", response.status); // Log the response status code

  //     if (response.ok) {
  //       console.log("Student added successfully");
  //       setShowSuccess(true);
  //       setTimeout(() => setShowSuccess(false), 3000); // Hide after 3 seconds
  //       // Reset form
  //       setFormData({
  //         firstName: "",
  //         lastName: "",
  //         email: "",
  //         phone: "",
  //         regNo: "",
  //         kcseNo: "",
  //         gender: "",
  //         cohort: "",
  //         level: "",
  //         feePayment: "",
  //         examResults: ""
  //       });
  //       setLevels([]);
  //       setSelectedCohortUuid("");
  //     } else {
  //       console.error("Failed to add student");
  //       const errorData = await response.json(); // Get the error response data
  //       console.error("Error response:", errorData); // Log the error response
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <div className={styles.container}>
      {showSuccess && (
        <div className={styles.successMessage}>
          Student added successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Registration Number"
          name="regNo"
          value={formData.regNo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="KCSE Number"
          name="kcseNo"
          value={formData.kcseNo}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <select
          name="cohort"
          value={formData.cohort}
          onChange={handleCohortChange}
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
          name="level"
          value={formData.level}
          onChange={handleChange}
          required
        >
          <option value="">Select Level</option>
          {levels.length > 0 ? (
            levels.map((level) => (
              <option key={level.id} value={level.uuid}>
                {level.levelName}
              </option>
            ))
          ) : (
            <option value="" disabled>Loading levels...</option>
          )}
        </select>
        <select
          name="feePayment"
          value={formData.feePayment}
          onChange={handleChange}
        >
          <option value="">Fee Payment Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
        <select
          name="examResults"
          value={formData.examResults}
          onChange={handleChange}
        >
          <option value="">Exam Result Status</option>
          <option value="pass">Pass</option>
          <option value="fail">Fail</option>
          <option value="no-show">No Show</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddStudentPage;