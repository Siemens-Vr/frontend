"use client";

import { useState, useEffect } from 'react';
import Pagination from "../../../student/ui/dashboard/pagination/pagination";
import Search from "../../../student/ui/dashboard/search/search";
import styles from "../../../student/ui/dashboard/students/students.module.css";
import Link from "next/link";
import UpdateSupplierPopup from '../suppliers/update/page';


const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const StudentsPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [count, setCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}supplier/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ search: searchQuery }),
        });

        if (response.ok) {
          const data = await response.json();
          setSuppliers(data || []);
          setCount(data.length || 0); // Set count based on length of data
        } else {
          console.error('Error fetching suppliers:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUpdateClick = (supplier) => {
    setSelectedSupplier(supplier);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedSupplier(null);
  };

  const handleSavePopup = async () => {
    handleClosePopup();

    // Fetch suppliers again to refresh the list
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('https://backend-1-gene.onrender.com/supplier/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ search: searchQuery }),
        });

        if (response.ok) {
          const data = await response.json();
          setSuppliers(data || []);
          setCount(data.length || 0);
        } else {
          console.error('Error fetching suppliers:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    await fetchSuppliers();
  };

  // Delete supplier function
  const handleDelete = async (supplierId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this supplier?");

    if (confirmDelete) {
      try {
        const response = await fetch(`https://backend-1-gene.onrender.com/supplier/${supplierId}/delete`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          alert('Supplier deleted successfully!');

          // Refetch suppliers after deletion to refresh the list
          const updatedSuppliersResponse = await fetch('https://backend-1-gene.onrender.com/supplier/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search: searchQuery }),
          });

          if (updatedSuppliersResponse.ok) {
            const updatedSuppliers = await updatedSuppliersResponse.json();
            setSuppliers(updatedSuppliers || []);
            setCount(updatedSuppliers.length || 0);
          } else {
            console.error('Error fetching updated suppliers:', await updatedSuppliersResponse.text());
          }
        } else {
          console.error('Failed to delete supplier', await response.text());
        }
      } catch (error) {
        console.error('Error deleting supplier:', error);
      }
    }
  };

  return (
      <div className={styles.container}>
        <div className={styles.top}>
          <Search
              placeholder="Search for a supplier..."
              value={searchQuery}
              onChange={handleSearchChange}
          />

          <Link href="/admin/dashboard/suppliers/add">
            <button className={styles.addButton}>Add New</button>
          </Link>
        </div>

        {Array.isArray(suppliers) && suppliers.length > 0 ? (
            <table className={styles.table}>
              <thead>
              <tr>
                <td>Suppliers</td>
                <td>Description</td>
                <td>Amount Claimed</td>
                <td>Approver</td>
                <td>Date Taken To Approver</td>
                <td>PV No</td>
                <td>Action</td>
              </tr>
              </thead>
              <tbody>
              {suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>{supplier.suppliers}</td>
                    <td>{supplier.itemDescription}</td>
                    <td>{supplier.amountClaimed}</td>
                    <td>{supplier.approver}</td>
                    <td>{supplier.dateTakenToApprover ? new Date(supplier.dateTakenToApprover).toLocaleDateString() : ''}</td>
                    <td>{supplier.PvNo}</td>
                    <td>
                      <div className={styles.buttons}>
                        <button
                            className={`${styles.button} ${styles.view}`}
                            onClick={() => handleUpdateClick(supplier)}
                        >
                          Update
                        </button>
                        <button
                            className={`${styles.button} ${styles.delete}`}
                            onClick={() => handleDelete(supplier.uuid)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
        ) : (
            <p className={styles.noStudents}>No suppliers available</p>
        )}
        <Pagination count={count} />

        {showPopup && (
            <UpdateSupplierPopup
                supplier={selectedSupplier}
                onClose={handleClosePopup}
                onSave={handleSavePopup}
            />
        )}
      </div>
  );
};

export default StudentsPage;
