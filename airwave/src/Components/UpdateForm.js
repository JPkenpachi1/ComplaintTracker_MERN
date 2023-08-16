import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { Typography,IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import axios from 'axios';
axios.defaults.baseURL="http://localhost:8080"

const UpdateForm = ({ name, mobile, category, description,status,_id,onClose}) => {
  const categories = [
    { value: 'category1', label: 'Speed Issue' },
    { value: 'category2', label: 'Loss of Signal' },
    { value: 'category3', label: 'Wifi not working' },
  ];
  
  const [formData, setFormData] = useState({
    name,
    mobile,
    category,
    description,
    status,
    _id
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const data = axios.put("/updateStatus/"+formData._id,formData)
      alert(data.data.message);
    } catch (error) {
      alert(error)
    }

    
  };
 
  
 
  return (
    <>
      <div className='FormcontainerUpdate'>
        <form onSubmit={handleSubmit}>
          <Typography variant='h5'>Update Complaint Form</Typography>
          <Grid container spacing={2}>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="close"
             onClick={onClose}
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
          >
            <CloseIcon />
          </IconButton>
            <Grid item xs={6}>
              <TextField
                label="Complaint Status"
                fullWidth
                margin="normal"
                name='status'
                value={formData.status}
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
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
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
            
            <Grid xs={12} sx={{ display: 'flex' }}>
              <Button
                variant="contained"
                type='submit'
                sx={{
                  margin: 'auto',
                  backgroundColor: '#242424',
                  '&:hover': {
                    backgroundColor: "#efefef",
                    boxShadow: "4px 1px 4px 1px rgba(0,0,0,0.15)",
                    color: '#242424'
                  }

                }}
             
                >
                update
              </Button  >
             
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  )
}

export default UpdateForm;
