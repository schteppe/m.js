module.exports = tridiag;

/**
 * Tridiagonal matrix system solver. Solves A*x = v, where A is a tridiagonal matrix. See https://en.wikipedia.org/wiki/Tridiagonal_matrix_algorithm#C
 * @method tridiag
 * @param {m}  v  The right hand side. Note that this vector will be overwritten by the solution x.
 * @param {Number} N  The size of the matrix A.
 * @param {m}  a  Subdiagonal (means it is the diagonal below the main diagonal)
 * @param {m}  b  Main diagonal
 * @param {m}  c  Superdiagonal (means it is the diagonal above the main diagonal)
 */
function tridiag(v, a, b, c){
    var x = v,
        N = v.length;

    c[0] = c[0] / b[0];
    x[0] = x[0] / b[0];

    // loop from 1 to N - 1 inclusive
    for (var i = 1; i < N; i++) {
        var m = 1.0 / (b[i] - a[i] * c[i - 1]);
        c[i] = c[i] * m;
        x[i] = (x[i] - a[i] * x[i - 1]) * m;
    }

    // loop from N - 2 to 0 inclusive, safely testing loop end condition
    for (var i = N - 1; i-- > 0; )
        x[i] = x[i] - c[i] * x[i + 1];

    return x;
}
