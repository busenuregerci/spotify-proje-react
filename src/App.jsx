
import Navi from "./components/Navi"
import './assets/style/index.scss'
import 'react-toastify/dist/ReactToastify.css';
import {  ToastContainer } from "react-toastify"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainPage from "./pages/MainPage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import AddMusicForm from "./components/AddMusicForm";
import DetailMusic from "./components/DetailMusic";
import LoadingPage from "./pages/LoadingPage";
import PrivateRoute from "./services/PrivateRoute";
import { Provider } from "react-redux";
import store from "./store"

function App() {

  return (
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoadingPage />} />
      <Route path="/" element={<Navi />}>
      <Route path="home" element={<MainPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="add-music" element={<PrivateRoute element={<AddMusicForm />}/>} />
      <Route path="home/:musicId" element={<DetailMusic />} />
  </Route>
</Routes>
    </BrowserRouter>
      <ToastContainer/>
    </Provider>
  )
}

export default App
