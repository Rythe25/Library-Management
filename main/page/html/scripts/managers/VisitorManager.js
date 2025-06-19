import { Manager } from "./Manager.js";
import { Visitor } from "../models/Visitor.js";

export class VisitorManager extends Manager {
    static #instance = null;

    constructor(key = 'visitor') {
        super(key);
    }

    static getInstance() {
        if (this.#instance === null) {
            this.#instance = new VisitorManager();
            this.#instance.loadData();
        }
        return this.#instance;
    }

    addVisitor(name, phone) {
        const visitor = new Visitor(++this.lastId, name, phone);
        this.data.push(visitor);
        this.storeData();
        return visitor;
    }

    updateVisitor(visitorInfo) {
        const index = this.indexOf(visitorInfo.id);
        if (index !== -1) {
            Object.assign(this.data[index], visitorInfo);
            this.storeData();
        }
        return index !== -1;
    }

    deleteVisitor(visitorId) {
        const index = this.indexOf(visitorId);
        if (index !== -1) {
        this.data.splice(index, 1); 
        this.data.forEach((visitor, i) => {
            visitor.id = i + 1; 
        });
        this.lastId = this.data.length; 
        this.storeData(); 
        }
        return index !== -1;
    }

    getVisitorById(id) { return this.data.find((b) => b.id === id);}
    getLastId() { return this.lastId; }
    getAllVisitors() { return this.data; }
    indexOf(id) { return this.data.findIndex((b) => b.id === id); }
}