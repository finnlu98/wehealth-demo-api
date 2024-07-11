import schedule from "node-schedule";
export default class Scheduler {
    shceduleTask(task) {
        schedule.scheduleJob("*/30 * * * * *", function () {
            task();
        });
    }
}
//# sourceMappingURL=Scheduler.js.map