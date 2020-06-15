import { Component, OnInit} from '@angular/core';
import { ContactsService } from '../../service/contacts.service';
import { Contact } from '../../model/Contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {
  title = 'gestione-contatti';
  contacts : any;
  constructor(private contactService: ContactsService, private router: Router){}

  ngOnInit(){
    this.getContacts();
  }

  getContacts(){
    this.contactService.getContacts().subscribe(
      (data) => { this.contacts = data}
    );
  }


  deleteContact(id, index){
    this.contactService.deleteContact(id).subscribe(
      ()=> { this.contacts.splice(index, 1)});
  }

  changeToUpdateContactComponent(contact){
    
    this.contactService.setContactToUpdate(new Contact(contact));
    this.router.navigate(["/editContact"]);
  }
}
