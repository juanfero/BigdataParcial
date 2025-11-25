# main.py
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db  # tu archivo de conexión a RDS
from sqlalchemy import text

from database import get_db

app = FastAPI()

# Cambia esto por la URL de tu front (por ahora usa * para pruebas)
origins = [
    "http://localhost:5173",  # tu front (Vite)
    # Cuando lo subas a EC2, aquí agregas algo como:
    # "http://TU_IP_O_DOMINIO",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # 👈 importante
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/tracks")
def get_tracks(limit: int = 50, db: Session = Depends(get_db)):
    """
    Devuelve algunas canciones de la tabla Track
    """
    # Usando SQL directo por simplicidad
    result = db.execute(
        text("SELECT TrackId, Name, UnitPrice FROM Track LIMIT :limit"),
        {"limit": limit}
    )
    tracks = [
        {"track_id": row.TrackId, "name": row.Name, "price": float(row.UnitPrice)}
        for row in result
    ]
    return tracks


@app.post("/comprar")
def comprar_track(track_id: int, customer_id: int = 1, db: Session = Depends(get_db)):
    """
    Registra una compra muy simplificada:
    - Crea un invoice (factura) y un invoice line
    """
    # OJO: esto es un ejemplo simple para el parcial, no producción
    # 1. Obtener info del track
    track = db.execute(
        text("SELECT TrackId, UnitPrice FROM Track WHERE TrackId = :tid"),
        {"tid": track_id}
    ).fetchone()

    if track is None:
        raise HTTPException(status_code=404, detail="Track no encontrado")

    unit_price = float(track.UnitPrice)

    # 2. Crear Invoice (factura)
    # para el ejemplo usamos siempre el mismo customer_id
    invoice_sql = text("""
        INSERT INTO Invoice (CustomerId, InvoiceDate, BillingAddress, BillingCity, Total)
        VALUES (:customer_id, NOW(), 'Fake address', 'Fake city', :total)
    """)
    db.execute(invoice_sql, {"customer_id": customer_id, "total": unit_price})

    # obtener el último id insertado
    invoice_id = db.execute(text("SELECT LAST_INSERT_ID() as id")).fetchone().id

    # 3. Crear InvoiceLine
    invoice_line_sql = text("""
        INSERT INTO InvoiceLine (InvoiceId, TrackId, UnitPrice, Quantity)
        VALUES (:invoice_id, :track_id, :unit_price, 1)
    """)
    db.execute(
        invoice_line_sql,
        {"invoice_id": invoice_id, "track_id": track_id, "unit_price": unit_price},
    )

    db.commit()

    return {
        "message": "Compra realizada",
        "invoice_id": invoice_id,
        "track_id": track_id,
        "total": unit_price,
    }
