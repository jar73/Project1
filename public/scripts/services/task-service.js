import { httpService } from "./http-service.js";

const server = "http://127.0.0.1:3001";

class TaskService {

    async createTask(task) {
        return await httpService.ajax("POST", `${server}/tasks/`, task, []);
    }

    async getTasks() {
        return await httpService.ajax("GET", `${server}/tasks/`, undefined, []);
    }

    async getTask(id) {
        return await httpService.ajax("GET", `${server}/tasks/${id}`, undefined, []);
    }

    async updateTask(task) {
        return await httpService.ajax("PUT", `${server}/tasks/${task._id}`, task, []);
    }

    async deleteTask(task) {
        return await httpService.ajax("DELETE", `${server}/tasks/${task._id}`, task, []);
    }
}

export const taskService = new TaskService();