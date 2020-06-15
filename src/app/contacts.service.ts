import { Injectable } from '@angular/core'; 
import { Contact } from './model/Contact';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private baseUrlServer: string;
  private contactsUrl: string;

   contactToUpdate : Contact;

  constructor(private http: HttpClient) {
    this.baseUrlServer = 'http://localhost:9000/';
    this.contactsUrl = this.baseUrlServer+'contacts';
   }

   public getContactToUpdate(){
      return this.contactToUpdate;
   }

   public setContactToUpdate(c){
      this.contactToUpdate = c;
   }

   public getContacts(){
      return this.http.get(this.contactsUrl);
   }

   public deleteContact(id){
      return this.http.delete(this.baseUrlServer+"deleteContact?id="+id);
   }

   public saveContact(contact){
      return this.http.post(this.baseUrlServer+"saveContact",contact);
   }

   public updateContact(contact, id){
      return this.http.post(this.baseUrlServer+"updateContact/"+id,contact);
   }
}
