# Prueba Técnica — API y Carrito de Compras

Este proyecto implementa una API básica y un frontend en **Next.js** para gestionar productos y un carrito de compras.  
Además, incluye una función para encontrar la mejor combinación de productos bajo un presupuesto máximo.

---

## 🚀 Instrucciones de instalación y ejecución

1. Clonar este repositorio:

   ```bash
   git clone <https://github.com/sebastianpineda-14/Carrito-de-Compras>
   cd prueba-tecnica


Instalar dependencias:

npm install


Ejecutar en modo desarrollo:

npm run dev


Abrir en el navegador:

👉 http://localhost:3000


📌 Breve descripción de la solución

La solución se divide en tres partes, de acuerdo con lo solicitado en la prueba:

1. Backend (API)

/api/products: devuelve una lista estática de productos.

/api/cart: permite agregar productos al carrito con POST y consultar el carrito con GET.

Los datos se mantienen en memoria (no hay base de datos).


2. Frontend

Página principal (/): muestra la lista de productos y permite agregarlos al carrito.

Página del carrito (/cart): muestra los productos seleccionados.

Página de mejor combinación (/best-combination): utiliza la lógica de presupuesto para mostrar los productos que maximizan el valor sin exceder un monto dado.

Estilos: se incluyó un CSS global sencillo para dar formato a los elementos.


3. Lógica adicional

Implementación de la función findBestCombination(products, budget) que, dado un presupuesto, encuentra la combinación de productos con el mayor valor posible sin excederlo.

Esta lógica se muestra en la página /best-combination.

📖 Notas

El carrito se reinicia cada vez que se reinicia el servidor, ya que no hay persistencia en base de datos.

No se incluyó autenticación ni manejo de stock, tal como lo indicaba el enunciado.


---
