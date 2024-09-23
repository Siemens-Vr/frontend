import React from 'react';
import BudgetSection from './BudgetSection'
import styles from './BudgetPage.module.css';

const BudgetPage = () => {
    return (
        <div className={styles['page-container']}>
            <BudgetSection />
        </div>
    );
};

export default BudgetPage;
