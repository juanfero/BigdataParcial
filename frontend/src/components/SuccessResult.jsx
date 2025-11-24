/**
 * Componente SuccessResult
 * Muestra el resultado exitoso de una compra
 */
function SuccessResult({ invoiceId, total, createdAt, onClose }) {
  return (
    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 animate-pulse">
      {/* Título */}
      <h3 className="text-2xl font-bold text-green-700 mb-2">
        ✅ ¡Compra Exitosa!
      </h3>

      {/* ID de Factura */}
      <p className="text-gray-800">
        <strong>ID de Factura:</strong> #{invoiceId}
      </p>

      {/* Total Pagado */}
      <p className="text-gray-800">
        <strong>Total pagado:</strong> ${total}
      </p>

      {/* Fecha */}
      <p className="text-gray-600 text-sm mt-2">
        <strong>Fecha:</strong> {new Date(createdAt).toLocaleString('es-CO')}
      </p>

      {/* Botón Nueva Compra */}
      <button
        onClick={onClose}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition font-semibold"
      >
        Nueva Compra
      </button>
    </div>
  );
}

export default SuccessResult;