import propertiesData from '../data/properties.json';
import { Property, SearchCriteria } from '../types/Property';

// Simulate async fetch
export const fetchProperties = async (): Promise<Property[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(propertiesData as Property[]);
        }, 500); // Simulate network delay
    });
};

export const fetchPropertyById = async (id: string): Promise<Property | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const property = (propertiesData as Property[]).find(p => p.id === id);
            resolve(property);
        }, 300);
    });
};

export const filterProperties = (properties: Property[], criteria: SearchCriteria): Property[] => {
    return properties.filter(property => {
        // Filter by Type
        if (criteria.type && criteria.type !== 'any' && property.type !== criteria.type) {
            return false;
        }

        // Filter by Price
        if (criteria.minPrice && property.price < criteria.minPrice) return false;
        if (criteria.maxPrice && property.price > criteria.maxPrice) return false;

        // Filter by Bedrooms
        if (criteria.minBedrooms && property.bedrooms < criteria.minBedrooms) return false;
        if (criteria.maxBedrooms && property.bedrooms > criteria.maxBedrooms) return false;

        // Filter by Postcode (partial match, e.g. "BR1")
        if (criteria.postcode) {
            const pCode = property.postcode.toLowerCase();
            const qCode = criteria.postcode.toLowerCase();
            // Check if the property postcode starts with the query or contains it
            if (!pCode.includes(qCode)) return false;
        }

        // Filter by Date Added
        const propDate = new Date(property.dateAdded);
        if (criteria.dateAfter) {
            if (propDate <= criteria.dateAfter) return false;
        }
        if (criteria.dateBetween) {
            if (propDate < criteria.dateBetween.start || propDate > criteria.dateBetween.end) {
                return false;
            }
        }

        return true;
    });
};
