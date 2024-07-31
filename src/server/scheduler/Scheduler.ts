import schedule from "node-schedule";

export default class Scheduler {
  public shceduleTask(task: () => void, repeat_time_min: string): void {
    schedule.scheduleJob(`*/${repeat_time_min} * * * *`, function () {
      task();
    });
  }
}
