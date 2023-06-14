import logo from "./logo.svg";

import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [carros, setCarros] = useState([]);

  const [formulario, setFormulario] = useState({
    model: "",
    color: "#000000",
    year: 2023,
  });

  console.log(formulario);

  const buscarVeiculos = () => {
    fetch("http://localhost:5129/api/cars", {
      method: "GET",
    })
      .then((dados) => {
        return dados.json();
      })
      .then((resposta) => setCarros(resposta));
  };

  useEffect(() => {
    buscarVeiculos();
  }, []);

  const deletarCarro = (idDoCarro) => {
    fetch(`http://localhost:5129/api/cars/${idDoCarro}`, {
      method: "DELETE",
    }).then(() => {
      buscarVeiculos();
    });
  };

  const atualizarCarro = (idDoCarro, dadosDoCarro) => {
    fetch(`http://localhost:5129/api/cars/${idDoCarro}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosDoCarro),
    }).then(() => {
      buscarVeiculos();
    });
  };

  const buscarCarro = (idDoCarro) => {
    fetch(`http://localhost:5129/api/cars/${idDoCarro}`);
  };

  const criarCarro = (dadosDoCarro) => {
    fetch(`http://localhost:5129/api/cars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosDoCarro),
    }).then(() => {
      buscarVeiculos();
    });
  };

  return (
    <div>
      <ul>
        {carros.map((carro) => {
          return (
            <li key={carro.id}>
              <div>
                {carro.model} -{" "}
                <button onClick={() => deletarCarro(carro.id)}>Apagar</button>
              </div>
            </li>
          );
        })}
      </ul>
      <div>
        <h2>Criar um novo carro</h2>
        <fieldset>
          <label htmlFor="model">Modelo:</label>
          <input
            type="text"
            id="model"
            value={formulario.model}
            onChange={(event) =>
              setFormulario({ ...formulario, model: event.target.value })
            }
          />

          <label htmlFor="year">Ano:</label>
          <input
            type="number"
            id="year"
            value={formulario.year}
            onChange={(event) =>
              setFormulario({ ...formulario, year: event.target.valueAsNumber })
            }
          />

          <label htmlFor="color">Cor:</label>
          <input
            type="color"
            name="color"
            id="color"
            value={formulario.color}
            onChange={(event) =>
              setFormulario({ ...formulario, color: event.target.value })
            }
          />
        </fieldset>
        <button onClick={() => criarCarro(formulario)}>Enviar</button>
      </div>
    </div>
  );
};

export default App;
