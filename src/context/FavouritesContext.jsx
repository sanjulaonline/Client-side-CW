import React, { createContext, useContext, useState, useEffect } from 'react';

const FavouritesContext = createContext(undefined);

export const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState(() => {
        const saved = localStorage.getItem('favourites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    const addToFavourites = (property) => {
        setFavourites(prev => {
            if (prev.some(p => p.id === property.id)) return prev;
            return [...prev, property];
        });
    };

    const removeFromFavourites = (propertyId) => {
        setFavourites(prev => prev.filter(p => p.id !== propertyId));
    };

    const clearFavourites = () => {
        setFavourites([]);
    };

    const isFavourite = (propertyId) => {
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
