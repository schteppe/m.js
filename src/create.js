module.exports = create;

/**
 * Creates a new zero matrix
 * @method create
 * @param {Number}  rows
 * @param {Number}  cols
 * @param {Object}  [options]
 * @param {Object}  [options.type] The array constructor to use. For example: Float32Array, Int16Array, Array...
 * @param {Array}   [options.data] Data to set. Should be an array of numbers.
 * @return {m}     A new matrix
 */
function create(rows,cols,options){
    options = options || {};
    var arrayType = options.type || Float32Array || Array,
        out = new arrayType(rows*cols);

    if(options.data){
        // Set to data
        for(var i=0; i!==options.data.length; ++i){
            out[i] = options.data[i];
        }
    } else {
        // Set zero
        for(var i=0; i!==cols; ++i){
            for(var j=0; j!==rows; ++j){
                out[j*cols + i] = 0;
            }
        }
    }

    return out;
}
