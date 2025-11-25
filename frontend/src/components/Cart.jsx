/**
 * Componente Cart
 * Muestra los items del carrito con opciones de modificar cantidad
 */
function Cart({ cart, onUpdateQty, onRemoveItem, onClearCart, total }) {
  return (
    <div className="cart-panel">
      <h3 className="cart-title">🛒 Tu Carrito</h3>

      {/* Lista de items */}
      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="cart-empty">Carrito vacío</p>
        ) : (
          cart.map((item) => (
            <div key={item.trackId} className="cart-item">
              {/* Información del item */}
              <div className="cart-item-info">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">
                  ${item.unitPrice.toFixed(2)} × {item.qty}
                </p>
              </div>

              {/* Controles de cantidad */}
              <div className="cart-item-controls">
                {/* Botón Menos */}
                <button
                  onClick={() => onUpdateQty(item.trackId, item.qty - 1)}
                  className="qty-btn"
                  title="Disminuir cantidad"
                >
                  −
                </button>

                {/* Cantidad */}
                <span className="qty-display">{item.qty}</span>

                {/* Botón Más */}
                <button
                  onClick={() => onUpdateQty(item.trackId, item.qty + 1)}
                  className="qty-btn"
                  title="Aumentar cantidad"
                >
                  +
                </button>

                {/* Botón Eliminar */}
                <button
                  onClick={() => onRemoveItem(item.trackId)}
                  className="btn-remove"
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
          <div className="cart-totals">
            <div className="cart-total-row">
              <span>Subtotal:</span>
              <span>${total}</span>
            </div>
            <div className="cart-total-final">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>

          {/* Botón Vaciar */}
          <button onClick={onClearCart} className="btn-clear">
            Vaciar Carrito
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;