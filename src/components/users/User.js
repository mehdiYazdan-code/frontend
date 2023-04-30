import React, { useState, useEffect } from "react";
import axios from "axios";

function User() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        role: "",
    });
    const [editUser, setEditUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/users");
            setUsers(response.data);
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while fetching the users.");
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/roles");
            setRoles(response.data);
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while fetching the roles.");
        }
    };

    const addNewUser = async () => {
        try {
            await axios.post("http://localhost:8080/api/users", newUser);
            fetchUsers();
            setNewUser({
                firstName: "",
                lastName: "",
                username: "",
                password: "",
                role: "",
            });
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while adding the user.");
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while deleting the user.");
        }
    };

    const updateUser = async () => {
        try {
            await axios.put(`http://localhost:8080/api/users/${editUser.id}`, editUser);
            fetchUsers();
            setEditUser(null);
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while updating the user.");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleRoleChange = (event) => {
        const { name, value } = event.target;
        setEditUser({ ...editUser, [name]: value });
    };

    return (
        <div>
            <h2>Users</h2>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                        <td>{user.role}</td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => deleteUser(user.id)}
                            >
                                Delete
                            </button>{" "}
                            <button
                                className="btn btn-warning"
                                onClick={() => setEditUser(user)}
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <form className="form">
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        placeholder="Enter first name"
                        className="form-control"
                        name="firstName"
                        value={newUser.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        placeholder="Enter last name"
                        className="form-control"
                        name="lastName"
                        value={newUser.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        placeholder="Enter username"
                        className="form-control"
                        name="username"
                        value={newUser.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        className="form-control"
                        name="password"
                        value={newUser.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select
                        className="form-control"
                        name="role"
                        value={newUser.role}
                        onChange={handleChange}
                    >
                        <option value="">-- Select a role --</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.name}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" onClick={addNewUser}>
                        Add User
                    </button>
                    {editUser && (
                        <button className="btn btn-success ml-2" onClick={updateUser}>
                            Update User
                        </button>
                    )}
                </div>
            </form>
            </div>
)}
export default User;

