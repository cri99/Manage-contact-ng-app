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

  nuovoContatto: boolean;
  contactForm: FormGroup;
  private contactToUpdate: Contact;

  constructor(private fb: FormBuilder, private contactsService: ContactsService,
    private router: Router) { }

  ngOnInit(): void {
    this.contactToUpdate = <Contact>this.contactsService.getContactToUpdate();
    this.nuovoContatto = (this.contactToUpdate == null);

    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      note: ['']
    });

    if (!this.nuovoContatto) {

      this.name.setValue([this.contactToUpdate.Name]);
      this.lastname.setValue(this.contactToUpdate.Lastname);
      this.email.setValue(this.contactToUpdate.Email);
      this.phone.setValue(this.contactToUpdate.Phone);
      this.address.setValue(this.contactToUpdate.Address);
      this.note.setValue(this.contactToUpdate.Note);
    }
  }

  resetForm() {
    this.contactForm.reset();
  }

  onSubmit() {
    if (this.nuovoContatto) {

      this.contactsService.saveContact(this.contactForm.value)
        .subscribe(
          response => alert("Contatto inserito con successo!"),
          error => alert("Inserimento del contatto fallito!")
        );
      this.resetForm();
    } else {
      this.contactsService.updateContact(this.contactForm.value, this.contactToUpdate.Id).subscribe(
        response => alert("Contatto aggiornato con successo!"),
        error => alert("Inserimento del contatto fallito!")
      );
      this.resetDataToUpdate();

    }

  }
  changeRouteToContactList() {
    this.resetDataToUpdate();
    this.router.navigate(['/home']);
  }

  resetDataToUpdate() {
    this.contactsService.setContactToUpdate(null);
  }

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
