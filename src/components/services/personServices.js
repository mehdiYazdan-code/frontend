import axios from "axios";
const http = axios.create({
    baseURL : "http://localhost:8089/api/people/"
})
export async function getAll(){
    return await http.get("/").then(response => response.data);
}
export async function getById(id){
    return await http.get(`/${id}`).then(response => response.data);
}
export async function getPersonById(id){
    return await http.get(`/${id}/read`).then(response => response.data);
}
export async function createUser(data){
    const obj = (data) ? data : {firstName : "",lastName : "",age : 0}
        return await http.post("/",obj).then(response => response.data);
}
export async function update(id,data){
    return await http.put(`/${id}`,data).then(response => response.data);
}
export async function remove(id){
    return await http.delete(`/${id}`).then(response => response.data);
}