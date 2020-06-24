/*
* Questo componente si occupa della visualizzazione e della ricerca dei contatti.
*/

import { Component, OnInit} from '@angular/core';
import { ContactsService } from '../../service/contacts.service';
import { Contact } from '../../model/Contact';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  animations: [
    //Animazione per quando si cancella un contatto dalla lista.
    trigger('removeContactListAnimation', [
      state('show', style({
        opacity:1,
        'line-height':'100%'
      })),
      state('hide', style({
        opacity:0,
        'line-height':'0%'
      })),
      
      transition('show => hide', [
        animate('0.2s')
      ])

    ])
  ]
  
})

export class ContactListComponent implements OnInit {
  
  
  contacts : any; //Contiene i contatti memorizzati sul server

  searchInput : string; // Contiene il testo di ricerca immesso dall'utente.

  contactsToShow: any; /* Contiene i contatti risultati dalla ricerca, 
                          di default il contenuto è uguale a contacts. */ 

  showLoader : boolean; //Se true viene mostrato il loader della lista contatti.

  
  contactIdToDelete = -1; /*L'animazione @removeContactListAnimation viene mostrata se l'id
                            del contatto nella lista è uguale a quello di questa variabile.*/

  //removeContactInterval = null;

  /*
  * Si definisce tramite grazie alla Dependency Injection un'istanza del service
  * utile a comunicare con il server e un router per cambiare componente.
  */
  constructor(private contactService: ContactsService, private router: Router){}


  ngOnInit() : void{
    
    //Si inizializza per la prima volta la variabile "contacts", prelevando i contatti dal server.
    this.getContacts();
  }

  getContacts() : void{
    //Appena prima dell'avvio della richiesta al server, si attiva la barra di caricamento.
    this.showLoader = true;
    
    /*
    * Tramite il contactService si riceve un observable dal quale è possibile inizializzare 
    * le variabili che utilizzeremo per mostrare i dati dei contatti nella view.
    */
    this.contactService.getContacts().subscribe(
      (data) => { 
      //Come descritto anche in precedenza, contactsToShow di default ha lo stesso valore di contacts.
        this.contacts = this.contactsToShow = data; 

        //Una volta ricevuti i dati dal server, si elimina la barra di caricamento.
        this.showLoader = false;
      }
    );
    
  }

  

  deleteContact(id, index) : void{
  this.contactIdToDelete = id;
  let removeContactInterval = null;
  
  /*
    * Tramite l'id e la posizione di visualizzazione attuale in contactsToShow si elimina 
    * il contatto. 
    * Il contatto viene eliminato fisicamente dal database attraverso una richiesta che effettuerà
    * il contactService al server, mentre per eliminarlo visualmente è necessario rimuoverlo dagli 
    * array contacts e contactsToShow.
    */
    this.contactService.deleteContact(id).subscribe(
      ()=> {

        //clearInterval(removeContactInterval);
        removeContactInterval = setTimeout(()=>{
   
        /* contactsToShow è sempre uguale ai contatti che sta vedendo effettivamente l'utente, ovvero
         * se l'utente effettua la ricerca ed ottiene tre risultati, contactsToShow sarà un array 
         * composto da quei tre risultati, pertanto in questo caso basta effettuare uno splice per 
         * eliminare visivamente il contatto. 
         */
        this.contactsToShow.splice(index,1);

        /* Mentre invece contacts è composto da tutti gli elementi effettivamente presenti nel database.
         * Dato che non si può sapere a priori che la lista dei contatti attualmente visualizzata sia 
         * uguale a quella di contacts, bisogna eliminare l'elemento senza usare la posizione di visualizzazione attuale.
         */
        this.contacts = this.contacts.filter(
            (contact)=> {
              return contact.id != id; }
          );

          //Si imposta una pausa di 100ms, pari alla durata dell'animazione di rimozione del contatto.
      }, 200);

    })  
  }


  //Viene richiamata quando viene premuto il tasto "modifica" su di un contatto.
  changeToUpdateContactComponent(contact) : void{
    
    //Prima di passare al componentForm, viene passato al service il contatto scelto da modificare.
    this.contactService.setContactToUpdate(new Contact(contact));
    
    this.router.navigate(["/editContact"]);
  }


  //Funzione richiamata quando l'utente digita qualcosa nella barra di ricerca.
  doResearch() : void{
    //Se la stringa di ricerca è vuota allora i contatti da mostrare sono uguali ai contatti effettivi.
    if(this.searchInput == ""){
      this.contactsToShow = this.contacts;

    }else{ 
      
       /* La funzione restituisce true se il valore della proprietà corrente ha un valore e 
        * se la stringa ricercata è contenuta nella proprietà controllata.
      */
      const matchInputResearch = (property) : boolean => {
       return property && property.toLowerCase().search(this.searchInput.toLowerCase()) != -1;
      };
      

      this.contactsToShow = this.contacts.filter(
        (contact) =>{
          /* Per ogni contatto, si controlla se la stringa cercata è contenuta in almeno una delle proprietà del contatto.
           * Se cosi fosse, l'oggetto viene aggiunto all'array dei risultati da visualizzare.  
          */
          return matchInputResearch(contact.name) || matchInputResearch(contact.lastname) ||
          matchInputResearch(contact.phone) || matchInputResearch(contact.address) ||
          matchInputResearch(contact.email) || matchInputResearch(contact.note);
      } );
    } 
  }


}
