import { Injectable } from "@nestjs/common";
import { Saga, ICommand, ofType } from "@nestjs/cqrs";
import { Observable, map } from "rxjs";
import { AssetBoughtEvent } from "../events/assetBought.event";
import { SuccessTransactionCreationCommand } from "../commands/successTransactionCreation.command";

@Injectable()
export class TransactionSagas {

  @Saga()
  transactionCreationSucceed = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(AssetBoughtEvent),
      map((event) => new SuccessTransactionCreationCommand(event.transaction)),
    );
  }
}