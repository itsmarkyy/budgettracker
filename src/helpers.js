//Local storage 
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const getAllMatchingItems = ({category, key, value}) => {
    const data = fetchData(category) ?? []; 

    return data.filter((item) => item[key] === value)

}

export const wait = () => new Promise(res => setTimeout(res, Math.random()  * 2000 ))

const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`;
}

// create Budget
export const createBudget = ({ name, amount }) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }
    const existingBudgets = fetchData("budgets") ?? []
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}

// Create Expense
export const createExpense = ({ name, amount, budgetId }) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }
    const existingExpenses = fetchData("expenses") ?? []
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
}

//Delete Item from storage
export const deleteExpense = ({key, id}) => {
    const existingData = fetchData(key);
    if(id){
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData))
    }
    return localStorage.removeItem(key);
}

// Delete User
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key)
};

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        // check if expense.id ===budgetId passed
        if(expense.budgetId !== budgetId) return acc

        // add the current amount to total
        return acc += expense.amount
    }, 0)
    return budgetSpent
}

// FORMATTING
export const formateDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

// Format Percentages
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimunFractionDigits: 0,
    })
}

// Format Currenct
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "PHP"
    })
}
