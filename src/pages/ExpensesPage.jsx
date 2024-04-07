import React from 'react';
import { fetchData } from '../helpers';
import { useLoaderData } from 'react-router-dom';


// Loader
export function expensesLoader(){
    const expenses = fetchData("expenses");
    return { expenses };
}

// action
export function expensesAction(){
    
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  return (
    <div>ExpensesPage</div>
  )
}

export default ExpensesPage