
export default () => {
    let params = window.location.search
    .substr(1)
    .split("&")
    .map( p => p.split("="))
    .filter( p => p[1])
    return [ params ];
    // return [ Object.fromEntries(params) ];
}