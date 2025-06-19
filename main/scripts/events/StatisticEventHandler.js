import { StatisticManager } from '../managers/StatisticManager.js';

export class StatisticEventHandler {
    constructor() {
        this.statisticManager = new StatisticManager();
        this.loadStatistics();
    }

    loadStatistics() {
        this.loadTopBooks();
        this.loadTopVisitors();
    }

    loadTopBooks() {
        const topBooks = this.statisticManager.getTop5Books();
        const tableBody = document.querySelector('.book-table-body');
        tableBody.innerHTML = '';
        topBooks.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.publisher}</td>
                <td>${book.publish}</td>
                <td>${book.pages}</td>
                <td>${book.copies}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    loadTopVisitors() {
        const topVisitors = this.statisticManager.getTop5Visitors();
        const tableBody = document.querySelector('.visitor-table-body');
        tableBody.innerHTML = '';
        topVisitors.forEach(visitor => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${visitor.id}</td>
                <td>${visitor.name}</td>
                <td>${visitor.phone}</td>
            `;
            tableBody.appendChild(row);
        });
    }
}