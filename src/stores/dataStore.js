import { makeAutoObservable } from 'mobx';

export default class AppStore {
    constructor() {
        makeAutoObservable(this)
    }

    balanceDetail = [];
    totalBalance = 0;

    setBalanceDetail = async (data) => {
        this.balanceDetail = [];
        this.balanceDetail.push(...data); 
        this.recalculateTotalBalance();
    }

    deleteItem = async (itemId) => {
        const index = this.balanceDetail.findIndex(item => item.id === itemId);
        if (index !== -1) {
            this.balanceDetail.splice(index, 1);
            this.recalculateTotalBalance();
        }
    }


    updateItem = async (updatedItem) => {
        const index = this.balanceDetail.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) {
            const updatedBalanceDetail = [
                ...this.balanceDetail.slice(0, index),
                updatedItem,
                ...this.balanceDetail.slice(index + 1)
            ];
            this.balanceDetail = updatedBalanceDetail;
            this.recalculateTotalBalance();
        }
    }

    recalculateTotalBalance() {
        let totalIncome = 0;
        let totalExpense = 0;
        this.balanceDetail.forEach(item => {
            if (item.StatusIncome) {
                totalIncome += Number(item.Income);
            } else {
                totalExpense += Number(item.Expense);
            }
        });
        let total = totalIncome - totalExpense;
        this.totalBalance = total;
    }
}