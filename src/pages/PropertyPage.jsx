import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PROPERTIES } from '../data';
import ImageGallery from '../components/ImageGallery';
import PropertyTabs from '../components/PropertyTabs';

const PropertyPage = ({ favorites, onToggleFavorite }) => {
  const { id } = useParams();
  const property = PROPERTIES.find((p) => p.id === id);

  if (!property) return <Navigate to="/" />;

  const isFavorite = !!favorites.find((f) => f.id === property.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 font-semibold hover:text-indigo-600 transition-all group">
          <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </div>
          Back to Listings
        </Link>
        <div className="hidden sm:block text-sm font-medium text-slate-400">
          Reference: {property.id.toUpperCase()}
        </div>
      </div>

      <div className="property-detail-grid grid grid-cols-3 gap-12">
        <div className="col-span-1 lg:col-span-2 space-y-12">
          <section className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
            <ImageGallery images={property.images} />
          </section>

          <section>
            <PropertyTabs property={property} />
          </section>
        </div>

        <div className="sticky-summary space-y-6">
          <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 sticky top-24 ring-1 ring-slate-900/5">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <span className="inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {property.type}
                </span>
                <h1 className="text-3xl font-bold text-slate-900 leading-tight">{property.location}</h1>
                <p className="text-slate-400 flex items-center gap-1 text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  {property.postcode}
                </p>
                {property.description && (
                  <p className="text-sm text-slate-500 pt-2 leading-relaxed">
                    {property.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => onToggleFavorite(property)}
                className={`p-3.5 rounded-2xl transition-all shadow-lg active:scale-95 ${
                  isFavorite 
                    ? 'bg-red-500 text-white shadow-red-200' 
                    : 'bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-white border border-slate-200'
                }`}
                title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              >
                <svg className="w-7 h-7" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </button>
            </div>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-bold text-indigo-600 tracking-tighter">£{property.price.toLocaleString()}</span>
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Guide Price</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-5 rounded-2xl flex flex-col items-center justify-center border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Bedrooms</span>
                <span className="text-2xl font-bold text-slate-800">{property.bedrooms}</span>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl flex flex-col items-center justify-center border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Status</span>
                <span className="text-sm font-bold text-green-600">Available</span>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-slate-200 active:scale-[0.98]">
                Inquire Now
              </button>
              <button className="w-full bg-white border-2 border-slate-200 hover:border-indigo-600 hover:text-indigo-600 text-slate-700 font-bold py-4 rounded-2xl transition-all active:scale-[0.98]">
                Request Viewing
              </button>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Highlights</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Added On', val: new Date(property.added).toLocaleDateString() },
                  { label: 'Type', val: property.type },
                  { label: 'Square Footage', val: 'Approx. 1,250 sqft' }
                ].map((item, i) => (
                  <li key={i} className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">{item.label}</span>
                    <span className="font-bold text-slate-800">{item.val}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;
