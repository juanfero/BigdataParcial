/**
 * Componente TrackTable
 * Tabla que muestra las canciones disponibles
 */
function TrackTable({ tracks, onAddToCart, isLoading }) {
  // Estado de carga
  if (isLoading) {
    return <div className="loading-text">Cargando canciones...</div>;
  }

  // Sin canciones
  if (tracks.length === 0) {
    return (
      <div className="empty-state">
        No hay canciones disponibles. Haz clic en "Cargar".
      </div>
    );
  }

  return (
    <div className="tracks-table-container">
      <table className="tracks-table">
        {/* Header */}
        <thead>
          <tr>
            <th>Canción</th>
            <th>Artista</th>
            <th>Álbum</th>
            <th>Precio</th>
            <th>Acción</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {tracks.map((track) => (
            <tr key={track.trackId}>
              <td className="track-name">{track.name}</td>
              <td>{track.artistName}</td>
              <td>{track.albumTitle}</td>
              <td className="track-price">
                ${track.unitPrice.toFixed(2)}
              </td>
              <td style={{ textAlign: 'center' }}>
                <button
                  onClick={() => onAddToCart(track)}
                  className="btn-add"
                >
                  + Agregar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrackTable;