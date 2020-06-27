import {taskService} from './services/task-service.js';
import {TaskController} from './controllers/taskController.js';

class Bootstrapper {
    static start() {
        // - Put it all together: Wire data logic [dl], business logic [models] and UI controller.
        new TaskController(taskService).init();
    }
}

// wait until scripts have been loaded
document.addEventListener('DOMContentLoaded', Bootstrapper.start);
