import {taskService} from './services/task-service.js';
import {NewTaskController} from './controllers/newTaskController.js';

class Bootstrapper {
    static start() {
        new NewTaskController(taskService).init();
    }
}

// wait until scripts have been loaded
document.addEventListener('DOMContentLoaded', Bootstrapper.start);
