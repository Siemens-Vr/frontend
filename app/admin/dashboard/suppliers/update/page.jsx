import { useState, useEffect } from 'react';
import styles from '../../../ui/dashboard/supplier/UpdateSupplierPopup.module.css'; // Adjust path as necessary

const UpdateSupplierPopup = ({ supplier, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        suppliers: '',
        itemDescription: '',
        amountClaimed: '',
        approver: '',
        dateTakenToApprover: '',
        dateTakenToFinance: '',
        type: '',
        PvNo: '',
        claimNumber: '',
        accounted: '',
        dateAccounted: '',
    });

    useEffect(() => {
        if (supplier) {
            setFormData({
                suppliers: supplier.suppliers || '',
                itemDescription: supplier.itemDescription || '',
                amountClaimed: supplier.amountClaimed || '',
                approver: supplier.approver || '',
                dateTakenToApprover: supplier.dateTakenToApprover ? new Date(supplier.dateTakenToApprover).toISOString().slice(0,16) : '',
                dateTakenToFinance: supplier.dateTakenToFinance ? new Date(supplier.dateTakenToFinance).toISOString().slice(0,16) : '',
                type: supplier.type || '',
                PvNo: supplier.PvNo || '',
                claimNumber: supplier.claimNumber || '',
                accounted: supplier.accounted || '',
                dateAccounted: supplier.dateAccounted ? new Date(supplier.dateAccounted).toISOString().slice(0,16) : '',
            });
        }
    }, [supplier]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`https://backend-1-gene.onrender.com/supplier/${supplier.uuid}/update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Supplier updated successfully!');
                onSave(); // Call the onSave prop function to refetch data
            } else {
                console.error('Failed to update supplier', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <h2>Update Supplier</h2>
                <form>
                    <div className={styles.inputGroup}>
                        <label htmlFor="suppliers">Suppliers</label>
                        <input
                            type="text"
                            id="suppliers"
                            name="suppliers"
                            value={formData.suppliers}
                            onChange={handleChange}
                            placeholder="e.g. ABC Supplies Ltd."
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="itemDescription">Item Description</label>
                        <input
                            type="text"
                            id="itemDescription"
                            name="itemDescription"
                            value={formData.itemDescription}
                            onChange={handleChange}
                            placeholder="e.g. Office Chairs"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="amountClaimed">Amount Claimed</label>
                        <input
                            type="number"
                            id="amountClaimed"
                            name="amountClaimed"
                            value={formData.amountClaimed}
                            onChange={handleChange}
                            placeholder="e.g. 1500"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="approver">Approver</label>
                        <input
                            type="text"
                            id="approver"
                            name="approver"
                            value={formData.approver}
                            onChange={handleChange}
                            placeholder="e.g. John Doe"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="dateTakenToApprover">Date Taken To Approver</label>
                        <input
                            type="datetime-local"
                            id="dateTakenToApprover"
                            name="dateTakenToApprover"
                            value={formData.dateTakenToApprover}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="dateTakenToFinance">Date Taken To Finance</label>
                        <input
                            type="datetime-local"
                            id="dateTakenToFinance"
                            name="dateTakenToFinance"
                            value={formData.dateTakenToFinance}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="type">Type</label>
                        <input
                            type="text"
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            placeholder="e.g. Invoice"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="PvNo">PV No</label>
                        <input
                            type="text"
                            id="PvNo"
                            name="PvNo"
                            value={formData.PvNo}
                            onChange={handleChange}
                            placeholder="e.g. PV123456"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="claimNumber">Claim Number</label>
                        <input
                            type="text"
                            id="claimNumber"
                            name="claimNumber"
                            value={formData.claimNumber}
                            onChange={handleChange}
                            placeholder="e.g. CL123456"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="accounted">Accounted</label>
                        <select
                            id="accounted"
                            name="accounted"
                            value={formData.accounted}
                            onChange={handleChange}
                        >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="dateAccounted">Date Accounted</label>
                        <input
                            type="datetime-local"
                            id="dateAccounted"
                            name="dateAccounted"
                            value={formData.dateAccounted}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="button" onClick={handleSave}>Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateSupplierPopup;
