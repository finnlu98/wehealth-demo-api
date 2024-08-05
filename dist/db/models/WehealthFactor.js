var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Table, Column, Model, DataType, HasMany, } from "sequelize-typescript";
import { NorwayFactor } from "./NorwayFactor.js";
import { Alert } from "./Alert.js";
let WehealthFactor = class WehealthFactor extends Model {
};
__decorate([
    Column({
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], WehealthFactor.prototype, "wh_factor", void 0);
__decorate([
    HasMany(() => NorwayFactor),
    __metadata("design:type", Array)
], WehealthFactor.prototype, "no_factor", void 0);
__decorate([
    HasMany(() => Alert),
    __metadata("design:type", Array)
], WehealthFactor.prototype, "wh_alert", void 0);
WehealthFactor = __decorate([
    Table
], WehealthFactor);
export { WehealthFactor };
//# sourceMappingURL=WehealthFactor.js.map