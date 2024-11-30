import React from "react";
import InputMascara from "./InputMascara";

export default function InputCpfCnpj(props) {
	const { value, onChange } = props;

	return (
		<InputMascara
			mask={{
				11: "999.999.999-999",
				15: "99.999.999/9999-99",
			}}
			value={value}
			onChange={onChange}
			placeholder="CPF/CNPJ*"
		/>
	);
}
