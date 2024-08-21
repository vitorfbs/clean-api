import { EmailValidatorAdapter } from "./email-validator-adapter"
import validator from 'validator'

jest.mock('validator', () => ({
    isEmail (): boolean {
        return true
    }
}))

interface SutTypes {
    sut: EmailValidatorAdapter
}

const makeSut = (): SutTypes => {
    const sut = new EmailValidatorAdapter()
    return {
        sut
    }
}

describe('EmailValidatorAdapter', () => {
  test('should return false when validator returns false', () => {
    const { sut } = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  test('should return true when validator returns true', () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })
  test('should ', () => {
    
  })
})