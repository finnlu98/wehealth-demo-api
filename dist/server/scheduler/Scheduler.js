import schedule from "node-schedule";
export default class Scheduler {
    shceduleTask(task, repeat_time_min) {
        schedule.scheduleJob(`*/${repeat_time_min} * * * *`, function () {
            task();
        });
    }
}
//# sourceMappingURL=Scheduler.js.map