import { hash } from 'crypto';
import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Encrypter } from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
    private readonly encrypter: Encrypter
    private readonly addAccountRepository: AddAccountRepository

    constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
        this.encrypter = encrypter
        this.addAccountRepository = addAccountRepository
    }
    async add (accountData: AddAccountModel): Promise<AccountModel> {
        const hashed_password = await this.encrypter.encrypt(accountData.password)
        const account = await this.addAccountRepository.execute({
            name: accountData.name,
            email: accountData.email,
            password: hashed_password
        })

        return new Promise(resolve => resolve(account))
    }
}