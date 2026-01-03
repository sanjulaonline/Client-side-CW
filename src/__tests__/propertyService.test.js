import { filterProperties } from '../services/propertyService';
import propertiesData from '../data/properties.json';

const mockProperties = propertiesData;

describe('PropertyService Logic', () => {
    test('should filter by type "House"', () => {
        const criteria = { type: 'House' };
        const result = filterProperties(mockProperties, criteria);
        expect(result.every(p => p.type === 'House')).toBe(true);
    });

    test('should filter by price range', () => {
        const criteria = { minPrice: 300000, maxPrice: 500000 };
        const result = filterProperties(mockProperties, criteria);
        expect(result.every(p => p.price >= 300000 && p.price <= 500000)).toBe(true);
    });

    test('should filter by minimum bedrooms', () => {
        const criteria = { minBedrooms: 3 };
        const result = filterProperties(mockProperties, criteria);
        expect(result.every(p => p.bedrooms >= 3)).toBe(true);
    });

    test('should filter by postcode partial match', () => {
        const criteria = { postcode: 'br1' };
        const result = filterProperties(mockProperties, criteria);
        expect(result.length).toBeGreaterThan(0);
        expect(result.every(p => p.postcode.toLowerCase().includes('br1'))).toBe(true);
    });

    test('should return all properties when criteria is empty', () => {
        const criteria = {};
        const result = filterProperties(mockProperties, criteria);
        expect(result.length).toBe(mockProperties.length);
    });
});
