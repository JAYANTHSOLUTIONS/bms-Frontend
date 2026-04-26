import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditForm() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setdata] = useState({
    title: "",
    posterUrl: "",
  });

  // const [loading, setLoading] = useState(true);
  // const [success, setsuccess] = useState("");


    useEffect(() => {
        handleFetch();
    }, [id]);


    const handleFetch = () => {
        fetch("https://bms-backend-96qv.onrender.com/api/data")
            .then((res) => res.json())
            .then((res) => {
                // Find the specific item matching the URL ID
                const itemToEdit = res.find(item => item.id == id);
                
                if (itemToEdit) {
                    // Map backend keys to your local state keys
                    setdata({
                        title: itemToEdit.title ,
    
                        posterUrl : itemToEdit.posterUrl,
                    });
                }
                // setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                // setLoading(false);
            });
    };


    const handleevent = (e) => {
        const { name, value } = e.target;
        setdata({
            ...data,
            [name]: value
            
        });
    };



     // 3. Save updates
    const handlesave = async () => {
        try {
            const body = {
                posterUrl: data.posterUrl
            };
            console.log(data.posterUrl);
            

            await axios.patch(`https://bms-backend-96qv.onrender.com/api/edit/${id}`, body);
            console.log("Updation succesful");
            
            
            // setsuccess("Update Successful!");
            // Optional: Redirect back to home after 2 seconds
            setTimeout(() => navigate('/'), 2000); 
        } catch (error) {
            console.error("Update error:", error);
            // setsuccess("Failed to update.");
        }
    };

  return (
    <div>
      <h1>{data.title}</h1>
      <label>Poster Url:</label>
      <input type='url' name='posterUrl' onChange={handleevent} value={data.posterUrl} ></input>
      <br />
      <button onClick={handlesave} type='button'>save</button>

    </div>
  )
}
