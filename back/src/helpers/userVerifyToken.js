/**
 * Create a code for authentication and return it. 
 * @returns {string} Code string.
 */
const userVerifyToken = () => {
    const caracteres = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let resultado = '';

    for (let i = 0; i < 5; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        resultado += caracteres.charAt(indiceAleatorio);
    }

    return resultado;
};

module.exports = userVerifyToken;