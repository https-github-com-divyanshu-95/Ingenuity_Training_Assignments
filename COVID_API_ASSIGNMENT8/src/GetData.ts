export type CovidStats = {
    get: string,
    parameters:string[],
    errors: string[],
    result : number,
    response:covidDetail[]
}
export type covidDetail = {
    continent: string,
    country: string,
    population: number,
    day: string,
    time: string,
    cases:{
        new:number|null,
        active:number
        critical:number|null
        recovered: number
        "1M_pop":string
        total:number
    },
    deaths:{
        new:number| null,
        "1M_pop":number|null,
        total:number|null
    },
    tests:{
        "1M_pop":number|null
        "total":number|null
    }
}

export async function getCovidData(country?:string):Promise<any>{
    let urlStr :string;
    if(country){
        const searchStr = encodeURI(country);
        urlStr = `https://covid-193.p.rapidapi.com/statistics?country=${searchStr}`;//acc to dropdown data
    }
    else{

        urlStr = "https://covid-193.p.rapidapi.com/statistics";//default data
    }
    const response:Response = await fetch(urlStr, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "d572445b75mshac6da8a92f1a234p1103bdjsn511cc706c768",
            "x-rapidapi-host": "covid-193.p.rapidapi.com"
        }
    });
    return response.json();
}
export type Countries = {
    get: string,
    parameters:string[],
    errors: string[],
    result : number,
    response:string[]
}
export async function getCountries(): Promise<Countries> {
    const response =  await fetch("https://covid-193.p.rapidapi.com/countries", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "d572445b75mshac6da8a92f1a234p1103bdjsn511cc706c768",
            "x-rapidapi-host": "covid-193.p.rapidapi.com"//take countries as default
        }
    });
    return response.json();
}