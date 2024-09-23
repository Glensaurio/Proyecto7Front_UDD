import { useState, useContext, useEffect } from "react";
import UserContext from "../../context/User/UserContext";
import AlertContext from "../../context/Alert/AlertContext";

export default function Profile() {
  const alertCtx = useContext(AlertContext);
  const { setShowOn } = alertCtx;

  const userCtx = useContext(UserContext);
  const { userSubmitForm } = userCtx;
  const { name, lastname, email, country, address, zipcode, receipts } = userCtx.currentUser;

  const [userForm, setUserForm] = useState({
    name: "",
    lastname: "",
    country: "",
    address: "",
    zipcode: "",
  });

  useEffect(() => {
    setUserForm({ name, lastname, country, address, zipcode });
  }, [name, lastname, country, address, zipcode]);

  const handleChange = (event) => {
    setUserForm({
      ...userForm,
      [event.target.name]: event.target.value,
    });
  };

  const sendData = async (event) => {
    event.preventDefault();
    await userSubmitForm(userForm);
    setShowOn({
      show: true,
      msg: "Usuario actualizado",
      cta: "Cerrar",
      ctaURL: "/perfil",
    });
  };

  return (
    <div className="mx-auto py-4 px-8 max-w-7xl">
      <div className="space-y-16">
        <section>
          <form onSubmit={sendData}>
            <div>
              <h2 className="text-3xl font-bold mt-8">Tu perfil</h2>
              <p className="mt-2 mb-8 text-sm">
                Recuerda que estás en un proyecto académico. No coloques información real. 😉
              </p>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="col-span-1 sm:col-span-1">
                  <label className="form-label">Tu nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={userForm.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="col-span-1 sm:col-span-1">
                  <label className="form-label">Tu apellido</label>
                  <input
                    type="text"
                    name="lastname"
                    value={userForm.lastname}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="col-span-1 sm:col-span-1">
                  <label className="form-label">Tu email</label>
                  <input
                    disabled
                    type="email"
                    name="email"
                    value={email}
                    className="form-input"
                  />
                </div>

                <div className="col-span-1 sm:col-span-1">
                  <label className="form-label">Tu país</label>
                  <input
                    type="text"
                    name="country"
                    value={userForm.country}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="col-span-1 sm:col-span-1">
                  <label className="form-label">Código postal</label>
                  <input
                    type="number"
                    name="zipcode"
                    value={userForm.zipcode}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="col-span-1 sm:col-span-2">
                  <label className="form-label">Dirección</label>
                  <input
                    type="text"
                    name="address"
                    value={userForm.address}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="mt-8">
                <button type="submit" className="form-button w-auto">
                  Guardar cambios
                </button>
              </div>
            </div>
          </form>
        </section>

        <section>
          <h2 className="text-3xl font-bold mt-8">Historial de Pagos</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="table-head">Fecha</th>
                  <th className="table-head">ID Recibo</th>
                  <th className="table-head">Cantidad pagada</th>
                  <th className="table-head">Enlace a recibo</th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((e) => (
                  <tr key={e.receiptID}>
                    <td className="billing-text-row">
                      <time dateTime={e.date_created}>
                        {new Date(e.date_created * 1000).toLocaleString()}
                      </time>
                    </td>
                    <td className="billing-text-row underline">
                      <a href={e.receiptURL} target="_blank" className="text-brand-light-purple" rel="noreferrer">
                        Ver recibo
                      </a>
                    </td>
                    <td className="billing-text-row">{e.receiptID}</td>
                    <td className="billing-text-row">${(e.amount / 100).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
