import { Injectable } from '@angular/core'; 
import { Contact } from '../model/Contact';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

   //Url base del server
   private baseUrlServer: string;
  
   contactToUpdate : Contact;

   constructor(private http: HttpClient) {
    this.baseUrlServer = 'http://localhost:9000';
   }

   public getContactToUpdate(){
      return this.contactToUpdate;
   }

   public setContactToUpdate(c : Contact){
      this.contactToUpdate = c;
   }



   public getContacts(){
      return this.http.get(this.baseUrlServer+'/contacts');
   }

   public deleteContact(id : Number){
      return this.http.delete(this.baseUrlServer+"/deleteContact?id="+id);
   }

   public saveContact(contact : Contact){
      return this.http.post(this.baseUrlServer+"/saveContact",contact);
   }

   public updateContact(contact, id){
      return this.http.post(this.baseUrlServer+"/updateContact/"+id,contact);
   }
}
