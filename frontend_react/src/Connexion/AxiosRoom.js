import axios from "axios";

const apiRoom = axios.create({
    baseURL:"http://localhost:8091/api/room"
})
export default apiRoom;