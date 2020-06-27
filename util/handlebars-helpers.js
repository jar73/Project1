Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

    Handlebars.registerHelper('formatDate', function (data) {
        let options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: true
        };
        return new Date(data).toLocaleString('de-DE', options); //ES6
    });

    /*
      * Translate due date for ui in speaking value
      */
    Handlebars.registerHelper('calDueDate', function(dueDate){

        const weekday = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];

        if (!dueDate) {
            return "Irgendwann";
        }

        const today = new Date();
        //console.log((this.dueDate.getTime()-today.getTime())/(3600*24*1000));
        const dayDiff = Math.floor((dueDate.getTime()-today.getTime())/(3600*24*1000));
        // console.log(dayDiff+" "+this.dueDate.getDay()+" "+today.getDay());

        switch (dayDiff){
            case 0:
                return "Heute";
            case 1:
                return "Morgen";
            case 2:
                return "Übermorgen";
            default:
                //     console.log(this.dueDate.getDay());
                if (dayDiff < 7) {
                    return "Diesen "+weekday[dueDate.getDay()];
                } else if (dayDiff < 14) {
                    return "Nächsten "+weekday[dueDate.getDay()];
                } else {
                    const dd = dueDate.getDate();
                    const mm = dueDate.getMonth()+1;
                    const yyyy = dueDate.getFullYear();

                    return `Am  ${dd}.${mm}.${yyyy}`;
                }
        }
    });

    Handlebars.registerHelper('calcImportanceString', function(importance){
        return "↯↯↯↯↯↯".substr(0,importance);
    });



