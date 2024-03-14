import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import PaperSidebar from "../../components/PaperSidebar";
import Chart from "../../components/Chart";

import { formattingResponse, formattingChartData } from "../../utils/utils";
import { usePaperListStore } from "../../stores/paper";
import API from "../../utils/configAPI";

const CLASS_FLOATING_BUTTON = "bg-violet-500 absolute p-8 rounded-full shadow-xl top-30 right-30 text-32 text-white";

function ViewPage() {
  const navigator = useNavigate();
  const [data, setData] = useState([]);
  const { collectionId } = useParams();
  const { paperList } = usePaperListStore();
  const isCurrentPaperExist = Object.values(paperList).length > 0;

  useEffect(() => {
    if (!isCurrentPaperExist) {
      navigator("/");
    }
  }, []);

  const currentPaperList = paperList[collectionId];

  useEffect(() => {
    async function getRefs() {
      const getRefPromiseList = currentPaperList.map((paper) => {
        return axios.get(`${API.CROSSREF_WORKS_URL}/${API.PAPER_URL}/${paper.doi}`);
      });

      const allResponse = await Promise.all(getRefPromiseList);
      const allRefsList = allResponse.map((res) => {
        if (res?.data?.status !== "ok") {
          return;
        }

        const response = res?.data?.message;

        return formattingResponse(response);
      });

      setData(formattingChartData(allRefsList));
    }

    if (currentPaperList) {
      getRefs();
    }
  }, [currentPaperList]);

  return (
    <>
      <PaperSidebar />
      <Chart data={data} />
      <button className={CLASS_FLOATING_BUTTON}>
        <AiOutlineSearch onClick={() => navigator(`/${collectionId}/search`)} />
      </button>
    </>
  );
}

export default ViewPage;
