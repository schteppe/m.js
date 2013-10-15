/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Stefan Hedman
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.m=e():"undefined"!=typeof global?self.m=e():"undefined"!=typeof self&&(self.m=e())}(function(){var define,module,exports;
return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Matrix class
 * @class M
 * @static
 */
module.exports = {
    identity :  require('./src/identity'),
    cholsolve : require('./src/cholsolve'),
    tridiag :   require('./src/tridiag'),
    create :    require('./src/create'),
    ones :      require('./src/ones'),
};

},{"./src/cholsolve":2,"./src/create":3,"./src/identity":4,"./src/ones":5,"./src/tridiag":6}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
module.exports = ones;

/**
 * Set all the elements in m to one.
 * @method ones
 * @param  {m} m
 * @return {m}   The same matrix object
 */
function ones(m){
    for(var i=0, N=m.length; i!==N; i++)
        m[i] = 1;
    return m;
}

},{}],6:[function(require,module,exports){
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

},{}]},{},[1])
(1)
});
;