"use client"
import React, { useState, useEffect } from 'react';
import styles from '@/app/styles/supplier/UpdateSupplierPopup.module.css';
import { config } from "/config";

const UpdateSupplierPopup = ({ supplier, onClose, onSave }) => {
    // console.log(supplier)
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
        project: '',
        approvalDate: '',
        approvalName: '',
        approvalPath: '',
        invoiceDate: '',
        invoiceName: '',
        invoicePath: '',
        paymentDate: '',
        paymentVoucherName: '',
        paymentVoucherPath: '',
        payment: null,
        invoice: null,
        approval:null
    });

    useEffect(() => {
        if (supplier) {
            setFormData({
                suppliers: supplier.suppliers || '',
                itemDescription: supplier.itemDescription || '',
                amountClaimed: supplier.amountClaimed || '',
                approver: supplier.approver || '',
                dateTakenToApprover: supplier.dateTakenToApprover
                    ? new Date(supplier.dateTakenToApprover).toISOString().slice(0, 16)
                    : '',
                dateTakenToFinance: supplier.dateTakenToFinance
                    ? new Date(supplier.dateTakenToFinance).toISOString().slice(0, 16)
                    : '',
                type: supplier.type || '',
                PvNo: supplier.PvNo || '',
                claimNumber: supplier.claimNumber || '',
                accounted: supplier.accounted || '',
                dateAccounted: supplier.dateAccounted
                    ? new Date(supplier.dateAccounted).toISOString().slice(0, 16)
                    : '',
                project: supplier.project || '',
                approvalDate: supplier.approvalDate
                    ? new Date(supplier.approvalDate).toISOString().slice(0, 10)
                    : '',
                approvalName: supplier.approvalName || '',
                approvalPath: supplier.approvalPath || '',
                invoiceDate: supplier.invoiceDate
                    ? new Date(supplier.invoiceDate).toISOString().slice(0, 10)
                    : '',
                invoiceName: supplier.invoiceName || '',
                invoicePath: supplier.invoicePath || '',
                paymentDate: supplier.paymentDate
                    ? new Date(supplier.paymentDate).toISOString().slice(0, 10)
                    : '',
                paymentVoucherName: supplier.paymentVoucherName || '',
                paymentVoucherPath: supplier.paymentVoucherPath || '',
                payment: null, 
                invoice: null, 
                approval: null,
            });
        }
    }, [supplier]);
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const formDataToSend = new FormData();
    
        // Append text fields, excluding the fields that should not be sent
        const excludedFields = [
            'approvalName',
            'approvalPath',
            'paymentVoucherName',
            'paymentVoucherPath',
            'invoiceName',
            'invoicePath',
        ];
    
        Object.keys(formData).forEach((key) => {
            if (!excludedFields.includes(key) && !['payment', 'invoice', 'approval'].includes(key)) {
                formDataToSend.append(key, formData[key]);
            }
        });
    
        // Append files if selected
        if (formData.payment) formDataToSend.append('payment', formData.payment);
        if (formData.invoice) formDataToSend.append('invoice', formData.invoice);
        if (formData.approval) formDataToSend.append('approval', formData.approval);
    
        // Log the FormData entries before sending
        console.log('FormData to send:');
        for (let [key, value] of formDataToSend.entries()) {
            console.log(`${key}:`, value);
        }
        try {
            const response = await fetch(`http://localhost:10600/suppliers/${supplier.uuid}/update`, {
                method: 'PATCH',
                body: formDataToSend, // Send FormData
            });
    
            if (response.ok) {
                alert('Supplier updated successfully!');
                onSave();
            } else {
                console.error('Failed to update supplier', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    
    

    const renderFields = () => {
        switch (formData.type) {
            case "Claim":
                return (
                    <>
                        <div className={styles.inputGroup}>
                            <label htmlFor="PvNo">PV No</label>
                            <input
                                type="text"
                                id="PvNo"
                                name="PvNo"
                                value={formData.PvNo}
                                onChange={handleChange}
                                placeholder="e.g. PV123456"
                                required
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
                                required
                            />
                        </div>
                    </>
                );
            case "Petty Cash":
                return (
                    <div className={styles.inputGroup}>
                        <label htmlFor="PvNo">PV No</label>
                        <input
                            type="text"
                            id="PvNo"
                            name="PvNo"
                            value={formData.PvNo}
                            onChange={handleChange}
                            placeholder="e.g. PV123456"
                            required
                        />
                    </div>
                );
            case "Imprest":
                return (
                    <>
                        <div className={styles.inputGroup}>
                            <label htmlFor="PvNo">PV No</label>
                            <input
                                type="text"
                                id="PvNo"
                                name="PvNo"
                                value={formData.PvNo}
                                onChange={handleChange}
                                placeholder="e.g. PV123456"
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="accounted">Accounted</label>
                            <select
                                id="accounted"
                                name="accounted"
                                value={formData.accounted}
                                onChange={handleChange}
                                required
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
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className={styles.stickyHeader}>
                    <h2>Update Supplier</h2>
                </div>
                <form>
                    <div className={styles.inputGroup}>
                        <label htmlFor="supplier">Supplier</label>
                        <input
                            type="text"
                            id="supplier"
                            name="suppliers"
                            value={formData.suppliers}
                            onChange={handleChange}
                            placeholder="e.g. ABC Supplies Ltd."
                            required
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
                            required
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
                            required
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
                            required
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
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="approvalDate">Approval Date</label>
                        <input
                            type="date"
                            id="approvalDate"
                            name="approvalDate"
                            value={formData.approvalDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="approvalName">Approval Document</label>
                        <div className={styles.doc}>
                            <div className={styles.docs}>
                                <input
                                    type="text"
                                    id="approvalName"
                                    name="approvalName"
                                    value={formData.approvalName}
                                    onChange={handleChange}
                                    placeholder="Approval document name"
                                    required
                                />
                                {formData.approvalPath && (
                                    <a style = {{color: 'black'}}
                                        href={`http://localhost:10600${formData.approvalPath}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.fileLink}
                                    >
                                        Open File
                                    </a>
                                )}
                            </div>
                            <input
                                type="file"
                                id="approval"
                                name="approval"
                                onChange={(e) => setFormData({ ...formData, approval: e.target.files[0] })}
                            />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="dateTakenToFinance">Date Taken To Finance</label>
                        <input
                            type="datetime-local"
                            id="dateTakenToFinance"
                            name="dateTakenToFinance"
                            value={formData.dateTakenToFinance}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="invoiceDate">Invoice Date</label>
                        <input
                            type="date"
                            id="invoiceDate"
                            name="invoiceDate"
                            value={formData.invoiceDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="invoiceName">Invoice</label>
                        <div className={styles.doc}>
                        <div className={styles.docs}>
                            <input
                                type="text"
                                id="invoiceName"
                                name="invoiceName"
                                value={formData.invoiceName}
                                onChange={handleChange}
                                placeholder="Invoice document name"
                                required
                            />
                            {formData.invoicePath && (
                                <a
                                    href={`http://localhost:10600${formData.invoicePath}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.fileLink}
                                >
                                    Open File
                                </a>
                            )}
                            </div>
                                <input
                                    type="file"
                                    id="invoice"
                                    name="invoice"
                                    onChange={(e) => setFormData({ ...formData, invoice: e.target.files[0] })}
                                />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="paymentDate">Payment Date</label>
                        <input
                            type="date"
                            id="paymentDate"
                            name="paymentDate"
                            value={formData.paymentDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="paymentVoucherName">Payment Voucher</label>
                        <div className={styles.doc}>
                            <div className={styles.docs}>
                                <input
                                    type="text"
                                    id="paymentVoucherName"
                                    name="paymentVoucherName"
                                    value={formData.paymentVoucherName}
                                    onChange={handleChange}
                                    placeholder="Payment voucher name"
                                    required
                                />
                                {formData.paymentVoucherPath && (
                                    <a
                                        href={`http://localhost:10600${formData.paymentVoucherPath}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.fileLink}
                                    >
                                        Open File
                                    </a>
                                )}

                            </div>

                             <input
                                type="file"
                                id="payment"
                                name="payment"
                                onChange={(e) => setFormData({ ...formData, payment: e.target.files[0] })}
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="type">Type</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Claim">Claim</option>
                            <option value="Imprest">Imprest</option>
                            <option value="Petty Cash">Petty Cash</option>
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                    <label htmlFor="project">Project</label>
                    <select
                        name="project"
                        value={formData.project}
                        onChange={handleChange}
                        required
                        
                    >
                        <option value="">Select project vote</option>
                        <option value="SIFA">SIFA</option>
                        <option value="Eureka">NRF-EUREKA</option>
                        <option value="CMU">CMU</option>


                    </select>
                    </div>

                    {renderFields()}

                    <div className={`${styles.stickyButtons} ${styles.buttonGroup}`}>
                        <button type="button" onClick={handleSave}>Update</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateSupplierPopup;