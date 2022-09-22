import React, { useState } from "react";

export const Test2 = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  const toggleButton = () => {
    setIsDisabled((isDisabled) => !isDisabled);
    // setIsDisabled(!isDisabled);
  };

  // 这里切换两次将产生与切换一次相同的结果
  const toggleButtonTwice = () => {
    toggleButton();
    toggleButton();
  };

  return (
    <div>
      <button disabled={isDisabled}>
        I'm {isDisabled ? "disabled" : "enabled"}
      </button>
      <button onClick={toggleButton}>
        Toggle button state
      </button>
      <button onClick={toggleButtonTwice}>
        Toggle button state 2 times
      </button>
    </div>
  );
};