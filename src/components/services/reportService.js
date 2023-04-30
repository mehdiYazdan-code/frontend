import axios from "axios";
const http = axios.create({
    baseURL : "http://localhost:8083/api/reports/"
})
export async function getAllReports(){
    return await http.get("/").then(response => response.data);
}
export async function getPage(pageNo,pageSize,sortBy){
    return await http.get("/",{params : {
            pageNo,pageSize,sortBy
        }}).then(response => response.data);
}
export async function searchByDateRange(data){
    return await http.post("/search",data).then(response => response.data)
}
export async function getReportById(id){
    return await http.get(`/${id}`).then(response => response.data);
}
export async function getItemsByReportId(id){
    return await http.get(`/${id}/reportItems`).then(response => response.data);
}
export async function createReport(data){
    return await http.post("/",data);
}
export async function updateReport(id,data){
    return await http.put(`/${id}`,data);
}
export async function removeReport(id){
    return await http.delete(`/${id}`).then(response => response.data);
}