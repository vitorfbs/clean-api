import { AddAccountModel } from "../../domain/usecases/add-account";
import { AccountModel } from "../../domain/models/account";

export interface AddAccountRepository {
    execute (account: AddAccountModel): Promise<AccountModel>
}