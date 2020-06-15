import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactFormComponent } from './component/new-or-update-contact-form/contact-form.component';
import { ContactListComponent } from './component/contact-list/contact-list.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: ContactListComponent} ,
  { path: 'addContact', component: ContactFormComponent},
  { path: 'editContact', component: ContactFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
