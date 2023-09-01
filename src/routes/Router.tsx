import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Feed from "../pages/Feed";
import Register from "../pages/Register";
import Comments from "../pages/Comments";

const Router = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/register' element={<Register />} />
            <Route path='/comments/:id' element={<Comments />} />
            <Route path='*' element={<Login />} />
         </Routes>
      </BrowserRouter>
   );
};

export default Router;
