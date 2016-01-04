module app.common.date {
        
    // Returns current date without time
    export function today() {
        var currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        return currentDate;
    }
}