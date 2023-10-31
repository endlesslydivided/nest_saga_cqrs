/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvestmentModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const investment_controller_1 = __webpack_require__(6);
const cqrs_1 = __webpack_require__(7);
const mongoose_1 = __webpack_require__(14);
const investment_schema_1 = __webpack_require__(15);
const database_1 = __webpack_require__(16);
const rmq_1 = __webpack_require__(26);
const investment_schema_factory_1 = __webpack_require__(29);
const investment_entity_repository_1 = __webpack_require__(31);
const commands_1 = __webpack_require__(32);
const Investment_factory_1 = __webpack_require__(34);
const events_1 = __webpack_require__(36);
const transaction_consts_1 = __webpack_require__(39);
const config_1 = __webpack_require__(18);
const joi_1 = tslib_1.__importDefault(__webpack_require__(41));
let InvestmentModule = exports.InvestmentModule = class InvestmentModule {
};
exports.InvestmentModule = InvestmentModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: './apps/asset_managment_service/.env',
                validationSchema: joi_1.default.object({
                    RABBIT_MQ_URI: joi_1.default.string().required(),
                    RABBIT_MQ_INVESTMENT_QUEUE: joi_1.default.string().required(),
                }),
            }),
            cqrs_1.CqrsModule,
            mongoose_1.MongooseModule.forFeature([{ name: investment_schema_1.Investment.name, schema: investment_schema_1.InvestmentSchema }]),
            database_1.DatabaseModule,
            rmq_1.RmqModule.register({
                name: transaction_consts_1.RMQ_INVESTMENT_SERVICE_NAME
            }),
            rmq_1.RmqModule.register({
                name: transaction_consts_1.RMQ_TRANSACTION_SERVICE_NAME
            }),
        ],
        providers: [
            investment_entity_repository_1.InvestmentEntityRepository,
            investment_schema_factory_1.InvestmentSchemaFactory,
            Investment_factory_1.InvestmentFactory,
            ...commands_1.InvestmentCommandHandlers,
            ...events_1.InvestmentEventHandlers
        ],
        controllers: [investment_controller_1.InvestmentController]
    })
], InvestmentModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvestmentController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const cqrs_1 = __webpack_require__(7);
const microservices_1 = __webpack_require__(2);
const createInvestmentRequest_dto_1 = __webpack_require__(8);
const createInvestment_command_1 = __webpack_require__(9);
const failedTransactionCreation_command_1 = __webpack_require__(10);
const failedTransactionCreation_dto_1 = __webpack_require__(11);
const successTransactionCreation_command_1 = __webpack_require__(12);
const successTransactionCreation_dto_1 = __webpack_require__(13);
let InvestmentController = exports.InvestmentController = class InvestmentController {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async createInvestment(data, context) {
        await this.commandBus.execute(new createInvestment_command_1.CreateInvestmentCommand(data));
    }
    async processFailedTransactionCreation(data, context) {
        await this.commandBus.execute(new failedTransactionCreation_command_1.FailedTransactionCreationCommand(data));
    }
    async processSuccessTransactionCreation(data, context) {
        await this.commandBus.execute(new successTransactionCreation_command_1.SuccessTransactionCreationCommand(data));
    }
};
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)("investment.creation"),
    tslib_1.__param(0, (0, microservices_1.Payload)()),
    tslib_1.__param(1, (0, microservices_1.Ctx)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof createInvestmentRequest_dto_1.CreateInvestmentRequest !== "undefined" && createInvestmentRequest_dto_1.CreateInvestmentRequest) === "function" ? _b : Object, typeof (_c = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvestmentController.prototype, "createInvestment", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)("fail.transaction.creation"),
    tslib_1.__param(0, (0, microservices_1.Payload)()),
    tslib_1.__param(1, (0, microservices_1.Ctx)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof failedTransactionCreation_dto_1.FailedTransactionCreationDto !== "undefined" && failedTransactionCreation_dto_1.FailedTransactionCreationDto) === "function" ? _d : Object, typeof (_e = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvestmentController.prototype, "processFailedTransactionCreation", null);
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)("success.transaction.creation"),
    tslib_1.__param(0, (0, microservices_1.Payload)()),
    tslib_1.__param(1, (0, microservices_1.Ctx)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof successTransactionCreation_dto_1.SuccessTransactionCreationDto !== "undefined" && successTransactionCreation_dto_1.SuccessTransactionCreationDto) === "function" ? _f : Object, typeof (_g = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvestmentController.prototype, "processSuccessTransactionCreation", null);
