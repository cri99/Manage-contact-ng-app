export class Contact{

    id: string;
    name: string;
    lastname: string;
    email: string;
    address: string;
    phone: string;
    note: string;

    constructor(contact : any){
        this.id = contact.id;
        this.name = contact.name;
        this.lastname = contact.lastname;
        this.email = contact.email;
        this.address = contact.address;
        this.phone = contact.phone;
        this.note = contact.note;    
    }
   
}