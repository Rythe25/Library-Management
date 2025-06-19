export class Card{
    constructor(id, visitorId, bookId, borrowDate, returnDate = null){
        this.id = id;
        this.visitorId = visitorId;
        this.bookId = bookId;
        this.borrowDate = borrowDate;
        this.returnDate = returnDate;
    }
}