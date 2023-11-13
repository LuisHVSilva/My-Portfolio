/**
 * Function to count how much highlights there are in a object.
 * @param {Object} objects - Object that will counted.
 * @returns {number||error} - The number of hihglights in the object.
 */

const countHighlights = (objects) => {
    try {        
        let count = 0;

        for (const key in objects) {
            if (objects[key].highlight) {
                count++;
            }
        }

        return count;
    } catch (err) {
        throw new Error(`Erro ao contar destaques: ${err.message}`);
    }
};

module.exports = countHighlights;
