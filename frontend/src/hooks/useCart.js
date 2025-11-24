import { useState } from 'react';

/**
 * Hook personalizado para manejar la lógica del carrito
 * Persiste los datos en localStorage
 */
export const useCart = () => {
  const CART_KEY = 'cart_v1';

  // Inicializa el estado desde localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  /**
   * Guarda el carrito en localStorage y actualiza el estado
   * @param {Array} newCart - Nuevo estado del carrito
   */
  const saveCart = (newCart) => {
    try {
      setCart(newCart);
      localStorage.setItem(CART_KEY, JSON.stringify(newCart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };

  /**
   * Agrega un item al carrito
   * Si ya existe, incrementa la cantidad
   * @param {Object} track - Track a agregar {trackId, name, unitPrice, artistName, albumTitle}
   */
  const addItem = (track) => {
    const existing = cart.find(item => item.trackId === track.trackId);
    
    if (existing) {
      // Si ya existe, incrementa cantidad
      const updated = cart.map(item =>
        item.trackId === track.trackId 
          ? { ...item, qty: item.qty + 1 } 
          : item
      );
      saveCart(updated);
    } else {
      // Si no existe, lo agrega con qty = 1
      saveCart([...cart, { ...track, qty: 1 }]);
    }
  };

  /**
   * Elimina un item del carrito
   * @param {number} trackId - ID de la canción a eliminar
   */
  const removeItem = (trackId) => {
    saveCart(cart.filter(item => item.trackId !== trackId));
  };

  /**
   * Actualiza la cantidad de un item
   * Si qty <= 0, elimina el item
   * @param {number} trackId - ID de la canción
   * @param {number} qty - Nueva cantidad
   */
  const updateQty = (trackId, qty) => {
    if (qty <= 0) {
      removeItem(trackId);
    } else {
      const updated = cart.map(item =>
        item.trackId === trackId ? { ...item, qty } : item
      );
      saveCart(updated);
    }
  };

  /**
   * Vacía completamente el carrito
   */
  const clearCart = () => {
    saveCart([]);
  };

  /**
   * Calcula el total del carrito
   * @returns {string} Total con 2 decimales
   */
  const getTotal = () => {
    return cart
      .reduce((sum, item) => sum + item.unitPrice * item.qty, 0)
      .toFixed(2);
  };

  return {
    cart,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    getTotal,
  };
};

export default useCart;