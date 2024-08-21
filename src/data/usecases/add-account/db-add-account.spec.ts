import { Encrypter } from "../../protocols/encrypter";
import { DbAddAccount } from "./db-add-account";

interface SutType {
    sut: DbAddAccount,
    encrypterStub: Encrypter
}

const makeEncrypterStub = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt (password: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'))
        }
    }
    return new EncrypterStub()
}

const makeSut = (): SutType => {
    const encrypterStub = makeEncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    return {
        sut,
        encrypterStub
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
})