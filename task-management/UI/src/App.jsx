import React from "react";
import { BrowserRouter as  Route  } from "react-router-dom";

import AddTaskPage from "./pages/AddTaskPage";

const App = () => {
  return (
       
           <Route index element={<AddTaskPage/>} />
  );
};

export default App;
