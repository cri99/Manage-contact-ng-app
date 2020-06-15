export class Contact{

    private id: string;
    private name: string;
    private lastname: string;
    private  email: string;
    private address: string;
    private phone: string;
    private note: string;

    constructor(contact){
        this.id = contact.id;
        this.name = contact.name;
        this.lastname = contact.lastname;
        this.email = contact.email;
        this.address = contact.address;
        this.phone = contact.phone;
        this.note = contact.note;
        
    }

    get Id(){
        return this.id;
    }
    get Name(){
        return this.name;
    }

    get Lastname(){
        return this.lastname;
    }
    get Email(){
        return this.email;
    }
    get Phone(){
        return this.phone;
    }
    get Address(){
        return this.address;
    }
    get Note(){
        return this.note;
    }
}