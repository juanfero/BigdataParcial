/**
 * Componente SuccessResult
 * Muestra el resultado exitoso de una compra
 */
function SuccessResult({ invoiceId, total, createdAt, onClose }) {
  return (
    <div className="success-container">
      {/* Título */}
      <h3 className="success-title">✅ ¡Compra Exitosa!</h3>

      {/* ID de Factura */}
      <p className="success-info">
        <strong>ID de Factura:</strong> #{invoiceId}
      </p>

      {/* Total Pagado */}
      <p className="success-info">
        <strong>Total pagado:</strong> ${total}
      </p>

      {/* Fecha */}
      <p className="success-date">
        <strong>Fecha:</strong> {new Date(createdAt).toLocaleString('es-CO')}
      </p>

      {/* Botón Nueva Compra */}
      <button onClick={onClose} className="btn-new-purchase">
        Nueva Compra
      </button>
    </div>
  );
}

export default SuccessResult;