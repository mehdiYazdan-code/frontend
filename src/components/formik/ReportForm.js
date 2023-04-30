import {useEffect, useState} from 'react';
import {useLoaderData} from "react-router-dom";

const ReportForm = () => {
    const report_load = useLoaderData()
    const [report, setReport] = useState({
        id: 0,
        explanation: "",
        date: "2022-04-01",
        reportItems: [
            {
                id: 0,
                inventory_paper: '',
                productCode: "",
                unitPrice: 0,
                quantity: 0,
                customerId: 0
            }
        ]
    })
    
    useEffect(()=>{
        async function loadReport(){
            setReport(report_load)
        }
        loadReport()
    },[report_load])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setReport((prevReport) => ({
            ...prevReport,
            [name]: value,
        }));
    };

    const handleItemChange = (event, index) => {
        const { name, value } = event.target;
        setReport((prevReport) => ({
            ...prevReport,
            reportItems: prevReport.reportItems.map((item, i) =>
                i === index ? { ...item, [name]: value } : item
            ),
        }));
    };

    const handleAddItem = () => {
        setReport((prevReport) => ({
            ...prevReport,
            reportItems: [
                ...prevReport.reportItems,
                {
                    id: '',
                    buyer: '',
                    receiptNumber: '',
                    barrelType: '',
                    unitPrice: '',
                    quantity: '',
                },
            ],
        }));
    };

    const handleRemoveItem = (index) => {
        setReport((prevReport) => ({
            ...prevReport,
            reportItems: prevReport.reportItems.filter((item, i) => i !== index),
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = report.id
            ? `http://localhost:8083/api/reports/${report.id}`
            : 'http://localhost:8083/api/reports';
        const method = report.id ? 'PUT' : 'POST';
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(report),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.error('HTTP error:', response.status);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="reportDate">Report Date:</label>
                <input
                    type="date"
                    id="reportDate"
                    name="reportDate"
                    value={report.reportDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="totalSalesCount">Total Sales Count:</label>
                <input
                    type="number"
                    id="totalSalesCount"
                    name="totalSalesCount"
                    value={report.totalSalesCount}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="totalSalesPrice">Total Sales Price:</label>
                <input
                    type="number"
                    id="totalSalesPrice"
                    name="totalSalesPrice"
                    value={report.totalSalesPrice}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Buyer</th>
                        <th>Receipt Number</th>
                        <th>Barrel Type</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {report.reportItems.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    id={`buyer-${index}`}
                                    name={`reportItems[${index}].buyer`}
                                    defaultValue={item.buyer}
                                    onChange={(event) => handleItemChange(event, index)}
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id={`receiptNumber-${index}`}
                                    name={`reportItems[${index}].receiptNumber`}
                                    defaultValue={item.receiptNumber}
                                    onChange={(event) => handleItemChange(event, index)}
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id={`barrelType-${index}`}
                                    name={`barrelType-${index}`}
                                    defaultValue={item.barrelType}
                                    onChange={(event) => handleItemChange(event, index)}
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    id={`unitPrice-${index}`}
                                    name={`reportItems[${index}].unitPrice`}
                                    defaultValue={item.unitPrice}
                                    onChange={(event) => handleItemChange(event, index)}
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    id={`quantity-${index}`}
                                    name={`reportItems[${index}].quantity`}
                                    defaultValue={item.quantity}
                                    onChange={(event) => handleItemChange(event, index)}
                                    required
                                />
                            </td>

                            <td>
                                {report.reportItems.length > 1 && (
                                    <button onClick={() => handleRemoveItem(index)}>Remove Item</button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
            <button type="button" onClick={handleAddItem}>
                Add Item
            </button>
            <button type="submit">Submit</button>
        </form>
    );
};


