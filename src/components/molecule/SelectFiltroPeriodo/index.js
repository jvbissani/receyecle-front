import { useEffect, useState } from "react";
import { Col, Select, DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

export default function SelectFiltroPeriodo(props) {
	const {
		title,
		defaultValue,
		personalizedValue,
		onChange,
		colSpan,
		rangePicker,
		personalizedState,
	} = props;

	const [isPersonalizado, setIsPersonalizado] = useState(
		defaultValue ? defaultValue === 8 : false,
	);

	const filtrosData = [
		{
			id: 1,
			label: "Hoje",
			start: moment().startOf("day").format(),
			end: moment().endOf("day").format(),
		},
		{
			id: 2,
			label: "Última semana",
			start: moment().startOf("week").format(),
			end: moment().endOf("week").format(),
		},
		{
			id: 3,
			label: "Este mês",
			start: moment().startOf("month").format(),
			end: moment().endOf("month").format(),
		},
		{
			id: 4,
			label: "Últimos 40 dias",
			start: moment().subtract(40, "days").format(),
			end: moment().endOf("day").format(),
		},
		{
			id: 5,
			label: "Último semestre",
			start: moment().subtract(6, "months").format(),
			end: moment().endOf("month").format(),
		},
		{
			id: 6,
			label: "Último ano",
			start: moment().startOf("year").format(),
			end: moment().endOf("year").format(),
		},
		{
			id: 7,
			label: "Total",
			start: moment().subtract(100, "years").format(),
			end: moment().endOf("day").format(),
		},
		{
			id: 8,
			label: "Selecionar período",
			start: "",
		},
	];

	function onChangeSelect(values) {
		if (rangePicker) onChange(values);
		else onChange(values.start || values);
	}

	const personalizedProps = {
		...(personalizedValue
			? {
					defaultValue: rangePicker
						? [
								moment(personalizedValue[0]),
								moment(personalizedValue[1]),
						  ]
						: moment(personalizedValue),
			  }
			: {}),
	};

	useEffect(() => {
		if (personalizedState) {
			personalizedState(isPersonalizado);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPersonalizado]);

	return (
		<>
			<Col
				span={colSpan || 6}
				style={{
					textAlign: "left",
				}}
			>
				{title && <label htmlFor="FiltroDataSelect">{title}</label>}
				<Select
					id="FiltroDataSelect"
					style={{ width: "100%" }}
					listHeight={400}
					filterOption={(input, option) =>
						option.nome
							.toLowerCase()
							.indexOf(input.toLowerCase()) >= 0
					}
					showSearch={true}
					defaultValue={defaultValue || 3}
					onChange={(value) => {
						const filtro = filtrosData.find(
							(filtro) => filtro.id === value,
						);

						if (filtro.start !== "") {
							onChangeSelect({
								id: filtro.id,
								start: filtro.start,
								end: filtro.end,
							});
							setIsPersonalizado(false);
						} else {
							setIsPersonalizado(true);
						}
					}}
				>
					{filtrosData.map((item) => (
						<Select.Option key={item.id} value={item.id}>
							{item.label}
						</Select.Option>
					))}
				</Select>
			</Col>
			{isPersonalizado && (
				<Col
					span={colSpan || 6}
					style={{
						textAlign: "left",
					}}
				>
					{title && (
						<label htmlFor="FiltroDataRangePicker">Período: </label>
					)}
					{rangePicker && (
						<RangePicker
							id="FiltroDataRangePicker"
							style={{ width: "100%" }}
							format="DD/MM/YYYY"
							{...personalizedProps}
							onChange={(value) => {
								if (value)
									onChangeSelect({
										id: 8,
										start: value[0].startOf("day").format(),
										end: value[1].endOf("day").format(),
									});
							}}
						/>
					)}
					{!rangePicker && (
						<DatePicker
							style={{ width: "100%" }}
							format="DD/MM/YYYY"
							{...personalizedProps}
							onChange={(value) => {
								if (value) onChangeSelect(value.format());
							}}
						/>
					)}
				</Col>
			)}
		</>
	);
}
