import Attribute from "./Attribute";

class User {
    constructor(user){
		this.user = user;
    }

    /**
     * attributes in : { sex : "male", etc },
     * attributes out: [ {attributeType: "sex", value: "male", weight: 0}, {etc}]
     */
    mapAttributesToRequest(attributes={}){
        let attr = Object.entries(attributes);
        let newAttributes = [];
        attr.forEach( a => {
            if(a[0] && a[1]){
                newAttributes.push( new Attribute( a[0], a[1], 0 ) )
            }
        })
        return newAttributes.length ? newAttributes : null;
    }

    /**
     * Creates the json that backend expects
     * @returns user ready to be created
     */
    mapFormToRequest(){
        let formatedUser = {
            ...this.user,
            attributes: this.mapAttributesToRequest(this.user.attributes)
        }
        delete formatedUser.userConfirmPassword;
        delete formatedUser.userConfirmEmail;
        return formatedUser;
    }
}

export default User;