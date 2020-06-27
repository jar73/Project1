import {taskStore} from "../services/taskStore.js";
import {Task} from "../public/scripts/models/task";

export class TasksController {

    async getTasks(req, res) {
        const result = await taskStore.all();
        res.type("application/json");
        return result ? res.status(200).send(result) : res.status(400).send({"status":"failed"});
    }

    async createTask(req, res) {
        const task = req.body;
        const result =  await taskStore.add(task);
        res.type("application/json");
        return result ? res.status(200).send({"status":"success"}) : res.status(400).send({"status":"failed"});
    }
     async updateTask(req, res) {
        const task = req.body;
        const id = req.params.id;
        const result =  await taskStore.update(id,task);
        res.type("application/json");
        return result ? res.status(200).send({"status":"success"}) : res.status(400).send({"status":"failed"});
    }

     async getTask(req, res) {
         const id = req.params.id;
         const task = await taskStore.get(id);
         return task ? res.status(200).send(JSON.stringify(task)) : res.status(400).send({"status":"failed"});
    }
}

export const tasksController = new TasksController();