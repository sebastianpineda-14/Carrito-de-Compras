import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Cargar productos al inicio
  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error al cargar productos", err));
  }, []);

  // Función para agregar producto al carrito
  const addToCart = (id) => {
    fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Producto agregado:", data);
        setCart(data.cart);
      })
      .catch(err => console.error("Error al agregar al carrito", err));
  };

  // Función para ver carrito
  const viewCart = () => {
    fetch("/api/cart")
      .then(res => res.json())
      .then(data => setCart(data))
      .catch(err => console.error("Error al cargar carrito", err));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Lista de Productos</h1>
      {products.map((p) => (
        <div key={p.id} style={{ marginBottom: "10px" }}>
          <span>{p.name} - ${p.price}</span>
          <button 
            onClick={() => addToCart(p.id)} 
            style={{ marginLeft: "10px" }}
          >
            Agregar al carrito
          </button>
        </div>
      ))}

      <hr />

      <h2>Carrito</h2>
      <button onClick={viewCart}>Ver carrito</button>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.name} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
}
