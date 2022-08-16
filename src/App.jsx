import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ImagenCripto from "./img/imagen-criptos.png";
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
	max-width: 900px;
	margin: 0 auto;
	width: 90%;
	@media (min-width: 992px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 2rem;
	}
`;

const Imagen = styled.img`
	max-width: 400px;
	width: 80%;
	margin: 100px 0 100px 0;
	display: block;
`;

const Heading = styled.h1`
	font-family: "Lato", sans-serif;
	color: #fff;
	text-align: center;
	font-weight: 700;
	margin-top: 80px;
	margin-bottom: 50px;
	font-size: 34px;
	&&::after {
		content: "";
		width: 100px;
		height: 6px;
		background-color: #66a2fe;
		display: block;
		margin: 10px auto 0 auto;
	}
`;

function App() {
	const [monedas, setMonedas] = useState({});
	const [resultado, setResultado] = useState({});
	const [cargando, setCargando] = useState(false);

	useEffect(() => {
		if (Object.keys(monedas).length > 0) {
			const cotizarCrypto = async () => {
				setCargando(true);
				setResultado({});
				const { moneda, cryptomoneda } = monedas;
				const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`;
				const respuesta = await fetch(URL);
				const datos = await respuesta.json();
				setResultado(datos.DISPLAY[cryptomoneda][moneda]);
				setCargando(false);
			};
			cotizarCrypto();
		}
	}, [monedas]);
	return (
		<Contenedor>
			<Imagen src={ImagenCripto} alt="imagen criptomodenas"></Imagen>
			<div>
				<Heading className="App">
					Cotiza Criptomonedas al instante
				</Heading>
				<Formulario setMonedas={setMonedas} />
				{cargando && <Spinner />}
				{resultado.PRICE && <Resultado resultado={resultado} />}
			</div>
		</Contenedor>
	);
}

export default App;
