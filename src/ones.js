module.exports = ones;

function ones(m){
    for(var i=0, N=m.length; i!==N; i++)
        m[i] = 1;
    return m;
}
