import { Routes } from '@angular/router';
import { Signup } from './auth/signup/signup';
import { Login } from './auth/login/login'; 
import { FlightSearch } from './flight/flight-search/flight-search';  
import { Home } from './home/home'; 
import { Profile } from './profile/profile'; 

export const routes: Routes = [
    {path:'',component:Home},
    {path:'register',component:Signup},
    {path:'login',component:Login},
    {path:'flight-search',component:FlightSearch},
    { path: 'profile', component: Profile }

];
