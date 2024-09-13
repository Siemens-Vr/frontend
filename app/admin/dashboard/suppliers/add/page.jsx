"use client";
import { useState } from "react";
import styles from "../../../../student/ui/dashboard/students/addStudent/addStudent.module.css";
import { config } from "/config";

const SuppliersAddPage = () => {
  const [formData, setFormData] = useState({
    suppliers: "",
    itemDescription: "",
    amountClaimed: "",
    approver: "",
    DateTakenToApprover: "",
    DateTakenToFinance: "",
    Type: "",
    ClaimNumber: "",
    pvNo: "",
    Accounted: "",
    DateAccounted: "",
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
        console.log("Staff added successfully");
        setSuccessMessage("Staff added successfully!");
        setFormData({
          suppliers: "",
          itemDescription: "",
          amountClaimed: "",
          approver: "",
          DateTakenToApprover: "",
          DateTakenToFinance: "",
          Type: "",
          ClaimNumber: "",
          pvNo: "",
          Accounted: "",
          DateAccounted: "",
        });
      } else {
        console.error("Failed to add Staff");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderFields = () => {
    switch (formData.Type) {
      case "Claim":
        return (
            <>
              <input
                  type="text"
                  placeholder="pvNo"
                  name="pvNo"
                  value={formData.pvNo}
                  onChange={handleChange}
                  required
              />
              <input
                  type="text"
                  placeholder="Claimed Number"
                  name="ClaimNumber"
                  value={formData.ClaimNumber}
                  onChange={handleChange}
                  required
              />
            </>
        );
      case "Petty Cash":
        return (
            <input
                type="text"
                placeholder="pvNo"
                name="pvNo"
                value={formData.pvNo}
                onChange={handleChange}
                required
            />
        );
      case "Imprest":
        return (
            <>
              <input
                  type="text"
                  placeholder="pcNo"
                  name="pcNo"
                  value={formData.pcNo}
                  onChange={handleChange}
                  required
              />
              <select
                  name="Accounted"
                  value={formData.Accounted}
                  onChange={handleChange}
                  required
                  className={styles.select}
              >
                <option value="">Select Accounted</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <label className={styles.label}>
                Date Accounted (YYYY-MM-DD HH:MM)
              </label>
              <input
                  type="datetime-local"
                  name="DateAccounted"
                  value={formData.DateAccounted}
                  onChange={handleChange}
                  required
              />
            </>
        );
      default:
        return null;
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
              placeholder="Approver"
              name="approver"
              value={formData.approver}
              onChange={handleChange}
              required
          />
          <label className={styles.label}>
            Date Taken To Approver (YYYY-MM-DD HH:MM)
          </label>
          <input
              type="datetime-local"
              name="DateTakenToApprover"
              value={formData.DateTakenToApprover}
              onChange={handleChange}
              required
          />
          <label className={styles.label}>
            Date Taken To Finance (YYYY-MM-DD HH:MM)
          </label>
          <input
              type="datetime-local"
              name="DateTakenToFinance"
              value={formData.DateTakenToFinance}
              onChange={handleChange}
              required
          />
          <select
              name="Type"
              value={formData.Type}
              onChange={handleChange}
              required
              className={styles.select}
          >
            <option value="">Select Type</option>
            <option value="Claim">Claim</option>
            <option value="Imprest">Imprest</option>
            <option value="Petty Cash">Petty Cash</option>
          </select>

          {/* Conditional Fields Based on Type Selection */}
          {renderFields()}

          <button type="submit">Submit</button>
        </form>
      </div>
  );
};

export default SuppliersAddPage;
