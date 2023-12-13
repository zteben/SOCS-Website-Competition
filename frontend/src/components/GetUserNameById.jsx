import { useEffect, useState } from 'react';
import react from 'react';




const GetuserNameByID = (userid) => {
  console.log(userid);
  const [name, setName] = useState('');
  useEffect(() => {
  const fetchUsername = async (userid) => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      const response = await fetch(
        `http://localhost:3000/users/getUserById?userId=${userid.userid}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }


      const data = await response.json();

      setName(data);

    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };
  }, [userid.userid]);

  if (name) {
    console.log(name.username);
    return name.username;
  }
 

}




export default GetuserNameByID;