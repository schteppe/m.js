m.js
====

JavaScript matrix math library with numeric algorithms that uses typed arrays.

### Basic ideas
* Use typed arrays (e.g. ```Float32Array```) for matrix data.
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
var b = m.create(3,1);      // Create column vector, right-hand-side
m.ones(b);                  // Set RHS to ones
var x = m.cholsolve(A,b);   // Solve system
```
