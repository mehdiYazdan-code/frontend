import {useEffect, useState} from "react";
import "./SearchForm.css";
import {getCustomersDropDownList} from "../services/customerServices";
import {useForm} from "react-hook-form";
import { MenuItem, Select, Button, Grid} from "@mui/material";

export default function SearchForm({onSubmit}) {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        async function loadCustomers() {
            try {
                const data = await getCustomersDropDownList();
                setCustomers(data);
            } catch (error) {
                console.log(error);
            }
        }

        loadCustomers();
    }, []);

    const handleFormSubmit = async (data) => {
        onSubmit(data);
    };

    return (
        <Grid container spacing={2} alignItems="center" style={{ marginTop: '0.2rem' }}>
            <Grid item xs={12} sm={4}>
                <Select style={{fontFamily:"IRANSans"}} fullWidth {...register("company")} defaultValue="" displayEmpty>
                    <MenuItem style={{fontFamily:"IRANSans"}} value="" disabled>انتخاب شرکت</MenuItem>
                    {customers.map((customer) => (
                        <MenuItem style={{fontFamily:"IRANSans"}} key={customer.id} value={customer.id}>{customer.name}</MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid item xs={12} sm={2}>
                <Select fullWidth {...register("year")} defaultValue="" displayEmpty>
                    <MenuItem value="" disabled>انتخاب سال</MenuItem>
                    <MenuItem value={1402}>1402</MenuItem>
                    <MenuItem value={1401}>1401</MenuItem>
                    <MenuItem value={1400}>1400</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12} sm={2}>
                <Button variant="contained" color="primary" size="large" style={{fontFamily:"IRANSans"}} fullWidth onClick={handleSubmit(handleFormSubmit)}>
                    جستجو
                </Button>
            </Grid>
        </Grid>
    );
}

