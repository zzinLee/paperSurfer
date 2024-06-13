import { useParams } from "react-router-dom";

const useCollectionId = () => {
  const { collectionId } = useParams() as { collectionId: string };

  return collectionId;
};

export default useCollectionId;
