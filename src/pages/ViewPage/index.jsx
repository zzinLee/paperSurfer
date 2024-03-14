import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import PaperSidebar from "../../components/PaperSidebar";
import PaperChart from "../../components/PaperChart";

import { formattingResponse, formattingChartData } from "../../utils/utils";
import { usePaperListStore } from "../../stores/paper";
import { useCollectionStore } from "../../stores/collection";
import API from "../../utils/configAPI";

const CLASS_FLOATING_BUTTON = "bg-violet-500 absolute p-8 rounded-full shadow-xl top-30 right-30 text-32 text-white";
const CLASS_LOADING_CIRCLE =
  "border-4 border-transparent rounded-full h-80 w-80 animate-spin border-sora border-t-customPurple";

function ViewPage() {
  console.log("View Page RENDER");
  const navigator = useNavigate();
  const [data, setData] = useState({});
  const { collectionId } = useParams();
  const { collectionList } = useCollectionStore();
  const { paperList } = usePaperListStore();
  const isCurrentPaperExist = Object.values(paperList).length > 0;
  const currentCollection = collectionList.find((value) => value.key === Number(collectionId));
  const currentCollectionName = currentCollection.collectionName;

  useEffect(() => {
    const currentPaperList = paperList[collectionId];

    async function getRefs(currentPaperList) {
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

      setData(formattingChartData(allRefsList, currentCollectionName));
    }

    if (!isCurrentPaperExist) {
      navigator("/");
    }

    if (currentPaperList) {
      getRefs(currentPaperList);
    }
  }, []);

  console.log(data);
  const isDataExist = Object.keys(data).length > 0;

  return (
    <>
      <PaperSidebar />
      <div
        className="flex flex-row items-center justify-center w-full"
      >
        {isDataExist ? <PaperChart data={data} /> : <div className={CLASS_LOADING_CIRCLE}></div>}
      </div>
      <button className={CLASS_FLOATING_BUTTON}>
        <AiOutlineSearch onClick={() => navigator(`/${collectionId}/search`)} />
      </button>
    </>
  );
}

export default ViewPage;
