import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TrackTable from './components/TrackTable';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import SuccessResult from './components/SuccessResult';
import { useCart } from './hooks/useCart';
import { apiService } from './services/api';
import './styles/App.css';

/**
 * Componente Alert para mostrar errores
 */
function Alert({ message, onClose }) {
  return (
    <div className="alert alert-error">
      <p style={{ margin: 0 }}>⚠️ {message}</p>
      <button
        onClick={onClose}
        className="alert-error-close"
      >
        ✕
      </button>
    </div>
  );
}

/**
 * Aplicación Principal - Orquestador
 * Maneja estados globales y coordinación entre componentes
 */
function App() {
  // Estados
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successResult, setSuccessResult] = useState(null);
  const [currentSearch, setCurrentSearch] = useState('');

  // Hook del carrito
  const cart = useCart();

  /**
   * Carga las canciones desde el API
   * @param {string} search - Término de búsqueda
   */
  const loadTracks = async (search = '') => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await apiService.fetchTracks(search);
      setTracks(data || []);
      setCurrentSearch(search);
    } catch (err) {
      setError(
        'No se pudieron cargar las canciones. Verifica la conexión con el servidor.'
      );
      console.error('Error loading tracks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Realiza el checkout
   * @param {Object} formData - Datos del formulario {email, address, city, country}
   */
  const handleCheckout = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Prepara los items del carrito en el formato esperado
      const items = cart.cart.map(item => ({
        trackId: item.trackId,
        unitPrice: item.unitPrice,
        quantity: item.qty,
      }));

      // Realiza el checkout
      const result = await apiService.checkout(
        formData.email,
        formData.address,
        formData.city,
        formData.country,
        items
      );

      // Muestra el resultado exitoso
      setSuccessResult(result);

      // Limpia el carrito
      cart.clearCart();
    } catch (err) {
      setError('Error al procesar la compra. Intenta de nuevo.');
      console.error('Error during checkout:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Cierra la pantalla de éxito y reinicia el flujo
   */
  const closeSuccess = () => {
    setSuccessResult(null);
    setCurrentSearch('');
    setTracks([]);
  };

  return (
    <div className="app-wrapper">
      {/* Header */}
      <Header cartCount={cart.cart.length} />

      <main className="main-content">
        {/* Alert de errores */}
        {error && (
          <div className="alert-section">
            <Alert message={error} onClose={() => setError(null)} />
          </div>
        )}

        {/* Contenido principal */}
        {!successResult ? (
          <div className="tracks-section">
            {/* Columna izquierda - Tabla de canciones */}
            <div>
              <div className="tracks-panel">
                <h2 className="tracks-title">
                  🎵 Canciones Disponibles
                </h2>

                {/* Barra de búsqueda */}
                <SearchBar
                  onSearch={loadTracks}
                  onLoadTracks={() => loadTracks('')}
                  isLoading={isLoading}
                />

                {/* Tabla de canciones */}
                <TrackTable
                  tracks={tracks}
                  onAddToCart={cart.addItem}
                  isLoading={isLoading}
                />
              </div>
            </div>

            {/* Columna derecha - Carrito y Checkout */}
            <div className="right-panel">
              {/* Carrito */}
              <Cart
                cart={cart.cart}
                onUpdateQty={cart.updateQty}
                onRemoveItem={cart.removeItem}
                onClearCart={cart.clearCart}
                total={cart.getTotal()}
              />

              {/* Formulario de Checkout */}
              <CheckoutForm
                onSubmit={handleCheckout}
                isLoading={isLoading}
                cartEmpty={cart.cart.length === 0}
              />
            </div>
          </div>
        ) : (
          // Pantalla de éxito
          <SuccessResult
            invoiceId={successResult.invoiceId}
            total={successResult.total}
            createdAt={successResult.createdAt}
            onClose={closeSuccess}
          />
        )}
      </main>
    </div>
  );
}

export default App;