import { Routes } from '@angular/router';
import { Signup } from './auth/signup/signup';
import { Login } from './auth/login/login'; 
import { FlightSearch } from './flight/flight-search/flight-search';    

export const routes: Routes = [
    {path:'register',component:Signup},
    {path:'login',component:Login},
    {path:'search',component:FlightSearch}
];
