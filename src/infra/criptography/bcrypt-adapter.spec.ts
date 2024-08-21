import bcrypt from 'bcrypt'
import { BCryptAdapter } from './bcrypt-adapter';

interface SutTypes {
    sut: BCryptAdapter
}

const salt = 12

const makeSut = (): SutTypes => {
    const sut = new BCryptAdapter(salt)
    return {
        sut
    }
}

jest.mock('bcrypt', () => ({
    async hash (): Promise<string> {
        return new Promise(resolve => resolve('hashed_value'))
    }
}))

describe('BcryptAdapter', () => {
    test('should call bcrypt with correct values', async () => {
        const { sut } = makeSut()
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('any_value')
        expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    });

    test('should throw when bcrypt throw', async () => {
        const { sut } = makeSut()
        jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => Promise.reject(new Error()));
        const response = sut.encrypt('any_value')
        await expect(response).rejects.toThrow()
    });
    
    test('should return a hash on success', async () => {
        const { sut } = makeSut()
        const response = await sut.encrypt('any_value')
        expect(response).toBe('hashed_value')
    });
});