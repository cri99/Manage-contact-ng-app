import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactFormComponent } from './component/new-or-update-contact-form/contact-form.component';
import { ContactListComponent } from './component/contact-list/contact-list.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: ContactListComponent, data: {animation: 'isLeft'}} ,
  { path: 'addContact', component: ContactFormComponent, data: {animation: 'isRight'}},
  { path: 'editContact', component: ContactFormComponent, data: {animation: 'isRight'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
