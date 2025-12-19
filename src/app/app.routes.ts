import { Routes } from '@angular/router';
import { Signup } from './components/signup/signup';
import { Login } from './components/login/login'; 
import { FlightSearch } from './components/flight-search/flight-search';  
import { Home } from './components/home/home'; 
import { Profile } from './components/profile/profile';
import { BookFlight } from './components/book-flight/book-flight'; 
import { SearchByMail } from './components/search-by-mail/search-by-mail';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'register',component:Signup},
    {path:'login',component:Login},
    {path:'flight-search',component:FlightSearch},
    { path: 'profile', component: Profile },
    {path:'book-flight/:flightId',component:BookFlight},
    {path:'search-by-mail',component:SearchByMail}

];
