/**
 * Componente Cart
 * Muestra los items del carrito con opciones de modificar cantidad
 */
function Cart({ cart, onUpdateQty, onRemoveItem, onClearCart, total }) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">🛒 Tu Carrito</h3>

      {/* Lista de items */}
      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Carrito vacío</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.trackId}
              className="flex justify-between items-center bg-gray-50 p-3 rounded border border-gray-200"
            >
              {/* Información del item */}
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-500">
                  ${item.unitPrice.toFixed(2)} × {item.qty}
                </p>
              </div>

              {/* Controles de cantidad */}
              <div className="flex gap-2 items-center">
                {/* Botón Menos */}
                <button
                  onClick={() => onUpdateQty(item.trackId, item.qty - 1)}
                  className="bg-gray-300 hover:bg-gray-400 w-6 h-6 rounded text-xs font-bold"
                  title="Disminuir cantidad"
                >
                  −
                </button>

                {/* Cantidad */}
                <span className="w-6 text-center font-bold">{item.qty}</span>

                {/* Botón Más */}
                <button
                  onClick={() => onUpdateQty(item.trackId, item.qty + 1)}
                  className="bg-gray-300 hover:bg-gray-400 w-6 h-6 rounded text-xs font-bold"
                  title="Aumentar cantidad"
                >
                  +
                </button>

                {/* Botón Eliminar */}
                <button
                  onClick={() => onRemoveItem(item.trackId)}
                  className="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded text-xs ml-2"
                  title="Eliminar del carrito"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Totales y botones */}
      {cart.length > 0 && (
        <>
          <div className="border-t pt-3 mb-3">
            <div className="flex justify-between text-gray-800">
              <span>Subtotal:</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-purple-600">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>

          {/* Botón Vaciar */}
          <button
            onClick={onClearCart}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition text-sm font-semibold"
          >
            Vaciar Carrito
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;