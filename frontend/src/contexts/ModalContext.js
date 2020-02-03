import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export default function ModalContextProvider(props) {
  const [modalToggle, setModalToggle] = useState(false);

  return (
    <ModalContext.Provider value={{ modalToggle, setModalToggle }}>
      {props.children}
    </ModalContext.Provider>
  );
}
