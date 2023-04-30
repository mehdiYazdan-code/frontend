import axios from "axios";
const http = axios.create({
    baseURL : "http://localhost:8083/api/customers"
})
export async function getAllSalesByCustomerIdAndYearGroupedByMonth(company,year){
    return await http.get(`/${company}/${year}/monthly-sales`).then(response => response.data);
}
export async function getAllpaymentsByCustomerIdAndYearGroupedByMonth(company,year){
    return await http.get(`/${company}/${year}/monthly-payments`).then(response => response.data);
}
export async function getAllSalesByYearGroupedByMonth(year){
    return await http.get(`/${1401}/monthly-sales`).then(response => response.data);
}
export async function getAllpaymentsByYearGroupedByMonth(year){
    return await http.get(`/${1401}/monthly-payments`).then(response => response.data);
}
export async function getAllcustomers(){
    return await http.get("/").then(response => response.data);
}
export async function getCustomersDropDownList(){
    return await http.get("/").then(response => response.data);
}
export async function getCustomerById(id){
    return await http.get(`/${id}`).then(response => response.data);
}
export async function createcustomer(data){
    return await http.post("/",data);
}
export async function updatecustomer(id,data){
    return await http.put(`/${id}`,data);
}
export async function removeCustomer(id){
    return await http.delete(`/${id}`);
}