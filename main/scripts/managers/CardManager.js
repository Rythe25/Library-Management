import { Manager } from "./Manager.js"
import { BookManager } from "./BookManager.js"
import { Card } from "../models/Card.js"

export class CardManager extends Manager{
    static instance = null

    constructor(key='card'){
        super(key)
    }

    static getInstance(){
        if(CardManager.instance == null){
            CardManager.instance = new CardManager()
            CardManager.instance.loadData()
        }
        return CardManager.instance
    }

    addCard(visitorId, bookId, borrowDate = new Date()){
        const book = BookManager.getInstance().findById(parseInt(bookId))
        // console.log("Books : ", book);
        if(book == null){
            throw "Book not found"
        } else if (book.copies == 0){
            alert("Book out of copies!");
        }
        const card = new Card(
            ++this.lastId,
            visitorId, bookId, borrowDate
        )
        this.data.push(card)
        book.copies--
        book.isBorrowed++
        this.storeData()
        BookManager.getInstance().updateBook(book)
        return card
    }

    returnBook(cardId){
        const index = this.indexOf(cardId)
        if(index != -1){
            this.data[index].returnDate = new Date()
            this.storeData()
            const book = BookManager.getInstance().findById(this.data[index].bookId)

            if(book){
                book.copies++
                book.isBorrowed--
                BookManager.getInstance().updateBook(book)
                // console.log("Book Return : ", book);
            }
        }
        return index != -1
    }
    
    // deleteCard(cardId){
    //     const index = this.indexOf(cardId)
    //     if(index != -1){
    //         for(let i= index + 1; i < this.data.length; i++){
    //             this.data[i-1] = this.data[i]
    //         }
    //         this.data.length--
    //         this.storeData()
    //     }
    //     return index != -1
    // }

    getCardById(id) { return this.data.find((c) => c.id === id); }

    getAllCards(){ return this.data; }

    getLastId(){ return this.lastId; }
}