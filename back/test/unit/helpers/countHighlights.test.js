const chai = require('chai');
const countHighlights = require('../../../src/helpers/countHighlights');

const { expect } = chai;

describe('countHighlights', () => {
    it('should return null for an non object entry', () => {
        const result = countHighlights('não é um objeto');
        expect(result).to.be.null;
    });

    it('should return null for an null entry', () => {
        const result = countHighlights(null);
        expect(result).to.be.null;
    });

    it('should return 0 for an empty object', () => {
        const result = countHighlights({});
        expect(result).to.equal(0);
    });

    it('should return the correct count for an object with highlights', () => {
        const objects = {
            obj1: { highlight: true },
            obj2: { highlight: false },
            obj3: { highlight: true },
        };

        const result = countHighlights(objects);
        expect(result).to.equal(2);
    });

    it('should return 0 for an object with no highlights', () => {
        const objects = {
            obj1: { highlight: false },
            obj2: { highlight: false },
        };

        const result = countHighlights(objects);
        expect(result).to.equal(0);
    });
});
