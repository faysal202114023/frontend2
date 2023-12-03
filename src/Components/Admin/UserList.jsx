// Frontend: UserList.js
import React, { useState } from 'react';
import axios from 'axios';
import './UserList.css';

function UserList({ userData, handleUserListClick }) {
  const [newUser, setNewUser] = useState({ email: '', password: '', isAdmin: false });

  const handleDelete = async (userId) => {
    try {
      // Make a DELETE request to the server to delete the user
      await axios.delete(`http://localhost:5000/user-list/${userId}`);

      // After deleting, fetch the updated user data
      window.location.reload();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      // Make a POST request to the server to add a new user
      await axios.post('http://localhost:5000/user-list', newUser);

      // After adding, fetch the updated user data
      window.location.reload();
      
      // Clear the form
      setNewUser({ email: '', password: '', isAdmin: false });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className='user-list'>
      <h2>User List</h2>
      <table className='user-list-table'>
      <thead>
  <tr>
    <th>Email</th>
    <th>Is Admin</th>
    <th>Action</th>
  </tr>
</thead>

        <tbody>
  {userData.map((user, index) => (
    <tr key={index}>
      <td>{user.email}</td>
      <td>{user.isAdmin ? 'Yes' : 'No'}</td>
      <td>
        <button className="delete-button" onClick={() => handleDelete(user._id)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>
      </table>

      {/* Add User Form */}
      <div className='add-user-form'>
        <h3>Add User</h3>
        <label>Email:</label>
        <input type='text' value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
        <label>Password:</label>
        <input type='password' value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
        <label>Is Admin:</label>
        <input type='checkbox' checked={newUser.isAdmin} onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.checked })} />
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
}

export default UserList;
