import React from 'react';

const FavoritesSidebar = ({ favorites, onRemove, onClear, onDrop, onDragStartItem }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-indigo-50', 'border-indigo-300');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('bg-indigo-50', 'border-indigo-300');
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e) => {
        handleDragLeave(e);
        onDrop(e);
      }}
      className="bg-white border border-slate-200 rounded-3xl shadow-lg h-[calc(100vh-120px)] flex flex-col transition-all overflow-hidden sticky top-24"
    >
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-indigo-50/50">
        <h2 className="text-xl font-bold text-indigo-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          Favorites
        </h2>
        {favorites.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-slate-400 hover:text-red-500 font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {favorites.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center px-4">
            <div className="w-16 h-16 mb-4 rounded-full bg-slate-50 flex items-center justify-center border-2 border-dashed border-slate-200">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            </div>
            <p className="text-sm">Drag properties here to save them</p>
          </div>
        ) : (
          favorites.map((prop) => (
            <div
              key={prop.id}
              draggable
              onDragStart={(e) => onDragStartItem(e, prop.id)}
              className="group relative bg-slate-50 rounded-2xl p-3 border border-slate-200 hover:border-indigo-400 transition-all flex gap-3 cursor-grab active:cursor-grabbing"
            >
              <img src={prop.images[0]} alt={prop.location} className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800 truncate">{prop.location}</h4>
                <p className="text-indigo-600 text-xs font-bold mt-1">£{prop.price.toLocaleString()}</p>
                <p className="text-slate-400 text-[10px] mt-0.5">{prop.type} • {prop.bedrooms} Bed</p>
              </div>
              <button
                onClick={() => onRemove(prop.id)}
                className="opacity-0 group-hover:opacity-100 p-1 bg-white rounded-full shadow-sm text-slate-400 hover:text-red-500 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          ))
        )}
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 text-center">
        Drag items out to remove them from favorites
      </div>
    </div>
  );
};

export default FavoritesSidebar;
