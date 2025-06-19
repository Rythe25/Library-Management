export class Book {
    constructor(id, name, author, publisher, publish, pages, copies) {
        this.id = id
        this.name = name
        this.author = author
        this.publisher = publisher
        this.publish = publish
        this.pages = pages
        this.copies = copies
        this.isBorrowed = 0;
    }
}