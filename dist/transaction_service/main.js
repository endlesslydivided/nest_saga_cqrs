/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.bootstrap = void 0;
const core_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(3);
const transaction_module_1 = __webpack_require__(4);
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(transaction_module_1.TransactionModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: 'transaction_queue',
            queueOptions: {
                durable: false,
                json: true
            },
        },
    });
    const globalPrefix = 'api';
    await app.listen();
}
exports.bootstrap = bootstrap;


/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionModule = exports.RMQ_SERVICE_NAME = void 0;
const tslib_1 = __webpack_require__(5);
const database_1 = __webpack_require__(6);
const rmq_1 = __webpack_require__(18);
const common_1 = __webpack_require__(8);
const cqrs_1 = __webpack_require__(21);
const mongoose_1 = __webpack_require__(10);
const commands_1 = __webpack_require__(22);
const transaction_entity_repository_1 = __webpack_require__(28);
const transaction_schema_factory_1 = __webpack_require__(30);
const transaction_schema_1 = __webpack_require__(29);
const Transaction_factory_1 = __webpack_require__(25);
const events_1 = __webpack_require__(35);
const transaction_controller_1 = __webpack_require__(37);
const transaction_service_1 = __webpack_require__(39);
const config_1 = __webpack_require__(9);
const joi_1 = tslib_1.__importDefault(__webpack_require__(40));
exports.RMQ_SERVICE_NAME = "TRANSACTION";
let TransactionModule = exports.TransactionModule = class TransactionModule {
};
exports.TransactionModule = TransactionModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: './apps/transaction_service/.env',
                validationSchema: joi_1.default.object({
                    RABBIT_MQ_URI: joi_1.default.string().required(),
                    RABBIT_MQ_TRANSACTION_QUEUE: joi_1.default.string().required(),
                }),
            }),
            cqrs_1.CqrsModule,
            mongoose_1.MongooseModule.forFeature([{ name: transaction_schema_1.Transaction.name, schema: transaction_schema_1.TransactionSchema }]),
            database_1.DatabaseModule,
            rmq_1.RmqModule.register({
                name: exports.RMQ_SERVICE_NAME,
            }),
        ],
        providers: [
            transaction_service_1.TransactionService,
            transaction_entity_repository_1.TransactionEntityRepository,
            transaction_schema_factory_1.TransactionSchemaFactory,
            Transaction_factory_1.TransactionFactory,
            ...commands_1.TransactionCommandHandlers,
            ...events_1.TransactionEventHandlers
        ],
        controllers: [transaction_controller_1.TransactionController]
    })
], TransactionModule);


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseEntityRepository = exports.EntitySchemaFactory = exports.IdentifiableEntitySchema = exports.EntityFactory = exports.EntityRepository = exports.DatabaseModule = void 0;
var database_module_1 = __webpack_require__(7);
Object.defineProperty(exports, "DatabaseModule", ({ enumerable: true, get: function () { return database_module_1.DatabaseModule; } }));
var entity_repository_1 = __webpack_require__(11);
Object.defineProperty(exports, "EntityRepository", ({ enumerable: true, get: function () { return entity_repository_1.EntityRepository; } }));
var entity_factory_1 = __webpack_require__(12);
Object.defineProperty(exports, "EntityFactory", ({ enumerable: true, get: function () { return entity_factory_1.EntityFactory; } }));
var identifiable_entity_schema_1 = __webpack_require__(13);
Object.defineProperty(exports, "IdentifiableEntitySchema", ({ enumerable: true, get: function () { return identifiable_entity_schema_1.IdentifiableEntitySchema; } }));
var entity_schema_factory_1 = __webpack_require__(15);
Object.defineProperty(exports, "EntitySchemaFactory", ({ enumerable: true, get: function () { return entity_schema_factory_1.EntitySchemaFactory; } }));
var base_entity_repository_1 = __webpack_require__(16);
Object.defineProperty(exports, "BaseEntityRepository", ({ enumerable: true, get: function () { return base_entity_repository_1.BaseEntityRepository; } }));


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(8);
const config_1 = __webpack_require__(9);
const mongoose_1 = __webpack_require__(10);
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
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EntityRepository = void 0;
const common_1 = __webpack_require__(8);
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
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IdentifiableEntitySchema = void 0;
const tslib_1 = __webpack_require__(5);
const mongoose_1 = __webpack_require__(10);
const mongoose_2 = __webpack_require__(14);
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
/* 14 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseEntityRepository = void 0;
const mongodb_1 = __webpack_require__(17);
const entity_repository_1 = __webpack_require__(11);
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
/* 17 */
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RmqService = exports.RmqModule = void 0;
var rmq_module_1 = __webpack_require__(19);
Object.defineProperty(exports, "RmqModule", ({ enumerable: true, get: function () { return rmq_module_1.RmqModule; } }));
var rmq_service_1 = __webpack_require__(20);
Object.defineProperty(exports, "RmqService", ({ enumerable: true, get: function () { return rmq_service_1.RmqService; } }));


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var RmqModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RmqModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(8);
const config_1 = __webpack_require__(9);
const microservices_1 = __webpack_require__(3);
const rmq_service_1 = __webpack_require__(20);
let RmqModule = exports.RmqModule = RmqModule_1 = class RmqModule {
    static register({ name }) {
        return {
            module: RmqModule_1,
            exports: [{
                    provide: name,
                    useFactory: (configService) => {
                        return microservices_1.ClientProxyFactory.create({
                            transport: microservices_1.Transport.RMQ,
                            options: {
                                urls: [configService.get('RABBIT_MQ_URI')],
                                queue: configService.get(`RABBIT_MQ_${name}_QUEUE`),
                            }
                        });
                    },
                    inject: [config_1.ConfigService],
                }],
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
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RmqService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(8);
const config_1 = __webpack_require__(9);
const microservices_1 = __webpack_require__(3);
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
/* 21 */
/***/ ((module) => {

module.exports = require("@nestjs/cqrs");

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionCommandHandlers = void 0;
const buyAsset_handler_1 = __webpack_require__(23);
const failTransactionCreation_handler_1 = __webpack_require__(31);
const successTransactionCreation_handler_1 = __webpack_require__(33);
exports.TransactionCommandHandlers = [buyAsset_handler_1.BuyAssetHander, successTransactionCreation_handler_1.SuccessTransactionCreationHandler, failTransactionCreation_handler_1.FailTransactionCreationHandler];


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BuyAssetHander = void 0;
const tslib_1 = __webpack_require__(5);
const cqrs_1 = __webpack_require__(21);
const buyAsset_command_1 = __webpack_require__(24);
const Transaction_factory_1 = __webpack_require__(25);
let BuyAssetHander = exports.BuyAssetHander = class BuyAssetHander {
    constructor(transactionFactory, eventPublisher) {
        this.transactionFactory = transactionFactory;
        this.eventPublisher = eventPublisher;
    }
    async execute({ buyAssetRequest }) {
        const { investmentId, transactionDate, amount, units } = buyAssetRequest;
        const transaction = this.eventPublisher.mergeObjectContext(await this.transactionFactory.create(investmentId, transactionDate, amount, units));
        transaction.commit();
    }
};
exports.BuyAssetHander = BuyAssetHander = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(buyAsset_command_1.BuyAssetCommand),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Transaction_factory_1.TransactionFactory !== "undefined" && Transaction_factory_1.TransactionFactory) === "function" ? _a : Object, typeof (_b = typeof cqrs_1.EventPublisher !== "undefined" && cqrs_1.EventPublisher) === "function" ? _b : Object])
], BuyAssetHander);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BuyAssetCommand = void 0;
class BuyAssetCommand {
    constructor(buyAssetRequest) {
        this.buyAssetRequest = buyAssetRequest;
    }
}
exports.BuyAssetCommand = BuyAssetCommand;


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionFactory = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(8);
const Transaction_model_1 = __webpack_require__(26);
const mongodb_1 = __webpack_require__(17);
const assetBought_event_1 = __webpack_require__(27);
const transaction_entity_repository_1 = __webpack_require__(28);
let TransactionFactory = exports.TransactionFactory = class TransactionFactory {
    constructor(repository) {
        this.repository = repository;
    }
    async create(investmentId, transactionDate, amount, units) {
        const transaction = new Transaction_model_1.TransactionDomainModel(new mongodb_1.ObjectId().toHexString(), investmentId, new Date(transactionDate), amount, units);
        await this.repository.create(transaction);
        transaction.apply(new assetBought_event_1.AssetBoughtEvent(transaction));
        return transaction;
    }
};
exports.TransactionFactory = TransactionFactory = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof transaction_entity_repository_1.TransactionEntityRepository !== "undefined" && transaction_entity_repository_1.TransactionEntityRepository) === "function" ? _a : Object])
], TransactionFactory);


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionDomainModel = void 0;
const cqrs_1 = __webpack_require__(21);
class TransactionDomainModel extends cqrs_1.AggregateRoot {
    constructor(_id, investmentId, transactionDate, amount, units) {
        super();
        this._id = _id;
        this.investmentId = investmentId;
        this.transactionDate = transactionDate;
        this.amount = amount;
        this.units = units;
    }
    getId() {
        return this._id;
    }
    getInvestmentId() {
        return this.investmentId;
    }
    getTransactionDate() {
        return this.transactionDate;
    }
    getAmount() {
        return this.amount;
    }
    getUnits() {
        return this.units;
    }
}
exports.TransactionDomainModel = TransactionDomainModel;


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssetBoughtEvent = void 0;
class AssetBoughtEvent {
    constructor(transaction) {
        this.transaction = transaction;
    }
}
exports.AssetBoughtEvent = AssetBoughtEvent;


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionEntityRepository = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(8);
const database_1 = __webpack_require__(6);
const transaction_schema_1 = __webpack_require__(29);
const mongoose_1 = __webpack_require__(10);
const transaction_schema_factory_1 = __webpack_require__(30);
const mongoose_2 = __webpack_require__(14);
let TransactionEntityRepository = exports.TransactionEntityRepository = class TransactionEntityRepository extends database_1.BaseEntityRepository {
    constructor(transactionModel, transactionSchemaFactory) {
        super(transactionModel, transactionSchemaFactory);
    }
};
exports.TransactionEntityRepository = TransactionEntityRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof transaction_schema_factory_1.TransactionSchemaFactory !== "undefined" && transaction_schema_factory_1.TransactionSchemaFactory) === "function" ? _b : Object])
], TransactionEntityRepository);


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionSchema = exports.Transaction = void 0;
const tslib_1 = __webpack_require__(5);
const mongoose_1 = __webpack_require__(10);
const database_1 = __webpack_require__(6);
let Transaction = exports.Transaction = class Transaction extends database_1.IdentifiableEntitySchema {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Transaction.prototype, "investmentId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Transaction.prototype, "transactionDate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", String)
], Transaction.prototype, "units", void 0);
exports.Transaction = Transaction = tslib_1.__decorate([
    (0, mongoose_1.Schema)({ versionKey: false, collection: 'transactions' })
], Transaction);
exports.TransactionSchema = mongoose_1.SchemaFactory.createForClass(Transaction);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionSchemaFactory = void 0;
const tslib_1 = __webpack_require__(5);
const Transaction_model_1 = __webpack_require__(26);
const common_1 = __webpack_require__(8);
const mongodb_1 = __webpack_require__(17);
let TransactionSchemaFactory = exports.TransactionSchemaFactory = class TransactionSchemaFactory {
    create(entity) {
        return {
            _id: new mongodb_1.ObjectId(entity.getId()),
            investmentId: entity.getInvestmentId(),
            transactionDate: entity.getTransactionDate(),
            amount: entity.getAmount(),
            units: entity.getUnits(),
        };
    }
    createFromSchema(entitySchema) {
        return new Transaction_model_1.TransactionDomainModel(entitySchema._id.toHexString(), entitySchema.investmentId, entitySchema.transactionDate, entitySchema.amount, entitySchema.units);
    }
};
exports.TransactionSchemaFactory = TransactionSchemaFactory = tslib_1.__decorate([
    (0, common_1.Injectable)()
], TransactionSchemaFactory);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FailTransactionCreationHandler = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(8);
const cqrs_1 = __webpack_require__(21);
const microservices_1 = __webpack_require__(3);
const transaction_module_1 = __webpack_require__(4);
const failTransactionCreation_command_1 = __webpack_require__(32);
let FailTransactionCreationHandler = exports.FailTransactionCreationHandler = class FailTransactionCreationHandler {
    constructor(client) {
        this.client = client;
        this.client.connect();
    }
    async handle({ exception }) {
        this.client.send("fail.transaction.creation", JSON.stringify(exception));
    }
};
exports.FailTransactionCreationHandler = FailTransactionCreationHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(failTransactionCreation_command_1.FailTransactionCreationCommand),
    tslib_1.__param(0, (0, common_1.Inject)(transaction_module_1.RMQ_SERVICE_NAME)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], FailTransactionCreationHandler);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FailTransactionCreationCommand = void 0;
