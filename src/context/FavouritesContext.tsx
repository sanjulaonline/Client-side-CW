import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property } from '../types/Property';

interface FavouritesContextType {
    favourites: Property[];
    addToFavourites: (property: Property) => void;
    removeFromFavourites: (propertyId: string) => void;
    clearFavourites: () => void;
    isFavourite: (propertyId: string) => boolean;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favourites, setFavourites] = useState<Property[]>(() => {
        const saved = localStorage.getItem('favourites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    const addToFavourites = (property: Property) => {
        setFavourites(prev => {
            if (prev.some(p => p.id === property.id)) return prev;
            return [...prev, property];
        });
    };

    const removeFromFavourites = (propertyId: string) => {
        setFavourites(prev => prev.filter(p => p.id !== propertyId));
    };

    const clearFavourites = () => {
        setFavourites([]);
    };

    const isFavourite = (propertyId: string) => {
        return favourites.some(p => p.id === propertyId);
    };

    return (
        <FavouritesContext.Provider value={{ favourites, addToFavourites, removeFromFavourites, clearFavourites, isFavourite }}>
            {children}
        </FavouritesContext.Provider>
    );
};

export const useFavourites = () => {
    const context = useContext(FavouritesContext);
    if (!context) {
        throw new Error('useFavourites must be used within a FavouritesProvider');
    }
    return context;
};
