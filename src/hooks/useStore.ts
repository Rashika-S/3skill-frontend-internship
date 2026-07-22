import { useCallback } from 'react';
import { useLocalStorageCallback } from './useLocalStorage';
import { properties as sampleProperties } from '@/data/sampleData';
import type { Property, Enquiry, UserProfile, SavedSearch, FavoriteLocation } from '@/types';
import { generateId } from '@/lib/format';

const FAVORITES_KEY = 'nestora:favorites';
const RECENT_KEY = 'nestora:recent-views';
const ENQUIRIES_KEY = 'nestora:enquiries';
const PROPERTIES_KEY = 'nestora:properties';
const PROFILE_KEY = 'nestora:profile';
const SEARCHES_KEY = 'nestora:saved-searches';
const LOCATIONS_KEY = 'nestora:favorite-locations';
const VISITS_KEY = 'nestora:scheduled-visits';

export interface ScheduledVisit {
  id: string;
  propertyId: string;
  propertyName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

const defaultProfile: UserProfile = {
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  bio: 'Real estate enthusiast looking for premium properties in top Indian cities.',
  notifications: { email: true, sms: false, push: true, promotions: false },
};

export function useStore() {
  const [favorites, setFavorites] = useLocalStorageCallback<string[]>(FAVORITES_KEY, []);
  const [recentViews, setRecentViews] = useLocalStorageCallback<string[]>(RECENT_KEY, []);
  const [enquiries, setEnquiries] = useLocalStorageCallback<Enquiry[]>(ENQUIRIES_KEY, []);
  const [properties, setProperties] = useLocalStorageCallback<Property[]>(PROPERTIES_KEY, sampleProperties);
  const [profile, setProfile] = useLocalStorageCallback<UserProfile>(PROFILE_KEY, defaultProfile);
  const [savedSearches, setSavedSearches] = useLocalStorageCallback<SavedSearch[]>(SEARCHES_KEY, []);
  const [favLocations, setFavLocations] = useLocalStorageCallback<FavoriteLocation[]>(LOCATIONS_KEY, []);
  const [visits, setVisits] = useLocalStorageCallback<ScheduledVisit[]>(VISITS_KEY, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  }, [setFavorites]);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const addRecentView = useCallback((id: string) => {
    setRecentViews(prev => [id, ...prev.filter(v => v !== id)].slice(0, 12));
  }, [setRecentViews]);

  const addEnquiry = useCallback((e: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => {
    const enquiry: Enquiry = { ...e, id: generateId('enq'), createdAt: new Date().toISOString(), status: 'new' };
    setEnquiries(prev => [enquiry, ...prev]);
    return enquiry;
  }, [setEnquiries]);

  const updateEnquiryStatus = useCallback((id: string, status: Enquiry['status']) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  }, [setEnquiries]);

  const deleteEnquiry = useCallback((id: string) => {
    setEnquiries(prev => prev.filter(e => e.id !== id));
  }, [setEnquiries]);

  const addProperty = useCallback((p: Omit<Property, 'id' | 'createdAt'>) => {
    const property: Property = { ...p, id: generateId('p'), createdAt: new Date().toISOString() };
    setProperties(prev => [property, ...prev]);
    return property;
  }, [setProperties]);

  const updateProperty = useCallback((id: string, updates: Partial<Property>) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, [setProperties]);

  const deleteProperty = useCallback((id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  }, [setProperties]);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  }, [setProfile]);

  const addSavedSearch = useCallback((s: Omit<SavedSearch, 'id' | 'createdAt'>) => {
    setSavedSearches(prev => [{ ...s, id: generateId('ss'), createdAt: new Date().toISOString() }, ...prev]);
  }, [setSavedSearches]);

  const deleteSavedSearch = useCallback((id: string) => {
    setSavedSearches(prev => prev.filter(s => s.id !== id));
  }, [setSavedSearches]);

  const addFavLocation = useCallback((l: Omit<FavoriteLocation, 'id'>) => {
    setFavLocations(prev => [{ ...l, id: generateId('fl') }, ...prev]);
  }, [setFavLocations]);

  const deleteFavLocation = useCallback((id: string) => {
    setFavLocations(prev => prev.filter(l => l.id !== id));
  }, [setFavLocations]);

  const addVisit = useCallback((v: Omit<ScheduledVisit, 'id' | 'status'>) => {
    setVisits(prev => [{ ...v, id: generateId('visit'), status: 'pending' }, ...prev]);
  }, [setVisits]);

  const updateVisitStatus = useCallback((id: string, status: ScheduledVisit['status']) => {
    setVisits(prev => prev.map(v => v.id === id ? { ...v, status } : v));
  }, [setVisits]);

  return {
    favorites, toggleFavorite, isFavorite,
    recentViews, addRecentView,
    enquiries, addEnquiry, updateEnquiryStatus, deleteEnquiry,
    properties, addProperty, updateProperty, deleteProperty,
    profile, updateProfile,
    savedSearches, addSavedSearch, deleteSavedSearch,
    favLocations, addFavLocation, deleteFavLocation,
    visits, addVisit, updateVisitStatus,
  };
}

export type Store = ReturnType<typeof useStore>;