class FailTransactionCreationCommand {
    constructor(exception) {
        this.exception = exception;
    }
}
exports.FailTransactionCreationCommand = FailTransactionCreationCommand;


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuccessTransactionCreationHandler = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(8);
const cqrs_1 = __webpack_require__(21);
const microservices_1 = __webpack_require__(3);
const successTransactionCreation_command_1 = __webpack_require__(34);
const transaction_module_1 = __webpack_require__(4);
let SuccessTransactionCreationHandler = exports.SuccessTransactionCreationHandler = class SuccessTransactionCreationHandler {
    constructor(client) {
        this.client = client;
        this.client.connect();
    }
    async handle({ transaction }) {
        this.client.send("success.transaction.creation", JSON.stringify(transaction));
    }
};
exports.SuccessTransactionCreationHandler = SuccessTransactionCreationHandler = tslib_1.__decorate([
    (0, cqrs_1.CommandHandler)(successTransactionCreation_command_1.SuccessTransactionCreationCommand),
    tslib_1.__param(0, (0, common_1.Inject)(transaction_module_1.RMQ_SERVICE_NAME)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], SuccessTransactionCreationHandler);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SuccessTransactionCreationCommand = void 0;
class SuccessTransactionCreationCommand {
    constructor(transaction) {
        this.transaction = transaction;
    }
}
exports.SuccessTransactionCreationCommand = SuccessTransactionCreationCommand;


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionEventHandlers = void 0;
const assetBought_handler_1 = __webpack_require__(36);
exports.TransactionEventHandlers = [assetBought_handler_1.AssetBoughtHandler];


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssetBoughtHandler = void 0;
const tslib_1 = __webpack_require__(5);
const cqrs_1 = __webpack_require__(21);
const assetBought_event_1 = __webpack_require__(27);
let AssetBoughtHandler = exports.AssetBoughtHandler = class AssetBoughtHandler {
    async handle({ transaction }) {
        console.log(`Transaction ${transaction.getId()} was created.`);
    }
};
exports.AssetBoughtHandler = AssetBoughtHandler = tslib_1.__decorate([
    (0, cqrs_1.EventsHandler)(assetBought_event_1.AssetBoughtEvent)
], AssetBoughtHandler);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(8);
const cqrs_1 = __webpack_require__(21);
const microservices_1 = __webpack_require__(3);
const buyAsset_command_1 = __webpack_require__(24);
const buyAssetRequest_dto_1 = __webpack_require__(38);
const failTransactionCreation_command_1 = __webpack_require__(32);
let TransactionController = exports.TransactionController = class TransactionController {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async createTransaction(data, context) {
        try {
            await this.commandBus.execute(new buyAsset_command_1.BuyAssetCommand(data));
        }
        catch (e) {
            await this.commandBus.execute(new failTransactionCreation_command_1.FailTransactionCreationCommand(e));
        }
    }
};
tslib_1.__decorate([
    (0, microservices_1.MessagePattern)("investment.created"),
    tslib_1.__param(0, (0, microservices_1.Payload)()),
    tslib_1.__param(1, (0, microservices_1.Ctx)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof buyAssetRequest_dto_1.BuyAsssetRequest !== "undefined" && buyAssetRequest_dto_1.BuyAsssetRequest) === "function" ? _b : Object, typeof (_c = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "createTransaction", null);
exports.TransactionController = TransactionController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _a : Object])
], TransactionController);
/*
Message example:
{
    "pattern": "investment.created",
    "data":
     {
      "investment_id":"123",
      "transaction_date":"2023-05-16",
      "amount":"123",
      "units":"oil"
     }
}
*/ 


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BuyAsssetRequest = void 0;
class BuyAsssetRequest {
}
exports.BuyAsssetRequest = BuyAsssetRequest;


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(8);
const cqrs_1 = __webpack_require__(21);
const buyAsset_command_1 = __webpack_require__(24);
let TransactionService = exports.TransactionService = class TransactionService {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async buyAsset(buyAssetRequest) {
        return this.commandBus.execute(new buyAsset_command_1.BuyAssetCommand(buyAssetRequest));
    }
};
exports.TransactionService = TransactionService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof cqrs_1.CommandBus !== "undefined" && cqrs_1.CommandBus) === "function" ? _a : Object])
], TransactionService);


/***/ }),
/* 40 */
/***/ ((module) => {

module.exports = require("joi");

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
const bootstrap_1 = __webpack_require__(1);
(0, bootstrap_1.bootstrap)();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map