import { BookManager } from "../managers/BookManager.js";
import { CardManager } from "../managers/CardManager.js";

export class CardEventHandler{
    constructor(){
        this.cardManager = CardManager.getInstance();
        this.bookManager = BookManager.getInstance();
        this.cards = this.cardManager.getAllCards();
        this.loadCardTableData();
        this.initCardEvent();
        this.initAddCardEvent();
        this.initReturnBookEvent();
    }

    formatDate(date) {
        if (!date) return "N/A";
        const dateObj = new Date(date);
        return dateObj
            .toLocaleString("en-US", {
                timeZone: "Asia/Bangkok",
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
            })
            .split("/")
            .join("-")
            .replace(/(\d+)\/(\d+)\/(\d+)/, "$2-$1-$3");
    }

    loadCardTableData(cardsToDisplay = this.cards) {
        const tableBody = document.querySelector(".card-table-body");
        tableBody.innerHTML = "";
        cardsToDisplay.forEach((card) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${card.id}</td>
                <td>${card.visitorId}</td>
                <td>${card.bookId}</td>
                <td>${this.formatDate(card.borrowDate)}</td>
                <td>
                    ${card.returnDate ? 
                        this.formatDate(card.returnDate) : 
                        `<button class="edit-buttons-style">
                            <img class="button-icons-style" src="icon/back.png" alt="ReturnBook">
                        </button>`
                    }
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    initCardEvent(){
        const sortButton = document.getElementById('sort-button');
        sortButton.addEventListener('click', () => {
            const sortColumn = document.getElementById('sort-column').value;
            this.sortTable(sortColumn)
        })

        const searchButton = document.getElementById('search-button');
        const searchInput = document.getElementById("search-input");
        searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim().toLowerCase();
        this.searchTable(query);
        });
        searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const query = searchInput.value.trim().toLowerCase();
            this.searchTable(query);
        }
        });
    }

    initAddCardEvent(){
    //   console.log("Initializing new card event handlers...");

      const addCardButton = document.getElementById("new-card-button");
      const addCardPopUp = document.getElementById("add-card-pop-up");
  
      addCardButton.addEventListener('click', (event) => {
          event.preventDefault();
          addCardPopUp.classList.add("active-pop-up");
      });

      const addCardCancelButton = document.getElementById("add-cancel-button");
      
      addCardCancelButton.addEventListener('click', (event) => {
          event.preventDefault();
          this.resetNewCardForm();
          addCardPopUp.classList.remove("active-pop-up");
      });

      const addCardCreateButton = document.getElementById('add-create-button');
      addCardCreateButton.addEventListener('click', (event) => {
          event.preventDefault();

          const newCard = {
              id: this.cardManager.getLastId() + 1,
              visitorId: document.getElementById('add-visitorId').value,
              bookId: document.getElementById('add-bookId').value,
              borrowDate: new Date(),
              returnDate: null
          };

        //   console.log("createing new book with values: ", newCard);

          for (const inputField in newCard){
              if (newCard[inputField] === ''){
                  alert(`Please fill out the ${inputField} field with a valid value`);
                  return;
              }
          }

          this.cardManager.addCard(
            newCard.visitorId,
            newCard.bookId,
            newCard.borrowDate);
          this.cards = this.cardManager.getAllCards();
          this.loadCardTableData();
          addCardPopUp.classList.remove('active-pop-up')
          this.resetNewCardForm();
      });
    }

    initReturnBookEvent() {
        // console.log("Init return card event handler");

        const tableBody = document.querySelector('.card-table-body');
        tableBody.addEventListener('click', (event) => {
            event.preventDefault();
            const returnButton = event.target.closest('button img[alt="ReturnBook"]');
            if (returnButton) {
                const row = returnButton.closest("tr");
                const id = parseInt(row.cells[0].textContent);

                if (!confirm("Are you sure that you want to return this book?")) return;

                this.cardManager.returnBook(id);
                this.loadCardTableData();
            }
        });
    }

    sortTable(column){
        this.cards.sort((a, b) => {
        const isNumeric = ["id", "visitorId", "bookId"].includes(column);
        const valA = isNumeric ? a[column] : a[column].toString().toLowerCase();
        const valB = isNumeric ? b[column] : b[column].toString().toLowerCase();
        if (valA < valB) return -1;
        if (valA > valB) return 1;
        return 0;
        });
        this.loadCardTableData();
    }

    searchTable(query){
        query = query.trim().toLowerCase();
        // console.log("Search query:", query);

        if (!query) {
            this.loadCardTableData(); 
            return;
        }

        const fitleredCards = this.cards.filter((card) => {
            return (
                card.visitorId.toString().includes(query) || 
                card.bookId.toString().includes(query)
            );
        });
        // console.log("Filtered cards count:", fitleredCards.length); 
        this.loadCardTableData(fitleredCards); 
    }

    resetNewCardForm(){
        document.getElementById('add-visitorId').value = '';
        document.getElementById('add-bookId').value = '';
    }
}