import React from "react";
import { useForm } from "react-hook-form";

function InvoiceForm() {
    const { register, handleSubmit } = useForm();

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function removeCommas(x) {
        return x.replace(/,/g, '');
    }

    function onSubmit(data) {
        console.log(data);
    }

    function formatNumberInput(event) {
        const input = event.target;
        input.value = numberWithCommas(removeCommas(input.value));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="invoiceNumber">Invoice Number</label>
            <input
                id="invoiceNumber"
                type="text"
                {...register("invoiceNumber", { required: true })}
            />

            <label htmlFor="amountDue">Amount Due</label>
            <input
                id="amountDue"
                type="text"
                {...register("amountDue", { required: true })}
                onBlur={formatNumberInput}
            />

            <button type="submit">Submit</button>
        </form>
    );
}

export default InvoiceForm;
