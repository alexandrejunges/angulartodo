module app.models {
    export class Task {
        id: number;
        title: string;
        dueDate: Date;
        isDone: boolean;
        
        constructor(id: number, title: string, dueDate?: Date, isDone?: boolean) {
            this.id = id;
            this.title = title;
            this.dueDate = dueDate;
            this.isDone = isDone || false;
        }
        
        isDelayed() {            
            return !this.isDone && 
                this.dueDate.getTime() < new Date().getTime();
        }
        
        isDueToday() {
            return this.dueDate.getTime() == new Date().getTime();
        }
    }
}