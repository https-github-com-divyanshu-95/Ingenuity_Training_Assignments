import {getCovidData} from "./GetData";

export function FillCovidData(country?:string):void{
    const table = document.getElementById("data") as HTMLTableElement;
    table.innerHTML =`<tr align= "center">
                    <th rowspan = "2">Country</th>
                    <th colspan = "4">Cases</th>
                    <th colspan = "2">Deaths</th>
                    </tr>
                    <th>Total</th>
                    <th>Active</th>
                    <th>Recovered</th>
                    <th>New</th>
                    <th>Total</th>
                    <th>New</th>
                    </tr>
                    <br><br>`;
    const result = getCovidData(country);
    result.then((data)=>{
        console.log(data)
        const dataresponse=data.response
        
        dataresponse.forEach(countryData=> {
            if(!country){
                const row =`<tr align= "center">
                                <td>${countryData.country}</td>
                                <td>${countryData.cases.total?countryData.cases.total:0}</td>
                                <td>${countryData.cases.active?countryData.cases.active:0}</td>
                                <td>${countryData.cases.recovered?countryData.cases.recovered:0}</td>
                                <td>${countryData.cases.new?countryData.cases.new:0}</td>
                                <td>${countryData.deaths.total?countryData.deaths.total:0}</td>
                                <td>${countryData.deaths.new?countryData.deaths.new:0}</td>
                                </tr>
                               `  //here using ternary operator  
                table.innerHTML+=row;  
            }
            
            if(country){
                table.innerHTML=    `<tr><b>
                                    <td>Day</td>
                                    <td>${dataresponse[0].day}</td>
                                    </tr>
                                    <tr>
                                    <td>Conuntry</td>
                                    <td>${dataresponse[0].country}</td>
                                    </tr>
                                    <tr>
                                    <td>Continent</td>
                                    <td>${dataresponse[0].continent?dataresponse[0].continent:'-'}</td>
                                    </tr>
                                    <tr>
                                    <td>Population</td>
                                    <td>${dataresponse[0].population?dataresponse[0].population:'-'}</td>
                                    </tr>
                                   
                                    <tr>
                                    <td>Recoverd Cases</td>
                                    <td>${dataresponse[0].cases.recovered?dataresponse[0].cases.recovered:0}</td>
                                    </tr>
                                    <tr>
                                    <td>New Cases</td>
                                    <td>${dataresponse[0].cases.new?dataresponse[0].cases.new:0}</td>
                                    </tr>
                                    <tr>
                                    <td>Active Cases</td>
                                    <td>${dataresponse[0].cases.active?dataresponse[0].cases.active:0}</td>
                                    </tr>
                                    <tr>
                                    <td>Critical Cases</td>
                                    <td>${dataresponse[0].cases.critical?dataresponse[0].cases.critical:0}</td>
                                    </tr>
                                    <tr>
                                    <td>Total Cases</td>
                                    <td>${dataresponse[0].cases.total?dataresponse[0].cases.total:0}</td>
                                    </tr>
                                    <tr>
                                    <td>New Deaths</td>
                                    <td>${dataresponse[0].deaths.new?dataresponse[0].deaths.new:0}</td>
                                    </tr>
                                    <tr>
                                    <td>Total Deaths</td>
                                    <td>${dataresponse[0].deaths.total?dataresponse[0].deaths.total:0}</td>
                                    </tr></b>
                                    </tr>
                                    `
            }     
        });
    });
    
}