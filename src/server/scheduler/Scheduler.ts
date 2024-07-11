import schedule from "node-schedule";

export default class Scheduler {
  public shceduleTask(task: () => void): void {
    schedule.scheduleJob("*/30 * * * * *", function () {
      task();
    });
  }
}
