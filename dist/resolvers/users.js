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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const User_1 = require("../entities/User");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
let UsernameAndPasswordInput = class UsernameAndPasswordInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UsernameAndPasswordInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UsernameAndPasswordInput.prototype, "password", void 0);
UsernameAndPasswordInput = __decorate([
    (0, type_graphql_1.InputType)()
], UsernameAndPasswordInput);
let FieldError = class FieldError {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
// function TestDecorator() {
//     return function(target: any) {
//     }
// }
// @TestDecorator()
// class Test {
// }
let UserResolver = class UserResolver {
    users({ em }) {
        const users = em.find("User", {});
        return users;
    }
    me({ req, em }) {
        console.log(req.session);
        if (!req.session.userId) {
            return null;
        }
        const user = em.findOne(User_1.User, { id: req.session.userId });
        return user;
    }
    Register(options, { em }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options.username.length <= 3) {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "username is too short."
                        }
                    ]
                };
            }
            if (options.password.length <= 3) {
                return {
                    errors: [
                        {
                            field: "password",
                            message: "password is too short."
                        }
                    ]
                };
            }
            const hashPass = yield argon2_1.default.hash(options.password);
            const user = yield em.create("User", { username: options.username, password: hashPass });
            try {
                yield em.persistAndFlush(user);
            }
            catch (error) {
                console.log(error);
                return {
                    errors: [{
                            field: "username",
                            message: error.detail
                        }]
                };
            }
            return {
                user
            };
        });
    }
    Login(options, { em, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield em.findOne("User", { username: options.username });
            if (!user) {
                return {
                    errors: [
                        {
                            field: "username",
                            message: "username not found."
                        }
                    ]
                };
            }
            const match = yield argon2_1.default.verify(user === null || user === void 0 ? void 0 : user.password, options.password);
            if (!match) {
                return {
                    errors: [
                        {
                            field: "password",
                            message: "incorrect password."
                        }
                    ]
                };
            }
            req.session.userId = user.id;
            return {
                user
            };
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)('options')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsernameAndPasswordInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)('options')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsernameAndPasswordInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Login", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=users.js.map