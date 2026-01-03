export interface PropertyDate {
    year: number;
    month: string;
    day: number;
}

export interface Property {
    id: string;
    type: string;
    bedrooms: number;
    price: number;
    tenure: string;
    description: string;
    longDescription?: string;
    location: string;
    picture: string;
    images: string[];
    added: PropertyDate;
    url?: string;
}

export interface SearchCriteria {
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    maxBedrooms?: number;
    dateAfter?: Date;
    dateBetween?: { start: Date; end: Date };
    postcode?: string;
}
