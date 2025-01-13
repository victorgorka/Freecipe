import "../App.css";
import { useState } from "react";
import { validateEmail } from "../utils/utils";

const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};

function Registro() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [actividad, setActividad] = useState("actividad");
  const [genero, setGenero] = useState("");  // Gender state
  const [terminos, setTerminos] = useState(false);  // Terms acceptance state

  const getIsFormValid = () => {
    return (
      firstName &&
      validateEmail(email) &&
      password.value.length >= 8 &&
      actividad !== "actividad" &&
      genero &&  // Ensure gender is selected
      terminos // Ensure terms are accepted
    );
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setAltura("");
    setPeso("");
    setPassword({
      value: "",
      isTouched: false,
    });
    setActividad("actividad");
    setGenero(""); // Clear gender
    setTerminos(false); // Uncheck terms
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cuenta creada!");
    clearForm();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h1>
            <u>Pahkomé!</u>
          </h1>
          <div className="Field">
            <input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder="Nombre"
            />

            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);  // Corrected to setLastName instead of setFirstName
              }}
              placeholder="Apellidos"
            />
          </div>
          <div className="Field">
            <input
              value={altura}
              onChange={(e) => {
                setAltura(e.target.value);
              }}
              placeholder="Altura(m)"
            />
            <input
              value={peso}
              onChange={(e) => {
                setPeso(e.target.value);
              }}
              placeholder="Peso(kg)"
            />
          </div>
          <div className="Field">
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Correo"
            />
          </div>
          <div className="Field">
            <input
              value={password.value}
              type="password"
              onChange={(e) => {
                setPassword({ ...password, value: e.target.value });
              }}
              onBlur={() => {
                setPassword({ ...password, isTouched: true });
              }}
              placeholder="Contraseña"
            />
            {password.isTouched && password.value.length < 8 ? (
              <PasswordErrorMessage />
            ) : null}
          </div>
          <div className="Field-col">
            <label>
              Actividad física <sup>*</sup>
            </label>
            <select
              value={actividad}
              onChange={(e) => setActividad(e.target.value)}
            >
              <option value="actividad">Seleccionar actividad</option>
              <option value="ligera">Ligera</option>
              <option value="moderada">Moderada</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          <div className="Field">
            <label htmlFor="hombre">Hombre</label>
            <input
              type="radio"
              id="hombre"
              name="genero"
              value="hombre"
              checked={genero === "hombre"}
              onChange={(e) => setGenero(e.target.value)}
            />
            <label htmlFor="mujer">Mujer</label>
            <input
              type="radio"
              id="mujer"
              name="genero"
              value="mujer"
              checked={genero === "mujer"}
              onChange={(e) => setGenero(e.target.value)}
            />
          </div>
          <div className="Field">
            <input
              type="checkbox"
              id="terminos"
              name="terminos"
              checked={terminos}
              onChange={(e) => setTerminos(e.target.checked)}
              required
            />
            <label htmlFor="terminos">
              Acepto <span>Términos & Condiciones</span>
            </label>
          </div>
          <button type="submit" disabled={!getIsFormValid()}>
            Crear cuenta
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Registro;
