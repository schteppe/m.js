module.exports = identity;

/**
 * Set a matrix to identity
 * @method identity
 * @param  {m}      out
 * @param  {int}    n   Size of the matrix
 * @return {m}
 */
function identity(out,n) {
    for(var i=0; i!==n; ++i){
        for(var j=0; j!==n; ++j){
            if(i===j)
                out[j*n + i] = 1;
            else
                out[j*n + i] = 0;
        }
    }
    return out;
};
