"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Pagination from '@/app/components/pagination/pagination';
import Search from '@/app/components/search/searchFilter';
import styles from '@/app/styles/students/students.module.css';
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
      let url = `${config.baseURL}/suppliers?`;
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
    await fetchSuppliers();
  };

  // Delete supplier function
  const handleDelete = async (supplierId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this supplier?");

    if (confirmDelete) {
      try {
        const response = await fetch(`${config.baseURL}/supplier/${supplierId}/delete`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          alert('Supplier deleted successfully!');

          // Refetch suppliers after deletion to refresh the list
          // const updatedSuppliersResponse = await fetch(`${config.baseURL}/supplier/search`, {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({ search: searchQuery }),
          // });

          // if (updatedSuppliersResponse.ok) {
          //   const updatedSuppliers = await updatedSuppliersResponse.json();
          //   setSuppliers(updatedSuppliers || []);
          //   setCount(updatedSuppliers.length || 0);
          // } else {
          //   console.error('Error fetching updated suppliers:', await updatedSuppliersResponse.text());
          // }
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
