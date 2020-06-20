import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, SelectMultipleControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactsService } from '../../service/contacts.service';
import { Contact } from '../../model/Contact';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-contact-form',
  templateUrl: 'contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  animations: [
    //Animazione per il modal di successo o fallimento di inserimento o modifica contatto.
    trigger('modalShowHide', [
      
      state('show', style({
        opacity:1,
        bottom:0
      })),
      state('hide', style({
        opacity:0,
        bottom: '-20%'
      })),
      transition('show <=> hide', [
        animate('0.2s')
      ]),
    ])
  ]
})
export class ContactFormComponent implements OnInit {

  isNewContact : boolean; //Indica se la form è per un nuovo contatto (true) o se per la modifica di uno già esistente (false).
  contactForm : FormGroup;
  modalAnimation : string;
  showSuccessModal : boolean;
  showFailureModal : boolean;
  private contactToUpdate: Contact;

  constructor(private fb: FormBuilder, private contactsService: ContactsService,
    private router: Router) { }

  ngOnInit(): void {
    this.modalAnimation = "hide";
    this.showFailureModal = false;
    this.showSuccessModal = false;
    
    this.contactToUpdate = this.contactsService.getContactToUpdate();
    this.isNewContact = (this.contactToUpdate == null);

    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+[a-zA-Z ]*[a-zA-Z]$")]],
      lastname: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+[a-zA-Z ]*[a-zA-Z]$")]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      phone: ['', [Validators.required,  Validators.pattern("^[0-9\-\+]+[0-9\- ]*[0-9]$")]],
      address: ['', [Validators.required]],
      note: ['', []]
    });

    if (!this.isNewContact) {

      this.name.setValue(this.contactToUpdate.Name);
      this.lastname.setValue(this.contactToUpdate.Lastname);
      this.email.setValue(this.contactToUpdate.Email);
      this.phone.setValue(this.contactToUpdate.Phone);
      this.address.setValue(this.contactToUpdate.Address);
      this.note.setValue(this.contactToUpdate.Note);
    }
  }

  //Resetta tutti i campi del form.
  resetForm() {
    this.contactForm.reset();
  }


  activeSuccessModal(){
    this.showSuccessModal = true; 
    this.modalAnimation = "show";
  }
  activeFailureModal(){
    this.showFailureModal = true;
    this.modalAnimation = "show";
  }


  onSubmit() {
    if (this.isNewContact) {

      this.contactsService.saveContact(this.contactForm.value)
        .subscribe(
          response => this.activeSuccessModal(),
          error => this.activeFailureModal()
        );

      this.resetForm();

    } else {
      this.contactsService.updateContact(this.contactForm.value, this.contactToUpdate.Id).subscribe(
        response => { this.activeSuccessModal()},
        error =>{ this.activeFailureModal()}
      );
    }
  }

  modalInterval = null;

  closeModal(){
    this.modalAnimation = "hide";

    clearInterval(this.modalInterval);

    this.modalInterval = setTimeout(()=>{
      this.showSuccessModal=false;
      this.showFailureModal=false
    }, 200);
    
  }
  

  changeRouteToContactList() {
    this.resetDataToUpdate();
    this.router.navigate(['/home']);
  }

  resetDataToUpdate() {
    this.contactsService.setContactToUpdate(null);
  }

  //Metodi get per i campi del form.

  get name() {
    return this.contactForm.get('name');
  }
  get lastname() {
    return this.contactForm.get('lastname');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get phone() {
    return this.contactForm.get('phone');
  }
  get address() {
    return this.contactForm.get('address');
  }
  get note() {
    return this.contactForm.get('note');
  }

}
