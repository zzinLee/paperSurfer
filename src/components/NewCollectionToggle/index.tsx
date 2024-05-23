import { useState } from "react";

import NewCollectionButton from "../NewCollectionButton";
import NewCollectionInput from "../NewCollectionInput";

function NewCollectionToggle() {
  const [isClick, setIsClick] = useState(false);

  function onToggleButton() {
    setIsClick(!isClick);
  }

  return isClick ? <NewCollectionInput toggle={onToggleButton} /> : <NewCollectionButton toggle={onToggleButton} />;
}

export default NewCollectionToggle;
