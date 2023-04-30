import axios from "axios";
const http = axios.create({
    baseURL : "http://localhost:8089/api/search"
})
export async function searchByDateRange(data){
    return await http.post("/",data).then(response => response.data)
}
