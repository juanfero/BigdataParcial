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
    <div className="search-bar">
      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar canciones, artistas..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyPress={handleKeyPress}
        className="search-input"
        disabled={isLoading}
      />

      {/* Botón Buscar */}
      <button
        onClick={handleSearch}
        disabled={isLoading}
        className="btn-search"
      >
        Buscar
      </button>

      {/* Botón Cargar */}
      <button
        onClick={onLoadTracks}
        disabled={isLoading}
        className="btn-load"
      >
        {isLoading ? 'Cargando...' : 'Cargar'}
      </button>
    </div>
  );
}

export default SearchBar;