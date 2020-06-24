import { Component, OnInit} from '@angular/core';
import { ContactsService } from './service/contacts.service';
import { RouterOutlet } from '@angular/router';
import { slider } from './route-animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slider
  ]
 
})
export class AppComponent implements OnInit {
 
  constructor(private contactService: ContactsService){}

  ngOnInit(){
   
  }

  prepareRoute(outlet : RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }


}
