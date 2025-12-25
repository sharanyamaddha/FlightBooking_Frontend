import { Routes } from '@angular/router';
import { Signup } from './components/signup/signup';
import { Login } from './components/login/login'; 
import { FlightSearch } from './components/flight-search/flight-search';  
import { Home } from './components/home/home'; 
import { Profile } from './components/profile/profile';
import { BookFlight } from './components/book-flight/book-flight'; 
import { BookingsHistory } from './components/bookings-history/bookings-history';
import { AddFlights } from './components/add-flights/add-flights';
import { ChangePassword } from './components/change-password/change-password';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'register',component: Signup},
    {path:'login',component:Login},
    {path:'flight-search',component:FlightSearch},
    {path: 'profile', component: Profile },
    {path:'book-flight/:flightId',component:BookFlight,canActivate:[authGuard]},
    {path:'bookings-history',component:BookingsHistory,canActivate:[authGuard]},
    {path:'add-flights',component:AddFlights,canActivate:[authGuard]},
    {path:'change-password',component:ChangePassword,canActivate:[authGuard]}

];
