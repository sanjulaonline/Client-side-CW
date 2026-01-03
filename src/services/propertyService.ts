import { Property, SearchCriteria } from '../types/Property';

const getMonthIndex = (month: string) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months.indexOf(month);
};

const parsePropertyDate = (added: { year: number; month: string; day: number }): Date => {
    return new Date(added.year, getMonthIndex(added.month), added.day);
};

export const fetchProperties = async (): Promise<Property[]> => {
    try {
        const response = await fetch('/properties.json');
        if (!response.ok) {
            throw new Error('Failed to fetch properties');
        }
        const data = await response.json();
        return data.properties;
    } catch (error) {
        console.error('Error fetching properties:', error);
        return [];
    }
};

export const filterProperties = (properties: Property[], criteria: SearchCriteria): Property[] => {
    return properties.filter((property) => {
        // Type Filter
        if (criteria.type && criteria.type !== 'any' && property.type.toLowerCase() !== criteria.type.toLowerCase()) {
            return false;
        }

        // Price Filter
        if (criteria.minPrice && property.price < criteria.minPrice) return false;
        if (criteria.maxPrice && property.price > criteria.maxPrice) return false;

        // Bedrooms Filter
        if (criteria.minBedrooms && property.bedrooms < criteria.minBedrooms) return false;
        if (criteria.maxBedrooms && property.bedrooms > criteria.maxBedrooms) return false;

        // Postcode Filter (Area check, e.g. BR1)
        if (criteria.postcode) {
            const propertyPostcode = property.location.split(' ').pop() || '';
            if (!propertyPostcode.toLowerCase().startsWith(criteria.postcode.toLowerCase())) {
                return false;
            }
        }

        // Date Filter
        const propertyDate = parsePropertyDate(property.added);
        if (criteria.dateAfter) {
            if (propertyDate <= criteria.dateAfter) return false;
        }
        if (criteria.dateBetween) {
            if (propertyDate < criteria.dateBetween.start || propertyDate > criteria.dateBetween.end) return false;
        }

        return true;
    });
};
