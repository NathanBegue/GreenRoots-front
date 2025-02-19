
import { useEffect, useState } from "react";
import fetchmethod from "../../fetch/method-fetch";
import SuivisArbre from "../layout/SuivisArbre";
import { Itracking } from "../../../type/type";

export default function SuivisArbresUser({ isDarkMode }: { isDarkMode: boolean }) {

  const [ordersTracking, setOrderstraking] = useState<Itracking[]>([]);

  useEffect(() => {

    fetchmethod.getHistoryByUser().then((data: Itracking[]) => setOrderstraking(data));
  }, []);


  return (
    <div className={`pt-40 w-full h-full pb-40 ${!isDarkMode && "bg-light-primary text-black"}`}>
      <h1> { }</h1>

      <>
        <SuivisArbre />
      </>
    </div>
  )
}

