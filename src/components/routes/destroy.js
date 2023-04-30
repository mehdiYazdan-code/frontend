import {remove} from "../services/personServices";
import {redirect} from "react-router-dom";

export async function destroy({params}){
    await remove(params.personId)
    return redirect("/api/users")
}