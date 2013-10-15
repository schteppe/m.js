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
