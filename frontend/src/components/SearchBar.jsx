import { useState } from 'react';

/**
 * Componente SearchBar
 * Barra de búsqueda con botones para cargar y buscar canciones
 */
function SearchBar({ onSearch, onLoadTracks, isLoading }) {
  const [searchText, setSearchText] = useState('');

  /**
   * Ejecuta la búsqueda
   */
  const handleSearch = () => {
    onSearch(searchText);
  };

  /**
   * Permite buscar al presionar Enter
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2 mb-6">
      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar canciones, artistas..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        disabled={isLoading}
      />

      {/* Botón Buscar */}
      <button
        onClick={handleSearch}
        disabled={isLoading}
        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-semibold disabled:opacity-50"
      >
        Buscar
      </button>

      {/* Botón Cargar */}
      <button
        onClick={onLoadTracks}
        disabled={isLoading}
        className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition font-semibold disabled:opacity-50"
      >
        {isLoading ? 'Cargando...' : 'Cargar'}
      </button>
    </div>
  );
}

export default SearchBar;