m.js
====

JavaScript matrix math library with numeric algorithms that uses typed arrays.

### Basic ideas
* Use typed arrays (e.g. ```Float32Array```) for matrix data. This enables fast data passing to/from WebWorkers/WebGL.
* Encourage efficient usage patterns through API conventions.

### Matrix layout
For a matrix with 3 rows and 4 columns, the data is arranged like this in the array:
```
[ a11, a12, a13, a14,
  a21, a22, a23, a24
  a31, a32, a33, a34 ]
```

### Example
```js
var A = m.create(3,3);      // Create 3x3 matrix
var b = m.create(3,1);      // Create 1D column vector of length 3
m.identity(A);              // Set matrix A to identity
m.ones(b);                  // Set all elements in b to 1
var x = m.cholsolve(A,b);   // Solve system A*x=b using cholesky factorization
```
