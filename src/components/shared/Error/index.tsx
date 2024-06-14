import { useNavigate } from "react-router-dom";
import { BiX } from "react-icons/bi";

import { goHomePage } from "../../../utils/utils";

interface ErrorProps {
  message?: string
}

function Error({ message }: ErrorProps) {
  const navigator = useNavigate();

  return (
    <div className="flex flex-col justify-center text-center bg-white w-300 h-200 rounded-3xl font-nanumNeo">
      <div>
        <button className="flex items-center justify-center mx-auto bg-red-100 rounded-full h-36 w-36">
          <BiX className="w-24 h-24 text-red-600 stroke-current" onClick={() => goHomePage(navigator)} />
        </button>
        <div className="my-20">
          <h1 className="font-extrabold text-red-600">에러가 발생했습니다</h1>
          {message ? <p>{message}</p>: <p>다시 한번 시도해보세요</p>}
        </div>
      </div>
    </div>
  );
}

export default Error;
