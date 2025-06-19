import { CardManager } from './CardManager.js';
import { BookManager } from './BookManager.js';
import { VisitorManager } from './VisitorManager.js'; // Assuming this exists similarly to BookManager

export class StatisticManager {
    constructor() {
        this.cardManager = CardManager.getInstance();
        this.bookManager = BookManager.getInstance();
        this.visitorManager = VisitorManager.getInstance();
    }

    getTop5Books() {
        // console.log("init book top");
        const cards = this.cardManager.getAllCards();
        const borrowCounts = {};

        cards.forEach(card => {
            borrowCounts[card.bookId] = (borrowCounts[card.bookId] || 0) + 1;
        });

        const books = this.bookManager.getAllBooks();
        const sortedBooks = books.sort((a, b) => {
            const countA = borrowCounts[a.id] || 0;
            const countB = borrowCounts[b.id] || 0;
            return countB - countA;
        });

        return sortedBooks.slice(0, 5);
    }

    getTop5Visitors() {
        // console.log("init visitor top");
        const cards = this.cardManager.getAllCards();
        const borrowCounts = {};

        cards.forEach(card => {
            borrowCounts[card.visitorId] = (borrowCounts[card.visitorId] || 0) + 1;
        });

        const visitors = this.visitorManager.getAllVisitors();
        const sortedVisitors = visitors.sort((a, b) => {
            const countA = borrowCounts[a.id] || 0;
            const countB = borrowCounts[b.id] || 0;
            return countB - countA;
        });

        return sortedVisitors.slice(0, 5);
    }
}