export interface Property {
    id: string;
    type: "House" | "Flat";
    price: number;
    bedrooms: number;
    dateAdded: string; // ISO Date string
    postcode: string;
    location: string;
    picture: string; // Main image
    description: string;
    longDescription: string;
    images: string[]; // Gallery images
    floorPlan: string;
    mapEmbedUrl: string; // Google Maps embed URL
}

export interface SearchCriteria {
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    maxBedrooms?: number;
    postcode?: string;
    dateAfter?: Date;
    dateBetween?: {
        start: Date;
        end: Date;
    };
}
