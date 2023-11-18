/**
 * Create a code for authentication and return it. 
 * @returns {string} Code string.
 */
const userVerifyToken = () => {
    // Possible string of characters to generate the user verification code.
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';

    // Generates a random string (result) with 5 characters. 
    // It uses a for loop that iterates 5 times, and with each iteration, a random character is chosen from a list of characters (characters) and added to the result string.
    for (let i = 0; i < 5; i++) {
        const index = Math.floor(Math.random() * characters.length);
        code += characters.charAt(index);
    }

    return code;
};

module.exports = userVerifyToken;