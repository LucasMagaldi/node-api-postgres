export class InValidCredentials extends Error {
    constructor() {
        super('Invalid credentials!')
    }
}