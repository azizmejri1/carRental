interface Filter{
    model: string[];
    brand: string[];
    pricePerDay: [number, number];
    company: string[];
}

interface Profile{
    id : number;
    name:string;
    firstName : string;
    lastName : string
    email : string;
    password : string;
}