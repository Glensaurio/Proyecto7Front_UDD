import { useReducer } from "react";
import PizzaReducer from "./PizzaReducer";
import PizzaContext from "./PizzaContext";
import axiosClient from "../../config/axios";

const PizzaState = (props) => {
  const initialState = {
    pizzas: [],
    currentPizza: {
      _id: null,
      idProd: "",
      name: "",
      img: [],
      prices: [],
      description: "",
      slug: "",
    },
  };

  const [globalState, dispatch] = useReducer(PizzaReducer, initialState);

  const getPizzas = async () => {
    try {
      const res = await axiosClient.get("/pizzas/readall");
      const pizzas = res.data.data;

      dispatch({
        type: "OBTENER_PIZZAS",
        payload: pizzas,
      });
    } catch (error) {
      console.error("Error al obtener las pizzas:", error);
      // Aquí podrías manejar el estado de error si deseas
    }
  };

  const getPizza = async (id) => {
    try {
      const res = await axiosClient.get(`/pizzas/readone/${id}`);
      dispatch({
        type: "OBTENER_PIZZA",
        payload: res.data.data,
      });
    } catch (error) {
      console.error("Error al obtener la pizza:", error);
      return;
    }
  };

  return (
    <PizzaContext.Provider
      value={{
        pizzas: globalState.pizzas,
        currentPizza: globalState.currentPizza,
        getPizzas,
        getPizza,
      }}
    >
      {props.children}
    </PizzaContext.Provider>
  );
};

export default PizzaState;
