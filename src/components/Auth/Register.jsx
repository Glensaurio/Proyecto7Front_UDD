import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/User/UserContext";

export default function Register() {
  const ctx = useContext(UserContext);
  const { registerUser } = ctx;

  const [newUser, setNewUser] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmarpassword: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newUser.password !== newUser.confirmarpassword) {
      return setErrorMsg("Tu contraseña de confirmación no coincide. Revisa nuevamente.");
    }

    const res = await registerUser(newUser);
    if (res) setErrorMsg(res);
  };

  return (
    <>
      <section className="flex flex-col justify-center py-8 mx-auto">
        <h2 className="text-center text-3xl font-bold mt-8 text-green-600">Crea tu cuenta</h2>
        <p className="mt-2 text-center text-sm">
          ¿Ya tienes cuenta? &nbsp;
          <Link to="/iniciar-sesion">
            <span className="font-medium text-green-500 underline">Inicia sesión</span>
          </Link>
        </p>
      </section>

      <section className="mt-8 px-4 mx-auto w-full max-w-md">
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                onChange={handleChange}
                name="nombre"
                type="text"
                className="block w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                onChange={handleChange}
                name="email"
                type="email"
                className="block w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                onChange={handleChange}
                name="password"
                type="password"
                className="block w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmarpassword" className="block text-sm font-medium text-gray-700">Confirma tu contraseña</label>
              <input
                onChange={handleChange}
                name="confirmarpassword"
                type="password"
                className="block w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div className="py-4">
              <button type="submit" className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-500 transition duration-200">
                Crear cuenta
              </button>
            </div>

            <div>
              <p className="text-center text-red-600">{errorMsg}</p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
