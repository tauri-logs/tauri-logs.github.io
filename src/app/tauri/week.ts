import {Log} from "./models/log";
import {environment} from "../../environments/environment";

export class Week {
  logs: Log[];
  startDate: Date;
  endDate: Date;

  constructor(logs: Log[] = [], startDate: Date = new Date()) {
    this.logs = logs;
    this.startDate = startDate;
    this.startDate.setHours(environment.resetHour, 0 ,0, 0);
    this.endDate = new Date(startDate);
    this.endDate.setDate(this.endDate.getDate() + 7);
  }

  incrementStartDate(numberOfDays: number) {
    this.startDate.setDate(this.startDate.getDate() + numberOfDays);
    this.endDate.setDate(this.endDate.getDate() + numberOfDays);
  }

  static getWeekByTimestamp(timestamp: number) : Week {
    const week : Week = new Week([], new Date(timestamp * 1000));
    let daysDiff = week.startDate.getDay() - environment.resetDay;
    if (daysDiff < 0) {
      daysDiff = Math.abs(daysDiff - 1)
    }
    week.incrementStartDate(-daysDiff);
    return week
  }

}
