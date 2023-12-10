// PopupUtils.js

import React, { useState } from 'react';
import Popup from 'reactjs-popup';

export const usePopup = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  const Popup = ({ children }) => (
    <>
      {isPopupVisible && children}
    </>
  );

  return { showPopup, hidePopup, Popup };
};
