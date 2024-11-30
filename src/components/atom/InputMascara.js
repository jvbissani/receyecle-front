import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";

export default function InputMascara(props) {
	const { value, onChange, onKeyUp, mask, placeholder } = props;

	const [maskAtual, setMaskAtual] = useState("");
	const [valueAtual, setValueAtual] = useState(null);

	const setupMask = () => {
		if (typeof mask === "string") {
			setMaskAtual(mask);
			return;
		}

		if (typeof mask !== "object") return;

		const chaves = Object.keys(mask).sort();

		for (const chave of chaves) {
			const chaveInteiro = parseInt(chave);

			if (valueAtual?.length <= chaveInteiro) {
				setMaskAtual(mask[chave]);
				break;
			}
		}
	};

	const removerFormatacao = (value) => {
		if (!value) return "";
		return value
			.replace(/\(/g, "")
			.replace(/\)/g, "")
			.replace(/\./g, "")
			.replace(/-/g, "")
			.replace(/ /g, "")
			.replace(/\//g, "");
	};

	useEffect(() => {
		if (value !== undefined) setValueAtual(removerFormatacao(value));
	}, [mask, value]);

	useEffect(() => {
		setupMask();
		if (valueAtual !== null) onChange(valueAtual);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [valueAtual]);

	const onChangeMask = (e) => {
		setValueAtual(removerFormatacao(e.target.value));
	};

	const onKeyUpFunction = (event) => {
		if (!onKeyUp) return;

		const text = event.target.value;
		onKeyUp(removerFormatacao(text));
	};

	return (
		<InputMask
			mask={maskAtual}
			style={{
				width: "100%",
				height: 40,
				borderColor: "#d9d9d9",
				borderWidth: 1,
				borderStyle: "solid",
				borderRadius: 6,
				padding: "4px 11px",
				background: "#fff",
				color: "rgb(185, 185, 185)",
			}}
			className="ant-input"
			value={valueAtual}
			onChange={onChangeMask}
			onKeyUp={onKeyUpFunction}
			maskChar=""
			placeholder={placeholder}
		/>
	);
}
