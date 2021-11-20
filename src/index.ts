import '../css/main.css';
import { FillCountries } from './FillCountries';
import {FillCovidData} from "./FillCovidData";
onload = ()=>{
    FillCovidData();
    FillCountries();//default taken
}//load all functions