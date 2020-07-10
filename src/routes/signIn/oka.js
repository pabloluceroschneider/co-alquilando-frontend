
let attr = {
    name: "Propiedad 1",
    comodities: [
        {
            name: "tipologia",
            value: "monoambiente",
            weight: 0
        },
        {
            name: "ambientes",
            value: "2",
            weight: 0
        },
    ]
}

let array = []
attr.comodities.forEach( t => {
    array.push( { [t.name] : t.value} )
})
delete attr.comodities
array.forEach( t => {
    attr = {...attr, ...t }
})

console.log(attr)

