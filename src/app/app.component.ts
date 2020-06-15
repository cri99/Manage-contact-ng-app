import { Component, OnInit} from '@angular/core';
import { ContactsService } from './service/contacts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gestione-contatti';
  contacts : any;
  constructor(private contactService: ContactsService){}

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
}
