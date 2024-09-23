import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PizzaContext from "../../../context/Pizza/PizzaContext";
import UserContext from "../../../context/User/UserContext";
import AlertContext from "../../../context/Alert/AlertContext";

export default function Single() {
  const params = useParams();
  const { slug } = params;

  const pizzaCtx = useContext(PizzaContext);
  const { currentPizza, getPizza } = pizzaCtx;
  const { name, description, img, prices } = currentPizza;

  const userCtx = useContext(UserContext);
  const { authStatus, cart, editCart, getCart } = userCtx;
  const alertCtx = useContext(AlertContext);
  const { setShowOn } = alertCtx;

  const [form, setForm] = useState([]);
  const [localPrices, setLocalPrices] = useState([]);

  useEffect(() => {
    const fetchPizza = async () => {
      await getCart();
    };
    fetchPizza();
    getPizza(slug);
  }, []);

  useEffect(() => {
    if (!currentPizza.id) return;
    const updatedPrices = currentPizza.prices.map((price) => {
      const itemInCart = cart.find((item) => item.priceID === price.id);
      return { ...price, quantity: itemInCart ? itemInCart.quantity : 0 };
    });
    setLocalPrices(updatedPrices);
    setForm(cart);
  }, [prices, cart]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (value === "0") {
      setForm((prev) => prev.filter((item) => item.priceID !== name));
    } else {
      const newData = {
        priceID: name,
        priceDescription: e.target.getAttribute("data-pizza-pricedescription"),
        size: e.target.getAttribute("data-pizza-size"),
        name: e.target.getAttribute("data-pizza-name"),
        quantity: value,
        price: e.target.getAttribute("data-pizza-price"),
        img: e.target.getAttribute("data-pizza-img"),
        slug: e.target.getAttribute("data-pizza-slug"),
      };
      setForm((prev) => {
        const index = prev.findIndex((item) => item.priceID === name);
        return index === -1 ? [...prev, newData] : prev.map((item) => (item.priceID === name ? newData : item));
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resMsg = await editCart(form);
    setShowOn({
      show: true,
      msg: resMsg,
      cta: "Ver carrito",
      ctaURL: "/carrito",
    });
  };

  if (!prices) return null;

  const quantityOptions = [0, 1, 2, 3, 4, 5];

  return (
    <main className="max-w-7xl mx-auto pt-16 pb-24 px-4 lg:grid lg:grid-cols-2 lg:gap-x-16">
      <section>
        <h1 className="text-4xl font-bold text-green-600">{name}</h1>
        <p className="text-gray-500 mt-4">{description}</p>
      </section>

      <figure className="mt-8 col-start-2 row-span-2">
        <img src={img[0]} alt={description} className="w-full object-center object-cover" />
      </figure>

      <div className="mt-10 max-w-lg col-start-1">
        <section>
          <form onSubmit={handleSubmit}>
            <div className="sm:flex sm:justify-between">
              <fieldset>
                <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {localPrices.map((e) => (
                    <div key={e.id}>
                      <label className="block border border-gray-300 p-4 rounded-lg focus:outline-none hover:shadow-lg transition-shadow duration-200">
                        <p className="text-base font-medium text-gray-900">{e.size}</p>
                        <p className="mt-1 text-sm text-gray-500">{e.priceDescription}</p>
                        <p className="mt-1 text-sm text-gray-500">${(e.price / 100).toFixed(2)}</p>

                        {authStatus && (
                          <select
                            className="w-full mt-4 mb-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                            name={e.id}
                            data-pizza-name={name}
                            data-pizza-size={e.size}
                            data-pizza-pricedescription={e.priceDescription}
                            data-pizza-price={e.price}
                            data-pizza-img={img[0]}
                            data-pizza-slug={slug}
                            onChange={handleChange}
                          >
                            {quantityOptions.map((elt) => (
                              <option key={elt} value={elt} selected={elt === e.quantity}>
                                {elt}
                              </option>
                            ))}
                          </select>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="mt-10">
              {authStatus ? (
                <button type="submit" className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-500 transition duration-200">
                  {cart.length !== 0 ? "Modificar carrito" : "Agregar al carrito"}
                </button>
              ) : (
                <Link to="/registro">
                  <button type="button" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-500 transition duration-200">
                    Regístrate para crear un carrito
                  </button>
                </Link>
              )}
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
