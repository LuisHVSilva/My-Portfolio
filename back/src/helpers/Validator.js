/*
    Contains a series of methods for validating different aspects of an input field.

    * Code Explanation       
    * ========================================================================================================================
    * Static Properties
    * ----------------------------
    'specialCharacters', 'numberCharacters', 'emailCharacters': These are regular expressions used to validate special characters, numbers and the email pattern, respectively.

    * ----------------------------
    * Class Constructor
    * ----------------------------
    It is called when a new Validator instance is created.
        - field: the value of the field to be validated;
        - fieldName: the name of the field for error messages;
        - stop: Each of the methods returns the class instance (this), allowing the chained call of these methods. They also check whether this.stop is true (indicating that an error has already been detected) and, if so, do not perform validation;

    * ----------------------------
    * Validation Methods
    * ----------------------------
    - nullField(): Checks if the field is null or empty.
    - fieldLength(minLength, maxLength): Checks if the field length is within a specific range.
    - noSpecialCharacters(): Checks if the field does not have special characters.
    - noNumberCharacters(): Checks if the field does not have numbers.
    - presentSpecialCharacters(): Checks if the field has at least one special character.
    - presentNumberCharacters(): Checks if the field has at least one number.
    - emailPattern(): Checks if the field follows the pattern of an email address.
    - confirmField(originField): Checks whether the field is equal to another field passed as an argument.
    - getError(): Returns the error message that was generated during validation.

*/

module.exports = class Validator {
    static specialCharacters = /[^a-zA-Z 0-9]+/g;
    static numberCharacters = /[0-9]/;
    static emailCharacters = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    constructor(field, fieldName) {
        this.field = field;
        this.fieldName = fieldName;
        this.stop = false;
        this.error = null;
    };

    /**
     * Checks if the field is null or empty.
     * @returns {object} - Retorna a instância atual.
     */
    nullField() {
        if (this.stop) { return this };

        if (!this.field) {
            this.stop = true;
            this.error = `O campo ${this.fieldName} não pode estar vazio`;
        };

        return this;
    };

    /**
     * Checks if the field length is within a specific range.
     * @param {number} minLength - Min Length.
     * @param {number} maxLength - Max length.
     * @returns {object} - Retorna a instância atual.
     */
    fieldLength(minLength, maxLength) {
        if (this.stop) { return this };

        if (this.field.length < minLength || this.field.length > maxLength) {
            this.stop = true;
            this.error = `${this.fieldName} deve ter entre ${minLength} e ${maxLength} caracteres`;
        };

        return this;
    };

    /**
     * Checks if the field does not have special characters.
     * @returns {object} - Retorna a instância atual.
     */
    noSpecialCharacters() {
        if (this.stop) { return this };
        
        if (Validator.specialCharacters.test(this.field)) {
            this.error = `${this.fieldName} não pode possuir caracteres especiais`;
        };

        return this;
    };

    /**
     * Checks if the field does not have numbers.
     * @returns {object} - Retorna a instância atual.
     */
    noNumberCharacters() {
        if (this.stop) { return this };

        if (Validator.numberCharacters.test(this.field)) {
            this.error = `${this.fieldName} não pode possuir números`;
        };

        return this;
    };

    /**
     * Checks if the field has special characters.
     * @returns {object} - Retorna a instância atual.
     */
    presentSpecialCharacters() {
        if (this.stop) { return this };

        if (!Validator.specialCharacters.test(this.field)) {
            this.error = `${this.fieldName} deve possuir ao menos um caracter especial`;
        };

        return this;
    };

    /**
     * Checks if the field has numbers.
     * @returns {object} - Retorna a instância atual.
     */
    presentNumberCharacters() {
        if (this.stop) { return this };

        if (!Validator.numberCharacters.test(this.field)) {
            this.error = `${this.fieldName} deve possuir apenas um número`;
        };

        return this;
    };

    /**
     * Checks if the field follows the pattern of an email address.
     * @returns {object} - Retorna a instância atual.
     */
    emailPattern() {
        if (this.stop) { return this };

        if (!Validator.emailCharacters.test(this.field)) {
            this.error = 'O email não possui o padrão certo (email@dominio)';
        };

        return this;
    };

    /**
     * Checks whether the field is equal to another field passed as an argument.
     * @param {string} compare - Field that will be compared
     * @returns {object} - Retorna a instância atual.
     */
    confirmField(compare) {
        if (this.stop) { return this };

        if (this.field != compare) {
            this.error = `${this.fieldName} não corresponde ao passado anteriormente`;
        };
        
        return this;
    };

    /**
     * Returns the error message that was generated during validation.
     * @returns {string|null} - errors
     */
    getError() {
        return this.error;
    };
};
