import React from "react";
import InputMascara from "./InputMascara";

export default function InputTelefoneCelular(props) {
	const { value, onChange } = props;

	return (
		<InputMascara
			mask={{
				10: "(99) 9999-99999",
				11: "(99) 9 9999-9999",
				12: "(99) 9999-9999",
			}}
			value={value}
			onChange={onChange}
			placeholder="Telefone/Celular*"
		/>
	);
}
