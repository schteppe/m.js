var m = require('..');

exports.sample = function(test){

    /*
        Solves the system:

        2 1 0 | 1
        1 2 1 | 1
        0 1 2 | 1
     */
    var v = [1,1,1],
        a = [null,1,1],
        b = [2,2,2],
        c = [1,1,null];
    test.deepEqual(m.tridiag(v,a,b,c),[ 0.5, 0, 0.5 ]);
    test.done();
};
