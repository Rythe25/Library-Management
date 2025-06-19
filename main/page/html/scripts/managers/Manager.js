export class Manager {
    data = []
    lastId = 0
    #key
    
    /**
     * @param {string} key - The key to use for localStorage
     */
    constructor(key) {
        this.#key = key
    }

    storeData(){
        const content = JSON.stringify({lastId: this.lastId, data: this.data })

        window.localStorage.setItem(this.#key, content)
    }

    loadData(){
        let obj = JSON.parse(window.localStorage.getItem(this.#key) ?? '{}')
        this.data = obj.data ?? []
        this.lastId = obj.lastId ?? 0
    }

    findById(id){
        const found = this.data.filter(b => b.id == id)
        if (found.length > 0) return found[0]
        return null
    }

    indexOf(id){
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id == id) return i
        }
        return -1
    }
}
