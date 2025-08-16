let cart = [];
const products = [
  { id: 1, name: "Producto 1", price: 100 },
  { id: 2, name: "Producto 2", price: 200 },
  { id: 3, name: "Producto 3", price: 60 },
  { id: 4, name: "Producto 4", price: 70 }
];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { id } = req.body;
    const product = products.find(p => p.id === id);
    if (product) cart.push(product);
    return res.status(200).json({ message: "Producto agregado", cart });
  }

  if (req.method === "GET") {
    return res.status(200).json(cart);
  }

  res.status(405).json({ message: "Método no permitido" });
}
