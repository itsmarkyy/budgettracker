import React from 'react';
import { useLoaderData } from 'react-router-dom';

//Library
import { toast } from 'react-toastify';

// helpers
import { createBudget, createExpense, fetchData, wait } from '../helpers';

//Components
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItems from '../components/BudgetItems';
import Table from '../components/Table';



//loader
export function dashboardLoader(){
    const userName = fetchData("userName");
    const budgets = fetchData("budgets")
    const expenses = fetchData("expenses")
    return { userName, budgets, expenses };
}

//action
export async function dashboardAction({request}){
  await wait();

    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data); 

    // new users submission
    if(_action === "newUser"){
      try {
        localStorage.setItem("userName", JSON.stringify(values.userName)) 
        return toast.success(`Welcome, ${values.userName}`)  
      } catch (error) {
        throw new Error("There was an error creating your Account")
      }
    }
    
    if(_action === "createBudget"){
      try {
        createBudget({
          name: values.newBudget,
          amount: values.newBudgetAmount
        })
        return toast.success("Budget Created!");
      } catch (error) {
        throw new Error("There was a problem creating your Budget.")
      }
    }

    if(_action === "createExpense"){
      try {
        createExpense({
          name: values.newExpense,
          amount: values.newExpenseAmount,
          budgetId: values.newExpenseBudget
        })
        return toast.success(`Expense ${values.newExpense } Created!`);
      } catch (error) {
        throw new Error("There was a problem creating your Budget.")
      }
    }

    if(_action === "deleteExpense"){
      try {
        deleteExpense({
          key: "expenses",
          expense: values.expenseId
        });
        return toast.success(`Expense Deleted!`);
      } catch (error) {
        throw new Error("There was a problem creating your Budget.")
      }
    }
}

const Dashboard = () => {

  const { userName, budgets, expenses } = useLoaderData();

  return (
    <>
        {userName ? (
          <div className="dashboard">
            <h1>Welcome Back, <span className='accent'>{userName}!</span></h1>
            <div className="grid-sm">
              {
                budgets && budgets.length > 0 ? (
                  <div className="grid-lg">
                    <div className="flex-lg">
                      <AddBudgetForm />
                      <AddExpenseForm budgets={budgets} />
                    </div>
                    <h2>Existing Budgets</h2>
                    <div className="budgets">
                      {
                        budgets.map((budget) => (
                          <BudgetItems key={budget.id} budget={budget} />
                        ))
                      }
                    </div>
                      {
                        expenses && expenses.length > 0 && (
                          <div className="grid-md">
                            <h2>Recent Expenses</h2>
                            <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)}/>
                          </div>
                        )
                      }
                  </div>
                )
                : (
                  <div className="grid-sm">
                    <p>Personal budgeting is the secret to financial freedom.</p>
                    <p>Create a budget to get started!</p>
                    <AddBudgetForm />
                  </div>
                )
              }
            </div>
          </div>
        ) : <Intro/>}
    </>
  )
}

export default Dashboard