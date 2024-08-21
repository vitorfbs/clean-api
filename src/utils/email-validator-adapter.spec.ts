import { EmailValidatorAdapter } from "./email-validator-adapter"

describe('EmailValidatorAdapter', () => {
  test('should return false when validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })
  test('should ', () => {
    
  })
  test('should ', () => {
    
  })
})