export const formatarData = (data: string) => {
  if (!data) {
    data = new Date().toString();
  }
  const dataObj = new Date(data);
  const options: Intl.DateTimeFormatOptions = {
    minute: "2-digit",
    hour: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return dataObj.toLocaleDateString("pt-br", options);
};

export function imprimeDataInput(data: string) {
  let dataConvertida;
  if (data) {
    dataConvertida = new Date(data);
  }

  const ten = function (i: any) {
    return (i < 10 ? "0" : "") + i;
  };

  if (dataConvertida != undefined) {
    const YYYY = dataConvertida.getFullYear();
    const MM = ten(dataConvertida.getMonth() + 1);
    const DD = ten(dataConvertida.getDate());
    const HH = ten(dataConvertida.getHours());
    const II = ten(dataConvertida.getMinutes());
    return YYYY + "-" + MM + "-" + DD + "T" + HH + ":" + II;
  }
}
