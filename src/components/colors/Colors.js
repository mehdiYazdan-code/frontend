import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [colors, setColors] = useState([]);
    const [newColor, setNewColor] = useState("");
    const [editColor, setEditColor] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchColors();
    }, []);

    const fetchColors = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/colors");
            setColors(response.data);
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while fetching the colors.");
        }
    };

    const addColor = async () => {
        try {
            await axios.post("http://localhost:8080/api/colors", { name: newColor });
            fetchColors();
            setNewColor("");
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while adding the color.");
        }
    };

    const deleteColor = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/colors/${id}`);
            fetchColors();
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while deleting the color.");
        }
    };

    const updateColor = async () => {
        try {
            await axios.put(`http://localhost:8080/api/colors/${editColor.id}`, {
                name: editColor.name,
            });
            fetchColors();
            setEditColor(null);
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while updating the color.");
        }
    };

    return (
        <div>
            <h2>Colors</h2>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {colors.map((color) => (
                    <tr key={color.id}>
                        <td>{color.name}</td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => deleteColor(color.id)}
                            >
                                Delete
                            </button>{" "}
                            <button
                                className="btn btn-warning"
                                onClick={() => setEditColor(color)}
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <form className="form-inline">
                <div className="form-group mr-2">
                    <input
                        type="text"
                        placeholder="Add a new color"
                        className="form-control"
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                    />
                </div>{" "}
                <button className="btn btn-primary" onClick={addColor}>
                    Add
                </button>
            </form>
            {editColor && (
                <div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Edit the color"
                            className="form-control"
                            value={editColor.name}
                            onChange={(e) =>
                                setEditColor({ ...editColor, name: e.target.value })
                            }
                        />
                    </div>
                    <button className="btn btn-success" onClick={updateColor}>
                        Update
                    </button>{" "}
                    <button className="btn btn-secondary" onClick={() => setEditColor(null)}>
                        Cancel
                    </button></div>
            )}
        </div>
    );
}

export default App;

