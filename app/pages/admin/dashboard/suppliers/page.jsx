"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Pagination from '@/app/components/pagination/pagination';
import Search from '@/app/components/search/searchFilter';
import styles from '@/app/styles/supplier/supplier.module.css';
import Link from "next/link";
import UpdateSupplierPopup from '@/app/components/suppliers/update';
import { config } from "/config";

const StudentsPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const q = searchParams.get('q') || '';
  const page = searchParams.get('page') || 0;
  const filter = searchParams.get('filter') || 'all';

  useEffect(() => {
    if (!searchParams.has('page')) {
      const params = new URLSearchParams(searchParams);
      params.set('page', 0);
      replace(`${window.location.pathname}?${params.toString()}`);
    }
  }, []);

  useEffect(() => {
    fetchSuppliers();
  }, [q, page, filter]);

  const fetchSuppliers = async () => {
    try {
      let url = `http://localhost:10600/suppliers?`;

      // let url = `${config.baseURL}/suppliers?`;
      const params = new URLSearchParams();
      
      if (q) params.append('q', q);
      if (page) params.append('page', page);
      if (filter && filter !== 'all') params.append('filter', filter);
      
      url += params.toString();

      // console.log(url)

      const response = await fetch(url);
      const data = await response.json();
      // console.log(data)
      if (response.ok) {
        const { content, count } = data;
        setSuppliers(content || []);
        setCount(count || 0);
      } else {
        console.error('Error fetching suppliers:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

console.log(suppliers)


  const handleUpdateClick = (supplier) => {
    console.log(supplier)
    setSelectedSupplier(supplier);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedSupplier(null);
  };

  const handleSavePopup = async () => {
    handleClosePopup();
    await fetchSuppliers();
  };

  // Delete supplier function
  const handleDelete = async (supplierId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this supplier?");

    if (confirmDelete) {
      try {
        const response = await fetch(`${config.baseURL}/suppliers/${supplierId}/delete`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          alert('Supplier deleted successfully!');
          await fetchSuppliers()
    
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
          />

          <Link href="/pages/admin/dashboard/suppliers/add">
            <button className={styles.addButton}>Add New</button>
          </Link>
        </div>

        {Array.isArray(suppliers) && suppliers.length > 0 ? (
            <table className={styles.table}>
              <thead>
              <tr>
                <td>Project</td>
                <td>Type</td>
                <td>Suppliers</td>
                <td>Item</td>
                <td>Amount </td>
                <td>Approver</td>
                <td>Approval Date</td>
                <td>PV NO</td>
                <td>Action</td>
              </tr>
              </thead>
              <tbody>
              {suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>{supplier.project}</td>
                    <td>{supplier.type}</td>
                    <td>{supplier.suppliers}</td>
                    <td>{supplier.itemDescription}</td>
                    <td>{supplier.amountClaimed}</td>
                    <td>{supplier.approver}</td>
                    <td>{supplier.approvalDate ? new Date(supplier.approvalDate).toLocaleDateString() : ''}</td>
                    <td>{supplier.PvNo}</td>
                    <td>
                      <div className={styles.buttons}>
                        <button
                            className={`${styles.button} ${styles.view}`}
                            onClick={() => handleUpdateClick(supplier)}
                        >
                          View
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
