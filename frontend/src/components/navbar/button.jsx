import React from "react";
import { IconButton } from "@material-tailwind/react";

const Buttons = ({ children }) => {
  return (
    <IconButton className="flex items-center gap-11 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
      {children}
    </IconButton>
  );
};

export default Buttons;
