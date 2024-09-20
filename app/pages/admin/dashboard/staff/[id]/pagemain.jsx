

"use client";
import styles from "@/app/ui/dashboard/students/singleStudent/singleStudent.module.css";
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

  const { id } = params;

  useEffect(() => {
    const fetchStaff = async () => {
 
      try {
        const response = await fetch(`https://erp-api-jz0q.onrender.com/staffs/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log("Fetched staff data:", data);
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
    console.log(data)

    setSuccessMessage(data.message); // Set the success message

      setTimeout(() => {
      setSuccessMessage('');
    }, 2000);


    // console.log("Update response:", data);

    const updatedStaff = await fetch(`https://erp-api-jz0q.onrender.com/staffs/${id}`);
    const updatedData = await updatedStaff.json();
    setStaff(updatedData);


    // Clear the success message after 5 seconds
  
  } catch (error) {
    // console.error('Error updating staff:', error);
    alert('Failed to update staff. Please try again.');
  }
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
  );
};

export default SingleStaffPage;