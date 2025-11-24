/**
 * Componente TrackTable
 * Tabla que muestra las canciones disponibles
 */
function TrackTable({ tracks, onAddToCart, isLoading }) {
  // Estado de carga
  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-600">
        Cargando canciones...
      </div>
    );
  }

  // Sin canciones
  if (tracks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        No hay canciones disponibles. Haz clic en "Cargar".
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        {/* Header */}
        <thead>
          <tr className="bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800 font-bold border-b-2 border-purple-300">
            <th className="px-4 py-3 text-left">Canción</th>
            <th className="px-4 py-3 text-left">Artista</th>
            <th className="px-4 py-3 text-left">Álbum</th>
            <th className="px-4 py-3 text-center">Precio</th>
            <th className="px-4 py-3 text-center">Acción</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {tracks.map((track) => (
            <tr
              key={track.trackId}
              className="border-b hover:bg-purple-50 transition"
            >
              <td className="px-4 py-3 font-semibold text-gray-800">
                {track.name}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {track.artistName}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {track.albumTitle}
              </td>
              <td className="px-4 py-3 text-center text-purple-600 font-bold">
                ${track.unitPrice.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onAddToCart(track)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded transition font-semibold"
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