module.exports = identity;

/**
 * Set a matrix A to identity.
 * @method identity
 * @param  {m}      out
 * @param  {Number} n   Size of the matrix
 * @return {m}          The matrix A
 */
function identity(A,n) {
    for(var i=0; i!==n; ++i){
        for(var j=0; j!==n; ++j){
            if(i===j)
                A[j*n + i] = 1;
            else
                A[j*n + i] = 0;
        }
    }
    return A;
};
