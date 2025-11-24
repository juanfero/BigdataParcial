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
    <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg shadow-xl p-6 text-white">
      <h3 className="text-xl font-bold mb-4">💳 Checkout</h3>

      <div className="space-y-3 text-sm">
        {/* Campo Email */}
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            disabled={cartEmpty || isLoading}
          />
        </div>

        {/* Campo Dirección */}
        <div>
          <label className="block font-semibold mb-1">Dirección</label>
          <input
            type="text"
            placeholder="Calle 123"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 rounded bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            disabled={cartEmpty || isLoading}
          />
        </div>

        {/* Campo Ciudad */}
        <div>
          <label className="block font-semibold mb-1">Ciudad</label>
          <input
            type="text"
            placeholder="Bogotá"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 rounded bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            disabled={cartEmpty || isLoading}
          />
        </div>

        {/* Campo País */}
        <div>
          <label className="block font-semibold mb-1">País</label>
          <input
            type="text"
            placeholder="Colombia"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-3 py-2 rounded bg-white bg-opacity-20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            disabled={cartEmpty || isLoading}
          />
        </div>
      </div>

      {/* Botón Confirmar */}
      <button
        onClick={handleSubmit}
        disabled={isLoading || cartEmpty}
        className="w-full bg-white text-purple-600 font-bold py-3 rounded-lg mt-4 hover:bg-gray-100 transition disabled:opacity-50"
      >
        {isLoading ? 'Procesando...' : 'Confirmar Compra'}
      </button>
    </div>
  );
}

export default CheckoutForm;