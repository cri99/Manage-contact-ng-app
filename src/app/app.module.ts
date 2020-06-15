import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsService } from './service/contacts.service';
import { ContactFormComponent } from './component/new-or-update-contact-form/contact-form.component';
import { ReactiveFormsModule, FormControl, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ContactListComponent } from './component/contact-list/contact-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    ContactListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ContactsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