exports.InvestmentController = InvestmentController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _a : Object])
], InvestmentController);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/cqrs");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateInvestmentRequest = void 0;
class CreateInvestmentRequest {
}
exports.CreateInvestmentRequest = CreateInvestmentRequest;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateInvestmentCommand = void 0;
class CreateInvestmentCommand {
    constructor(createInvestmentRequest) {
        this.createInvestmentRequest = createInvestmentRequest;
    }
}
exports.CreateInvestmentCommand = CreateInvestmentCommand;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FailedTransactionCreationCommand = void 0;
class FailedTransactionCreationCommand {
    constructor(data) {
        this.data = data;
    }
}
exports.FailedTransactionCreationCommand = FailedTransactionCreationCommand;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FailedTransactionCreationDto = void 0;
class FailedTransactionCreationDto {
}
exports.FailedTransactionCreationDto = FailedTransactionCreationDto;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuccessTransactionCreationCommand = void 0;
class SuccessTransactionCreationCommand {
    constructor(data) {
        this.data = data;
    }
}
exports.SuccessTransactionCreationCommand = SuccessTransactionCreationCommand;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuccessTransactionCreationDto = void 0;
class SuccessTransactionCreationDto {
}
exports.SuccessTransactionCreationDto = SuccessTransactionCreationDto;


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvestmentSchema = exports.Investment = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(14);
const database_1 = __webpack_require__(16);
let Investment = exports.Investment = class Investment extends database_1.IdentifiableEntitySchema {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Investment.prototype, "name", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Investment.prototype, "description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Investment.prototype, "startDate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Investment.prototype, "endDate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Investment.prototype, "initialAmount", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Investment.prototype, "currentValue", void 0);
exports.Investment = Investment = tslib_1.__decorate([
    (0, mongoose_1.Schema)({ versionKey: false, collection: 'investments' })
], Investment);
exports.InvestmentSchema = mongoose_1.SchemaFactory.createForClass(Investment);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseEntityRepository = exports.EntitySchemaFactory = exports.IdentifiableEntitySchema = exports.EntityFactory = exports.EntityRepository = exports.DatabaseModule = void 0;
var database_module_1 = __webpack_require__(17);
Object.defineProperty(exports, "DatabaseModule", ({ enumerable: true, get: function () { return database_module_1.DatabaseModule; } }));
var entity_repository_1 = __webpack_require__(19);
Object.defineProperty(exports, "EntityRepository", ({ enumerable: true, get: function () { return entity_repository_1.EntityRepository; } }));
var entity_factory_1 = __webpack_require__(20);
Object.defineProperty(exports, "EntityFactory", ({ enumerable: true, get: function () { return entity_factory_1.EntityFactory; } }));
var identifiable_entity_schema_1 = __webpack_require__(21);
Object.defineProperty(exports, "IdentifiableEntitySchema", ({ enumerable: true, get: function () { return identifiable_entity_schema_1.IdentifiableEntitySchema; } }));
var entity_schema_factory_1 = __webpack_require__(23);
Object.defineProperty(exports, "EntitySchemaFactory", ({ enumerable: true, get: function () { return entity_schema_factory_1.EntitySchemaFactory; } }));
var base_entity_repository_1 = __webpack_require__(24);
Object.defineProperty(exports, "BaseEntityRepository", ({ enumerable: true, get: function () { return base_entity_repository_1.BaseEntityRepository; } }));


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(18);
const mongoose_1 = __webpack_require__(14);
let DatabaseModule = exports.DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: (configService) => ({
                    uri: configService.get('MONGODB_URI'),
                    dbName: configService.get('MONGODB_DATABASE_NAME')
                }),
                inject: [config_1.ConfigService],
            }),
        ],
    })
], DatabaseModule);


