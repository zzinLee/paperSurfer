import { useState } from "react";

import NewCollectionButton from "../NewCollectionButton";
import NewCollectionInput from "../NewCollectionInput";

function NewCollectionToggle() {
  const [isClick, setIsClick] = useState(false);

  function onToggleButton() {
    setIsClick(!isClick);
  }

  return isClick ? <NewCollectionInput clickButton={onToggleButton} /> : <NewCollectionButton clickButton={onToggleButton} />;
}

export default NewCollectionToggle;
