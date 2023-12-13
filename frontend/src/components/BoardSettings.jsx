import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BoardSettings.css';
const SettingsButton = ({boardname}) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [Nametoadd, setadd] = useState('');
    const [Nametoremove, setremove] = useState('');


    const handleNameChangeAdd = (event) => {
        setadd(event.target.value);
    };
    const handleNameChangeRemove = (event) => {
        setremove(event.target.value);
    };
    const handleToggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };


    async function addMember() {
    const requestData = {
        username : Nametoadd,
        name : boardname.boardname,
        };
    const accessToken = localStorage.getItem('accessToken');
    try {
        console.log(requestData);
        
        const response = await axios.post(`http://localhost:3000/boards/addMember`, requestData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            })
            
            window.location.reload();

            
    } catch (error) {
        console.error('Error calling query:', error.message);
    }
    };


const removeMember = () => {
    // Implement logic for removing a member
    const requestData = {
        username : Nametoremove,
        name : boardname.boardname,
        };
    const accessToken = localStorage.getItem('accessToken');
    try {
        console.log(requestData);
        
        const response =  axios.delete(`http://localhost:3000/boards/deleteMember`, requestData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            });
            window.location.reload();
 
    } catch (error) {
        console.error('Error calling query:', error.message)
    // You can perform the necessary actions, such as making an API request.
    };}

    return (
    <div>
        <button className = "settingbutton" onClick={handleToggleMenu}>Settings</button>
        {isMenuOpen && (
        <div className = "boardsetting">
            <label>
            <input type="text" value={Nametoadd}  placeholder = "username:" onChange={handleNameChangeAdd} />
            </label>
            <button onClick={()=>{addMember()}}>Add Member</button>
            <label>
            <input type="text" value={Nametoremove}  placeholder = "username:" onChange={handleNameChangeRemove} />
            </label>
            <button onClick={()=>{removeMember()}}>Remove Member</button>
        </div>
        )}
    </div>
    );
    }



export default SettingsButton;