/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EntityRepository = void 0;
const common_1 = __webpack_require__(5);
class EntityRepository {
    constructor(entityModel, entitySchemaFactory) {
        this.entityModel = entityModel;
        this.entitySchemaFactory = entitySchemaFactory;
    }
    async findOne(entityFilterQuery) {
        const entityDocument = await this.entityModel.findOne(entityFilterQuery, {});
        if (!entityDocument) {
            throw new common_1.NotFoundException('Entity was not found.');
        }
        return this.entitySchemaFactory.createFromSchema(entityDocument.toObject());
    }
    async find(entityFilterQuery) {
        return (await this.entityModel.find(entityFilterQuery, {})).map(entityDocument => this.entitySchemaFactory.createFromSchema(entityDocument.toObject()));
    }
    async create(entity) {
        await new this.entityModel(this.entitySchemaFactory.create(entity)).save();
    }
    async remove(entityId) {
        await this.entityModel.deleteOne({ where: { _id: entityId } });
    }
    async findOneAndReplace(entityFilterQuery, entity) {
        const updatedEntityDocument = await this.entityModel.findOneAndReplace(entityFilterQuery, (this.entitySchemaFactory.create(entity)), {
            new: true,
            useFindAndModify: false,
            lean: true,
        });
        if (!updatedEntityDocument) {
            throw new common_1.NotFoundException('Unable to find the entity to replace.');
        }
    }
}
exports.EntityRepository = EntityRepository;


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IdentifiableEntitySchema = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(14);
const mongoose_2 = __webpack_require__(22);
let IdentifiableEntitySchema = exports.IdentifiableEntitySchema = class IdentifiableEntitySchema {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId }),
    tslib_1.__metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], IdentifiableEntitySchema.prototype, "_id", void 0);
exports.IdentifiableEntitySchema = IdentifiableEntitySchema = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], IdentifiableEntitySchema);


/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseEntityRepository = void 0;
const mongodb_1 = __webpack_require__(25);
const entity_repository_1 = __webpack_require__(19);
class BaseEntityRepository extends entity_repository_1.EntityRepository {
    async findOneById(id) {
        return this.findOne({ _id: new mongodb_1.ObjectId(id) });
    }
    async findOneAndReplaceById(id, entity) {
        await this.findOneAndReplace({ _id: new mongodb_1.ObjectId(id) }, entity);
    }
    async findAll() {
        return this.find({});
    }
}
exports.BaseEntityRepository = BaseEntityRepository;


