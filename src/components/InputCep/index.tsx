//react/Countdown.tsx
import React, { useState } from "react";

interface InputCepProps {}

const InputCep: StorefrontFunctionComponent<InputCepProps> = ({}) => {
	const [valueInput, setValueInput] = useState(null);
	const [address, setAddress] = useState(null);

	const [error, setError] = useState({ isError: false, message: "" });

	const [loading, setLoading] = useState(false);

	const handleChange = (value) => {
		setValueInput(value);
	};

	const checkCep = async (e) => {
		setAddress("");
		const valueWithoutSpaces = e.replaceAll(/[^0-9]+/g, "");

		console.log(valueWithoutSpaces, "teste regex");
		setError({ isError: false, message: "" });
		setLoading(true);

		if (valueWithoutSpaces.length === 8) {
			await fetch(`https://viacep.com.br/ws/${valueWithoutSpaces}/json/`)
				.then((response) => {
					if (response.status === 500) {
						setError({ isError: true, message: "Servidor fora de serviço" });
						return;
					}
					return response.json();
				})
				.then((data) => {
					console.log(data);
					if (data.erro) {
						setError({ isError: true, message: "Cep não encontrado" });
						setLoading(false);
						return;
					}
					setError({ isError: false, message: "" });
					setAddress(data);
				})
				.then(() => setLoading(false))
				.catch((error) => console.log(error));

			return;
		}
		setError({ isError: true, message: "Cep Invalido" });
		setLoading(false);
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
			}}
		>
			<button onClick={() => checkCep(valueInput)}>Enviar</button>
			<input
				style={{
					margin: "1.5rem",
					padding: "1rem",
				}}
				value={address?.cep || null}
				onChange={(e) => handleChange(e.target.value)}
				type="text"
			/>
			{error?.isError && <div>{error?.message}</div>}
			{loading && <div>Loading...</div>}
			{address && (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
					}}
				>
					<input
						style={{
							margin: "1.5rem",
							padding: "1rem",
						}}
						type="text"
						value={address.bairro || null}
						placeholder="Bairro"
					/>
					<input
						style={{
							margin: "1.5rem",
							padding: "1rem",
						}}
						type="text"
						value={address.localidade || null}
						placeholder="Cidade"
					/>
					<input
						style={{
							margin: "1.5rem",
							padding: "1rem",
						}}
						type="text"
						value={address.logradouro || null}
						placeholder="Rua"
					/>
					<input
						style={{
							margin: "1.5rem",
							padding: "1rem",
						}}
						type="text"
						value={address.complemento || null}
						placeholder="Complemento"
					/>
					<input
						style={{
							margin: "1.5rem",
							padding: "1rem",
						}}
						type="text"
						value={address.numero || null}
						placeholder="Numero"
					/>
					<button onClick={() => setAddress("")}>Alterar CEP</button>
				</div>
			)}
		</div>
	);
};

//deixei padrão mesmo por que não tem muito oque customizar nesse app pelo site editor

InputCep.schema = {
	title: "editor.InputCep.title",
	description: "editor.InputCep.description",
	type: "object",
	properties: {},
};

export default InputCep;
