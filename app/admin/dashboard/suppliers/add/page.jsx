"use client";
import { useState } from "react";
import styles from "../../../../student/ui/dashboard/students/addStudent/addStudent.module.css";
import { config } from "/config";


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
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

        // Format the data according to the API requirements
        const formattedData = {
            suppliers: formData.suppliers,
            itemDescription: formData.itemDescription,
            amountClaimed: parseFloat(formData.amountClaimed),
            approver: formData.approver,
            dateTakenToApprover: new Date(formData.dateTakenToApprover).toISOString(),
            dateTakenToFinance: new Date(formData.dateTakenToFinance).toISOString(),
            type: formData.type,
            PvNo: formData.pvNo, // Ensure the backend field name is correct
            claimNumber: formData.claimNumber,
            accounted: formData.accounted,
            dateAccounted: formData.dateAccounted ? new Date(formData.dateAccounted).toISOString() : null,
        };

        console.log("Submitting formatted form data:", formattedData);

        try {
            const response = await fetch(`${BACKEND_URL}supplier`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });

            if (response.ok) {
                console.log("Supplier added successfully");
                setSuccessMessage("Supplier added successfully!");
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
                console.error("Failed to add Supplier", await response.text());
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
                            <label htmlFor="dateAccounted" className={styles.label}>Date Accounted</label>
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
                    <textarea
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
                    <select
                        name="approver"
                        value={formData.approver}
                        onChange={handleChange}
                        required
                        className={styles.select}
                    >
                        <option value="">Select Approver</option>
                        <option value="VC">VC</option>
                        <option value="DVC">DVC</option>

                    </select>
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
