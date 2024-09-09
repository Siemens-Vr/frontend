"use client";
import { useState } from "react";
import styles from "../../../../student/ui/dashboard/students/addStudent/addStudent.module.css";
import {config} from "/config";

const SuppliersAddPage = () => {


  const [formData, setFormData] = useState({
    firstName: "",
    itemDescription: "",
    amountClaimed: "",
    claimAnt: "",
    dateClaimed:"",
    idNo: "",
    pvNo: "",
    
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.baseURL}/staffs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle successful submission
        console.log("Staff added successfully");
        setSuccessMessage("Staff added successfully!");
        // Clear the form data
        setFormData({
          suppliers: "",
          itemDescription: "",
          amountClaimed: "",
          claimAnt: "",
          dateClaimed:"",
          idNo: "",
          phone: "",
         
        });
      } else {
        // Handle submission error
        console.error("Failed to add Staff");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.container}>
     {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Suppliers"
          name="suppliers"
          value={formData.suppliers}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Description"
          name="itemDescription"
          value={formData.itemDescription}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Amount Claimed"
          name="amountClaimed"
          value={formData.amountClaimed}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Claimed"
          name="claimAnt"
          value={formData.claimAnt}
          onChange={handleChange}
          required
        />
           <input
          type="text"
          placeholder="Date Claimed"
          name="dateClaimed"
          value={formData.dateClaimed}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="pvNo"
          name="pvNo"
          value={formData.pvNo}
          onChange={handleChange}
        />
   
       
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SuppliersAddPage;
