import { useState } from "react";
import Link from "next/link";

// Función para encontrar la mejor combinación de productos
function findBestCombination(products, budget) {
  let best = [];
  let bestTotal = 0;

  const totalComb = 1 << products.length; // 2^n combinaciones
  for (let mask = 0; mask < totalComb; mask++) {
    let current = [];
    let sum = 0;

    for (let i = 0; i < products.length; i++) {
      if (mask & (1 << i)) {
        sum += products[i].price;
        current.push(products[i]);
      }
    }

    if (sum <= budget && sum > bestTotal) {
      best = current;
      bestTotal = sum;
    }
  }

  return best;
}

export default function BestCombinationPage() {
  const [budget, setBudget] = useState(150);
  const [result, setResult] = useState([]);

  const products = [
    { id: 1, name: "Producto 1", price: 60 },
    { id: 2, name: "Producto 2", price: 100 },
    { id: 3, name: "Producto 3", price: 120 },
    { id: 4, name: "Producto 4", price: 70 }
  ];

  const totalAll = products.reduce((acc, p) => acc + p.price, 0);

  const handleCalculate = (e) => {
    e.preventDefault();

    // Si el presupuesto alcanza para todo, devolvemos todos los productos
    if (budget >= totalAll) {
      setResult(products);
    } else {
      const best = findBestCombination(products, budget);
      setResult(best);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Mejor combinación de productos</h1>

      <form onSubmit={handleCalculate} style={{ marginBottom: "20px" }}>
        <label>
          Presupuesto:
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
        <button type="submit" style={{ marginLeft: "10px" }}>
          Calcular
        </button>
      </form>

      {result.length > 0 ? (
        <div>
          <h2>Productos seleccionados:</h2>
          <ul>
            {result.map((p) => (
              <li key={p.id}>
                {p.name} - ${p.price}
              </li>
            ))}
          </ul>
          <p>
            Total: ${result.reduce((acc, p) => acc + p.price, 0)}
          </p>

          {budget >= totalAll && (
            <p style={{ color: "green" }}>
              ✔ Con este presupuesto puedes comprar todos los productos.
            </p>
          )}
        </div>
      ) : (
        <p>Ingrese un presupuesto y calcule para ver resultados.</p>
      )}

      <Link href="/">
        <button style={{ marginTop: "20px" }}>Volver a productos</button>
      </Link>
    </div>
  );
}
