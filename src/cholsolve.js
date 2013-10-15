module.exports = cholsolve;

/**
 * Solves a linear system Ax=b where A is positive definite, using cholesky
 * factorization.
 * Note that the matrix A will be overwritten by the triangular matrix factor,
 * and that the right hand side b will be overwritten by the solution.
 * @method cholsolve
 * @param  {m} A
 * @param  {m} b
 * @return {m} The solution x.
 */
function cholsolve(A, b){
    var a = A,
        n = b.length;

    // cholesky factorization
    // only works for symmetric positive definite matrices.
    // only works in the lower triangle (check this!)
    // overwrites the matrix
    // see golub and van loan pp 145 algorithm 4.2.2

    for(var k=0; k!==n; k++){
        a[k*n+k] = Math.sqrt(a[k*n+k]);
        for(var i=k+1; i<n; i++){
          a[i*n+k] /= a[k*n+k];
        }
        // do outer product update of lower block with a(:, k) * a(:, k)'
        // but only touch the lower triangle.
        for(var j=k+1; j<n; j++){
          for(var i=j; i<n; i++){
            a[i*n+j] -=  a[i*n+k]* a[j*n+k];
          }
        }
    }

    // forward elimination: solve a lower triangular system.
    // data is accessed by row.  Data vector is overwritten
    // with solution

    b[0] /= a[0*n+0];
    for(var i=1; i<n; i++){
        for(var j = 0; j<i; j++){
            b[i] -= a[i*n+j]*b[j];
        }
        b[i] /= a[i*n+i];
    }

    // backward  substitution
    b[n-1] /= a[(n-1)*n + n-1];

    for(var i=n-2; i>=0; --i){
      // here we have to walk up the column since we work on the lower
      // triangle transposed, and since we know the solution from n up to i
        for(var j=i+1; j<n; j++){
            // if we did not work on transposed data, we would sum
            // for j = (i+1):n
            //     b[i]  -=  a[i*n+j] * b[j];
            // }
            b[i] -= a[j*n+i] * b[j];
        }
        b[i] /= a[i*n+i];
    }

    return b;
}
