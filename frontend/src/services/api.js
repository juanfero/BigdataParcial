// Configuración de la URL base del API
// CAMBIA ESTO CON TU IP/DOMINIO DE AWS
const API_BASE_URL = "http://localhost:8000";

export const apiService = {
  /**
   * Obtiene la lista de canciones con búsqueda opcional
   * @param {string} search - Término de búsqueda
   * @param {number} page - Número de página (default: 1)
   * @param {number} pageSize - Cantidad de items por página (default: 20)
   * @returns {Promise<Array>} Lista de canciones
   */
  fetchTracks: async (search = '', page = 1, pageSize = 20) => {
    try {
      const params = new URLSearchParams({ 
        search, 
        page, 
        page_size: pageSize 
      });
      const response = await fetch(
        `${API_BASE_URL}/api/tracks?${params}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching tracks:', error);
      throw error;
    }
  },

  /**
   * Realiza el checkout y crea la compra
   * @param {string} guestEmail - Email del cliente
   * @param {string} billingAddress - Dirección de envío
   * @param {string} billingCity - Ciudad
   * @param {string} billingCountry - País
   * @param {Array} items - Array de items {trackId, unitPrice, quantity}
   * @returns {Promise<Object>} Resultado con invoiceId, total, createdAt
   */
  checkout: async (
    guestEmail,
    billingAddress,
    billingCity,
    billingCountry,
    items
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guestEmail,
          billingAddress,
          billingCity,
          billingCountry,
          items,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error during checkout:', error);
      throw error;
    }
  },
};

export default apiService;