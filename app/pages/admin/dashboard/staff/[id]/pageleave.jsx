"use client";
import styles from "@/app/ui/dashboard/staff/singleStaff/singleStaff.module.css";
import { useState, useEffect } from "react";

const SingleStaffPage = ({ params }) => {
  const [staff, setStaff] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    role: '',
    idNo: '',
    startDate: '',
  });
  const [leaveData, setLeaveData] = useState({
    totalLeaveDays: 20, // Dummy data
    leaveDaysLeft: 15, // Dummy data
    newLeaveDate: '',
    leaveDates: [], // Array to store leave dates
  });

  const { id } = params;

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch(`http://localhost:5000/staffs/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStaff(data);
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone || '',
          gender: data.gender,
          role: data.role,
          idNo: data.idNo,
          startDate: data.startDate || '',
        });
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    };

    fetchStaff();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLeaveChange = (e) => {
    setLeaveData({
      ...leaveData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://erp-api-jz0q.onrender.com/staffs/${id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);

      const updatedStaff = await fetch(`https://erp-api-jz0q.onrender.com/staffs/${id}`);
      const updatedData = await updatedStaff.json();
      setStaff(updatedData);
    } catch (error) {
      alert('Failed to update staff. Please try again.');
    }
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    // Add the new leave date to the array and update leave days left
    setLeaveData(prevData => ({
      ...prevData,
      leaveDates: [...prevData.leaveDates, prevData.newLeaveDate],
      leaveDaysLeft: prevData.leaveDaysLeft - 1,
      newLeaveDate: '',
    }));
    setSuccessMessage('Leave day added successfully');
    setTimeout(() => {
      setSuccessMessage('');
    }, 2000);
  };

  const handleDeleteLeaveDate = (index) => {
    setLeaveData(prevData => {
      const updatedLeaveDates = prevData.leaveDates.filter((_, i) => i !== index);
      return {
        ...prevData,
        leaveDates: updatedLeaveDates,
        leaveDaysLeft: prevData.leaveDaysLeft + 1,
      };
    });
    setSuccessMessage('Leave day deleted successfully');
    setTimeout(() => {
      setSuccessMessage('');
    }, 2000);
  };

  if (!staff) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{staff.firstName} {staff.lastName}</h1>
      </div>
      {successMessage && (
        <div className={styles.successMessage}>
          {successMessage}
        </div>
      )}

      <div className={styles.formsWrapper}>
        <div className={styles.formContainer}>
          <h2>Staff Details</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            <label>Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
            <label>ID Number</label>
            <input
              type="text"
              name="idNo"
              value={formData.idNo}
              onChange={handleChange}
              required
            />
            <label>Start Date</label>
            <input
              type="text"
              placeholder={staff.startDate}
              name="startDate"
              value={staff.startDate}
              onChange={handleChange}
              required
            />
            <button type="submit">Update</button>
          </form>
        </div>

        <div className={styles.formContainer}>
          <h2>Leave Management</h2>
          <div className={styles.leaveInfo}>
            <p>Total Leave Days: {leaveData.totalLeaveDays}</p>
            <p>Leave Days Left: {leaveData.leaveDaysLeft}</p>
          </div>
          <form className={styles.form} onSubmit={handleLeaveSubmit}>
            <label>Add Leave Day</label>
            <input
              type="date"
              name="newLeaveDate"
              value={leaveData.newLeaveDate}
              onChange={handleLeaveChange}
              required
            />
            <button type="submit">Add Leave Day</button>
          </form>
          <div className={styles.leaveDates}>
            <h3>Requested Leave Dates:</h3>
            <ul>
              {leaveData.leaveDates.map((date, index) => (
                <li key={index} className={styles.leaveDateItem}>
                  {date}
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleDeleteLeaveDate(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleStaffPage;
