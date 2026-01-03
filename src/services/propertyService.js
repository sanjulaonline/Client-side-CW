import propertiesData from '../data/properties.json';

// Simulate async fetch
export const fetchProperties = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(propertiesData);
        }, 500); // Simulate network delay
    });
};

export const fetchPropertyById = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const property = propertiesData.find(p => p.id === id);
            resolve(property);
        }, 300);
    });
};

export const filterProperties = (properties, criteria) => {
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
        // Convert { month, day, year } to Date object
        const monthMap = {
            "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
            "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
        };

        // Check if 'added' field exists, if not try 'dateAdded' for backward compatibility or fail gracefully
        let propDate;
        if (property.added && property.added.year) {
            const month = typeof property.added.month === 'string' ? monthMap[property.added.month] : property.added.month - 1;
            propDate = new Date(property.added.year, month, property.added.day);
        } else if (property.dateAdded) {
            propDate = new Date(property.dateAdded);
        } else {
            return false; // Cannot filter by date if no date exists
        }

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
