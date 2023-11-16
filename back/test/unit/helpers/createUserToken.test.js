const createUserToken = require('../../../src/helpers/createUserToken');
const { expect } = require('chai');

// Testes
describe('createUserToken', () => {
    it('deve criar um token para um usuário válido', () => {
        const user = {
            name: 'John Doe',
            id: '123'
        };
        const time = '1h';

        const token = createUserToken(user, time);
        expect(token).to.be.a('string');
    });

    it('deve lançar um erro para um usuário inválido (nulo)', () => {
        const user = null;
        const time = '1h';

        const testFunction = () => createUserToken(user, time);
        expect(testFunction).to.throw(Error, 'Usuário inválido para criar o token.');
    });

    it('deve lançar um erro para um usuário inválido (faltando propriedades)', () => {
        const user = {
            name: 'John Doe'
            // A propriedade 'id' está faltando
        };
        const time = '1h';

        const testFunction = () => createUserToken(user, time);
        expect(testFunction).to.throw(Error, 'Usuário inválido para criar o token.');
    });

    it('deve lançar um erro para um usuário inválido (não é um objeto)', () => {
        const user = 'não é um objeto';
        const time = '1h';

        const testFunction = () => createUserToken(user, time);
        expect(testFunction).to.throw(Error, 'Usuário inválido para criar o token.');
    });
});
