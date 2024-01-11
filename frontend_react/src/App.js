import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
import MenuComponent from "./Components/MenuComponent/MenuComponent";
import RoomsComponent from "./Components/RoomsComponent/RoomsComponent";
import ClientsComponent from "./Components/ClientsComponent/ClientsComponent";
import BookingComponent from "./Components/BookingComponent/BookingComponent";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MenuComponent/>} />
        <Route path="/Clients" element={<ClientsComponent/>} />
        <Route path="/Rooms" element={<RoomsComponent/>}/>
        <Route path="/Booking" element={<BookingComponent/>}/>
      </Routes>
    </div>
  );
}

export default App;
