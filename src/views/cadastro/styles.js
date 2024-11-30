const styles = {
	container: {
		display: "flex",
		height: "100vh",
	},
	sidebar: {
		backgroundColor: "#9FD9B3",
		width: "878px",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	logo: {
		maxWidth: "35%",
		maxHeight: "35%",
	},
	formContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
	formCard: {
		backgroundColor: "white",
		padding: "30px",
		borderRadius: "8px",
		boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
		maxWidth: "400px",
		width: "100%",
		textAlign: "center",
	},
	title: {
		color: "#000000",
		fontWeight: "bold",
		fontSize: 28,
	},
	form: {
		marginTop: 20,
		width: "100%",
	},
	inputForm: {
		height: 40,
		width: "100%",
		border: "1px solid #ccc",
		borderRadius: 4,
		padding: "0 10px",
		outline: "none",
		transition: "border-color 0.3s ease",
		background: "#F5F5F5",
	},
	buttonForm: {
		background: "#98C4A8",
		border: "none",
		fontWeight: "bold",
		color: "#fff",
		width: 250,
		height: 40,
		marginTop: 20,
	},
	link: {
		color: "#98C4A8",
		textDecoration: "none",
		fontWeight: "bold",
	},
	textLeft: {
		color: "#000",
		margin: 0,
	},
	row: {
		marginTop: 20,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
	},
	buttonRow: {
		display: "flex",
		justifyContent: "center",
	},
}

export default styles
