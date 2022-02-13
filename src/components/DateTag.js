import { useMemo } from 'react';
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";

const DateTag = ({createdAt}) => {
  const date = useMemo(() => {
      const date = new Date(createdAt);
      const distance = formatDistance(new Date(), date, { locale: es });
      const upperCaseFirstLetter = distance.charAt(0).toUpperCase()+distance.slice(1)
      const replacedString = upperCaseFirstLetter.replace("Alrededor de", "Hace")
      console.log("se dispara");
      return replacedString;
  },[createdAt]);
  return <span>{date}</span>;
};

export default DateTag