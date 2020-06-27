import Datastore from "nedb-promise";

export class TaskStore {

    constructor() {
        this.db = new Datastore({filename: "./data/tasks.db",autoload:true});
    }

    async add(task) {
        return await this.db.insert(task).catch((err) => { console.log(err); });
    }

    async update(id, task) {
        await this.db.update({_id:id}, {$set: { name: task.name,description: task.description,creationDate : task.creationDate,dueDate: task.dueDate,finishDate: task.finishDate,importance: task.importance}},{}).catch((err) => { console.log(err); });
        return await this.get(id);
    }

    async get(id) {
        return await this.db.findOne({_id: id}).catch((err) => { console.log(err); });
    }

    async delete(id) {
        return  await this.db.remove({_id: id}).catch((err) => { console.log(err); });
    }

    async all() {
        return await this.db.find({}).catch((err) => { console.log(err); });
    }
}

export const taskStore = new TaskStore();