/***/ }),
/* 25 */
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RmqService = exports.RmqModule = void 0;
var rmq_module_1 = __webpack_require__(27);
Object.defineProperty(exports, "RmqModule", ({ enumerable: true, get: function () { return rmq_module_1.RmqModule; } }));
var rmq_service_1 = __webpack_require__(28);
Object.defineProperty(exports, "RmqService", ({ enumerable: true, get: function () { return rmq_service_1.RmqService; } }));


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var RmqModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RmqModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(18);
const microservices_1 = __webpack_require__(2);
const rmq_service_1 = __webpack_require__(28);
let RmqModule = exports.RmqModule = RmqModule_1 = class RmqModule {
    static register({ name }) {
        return {
            module: RmqModule_1,
            imports: [
                microservices_1.ClientsModule.registerAsync({
                    clients: [
                        {
                            name,
                            useFactory: (configService) => ({
                                transport: microservices_1.Transport.RMQ,
                                options: {
                                    urls: [configService.getOrThrow('RABBIT_MQ_URI')],
                                    queue: configService.get(`RABBIT_MQ_${name}_QUEUE`),
                                },
                            }),
                            inject: [config_1.ConfigService],
                        },
                    ],
                }),
            ],
            exports: [microservices_1.ClientsModule],
        };
    }
};
exports.RmqModule = RmqModule = RmqModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [rmq_service_1.RmqService],
        exports: [rmq_service_1.RmqService],
    })
], RmqModule);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RmqService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const config_1 = __webpack_require__(18);
const microservices_1 = __webpack_require__(2);
let RmqService = exports.RmqService = class RmqService {
    constructor(configService) {
        this.configService = configService;
    }
    getOptions(queue, noAck = false) {
        return {
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [this.configService.getOrThrow('RABBIT_MQ_URI')],
                queue: this.configService.get(`RABBIT_MQ_${queue}_QUEUE`),
                noAck,
                persistent: true,
            },
        };
    }
    ack(context) {
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        channel.ack(originalMessage);
    }
};
exports.RmqService = RmqService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], RmqService);


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvestmentSchemaFactory = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const mongodb_1 = __webpack_require__(25);
const Investment_model_1 = __webpack_require__(30);
let InvestmentSchemaFactory = exports.InvestmentSchemaFactory = class InvestmentSchemaFactory {
    create(entity) {
        return {
            _id: new mongodb_1.ObjectId(entity.getId()),
            name: entity.getName(),
            description: entity.getDescription(),
            startDate: entity.getStartDate(),
            endDate: entity.getEndDate(),
            initialAmount: entity.getInitialAmount(),
            currentValue: entity.getCurrentValue()
        };
    }
    createFromSchema(entitySchema) {
        return new Investment_model_1.InvestmentDomainModel(entitySchema._id.toHexString(), entitySchema.name, entitySchema.description, entitySchema.startDate, entitySchema.endDate, entitySchema.initialAmount, entitySchema.currentValue);
    }
};
exports.InvestmentSchemaFactory = InvestmentSchemaFactory = tslib_1.__decorate([
    (0, common_1.Injectable)()
], InvestmentSchemaFactory);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvestmentDomainModel = void 0;
const cqrs_1 = __webpack_require__(7);
class InvestmentDomainModel extends cqrs_1.AggregateRoot {
    constructor(_id, name, description, startDate, endDate, initialAmount, currentValue) {
        super();
        this._id = _id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.initialAmount = initialAmount;
        this.currentValue = currentValue;
    }
    getId() {
        return this._id;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getStartDate() {
        return this.startDate;
    }
    getEndDate() {
        return this.endDate;
    }
    getInitialAmount() {
        return this.initialAmount;
    }
    getCurrentValue() {
        return this.currentValue;
    }
}
exports.InvestmentDomainModel = InvestmentDomainModel;


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvestmentEntityRepository = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const mongoose_1 = __webpack_require__(14);
const mongoose_2 = __webpack_require__(22);
const investment_schema_factory_1 = __webpack_require__(29);
const investment_schema_1 = __webpack_require__(15);
const database_1 = __webpack_require__(16);
let InvestmentEntityRepository = exports.InvestmentEntityRepository = class InvestmentEntityRepository extends database_1.BaseEntityRepository {
    constructor(investmentModel, investmentSchemaFactory) {
        super(investmentModel, investmentSchemaFactory);
    }
};
exports.InvestmentEntityRepository = InvestmentEntityRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(investment_schema_1.Investment.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof investment_schema_factory_1.InvestmentSchemaFactory !== "undefined" && investment_schema_factory_1.InvestmentSchemaFactory) === "function" ? _b : Object])
], InvestmentEntityRepository);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvestmentCommandHandlers = void 0;
const createInvestment_handler_1 = __webpack_require__(33);
exports.InvestmentCommandHandlers = [createInvestment_handler_1.CreateInvestmentHandler];


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateInvestmentHandler = void 0;
const tslib_1 = __webpack_require__(4);
const cqrs_1 = __webpack_require__(7);
const createInvestment_command_1 = __webpack_require__(9);
const Investment_factory_1 = __webpack_require__(34);
let CreateInvestmentHandler = exports.CreateInvestmentHandler = class CreateInvestmentHandler {
    constructor(investmentFactory, eventPublisher) {
        this.investmentFactory = investmentFactory;
        this.eventPublisher = eventPublisher;
    }
    async execute({ createInvestmentRequest }) {
        const { name, description, startDate, endDate, initialAmount, currentValue } = createInvestmentRequest;
        const investment = this.eventPublisher.mergeObjectContext(await this.investmentFactory.create(name, description, startDate, endDate, initialAmount, currentValue));
        investment.commit();
    }
};
exports.CreateInvestmentHandler = CreateInvestmentHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(createInvestment_command_1.CreateInvestmentCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Investment_factory_1.InvestmentFactory !== "undefined" && Investment_factory_1.InvestmentFactory) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.EventPublisher !== "undefined" && cqrs_1.EventPublisher) === "function" ? _b : Object])
], CreateInvestmentHandler);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvestmentFactory = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const mongodb_1 = __webpack_require__(25);
const Investment_model_1 = __webpack_require__(30);
const investment_entity_repository_1 = __webpack_require__(31);
const investmentCreated_event_1 = __webpack_require__(35);
let InvestmentFactory = exports.InvestmentFactory = class InvestmentFactory {
    constructor(repository) {
        this.repository = repository;
    }
    async create(name, description, startDate, endDate, initialAmount, currentValue) {
        const investment = new Investment_model_1.InvestmentDomainModel(new mongodb_1.ObjectId().toHexString(), name, description, new Date(startDate), new Date(endDate), initialAmount, currentValue);
        await this.repository.create(investment);
        investment.apply(new investmentCreated_event_1.InvestmentCreatedEvent(investment));
        return investment;
    }
    async remove(investmentId) {
        await this.repository.remove(investmentId);
    }
};
exports.InvestmentFactory = InvestmentFactory = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof investment_entity_repository_1.InvestmentEntityRepository !== "undefined" && investment_entity_repository_1.InvestmentEntityRepository) === "function" ? _a : Object])
], InvestmentFactory);


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvestmentCreatedEvent = void 0;
class InvestmentCreatedEvent {
    constructor(investmentId) {
        this.investmentId = investmentId;
    }
}
exports.InvestmentCreatedEvent = InvestmentCreatedEvent;


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvestmentEventHandlers = void 0;
const failedTransactionsInvestmentDeleted_handler_1 = __webpack_require__(37);
const investmentCreated_handler_1 = __webpack_require__(40);
exports.InvestmentEventHandlers = [investmentCreated_handler_1.InvestmentCreatedHandler, failedTransactionsInvestmentDeleted_handler_1.FailedTransactionsInvestmentDeletedHandler];


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FailedTransactionsInvestmentDeletedHandler = void 0;
const tslib_1 = __webpack_require__(4);
const cqrs_1 = __webpack_require__(7);
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(2);
const failedTransactionsInvestmentDeleted_event_1 = __webpack_require__(38);
const transaction_consts_1 = __webpack_require__(39);
let FailedTransactionsInvestmentDeletedHandler = exports.FailedTransactionsInvestmentDeletedHandler = class FailedTransactionsInvestmentDeletedHandler {
    constructor(client) {
        this.client = client;
        this.client.connect();
    }
    async handle({ exception, investmentId }) {
        console.log(`Investment wasn't created. Reason:${JSON.stringify(exception)}`);
        this.client.send("fail.investment.creation", JSON.stringify({
            exception,
            investmentId
        }));
    }
};
exports.FailedTransactionsInvestmentDeletedHandler = FailedTransactionsInvestmentDeletedHandler = tslib_1.__decorate([
    (0, cqrs_1.EventsHandler)(failedTransactionsInvestmentDeleted_event_1.FailedTransactionsInvestmentDeletedEvent),
    tslib_1.__param(0, (0, common_1.Inject)(transaction_consts_1.RMQ_INVESTMENT_SERVICE_NAME)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], FailedTransactionsInvestmentDeletedHandler);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FailedTransactionsInvestmentDeletedEvent = void 0;
class FailedTransactionsInvestmentDeletedEvent {
    constructor(exception, investmentId) {
        this.exception = exception;
        this.investmentId = investmentId;
    }
}
exports.FailedTransactionsInvestmentDeletedEvent = FailedTransactionsInvestmentDeletedEvent;


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RMQ_INVESTMENT_SERVICE_NAME = exports.RMQ_TRANSACTION_SERVICE_NAME = void 0;
exports.RMQ_TRANSACTION_SERVICE_NAME = "TRANSACTION";
exports.RMQ_INVESTMENT_SERVICE_NAME = "INVESTMENT";


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvestmentCreatedHandler = void 0;
const tslib_1 = __webpack_require__(4);
const cqrs_1 = __webpack_require__(7);
const investmentCreated_event_1 = __webpack_require__(35);
const common_1 = __webpack_require__(5);
const microservices_1 = __webpack_require__(2);
const transaction_consts_1 = __webpack_require__(39);
let InvestmentCreatedHandler = exports.InvestmentCreatedHandler = class InvestmentCreatedHandler {
    constructor(client) {
        this.client = client;
        this.client.connect();
    }
    async handle({ investmentId }) {
        console.log(`Investment ${investmentId.getId()} was created.`);
        this.client.send("investment.created", JSON.stringify(investmentId));
    }
};
exports.InvestmentCreatedHandler = InvestmentCreatedHandler = tslib_1.__decorate([
    (0, cqrs_1.EventsHandler)(investmentCreated_event_1.InvestmentCreatedEvent),
    tslib_1.__param(0, (0, common_1.Inject)(transaction_consts_1.RMQ_TRANSACTION_SERVICE_NAME)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], InvestmentCreatedHandler);


/***/ }),
/* 41 */
/***/ ((module) => {

module.exports = require("joi");

/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AllExceptionsFilter = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
let AllExceptionsFilter = exports.AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        console.log(exception);
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter = tslib_1.__decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(2);
const investment_module_1 = __webpack_require__(3);
const exception_filter_1 = __webpack_require__(42);
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(investment_module_1.InvestmentModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: 'investment_queue',
            queueOptions: {
                durable: false,
                json: true
            },
        },
    });
    app.useGlobalFilters(new exception_filter_1.AllExceptionsFilter());
    await app.listen();
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map