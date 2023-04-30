import axios from "axios";
const http = axios.create({
    baseURL : "http://localhost:8089/api/colors/"
})
export async function getAllColors(){
    return await http.get("/").then(response => response.data);
}
export async function getColorById(id){
    return await http.get(`/${id}`).then(response => response.data);
}
export async function createColor(data){
    return await http.post("/",data).then(response => response.data);
}
export async function updateColor(id,data){
    return await http.put(`/${id}`,data).then(response => response.data);
}
export async function removecolor(id){
    return await http.delete(`/${id}`).then(response => response.data);
}