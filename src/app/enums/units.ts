export interface Unit{
  label: string,
  value: string
}
export const unitList: Unit[] = [
  {label: "pcs", value: "pcs"},
  {label: "g", value: "g"},
  {label: "Kg", value: "kg"},
  {label: "ml", value: "ml"},
  {label: "L", value: "l"},
  {label: "cup", value: "cup"},
  {label: "spoon", value: "spoon"},
  {label: "tea spoon", value: "teaSpoon"}
];

export const findUnitLabel = (unitValue: string) => {
  const res = unitList.find(unit => unit.value === unitValue)
  return res? res.label : null
}
