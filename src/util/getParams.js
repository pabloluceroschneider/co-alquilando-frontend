
export const getParams = () => {
    let params = window.location.search
    .substr(1)
    .split("&")
    .map( p => p.split("="))
    .filter( p => p[1])
    return [ params ];
}

export const getParamsEntries = () => {
    let params = window.location.search
    .substr(1)
    .split("&")
    .map( p => p.split("="))
    .filter( p => p[1])
    .map( f => {
        if (f[1]==="on"){
            f[1] = true
        }
        return f
    })
    return Object.fromEntries(params);
}