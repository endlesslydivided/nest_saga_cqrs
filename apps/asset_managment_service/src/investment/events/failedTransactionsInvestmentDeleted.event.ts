
export class FailedTransactionsInvestmentDeletedEvent{
    constructor(public readonly exception:unknown,
        public readonly investmentId:string){}
}