
Handlebars.registerHelper("formatDate", function (data) {
    let options = {
        year: "numeric", month: "numeric", day: "numeric",
        hour: "numeric", minute: "numeric", second: "numeric",
        hour12: true
    };
    return new Date(data).toLocaleString("de-DE", options); //ES6
});

Handlebars.registerHelper("formatDateShort", function (data) {
    let options = {
        year: "numeric", month: "numeric", day: "numeric"
    };
    return new Date(data).toLocaleString("de-DE", options); //ES6
});

/*
  * Translate due date for ui in speaking value
  */
Handlebars.registerHelper("calcDueDate", function(dueDateIn){

    if (!dueDateIn) {
        return "Anytime";
    }

    const dueDate = new Date(dueDateIn);
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const today = new Date();
    const dayDiff = Math.floor((dueDate.getTime() - today.getTime()) / (3600 * 24 * 1000));

    switch (dayDiff) {
        case -1:
            return "Today";
        case 0:
            return "Tomorrow";
        case 1:
            return "Day after tomorrow";
        default:
            if (dayDiff < 7) {
                return "Next " + weekday[dueDate.getDay()];
            } else if (dayDiff < 14) {
                return weekday[dueDate.getDay()] +" in a week";
            } else {
                const dd = dueDate.getDate();
                const mm = dueDate.getMonth() + 1;
                const yyyy = dueDate.getFullYear();

                return `On  ${dd}.${mm}.${yyyy}`;
            }
    }
});

Handlebars.registerHelper("calcImportanceString", function(importance){
    return "↯↯↯↯↯↯".substr(0,importance);
});


Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {

    switch (operator) {
        case "==":
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case "===":
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case "!=":
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case "!==":
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case "<":
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case "<=":
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case ">":
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case ">=":
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case "&&":
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case "||":
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});
