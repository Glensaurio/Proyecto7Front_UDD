import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import PizzaContext from "../../../context/Pizza/PizzaContext";

export default function List() {
  const pizzaCtx = useContext(PizzaContext);
  const { pizzas, getPizzas } = pizzaCtx;

  useEffect(() => {
    getPizzas();
  }, []);

  return (
    <>
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold text-green-600 text-center mb-8">Nuestro Menú</h1>
        <div className="grid grid-cols-1 gap-y-4 gap-x-12 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3">
          {pizzas.length === 0 ? (
            <p className="text-center">No hay pizzas aún</p>
          ) : (
            pizzas.map((e) => (
              <div key={e._id} className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                <Link to={`/pizzas/${e.slug}`}>
                  <img
                    src={e.img[0]}
                    alt={e.description}
                    className="w-full h-64 object-center object-cover"
                  />
                </Link>
                <div className="flex-1 p-4 space-y-2 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900">{e.name}</h3>
                  <p className="text-gray-500">{e.description}</p>
                  <Link to={`/pizzas/${e.slug}`} className="btn-product">
                    <button type="button" className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-500 transition duration-200">
                      Ver pizza
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
