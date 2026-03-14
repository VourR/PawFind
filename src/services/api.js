// API Service for Pet Finder
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL).replace(/\/$/, '');

const parseApiResponse = async (response, fallbackMessage) => {
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error || data.message || fallbackMessage);
    error.response = data;
    throw error;
  }

  return data;
};

// Pets API
export const petsAPI = {
  // Get all pets
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/pets`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching pets:', error);
      throw error;
    }
  },

  // Get pet by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pets/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching pet:', error);
      throw error;
    }
  },

  // Create new pet
  create: async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pets`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating pet:', error);
      throw error;
    }
  },

  // Update pet
  update: async (id, formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pets/${id}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating pet:', error);
      throw error;
    }
  },

  // Delete pet
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pets/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting pet:', error);
      throw error;
    }
  }
};

// Adopted Pets API
export const adoptedPetsAPI = {
  // Adopt a pet
  adopt: async (adoptionData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/adopted-pets/adopt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adoptionData),
      });
      return await parseApiResponse(response, 'Gagal mengirim pengajuan adopsi');
    } catch (error) {
      console.error('Error adopting pet:', error);
      throw error;
    }
  },

  // Get all adopted pets
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/adopted-pets`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching adopted pets:', error);
      throw error;
    }
  },

  // Get adopted pet by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/adopted-pets/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching adopted pet:', error);
      throw error;
    }
  },

  // Check if pet is adopted
  checkIfAdopted: async (petId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/adopted-pets/check/${petId}`);
      return await parseApiResponse(response, 'Gagal memeriksa status adopsi');
    } catch (error) {
      console.error('Error checking adoption status:', error);
      throw error;
    }
  }
};

// Shelters API
export const sheltersAPI = {
  // Get all shelters
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/shelters`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching shelters:', error);
      throw error;
    }
  },

  // Get shelter by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/shelters/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching shelter:', error);
      throw error;
    }
  },

  // Create new shelter
  create: async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/shelters`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating shelter:', error);
      throw error;
    }
  }
};
