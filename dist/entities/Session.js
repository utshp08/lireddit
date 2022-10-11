"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const core_1 = require("@mikro-orm/core");
const type_graphql_1 = require("type-graphql");
let Session = class Session {
};
__decorate([
    (0, type_graphql_1.Field)(() => String) // we can also convert the field to graphql type -> @Field(() => Type)
    ,
    (0, core_1.PrimaryKey)({ type: "text" }),
    __metadata("design:type", String)
], Session.prototype, "sid", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Object),
    (0, core_1.Property)({ type: "json" }),
    __metadata("design:type", Object)
], Session.prototype, "sess", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Date),
    (0, core_1.Property)({ type: "date" }),
    __metadata("design:type", Date)
], Session.prototype, "expire", void 0);
Session = __decorate([
    (0, type_graphql_1.ObjectType)() // convert the class to an object type to remove graphql error
    ,
    (0, core_1.Entity)()
], Session);
exports.Session = Session;
//# sourceMappingURL=Session.js.map