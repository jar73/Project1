import {Task} from "../models/task.js";

export class NewTaskController {
    constructor(taskService) {
        this.taskService = taskService;
        this.newTaskForm = document.getElementById("new-task-form");
        this.themeSwitcher = document.getElementById("theme-switch");
        this.title = document.getElementById("title");
        this.description = document.getElementById("description");
        this.dueDate = document.getElementById("dueDate");
        this.id = document.getElementById("id");
    }

    async renderTasks() {
        let task;
        const url = new URL(location.href);
        const id = url.searchParams.get("id");
        const theme = url.searchParams.get("theme");

        if(theme){
            switch(theme) {
                case "dark":
                    this.themeSwitcher.selectedIndex = 1;
                    document.body.classList.toggle("dark-theme");
                    break;
                case "light":
                    this.themeSwitcher.selectedIndex = 0;
                    break;
            }
        }

        if(id) {
            task =  await this.taskService.getTask(id);

        }else {
            task = new Task();
            task.creationDate = new Date();
            task.name ="";
            task.description = "";
            task.id=null;
        }


        this.id = task.id;
        this.title.value = task.name;
        this.description.innerText = task.description;
        if(task.dueDate){
          this.dueDate.value = new Date(task.dueDate).toISOString().substr(0,10);
        }
        if(task.importance) {
            document.getElementById("importance" + task.importance).checked = true;
        }
    }

     initEventHandlers(sort, filter) {

        // Force due date today or later
        this.dueDate.setAttribute("min", new Date().toISOString().split("T")[0]);

        this.newTaskForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const url = new URL(location.href);
            const id = url.searchParams.get("id");

            const task = new Task();
            task.description = this.description.value;
            task.name = this.title.value;
            task.creationDate = new Date();
            task.dueDate = this.dueDate.value;
            task.importance =  this.getImportance();
            task.finishDate = null;

            if(null === id) {
                await this.taskService.createTask(task);
            }else {
                task._id = id;
                await this.taskService.updateTask(task);
            }

            const theme = document.body.classList.contains("dark-theme");
            const param = this.prepareParameter(theme,sort,filter);
            document.location.href="./index.html"+(param ? "?"+param: "");
        });

         this.themeSwitcher.addEventListener("change",function (){
             document.body.classList.toggle("dark-theme");
         });

        this.newTaskForm.addEventListener("reset", (event) => {
            const theme = document.body.classList.contains("dark-theme");
           const param = this.prepareParameter(theme,sort,filter);
            document.location.href="./index.html"+(param ? "?"+param: "");
        });
    }

    getImportance(){
        for(let i =5;i>0;i--) {
            const rating = document.getElementById("importance"+i);
            if(rating.checked){
                return i;
            }
        }
        return 0;
    }


    init() {
        this.url = new URL(location.href);
        const sort = this.url.searchParams.get("sort");
        const filter = this.url.searchParams.get("filter");

        this.initEventHandlers(sort,filter);
        this.renderTasks();
    }

    prepareParameter(theme,sort, filter){
        let param ="";
        if(sort){
            param+="sort="+sort;
        }

        if(filter){
            if(param){
                param +="&";
            }
            param += "filter="+filter;
        }

        if(theme){
            if(param){
                param +="&";
            }
            param += "theme=dark";
        }
        return param;
    }
}