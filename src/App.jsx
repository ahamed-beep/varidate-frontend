import React from "react";
import { Routes, Route } from "react-router-dom";
import Website from "./components/Website";
import Form from "./components/Form";
import Newaccount from "./components/Newaccount";

function App() {
  return (
    <div>
   <Routes>

      <Route path="/" element={<Website />} />

    
      <Route path="/form" element={<Form />} />
      <Route path="/create" element={<Newaccount />} />
    </Routes>
    </div>
  );
}

export default App;
