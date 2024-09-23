import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/User/UserContext";

export default function Login() {
  const ctx = useContext(UserContext);
  const { loginUser } = ctx;

  const [logUser, setLogUser] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setLogUser({
      ...logUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(logUser);
    if (res) setErrorMsg(res);
  };

  return (
    <>
      <section className="flex flex-col justify-center py-8 mx-auto">
        <h2 className="text-center text-3xl font-bold mt-8 text-green-600">Iniciar sesión</h2>
        <p className="mt-2 text-center text-sm">
          ¿Aún sin cuenta? &nbsp;
          <Link to="/registro">
            <span className="font-medium text-green-500 underline">
              Regístrate
            </span>
          </Link>
        </p>
      </section>

      <section className="mt-8 px-4 mx-auto w-full max-w-md">
        <div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Tu correo electrónico
              </label>
              <div className="mt-1">
                <input
                  onChange={handleChange}
                  name="email"
                  type="email"
                  className="block w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Tu contraseña
              </label>
              <div className="mt-1">
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  className="block w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
            </div>

            <div>
              <button type="submit" className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-500 transition duration-200">
                Acceder a tu cuenta
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
