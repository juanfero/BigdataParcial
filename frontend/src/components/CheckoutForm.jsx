import { useState } from 'react';

/**
 * Componente CheckoutForm
 * Formulario para completar datos de facturación y confirmar compra
 */
function CheckoutForm({ onSubmit, isLoading, cartEmpty }) {
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  /**
   * Valida el formulario y envía los datos
   */
  const handleSubmit = () => {
    // Validación
    if (!email || !address || !city || !country) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Validación de email básica
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor ingresa un email válido');
      return;
    }

    // Envía los datos
    onSubmit({ email, address, city, country });
  };

  return (
    <div className="checkout-panel">
      <h3 className="checkout-title">💳 Checkout</h3>

      {/* Campo Email */}
      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          disabled={cartEmpty || isLoading}
        />
      </div>

      {/* Campo Dirección */}
      <div className="form-group">
        <label className="form-label">Dirección</label>
        <input
          type="text"
          placeholder="Calle 123"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="form-input"
          disabled={cartEmpty || isLoading}
        />
      </div>

      {/* Campo Ciudad */}
      <div className="form-group">
        <label className="form-label">Ciudad</label>
        <input
          type="text"
          placeholder="Bogotá"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="form-input"
          disabled={cartEmpty || isLoading}
        />
      </div>

      {/* Campo País */}
      <div className="form-group">
        <label className="form-label">País</label>
        <input
          type="text"
          placeholder="Colombia"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="form-input"
          disabled={cartEmpty || isLoading}
        />
      </div>

      {/* Botón Confirmar */}
      <button
        onClick={handleSubmit}
        disabled={isLoading || cartEmpty}
        className="btn-checkout"
      >
        {isLoading ? 'Procesando...' : 'Confirmar Compra'}
      </button>
    </div>
  );
}

export default CheckoutForm;