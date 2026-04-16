'use client';

import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from '@/lib/axios';

export const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,

  createCategory: async (categoryData) => {
    set({ loading: true });
    try {
      const res = await axios.post('/categories', categoryData);
      set((prevState) => ({
        categories: [...prevState.categories, res.data],
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error creating category');
      set({ loading: false });
    }
  },

  fetchAllCategories: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('/categories');
      set({ categories: response.data.categories || [], loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch categories', loading: false, categories: [] });
      toast.error(error.response?.data?.error || 'Failed to fetch categories');
    }
  },

  deleteCategory: async (categoryId) => {
    set({ loading: true });
    try {
      await axios.delete(`/categories/${categoryId}`);
      set((prevCategories) => ({
        categories: prevCategories.categories.filter((c) => c._id !== categoryId),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || 'Failed to delete category');
    }
  },

  updateCategory: async (categoryId, categoryData) => {
    set({ loading: true });
    try {
      const res = await axios.put(`/categories/${categoryId}`, categoryData);
      set((prevState) => ({
        categories: prevState.categories.map((c) => (c._id === categoryId ? res.data : c)),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.error || 'Failed to update category');
    }
  },
}));
