import axios from "axios";
const http = axios.create({
    baseURL : "http://localhost:8089/api/roles/"
})
export async function getAllRoles(){
    return await http.get("/").then(response => response.data);
}
export async function getRoleById(id){
    return await http.get(`/${id}`).then(response => response.data);
}
export async function postRole(data){
    return await http.post("/",data).then(response => response.data);
}
export async function updateRole(id,data){
    return await http.put(`/${id}`,data).then(response => response.data);
}
export async function removeRole(id){
    return await http.delete(`/${id}`).then(response => response.data);
}