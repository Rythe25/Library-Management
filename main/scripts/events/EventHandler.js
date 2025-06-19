import { BookManager } from "../managers/BookManager.js";
import { BookEventHandler } from "./BookEventHandler.js";
import { VisitorManager } from "../managers/VisitorManager.js";
import { VisitorEventHandler } from "./VisitorEventHandler.js";
import { CardManager } from "../managers/CardManager.js";
import { CardEventHandler } from "./CardEventHandler.js";
import { StatisticEventHandler } from "./StatisticEventHandler.js";

export class EventHandler {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      this.initialize();
    });
  }

  initialize() {
    // window.localStorage.clear(); // Clear all storage for testing
    const currentPage = window.location.pathname;
    // console.log("Current page:", currentPage);

    switch (true) {
      case currentPage.includes("index.html") || currentPage == "/" || currentPage == "":
        // console.log("Initializing BookEventHandler...");
        this.loadBookData();
        const bookEventHandler = new BookEventHandler();
        bookEventHandler.initializeBookEvent();
        bookEventHandler.loadBookTableData();
        break;
      case currentPage.includes("visitor.html"):
        // console.log("Initializing VisitorEventHandler...");
        this.loadVisitorData();
        const visitorEventHandler = new VisitorEventHandler();
        visitorEventHandler.initializeVisitorEvent();
        visitorEventHandler.loadVisitorTableData();
        break;
      case currentPage.includes("card.html"):
        // console.log("Initializing CardEventHandler...");
        this.loadCardData();
        const cardEventHandler = new CardEventHandler();
        cardEventHandler.initializeCardEvent();
        cardEventHandler.loadCardTableData();
        break;
      case currentPage.includes("statistic.html"):
        // console.log("Initializing StatisticHandler...");
        this.loadVisitorData();
        this.loadCardData();
        new StatisticEventHandler();
        break;
      default:
        console.warn("No matching event handler for page:", currentPage);
        break;
    }
  }

  loadBookData() {
    // window.localStorage.removeItem('book'); // Clear localStorage for testing 
    const bookManager = new BookManager();
    let storedData = JSON.parse(window.localStorage.getItem("book")) || {data: [],};

    if ( storedData.data.length === 0 && bookManager.getAllBooks().length === 0) {
      const booksToAdd = [
        { name: "To Kill a Mockingbird", author: "Harper Lee", publisher: "J.B. Lippincott & Co.", publish: 1960, pages: 281, copies: 5 },
        { name: "1984", author: "George Orwell", publisher: "Secker & Warburg", publish: 1949, pages: 328, copies: 4 },
        { name: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", publisher: "Bloomsbury", publish: 1997, pages: 223, copies: 7 },
        { name: "The Great Gatsby", author: "F. Scott Fitzgerald", publisher: "Charles Scribner's Sons", publish: 1925, pages: 180, copies: 3 },
        { name: "The Hobbit", author: "J.R.R. Tolkien", publisher: "George Allen & Unwin", publish: 1937, pages: 310, copies: 6 },
        { name: "Pride and Prejudice", author: "Jane Austen", publisher: "T. Egerton", publish: 1813, pages: 432, copies: 4 },
        { name: "The Catcher in the Rye", author: "J.D. Salinger", publisher: "Little, Brown and Company", publish: 1951, pages: 277, copies: 5 },
        { name: "Lord of the Flies", author: "William Golding", publisher: "Faber and Faber", publish: 1954, pages: 224, copies: 3 }
      ];

      booksToAdd.forEach((book) =>
        bookManager.addBook(
          book.name,
          book.author,
          book.publisher,
          book.publish,
          book.pages,
          book.copies
        )
      );
    }
    // console.log("All Books:", bookManager.getAllBooks());
  }

  loadVisitorData() {
    // window.localStorage.removeItem('visitor'); // Clear localStorage for testing 
    const visitorManager = new VisitorManager();

    let storedData = JSON.parse(window.localStorage.getItem("visitor")) || {data: [],};

    if ( storedData.data.length === 0 && visitorManager.getAllVisitors().length === 0) {
      const visitorsToAdd = [
        { name: "Charlie", phone: "555-555-5555" },
        { name: "Alice", phone: "123-456-7890" },
        { name: "Bob", phone: "987-654-3210" },
      ];

      visitorsToAdd.forEach((visitor) => {
        visitorManager.addVisitor(visitor.name, visitor.phone);
      });
    }
    // console.log("All Visitors:", visitorManager.getAllVisitors());
  }

  loadCardData(){
    // window.localStorage.removeItem('card'); // Clear localStorage for testing 
    const cardManager = new CardManager();
    let storedData = JSON.parse(window.localStorage.getItem("card")) || {data: [],};

    if ( storedData.data.length === 0 && cardManager.getAllCards().length === 0) {
      const cardsToAdd = [
        {visitorId: 2, bookId: 3, borrowDate: new Date(), returnDate: null},
        {visitorId: 1, bookId: 1, borrowDate: new Date(), returnDate: null},
        {visitorId: 2, bookId: 1, borrowDate: new Date(), returnDate: null},
        {visitorId: 2, bookId: 1, borrowDate: new Date(), returnDate: null},
        {visitorId: 2, bookId: 1, borrowDate: new Date(), returnDate: null},
        {visitorId: 1, bookId: 8, borrowDate: new Date(), returnDate: null}
      ];

      cardsToAdd.forEach((card) => {
        cardManager.addCard(
          card.visitorId,
          card.bookId,
          card.borrowDate,
          card.returnDate
        );
      });
    }
    // console.log("All cards:", cardManager.getAllCards());
  }
}

