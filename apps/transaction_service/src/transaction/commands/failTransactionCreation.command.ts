import { RpcException } from "@nestjs/microservices";

export class FailTransactionCreationCommand{
    constructor(public readonly exception:unknown){}
}