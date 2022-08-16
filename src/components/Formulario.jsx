import { useState } from "react";
import Error from "./Error";
import styled from "@emotion/styled";
import useSelectMoneda from "../hooks/useSelectMoneda";
import { monedas } from "../data/monedas";
import { useEffect } from "react";

const InputSubmit = styled.input`
	background-color: #9497ff;
	border: none;
	width: 100%;
	padding: 10px;
	color: #fff;
	font-weight: 700;
	text-transform: uppercase;
	font-size: 20px;
	border-radius: 5px;
	transition: background-color 0.3s ease;
	margin-top: 30px;
	cursor: pointer;
	&:hover {
		background-color: #7a7dfe;
	}
`;

const Formulario = ({ setMonedas }) => {
	const [crpyto, setCrpyto] = useState([]);
	const [moneda, SelectMonedas] = useSelectMoneda("Elige tu moneda", monedas);
	const [cryptomoneda, Selectcryptomoneda] = useSelectMoneda(
		"Elige tu Cryptomoneda",
		crpyto,
	);
	const [error, setError] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if ([moneda, cryptomoneda].includes("")) {
			setError(true);
			return;
		}
		setError(false);
		setMonedas({ moneda, cryptomoneda });
	};
	useEffect(() => {
		const consultarAPI = async () => {
			const url =
				"https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
			const respuesta = await fetch(url);
			const data = await respuesta.json();
			const arrayCryptos = data.Data.map((crypto) => {
				const objeto = {
					id: crypto.CoinInfo.Name,
					nombre: crypto.CoinInfo.FullName,
				};
				return objeto;
			});
			setCrpyto(arrayCryptos);
		};
		consultarAPI();
	}, []);
	return (
		<>
			{error ? <Error>Todos los campos son obligatorios</Error> : null}
			<form onSubmit={handleSubmit}>
				<SelectMonedas />
				<Selectcryptomoneda />
				<InputSubmit type="submit" value="Cotizar" />
			</form>
		</>
	);
};

export default Formulario;
