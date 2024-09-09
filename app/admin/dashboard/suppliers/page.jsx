
"use client";

import { useState, useEffect } from 'react';
import Pagination from "../../../student/ui/dashboard/pagination/pagination";
import Search from "../../../student/ui/dashboard/search/search";
import styles from "../../../student/ui/dashboard/students/students.module.css";
import Link from "next/link";
import { useSearchParams, useRouter } from 'next/navigation';


import { config } from '/config';


const StudentsPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [count, setCount] = useState(0);



  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const url = `${config.baseURL}/items`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          const { content, count } = data;
          setSuppliers(content || []);
          setCount(count || 0);
        } else {
          console.error('Error fetching Suppliers:', data);
          // showErrorAlert(data.message || 'Failed to fetch Suppliers. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching Suppliers:', error);
        // showErrorAlert('Failed to fetch Suppliers. Please try again.');
      }
    };

    fetchSuppliers();
  }, []);




  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a suppliers..." />
       
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
              <td>Claimed </td>
              <td>Date Claimed</td>
              <td>pvNo</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => {
              return (
                <tr key={supplier.id}>
                  <td>{supplier.supplier}</td>
                  <td>{supplier.itemDescription }</td>
                  <td>{supplier.claimAnt}</td>
                  <td>{supplier.dateClaimed}</td>
                  <td>{supplier.pvNo}</td>
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/admin/dashboard/suppliers/${supplier.uuid}`}>
                        <button className={`${styles.button} ${styles.view}`}>
                          Update
                        </button>
                      </Link>
                      <Link href={`/admin/dashboard/suppliers/${supplier.uuid}`}>
                        <button className={`${styles.button} ${styles.view}`}>
                          Delete
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className={styles.noStudents}>No suppliers available</p>
      )}
      <Pagination count={count} />
    </div>
  );
};

export default StudentsPage;




