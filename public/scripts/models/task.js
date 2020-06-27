export class Task {
    constructor(name,description,importance,creationDate,dueDate,finishDate) {
        this.name = name;
        this.description = description;
        this.importance = importance;
        this.creationDate = creationDate;
        this.dueDate = dueDate ? new Date(dueDate) : dueDate;
        this.finishDate = finishDate ? new Date(finishDate) : finishDate;
    }

    get finished(){
        return this.finishDate !== undefined;
    }

    finishTask(){
        this.finishDate = new Date();
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            creationDate: this.creationDate,
            dueDate: this.dueDate,
            finishDate: this.finishDate,
            importance: this.importance
        };
    }
}