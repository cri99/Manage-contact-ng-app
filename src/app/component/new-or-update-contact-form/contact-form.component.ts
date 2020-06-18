import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactsService } from '../../service/contacts.service';
import { Contact } from '../../model/Contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: 'contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  isNewContact: boolean; //Indica se la form è per un nuovo contatto (true) o se per la modifica di uno già esistente (false).
  contactForm: FormGroup;
  showSuccessModal : boolean;
  showFailureModal : boolean;
  private contactToUpdate: Contact;

  constructor(private fb: FormBuilder, private contactsService: ContactsService,
    private router: Router) { }

  ngOnInit(): void {
    this.showFailureModal = false;
    this.showSuccessModal = false;
    
    this.contactToUpdate = <Contact>this.contactsService.getContactToUpdate();
    this.isNewContact = (this.contactToUpdate == null);

    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      note: ['']
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

  onSubmit() {
    if (this.isNewContact) {

      this.contactsService.saveContact(this.contactForm.value)
        .subscribe(
          response => this.showSuccessModal = true,
          error => this.showFailureModal = true
        );

      this.resetForm();

    } else {
      this.contactsService.updateContact(this.contactForm.value, this.contactToUpdate.Id).subscribe(
        response => { this.showSuccessModal = true},
        error =>{ this.showFailureModal = true}
      );
    }
  }

  closeModal(){
    this.showSuccessModal = this.showFailureModal = false;
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
