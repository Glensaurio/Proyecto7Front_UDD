import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/User/UserContext";

export default function Home() {
  const userCtx = useContext(UserContext);
  const { cart, sessionURL, getCheckoutSession, editCart } = userCtx;
  const [total, setTotal] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    getCheckoutSession();
  };

  useEffect(() => {
    if (sessionURL) window.location.href = sessionURL;
  }, [sessionURL]);

  useEffect(() => {
    const reduceTotalFromOrder = () => {
      return cart.reduce((acc, cv) => {
        const updatedQuantity = (cv.price / 100) * cv.quantity;
        return updatedQuantity + acc;
      }, 0);
    };

    const getOrderDetails = () => {
      const total = reduceTotalFromOrder();
      setTotal(total);
    };

    getOrderDetails();
  }, [cart]);

  const handleChange = (e) => {
    const updatedCart = cart.map((elt) => {
      return elt.priceID === e.target.name
        ? { ...elt, quantity: parseInt(e.target.value) }
        : elt;
    });

    editCart(updatedCart);
  };

  const handleRemove = (e, currentPriceID) => {
    e.preventDefault();
    const updatedCart = cart.filter((elt) => elt.priceID !== currentPriceID);
    editCart(updatedCart);
  };

  return (
    <>
      <div className="max-w-4xl mx-4 py-8 md:mx-auto">
        <h1 className="text-3xl font-bold mt-8 text-green-600">Bienvenido a Nuestra Pizzería</h1>
        <Link to="/pizzas" className="mt-4 inline-block text-green-500 underline">
          Ver Menú
        </Link>

        <h2 className="text-3xl font-bold mt-8 text-green-600">Carrito</h2>

        <form className="mt-12">
          <ul>
            {cart.map((e) => (
              <li key={e.id} className="flex py-10">
                <figure>
                  <img
                    src={e.img}
                    alt={e.name}
                    className="checkout-figure-img"
                  />
                </figure>

                <div className="relative ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                  <div className="flex justify-between sm:grid sm:grid-cols-2">
                    <div className="pr-6">
                      <h3 className="text-sm">
                        <Link
                          to={`/pizzas/${e.slug}`}
                          className="underline font-medium text-green-500"
                        >
                          {e.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{e.size}</p>
                    </div>

                    <p className="text-sm font-medium text-gray-900 text-right">
                      ${((e.price / 100) * e.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center sm:block sm:absolute sm:top-0 sm:left-1/2 sm:mt-0">
                    <select
                      id={`quantity-${e.id}`}
                      name={e.priceID}
                      onChange={handleChange}
                      className="block border border-gray-300 px-2 py-1 text-sm focus:ring-green-500 focus:border-green-500"
                    >
                      {Array(5)
                        .fill(null)
                        .map((_, i) => {
                          const initial = i + 1;
                          return (
                            <option key={initial} value={initial} selected={initial === e.quantity}>
                              {initial}
                            </option>
                          );
                        })}
                    </select>

                    <button
                      type="button"
                      onClick={(evt) => handleRemove(evt, e.priceID)}
                      className="text-sm font-sm ml-4 md:ml-0 mt-2 text-green-500 hover:text-green-600 transition duration-200"
                    >
                      <span>Eliminar</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-gray-100 px-4 py-6 sm:p-6 lg:p-8">
            <div>
              <dl className="-my-4 text-sm ">
                <div className="py-4 flex items-center justify-between">
                  <dt className="font-bold">Total</dt>
                  <dd>${total.toFixed(2)}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-10">
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-500 transition duration-200"
            >
              Procesar pago
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
