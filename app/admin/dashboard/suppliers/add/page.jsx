<<<<<<< HEAD
"use client";
import { useState } from "react";
import styles from "../../../../student/ui/dashboard/students/addStudent/addStudent.module.css"; // Adjust path if necessary
import { config } from "/config";

const SuppliersAddPage = () => {
    const [formData, setFormData] = useState({
        suppliers: "",
        itemDescription: "",
        amountClaimed: "",
        approver: "",
        dateTakenToApprover: "",
        dateTakenToFinance: "",
        type: "",
        claimNumber: "",
        pvNo: "",
        accounted: "",
        dateAccounted: "",
    });

    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Log form data to the console
        console.log("Submitting form data:", formData);

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
                    dateTakenToApprover: "",
                    dateTakenToFinance: "",
                    type: "",
                    claimNumber: "",
                    pvNo: "",
                    accounted: "",
                    dateAccounted: "",
                });
            } else {
                console.error("Failed to add Staff");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const renderFields = () => {
        switch (formData.type) {
            case "Claim":
                return (
                    <>
                        <div className={styles.divInput}>
                            <label htmlFor="pvNo" className={styles.label}>PV No</label>
                            <input
                                type="text"
                                placeholder="PV No"
                                name="pvNo"
                                value={formData.pvNo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.divInput}>
                            <label htmlFor="claimNumber" className={styles.label}>Claim Number</label>
                            <input
                                type="text"
                                placeholder="Claim Number"
                                name="claimNumber"
                                value={formData.claimNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </>
                );
            case "Petty Cash":
                return (
                    <div className={styles.divInput}>
                        <label htmlFor="pvNo" className={styles.label}>PV No</label>
                        <input
                            type="text"
                            placeholder="PV No"
                            name="pvNo"
                            value={formData.pvNo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                );
            case "Imprest":
                return (
                    <>
                        <div className={styles.divInput}>
                            <label htmlFor="pvNo" className={styles.label}>PV No</label>
                            <input
                                type="text"
                                placeholder="PV No"
                                name="pvNo"
                                value={formData.pvNo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.divInput}>
                            <label htmlFor="accounted" className={styles.label}>Accounted</label>
                            <select
                                name="accounted"
                                value={formData.accounted}
                                onChange={handleChange}
                                required
                                className={styles.select}
                            >
                                <option value="">Select Accounted</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className={styles.divInput}>
                            <label htmlFor="dateAccounted" className={styles.label}>Date Accounted </label>
                            <input
                                type="datetime-local"
                                name="dateAccounted"
                                value={formData.dateAccounted}
                                onChange={handleChange}
                                required
                            />
                        </div>
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
                <div className={styles.divInput}>
                    <label htmlFor="suppliers" className={styles.label}>Suppliers</label>
                    <input
                        type="text"
                        placeholder="Suppliers"
                        name="suppliers"
                        value={formData.suppliers}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.divInput}>
                    <label htmlFor="itemDescription" className={styles.label}>Item Description</label>
                    <input
                        type="text"
                        placeholder="Item Description"
                        name="itemDescription"
                        value={formData.itemDescription}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.divInput}>
                    <label htmlFor="amountClaimed" className={styles.label}>Amount Claimed</label>
                    <input
                        type="text"
                        placeholder="Amount Claimed"
                        name="amountClaimed"
                        value={formData.amountClaimed}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.divInput}>
                    <label htmlFor="approver" className={styles.label}>Approver</label>
                    <input
                        type="text"
                        placeholder="Approver"
                        name="approver"
                        value={formData.approver}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.divInput}>
                    <label htmlFor="dateTakenToApprover" className={styles.label}>Date Taken To Approver</label>
                    <input
                        type="datetime-local"
                        name="dateTakenToApprover"
                        value={formData.dateTakenToApprover}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.divInput}>
                    <label htmlFor="dateTakenToFinance" className={styles.label}>Date Taken To Finance</label>
                    <input
                        type="datetime-local"
                        name="dateTakenToFinance"
                        value={formData.dateTakenToFinance}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.divInput}>
                    <label htmlFor="type" className={styles.label}>Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className={styles.select}
                    >
                        <option value="">Select Type</option>
                        <option value="Claim">Claim</option>
                        <option value="Imprest">Imprest</option>
                        <option value="Petty Cash">Petty Cash</option>
                    </select>
                </div>

                {renderFields()}

                <div className={styles.buttonContainer}>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default SuppliersAddPage;
=======
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

          
          {renderFields()}

          <button type="submit">Submit</button>
        </form>
      </div>
  );
};

export default SuppliersAddPage;
>>>>>>> 5ab9ad14fcc152fce977edee36b5ea59e6e94a58
