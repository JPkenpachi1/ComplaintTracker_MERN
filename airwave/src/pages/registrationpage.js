import { useEffect, useState } from "react"
import React  from 'react';
import axios from "axios"
import FormTable from "./FormTable";

axios.defaults.baseURL="http://localhost:8080";
const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
      });
      const [formDataedit, setFormDataedit] = useState({
        name: '',
        email: '',
        mobile: '',
        _id:''
      });
      // useState useState for fetching the data
     const [dataFetch,setDataFetch]= useState([])
    
      const handleChange =  (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post("/create", formData);
          alert("data saved sucessfully")
          fetchData();

        } catch (error) {
          console.error(error);
         
        }
        
      };

      //  Fetching the data from mongodb
      const fetchData =async()=>{
        const data= await axios.get("/")
        // console.log(data)
        setDataFetch(data.data.data);

      }
      useEffect(()=>{
        fetchData()
      }) 
        
      // deleteing the data from the database 
      const handledelete = async (id)=>{
        const data= await axios.delete("/delete/"+ id)
        alert(data.data.message)
        if(data.data.success){
          fetchData()
        }
        
      }
      // this is for update function 
      const handleUpdate = async(e)=>{
         e.preventDefault();
         const data= await axios.put("/update",formDataedit);
         console.log(data);
         alert(data.data.message)
         if(data.data.success){
           fetchData()
         }
      }
     const  handleEditOnChnage = async(e)=>{
      setFormDataedit({ ...formDataedit, [e.target.name]: e.target.value });
     }
         
     const handleedit = (e)=>{
      setFormDataedit(e);

     }
      return (
        <>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Mobile:
            <input
              name="mobile"
              type="number"
              value={formData.mobile}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        <div className="tableConatiner">
          <table>
            <thead>
              <tr>
                <th>Name </th>
                <th>Email</th>
                <th>Mobile</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { dataFetch[0] ?(
                dataFetch.map((e)=>{
                  return(
                    <tr>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.mobile}</td>
                    <td>
                      <button onClick={()=>handleedit(e)}>edit</button>
                      <button onClick={()=>handledelete(e._id)}>delete</button>
                    </td>
                  </tr>
                  )

                })):(
                  <p>No data to be displayed </p>
                )
              }
            </tbody>
          </table>
        </div>
        <FormTable
        handleSubmit={handleUpdate}
        handleChange={handleEditOnChnage}
        rest={setFormDataedit}
        />
        </>
      );
    };
export default Register