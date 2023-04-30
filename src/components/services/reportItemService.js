import axios from "axios";
const http = axios.create({
    baseURL : "http://localhost:8089/api/reportItems/"
})
export async function getAllReportItems(){
    return await http.get("/").then(response => response.data);
}
export async function getReportItemById(id){
    return await http.get(`/${id}`).then(response => response.data);
}
export async function createReportItem(data){
    return await http.post("/",data).then(response => response.data);
}
export async function updateReportItem(id,data){
    return await http.put(`/${id}`,data).then(response => response.data);
}
export async function removeReportItem(id){
    return await http.delete(`/${id}`).then(response => response.data);
}