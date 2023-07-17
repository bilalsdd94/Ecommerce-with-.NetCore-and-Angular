import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

//first create array

const routes: Routes =[
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  
]


@NgModule({
  declarations: [],
  imports: [
    //then router module for child
    RouterModule.forChild(routes)
  ],
  //then export it 
  exports: [RouterModule]
})
export class AccountRoutingModule { }
