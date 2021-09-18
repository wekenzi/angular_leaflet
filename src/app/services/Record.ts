export interface Record {
    geometry: Geometry;
    properties: Properties;
}

interface Geometry {
    type: string;
    coordinates: number[] | any
}

interface Properties {
    Facility_Name: string;
    Address: string;
    Phone_Number: string;
}