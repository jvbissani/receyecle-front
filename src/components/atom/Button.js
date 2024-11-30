import React from "react";
import { Button } from "antd";

const ButtonComponent = ({ title, icon, onClick, style }) => {
	return (
		<Button
			onClick={onClick}
			type="default" // Define o tipo do botão como padrão (transparente)
			style={{
				display: "flex",
				flexDirection: "row",
				background: "#0fc700",
				color: "white", // Define a cor do texto como branca
				borderRadius: "7px", // Define o raio da borda como 5px
				border: "1px solid #0fc700", // Define a borda com uma linha sólida branca
				justifyContent: "center",
				alignItems: "center",
				alignContent: "center",
				fontSize: "16px",
				padding: "17px 20px",
				...style,
			}}
			icon={
				<span
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					{icon}
				</span>
			}
		>
			{title}
		</Button>
	);
};

export default ButtonComponent;
