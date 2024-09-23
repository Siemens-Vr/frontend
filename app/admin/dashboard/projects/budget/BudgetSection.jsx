"use client";

import React, { useState, useEffect } from 'react';
import styles from './BudgetPage.module.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const BudgetSection = () => {
    // State for budget entries
    const [budgetEntries, setBudgetEntries] = useState([
        { date: '01/09/2024', description: 'Office Supplies', debit: 200, credit: 0 },
        { date: '02/09/2024', description: 'Software License', debit: 0, credit: 300 },
    ]);

    // State for totals
    const [totals, setTotals] = useState({ totalDebit: 0, totalCredit: 0, balance: 0 });

    // State for form inputs
    const [newEntry, setNewEntry] = useState({ date: '', description: '', debit: 0, credit: 0 });

    // Update totals whenever budgetEntries changes
    useEffect(() => {
        const totalDebit = budgetEntries.reduce((sum, entry) => sum + entry.debit, 0);
        const totalCredit = budgetEntries.reduce((sum, entry) => sum + entry.credit, 0);
        const balance = totalCredit - totalDebit;
        setTotals({ totalDebit, totalCredit, balance });
    }, [budgetEntries]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEntry({ ...newEntry, [name]: value });
    };

    // Handle adding a new entry
    const handleAddEntry = () => {
        // Parse debit and credit to numbers before adding
        const entry = {
            ...newEntry,
            debit: parseFloat(newEntry.debit),
            credit: parseFloat(newEntry.credit),
        };
        setBudgetEntries([...budgetEntries, entry]);
        // Reset form fields after adding
        setNewEntry({ date: '', description: '', debit: 0, credit: 0 });
    };

    // Function to download table data as a CSV file
    const downloadCSV = () => {
        const csvRows = [
            ['Date', 'Description', 'Debit', 'Credit'],
            ...budgetEntries.map(entry => [
                entry.date,
                entry.description,
                entry.debit.toFixed(2),
                entry.credit.toFixed(2),
            ]),
            ['Totals', '', totals.totalDebit.toFixed(2), totals.totalCredit.toFixed(2)],
            ['Balance', '', '', totals.balance.toFixed(2)],
        ];

        const csvContent = csvRows.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'budget.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Function to download table as a PDF
    const downloadPDF = () => {
        const doc = new jsPDF();

        // Add title to the document
        doc.text('Budget Report', 14, 16);

        // Add table using jsPDF AutoTable
        doc.autoTable({
            head: [['Date', 'Description', 'Debit', 'Credit']],
            body: [
                ...budgetEntries.map(entry => [
                    entry.date,
                    entry.description,
                    `$${entry.debit.toFixed(2)}`,
                    `$${entry.credit.toFixed(2)}`,
                ]),
                [{ content: 'Totals', colSpan: 2 }, `$${totals.totalDebit.toFixed(2)}`, `$${totals.totalCredit.toFixed(2)}`],
                [{ content: 'Balance', colSpan: 3 }, `$${totals.balance.toFixed(2)}`],
            ],
            startY: 20, // Start position of the table on the page
        });

        // Save the PDF with a given filename
        doc.save('budget_report.pdf');
    };

    return (
        <div className={styles['budget-container']}>
            <h2>Budget</h2>

            {/* Form to add a new budget entry */}
            <div className={styles['form-container']}>
                <input
                    type="date"
                    name="date"
                    value={newEntry.date}
                    onChange={handleInputChange}
                    placeholder="Date"
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={newEntry.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    required
                />
                <input
                    type="number"
                    name="debit"
                    value={newEntry.debit}
                    onChange={handleInputChange}
                    placeholder="Debit"
                    min="0"
                />
                <input
                    type="number"
                    name="credit"
                    value={newEntry.credit}
                    onChange={handleInputChange}
                    placeholder="Credit"
                    min="0"
                />
                <button onClick={handleAddEntry} className={styles['add-btn']}>Add</button>
            </div>

            {/* Buttons for Downloading CSV and PDF */}
            <div>
                <button onClick={downloadCSV} className={styles['download-btn']}>Download CSV</button>
                <button onClick={downloadPDF} className={styles['download-btn']}>Download PDF</button>
            </div>

            {/* Budget table */}
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Debit</th>
                    <th>Credit</th>
                </tr>
                </thead>
                <tbody>
                {budgetEntries.map((entry, index) => (
                    <tr key={index}>
                        <td>{entry.date}</td>
                        <td>{entry.description}</td>
                        <td>${entry.debit.toFixed(2)}</td>
                        <td>${entry.credit.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <th colSpan="2">Totals</th>
                    <th>${totals.totalDebit.toFixed(2)}</th>
                    <th>${totals.totalCredit.toFixed(2)}</th>
                </tr>
                <tr>
                    <th colSpan="2">Balance</th>
                    <th colSpan="2">${totals.balance.toFixed(2)}</th>
                </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default BudgetSection;
