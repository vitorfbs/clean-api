import { EmailValidator } from "../presentation/validators/email-validator";

export class EmailValidatorAdapter implements EmailValidator{
    isValid(email: string): boolean {
        return false
    }
}