
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
    return Object.fromEntries(params);
}