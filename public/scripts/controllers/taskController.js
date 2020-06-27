import { taskService } from "../services/task-service.js";

export class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
        this.taskTemplateCompiled = Handlebars.compile(document.getElementById("task-list-template").innerHTML);
        this.statusTemplateCompiled = Handlebars.compile(document.getElementById("status-template").innerHTML);
        this.taskContainer = document.getElementById("task-container");
        this.themeSwitcher = document.getElementById("theme-switch");
        this.sortCreation = document.getElementById("creationDate");
        this.sortFinish = document.getElementById("finishDate");
        this.sortImportance = document.getElementById("importance");
        this.filterFinish = document.getElementById("finish");
        this.newTask = document.getElementById("newTask");
        this.statusContainer = document.getElementById("status-container");
    }

    async renderTasks() {

        const loaded = await taskService.getTasks();
        let filteredSortedTasks = loaded;


        const sort = document.querySelector("input[name='sortGroup']:checked");
        const filter = document.querySelector("input[name='filterGroup']:checked");

        if(!filter){
            // filter out finished tasks
            filteredSortedTasks = filteredSortedTasks.filter(function (task) {
                return !task.finishDate;
            });
        }
        if(sort){
           switch(sort.value){
               case "creationDate":
                   filteredSortedTasks.sort(function(task1,task2) {
                   return task1.creationDate.localeCompare(task2.creationDate);
                  });
                 break;
               case "finishDate":
                   filteredSortedTasks.sort(function(task1, task2) {
                       return task1.dueDate.localeCompare(task2.dueDate);
                   });
                   break;
               case "importance":
                   filteredSortedTasks.sort(function(task1,task2) {
                       return task1.importance-task2.importance;
                   });
                   break;
           }
        }

        // Render status & tasks
        this.statusContainer.innerHTML = this.statusTemplateCompiled({visibleCount:filteredSortedTasks.length,totalCount:loaded.length});
        this.taskContainer.innerHTML = this.taskTemplateCompiled({tasks: filteredSortedTasks});

        // Listener for finishing tasks
        (function(self) {
            document.querySelectorAll("INPUT[id^='finished_']").forEach(function (rd) {

                rd.addEventListener("click", async (event) => {
                    const task2Finish = await taskService.getTask(rd.value);

                    task2Finish.finishDate = new Date();
                    await taskService.updateTask(task2Finish);
                    self.renderTaskView();
                });
            });
        })(this);

        // Listener for finishing tasks
        (function(self) {
            document.querySelectorAll("button[id^='editTask_']").forEach(function (rd) {

                rd.addEventListener("click", async (event) => {
                    event.preventDefault();

                    const theme = document.body.classList.contains("dark-theme");
                    const sort = document.querySelector("input[name='sortGroup']:checked");
                    const filter = document.querySelector("input[name='filterGroup']:checked");

                    window.location.replace("./newTask.html"+self.prepareParameters(theme,sort,filter,rd.value));
                });
            });
        })(this);
    }

    initEventHandlers() {
        this.themeSwitcher.addEventListener("change",function (){
                document.body.classList.toggle("dark-theme");
                window.history.pushState({}, document.title, "./index.html");
        });

        (function(self) {
            document.querySelectorAll("INPUT[name='sortGroup']").forEach(function (rd) {
                let setCheck;
                rd.addEventListener("click", function () {

                    if (setCheck !== this) {
                        setCheck = this;
                    } else {
                        this.checked = false;
                        setCheck = null;
                    }
                    self.renderTaskView();
                });
            });
        })(this);

        (function(self) {
          document.querySelectorAll("INPUT[name='filterGroup']").forEach(function(rd) {
                let setCheck;
                 rd.addEventListener("click", function() {

                     if (setCheck !== this) {
                         setCheck = this;
                     } else {
                         this.checked = false;
                         setCheck = null;
                     }
                     self.renderTaskView();
                 });
          });
          })(this);

        (function(self) {
            document.getElementById("theme-switch").addEventListener("click", function () {
                    self.renderTasks();
                }
            );
        })(this);

        // theme
        (function(self) {
            self.newTask.addEventListener("click",function(){
            const theme = document.body.classList.contains("dark-theme");
            const sort = document.querySelector("input[name='sortGroup']:checked");
            const filter = document.querySelector("input[name='filterGroup']:checked");

            window.location.replace("./newTask.html"+self.prepareParameters(theme,sort,filter));
        });
        })(this);
    }

    renderTaskView() {
        this.renderTasks();
    }

    init() {
        this.url = new URL(location.href);
        const sort = this.url.searchParams.get("sort");
        const filter = this.url.searchParams.get("filter");
        const theme = this.url.searchParams.get("theme");

        if(sort) {
            switch (sort) {
                case "creationDate":
                    this.sortCreation.checked = true;
                    break;
                case "finishDate":
                    this.sortFinish.checked = true;
                    break;
                case "importance":
                    this.sortImportance.checked = true;
                    break;
            }
        }
        if(filter) {
            this.filterFinish.checked = true;
        }

        if(theme){
            document.body.classList.toggle("dark-theme");
            this.themeSwitcher.value="dark";
        }

        this.renderTaskView();
        this.initEventHandlers();
    }

    // Helper
    prepareParameters(theme,sort,filter,id){
        const themeParam = theme ? "theme=dark":null;
        const sortParam = sort ? "sort="+sort.value:null;
        const filterParam = filter ? "filter=true":null;
        const idParam = id ? "id="+id:null;


        let params = "";
        if(themeParam){
            params+=themeParam;
        }
        if(sortParam){
            if(params){
                params += "&";
            }
            params+=sortParam;
        }
        if(filterParam){
            if(params){
                params += "&";
            }
            params+=filterParam;
        }

        if(idParam){
            if(params){
                params += "&";
            }
            params+=idParam;
        }
        if(params) {
            params = "?"+params;
        }
        return params;
    }
}