import { AccountModel, AddAccountRepository, Encrypter } from "./db-add-account-protocols";
import { DbAddAccount } from "./db-add-account";
import { AddAccountModel } from '../../../domain/usecases/add-account';

interface SutType {
    sut: DbAddAccount,
    encrypterStub: Encrypter,
    addAccountRepositoryStub: AddAccountRepository
}

const makeEncrypterStub = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt (password: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'))
        }
    }
    return new EncrypterStub()
}

const makeAddAccountRepositoryStub = (): AddAccountRepository => {
    class AddAccountRepositoryStub {
        async execute (account: AddAccountModel): Promise<AccountModel> {
            const fakeAccount = {
                id: 'valid_id',
                name: 'valid_name',
                email: 'valid_email@email.com',
                password: 'hashed_password'
            }
            return new Promise(resolve => resolve(fakeAccount))
        }
    }
    return new AddAccountRepositoryStub()
}

const makeSut = (): SutType => {
    const encrypterStub = makeEncrypterStub()
    const addAccountRepositoryStub = makeAddAccountRepositoryStub()
    const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
    return {
        sut,
        encrypterStub,
        addAccountRepositoryStub
    }
}

describe('DbAddAccount UseCase', () => {
    test('should call Encrypter with correct password', async () => {
        const { sut, encrypterStub } = makeSut()
        const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
        const accountData = {
            name: 'valid_name',
            email: 'valid_email@email.com',
            password: 'valid_password'
        }
        await sut.add(accountData)
        expect(encryptSpy).toHaveBeenCalledWith('valid_password')
    })

    test('should throw when Encrypter throws', async () => {
        const { sut, encrypterStub } = makeSut()
        jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const accountData = {
            name: 'valid_name',
            email: 'valid_email@email.com',
            password: 'valid_password'
        }
        const promise = sut.add(accountData)
        await expect(promise).rejects.toThrow()
    })

    test('should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'execute')
        const accountData = {
            name: 'valid_name',
            email: 'valid_email@email.com',
            password: 'valid_password'
        }
        await sut.add(accountData)
        expect(addSpy).toHaveBeenCalledWith({
            name: 'valid_name',
            email: 'valid_email@email.com',
            password: 'hashed_password'
        })
    })

    test('should throw when AddAccountRepository throws', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        jest.spyOn(addAccountRepositoryStub, 'execute').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const accountData = {
            name: 'valid_name',
            email: 'valid_email@email.com',
            password: 'valid_password'
        }
        const promise = sut.add(accountData)
        await expect(promise).rejects.toThrow()
    })

    test('should return an account when called with correct values', async () => {
        const { sut } = makeSut()
         const accountData = {
            name: 'valid_name',
            email: 'valid_email@email.com',
            password: 'valid_password'
        }
        const response = await sut.add(accountData)
        expect(response).toStrictEqual({
            id: 'valid_id',
            name: 'valid_name',
            email: 'valid_email@email.com',
            password: 'hashed_password'
        })
    })
})