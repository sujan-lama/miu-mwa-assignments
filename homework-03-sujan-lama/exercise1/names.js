const {promises} = require('fs');
const path = require('path');
const EventEmitter = require('events');

class Names extends EventEmitter {

    names = [];

    constructor() {
        super();
    }


    async getNamesList() {
        const names = await promises.readFile(path.join(__dirname, 'data.json'), {encoding: 'utf8'});
        this.names = JSON.parse(names);
    }

    async getNames() {
        await this.getNamesList();
        this.emit("names_all", {"success": true, "data": this.names});
    }

    async getNameById(id) {
        await this.getNamesList();
        const name = this.names.filter(v => v.id === id)[0];
        if (!name) {
            this.emit("names_single", {"success": false, "message": `No name found for id ${id}`});
            return;
        }

        this.emit("names_single", {"success": true, "data": name});
    }

    async removeNameById(id) {
        await this.getNamesList();
        const deletedName = this.names.filter(v => v.id === id)[0];
        const deletedIndex = this.names.indexOf(deletedName);
        if (deletedIndex === -1) {
            this.emit("names_deleted", {"success": false, "message": `No name found for id ${id}`});
            return;
        }
        this.names.splice(deletedIndex, 1);
        this.emit("names_deleted", {"success": true, "message": `Name successfully removed of id ${id}`});
        await this.persist();
    }

    async addName(name) {
        await this.getNamesList();
        const currentMaxId = Math.max(...this.names.map(v => v.id));
        this.names.push({"id": currentMaxId + 1, "name": name});
        this.emit("names_added", {
            "success": true,
            "message": `Name added with id ${currentMaxId + 1} and name ${name}`
        });
        await this.persist();
    }

    async persist() {
        await promises.writeFile(path.join(__dirname, "data.json"), JSON.stringify(this.names), {encoding: "utf8"})
        this.emit("names_saved", "Data successfully Saved")
    }

}

const namesInstance = new Names();
//event handler
namesInstance.on('names_all', (name) => {
        console.log("\n\n************* Get Names **************");
        console.log(name)
    }
);
namesInstance.on('names_single', (name) => {
    console.log("\n\n************ Get name by id **********")
    console.log(name)
});
namesInstance.on('names_deleted', (name) => {
    console.log("\n\n************ Remove name by id **********")
    console.log(name)
});
namesInstance.on('names_added', (name) => {
    console.log("\n\n************ Name add **********")
    console.log(name)
});
namesInstance.on('names_saved', (name) => console.log(name));

//event trigger
(async () => {
    await namesInstance.getNames();
    await namesInstance.addName("Sujan Lama")
    await namesInstance.getNameById(1);
    await namesInstance.removeNameById(1);
})();

