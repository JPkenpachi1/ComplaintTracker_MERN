import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import '../App.css';
import axios  from 'axios';
import Navbar from '../Components/Navbar';
import { Typography } from '@mui/material';
axios.defaults.baseURL="http://localhost:8080";

const Enquiry = () => {
  const categories = [
    { value: 'category1', label: 'BroadBand Connection' },
    { value: 'category2', label: 'TV SetupBox Connection' },
  
  ];
  const [formData,setFormData] = useState({
    name:"",
    mobile:"",
    address:"",
    email:"",
    description:"",
    category:"",
    date:"",

  })
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 const handleSubmit = async(e)=>{
  e.preventDefault();
  try{
    await axios.post("/engCreate",formData);
    alert("Enquiry Recorded");
    setFormData({
      name: '',
      mobile: '',
      address: '',
      email: '',
      description: '',
      category: '',
      date:''
    });
  }catch(e){
    console.log(e)
  }

}
  return (
    <>
     <Navbar/>
    <div className='Formcontainer'>
    <form  onSubmit={handleSubmit} >
      <Typography variant='h5' >
      Customer Enquiry 
      </Typography>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          name='name'
          value={formData.name}
          onChange={handleChange}
         
          required
        />
        {/* <DatePicker
          label="Date"
          renderInput={(params) => <TextField {...params} />}
          fullWidth
          margin="normal"
        /> */}
        
      </Grid>
      <Grid item xs={6}>
      <TextField
          label="Category"
          select
          fullWidth
          margin="normal"
          name="category"
           value={formData.category}
           onChange={handleChange}
            required
        >
         {categories.map((option) => (
    <MenuItem key={option.value} value={option.label}>
      {option.label}
    </MenuItem>
  ))}
        </TextField>
      </Grid>
     
      <Grid item xs={6}>
      <TextField
          label="Mobile"
          name="mobile"
        
          required
         value={formData.mobile}
         onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs={6}>
      <TextField
          label="Address"
          name="address"
         
          required
          value={formData.address}
          onChange={handleChange}
       
          fullWidth
          margin="normal"
        />
      </Grid>
      <Grid item xs ={6}>
       <TextField
       label="Email"
          type='email'
          name="email"
           value={formData.email}
           onChange={handleChange}
            required
          fullWidth
          margin="normal"
        />

       </Grid>
     
       <Grid item xs ={6}>
       <TextField
          type='date'
          name="date"
           value={formData.date}
           onChange={handleChange}
            required
          fullWidth
          margin="normal"
        />

       </Grid>
       <Grid item xs={6}>
      <TextField
          label="Description"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          name="description"
          value={formData.description}
          onChange={handleChange}

            required
        />
      </Grid>
       
       <Grid xs={12} sx={{
        display:'flex'
       }}>
       <Button variant="contained"   type='submit' sx={{
        margin:'auto',
        backgroundColor:'#242424' ,
        '&:hover':{
        backgroundColor:"#efefef",
        boxShadow:"4px 1px 4px 1px rgba(0,0,0,0.15)",
        color:'#242424'
        }
       }}>
          Submit Complaint
        </Button>
       </Grid>
    </Grid>
    </form>

    </div>
    </>
  )
}

export default Enquiry