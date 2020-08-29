
class Property{
    constructor(property){
		this.property = property;
    }

    mapArrayToJson(){
        let attributes = {};
        this.property.attributes.forEach((t) => {
            attributes = {...attributes, [t.attributeType]: t.value}
        });
        return {...attributes}
    }

    mapURLphotos(){
        let photos = [];
        if(this.property.photos){
            let url = "http://localhost:8080"
            let endpoint = `/property/${this.property.id}/photos/`
            this.property.photos.forEach( id => {
                let photoUrl = url + endpoint + id
                photos = [...photos, photoUrl]
            })
        }
        return photos
    }

    mapResponseToJson(){
        let formatedProperty = {
            ...this.property,
            ...this.mapArrayToJson(),
            photos: this.mapURLphotos()
        }
        return formatedProperty
    }
}

export default Property;