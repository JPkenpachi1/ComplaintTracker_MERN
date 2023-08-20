import React,{useState} from 'react'
import Navbar from '../Components/Navbar'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import axios from 'axios';
axios.defaults.baseURL="http://localhost:8080";
const  Register = () => {
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      await axios.post("/Register",formData);
      alert("Registered Succefully.")
     setFormData({
      name:"",
      mobile:"",
      address:"",
      email:"",
      alternate:"",
      date:"",
     })
    } catch (error) {
      console.log(error)
    }
  }
   const [formData,setFormData] = useState({
    name:"",
    mobile:"",
    address:"",
    email:"",
    alternate:"",
    date:"",

  })
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <>
    <Navbar/>
    <div className='Formcontainer'>
    <form  onSubmit={handleSubmit} >
      <Typography variant='h5' >
     Customer Registration
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
          label="Alternate Mobile"
          name="alternate"
        
          required
         value={formData.alternate}
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
          Register
        </Button>
       </Grid>
    </Grid>
    </form>

    </div>
    
    </>
  )
}

export default  Register