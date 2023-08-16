import React, { useEffect, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Card from '../Components/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CSVLink } from 'react-csv';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import HelpIcon from '@mui/icons-material/Help';
import UpdateForm from '../Components/UpdateForm';
import ReceiptIcon from '@mui/icons-material/Receipt';
axios.defaults.baseURL="http://localhost:8080"
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar,  {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Dashboard = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [count,setCount] = useState(0)
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
  //  Fetching data from api using use state.................
const [dataFetch,setDataFetch]=useState([]);

const fetchdata = async()=>{
 try {
      const response = await axios.get("/com");
      setDataFetch(response.data.data);
      setCount(response.data.data.length)
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error, e.g., set a state to display an error message
    }
}
 
useEffect(()=>{
  fetchdata();
},[])
// excel format file 
const ExportButton = ({ data }) => {
  // Define the CSV headers
  const headers = [
    { label: 'Complaint No', key: 'complaintNo' },
    { label: 'Name', key: 'name' },
    { label: 'Type Of Complaint', key: 'category' },
    { label: 'Mobile', key: 'mobile' },
    { label: 'Date of the Complaint', key: 'date' },
    { label: 'Description', key: 'description' },
    { label: 'Status', key: 'status' },
  ];

  // Extract the data needed for CSV
  const csvData = data.map((row, index) => ({
    complaintNo: index + 1,
    name: row.name,
    category: row.category,
    mobile: row.mobile,
    date: row.date,
    description: row.description,
    status: row.status,
  }));
   
  return (
    <CSVLink data={csvData} headers={headers} style={{
      textDecoration:"none",
      color:"#1a9979",
      fontSize:'12px',
      backgroundColor:"#fffff",
      borderRadius:"5px",
      display:'flex',
      alignItems:'center',
      margin:'0 5px 0 5px'
      
      
      
    }} filename="complaints.csv">
      Export CSV <FileDownloadIcon />
    </CSVLink>
  );
};
const [selectedRowData, setSelectedRowData] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsModalOpen(true); // Set the selected row data when edit icon is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

 
//  this is the delete code 
const deleteComplaint = async (id)=>{ 
  
  const data = await axios.delete("/comDelete/"+id)
  alert(data.data.message)
if(data.data.success)
fetchdata()
}
//  this is a registered user code 
const [regDataFetch,setregDataFetch]=useState([]);
const regfetchdata = async()=>{
  try {
       const response = await axios.get("/users");
       setregDataFetch(response.data.data);
      
     } catch (error) {
       console.error("Error fetching data:", error);
       // Handle the error, e.g., set a state to display an error message
     }
 }
  
 useEffect(()=>{
   regfetchdata();
 },[])

    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}  sx={{
          backgroundColor:"#242424"
        }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Complaint Tracker
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
           
            <ListItem disablePadding>
        <IconButton
          component={Link}
          to="/register"
          sx={{
            minHeight: 48,
            justifyContent: 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 3,
              justifyContent: 'center',
            }}
          >
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary="Register" sx={{ opacity: 1 }} />
        </IconButton>
      </ListItem>
      <ListItem  disablePadding sx={{ display: 'block' }}>
      <IconButton
        component={Link}
        to="/Sample"
        sx={{
          minHeight: 48,
          justifyContent: 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 3,
            justifyContent: 'center',
          }}
        >
          <ReportProblemIcon />
        </ListItemIcon>
        <ListItemText primary="Complaint" sx={{ opacity: 1 }} />
      </IconButton>
    </ListItem>
    <ListItem disablePadding sx={{ display: 'block' }}>
    <IconButton
      component={Link}
      to="/Enquiry"
      sx={{
        minHeight: 48,
        justifyContent: 'center',
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: 3,
          justifyContent: 'center',
        }}
      >
        <HelpIcon />
      </ListItemIcon>
      <ListItemText primary="Enquiry" sx={{ opacity: 1 }} />
    </IconButton>
    </ListItem>
          </List>
          <Divider />
          <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
  <IconButton
    component={Link}
    to="/ComplaintGrid"
    sx={{
      minHeight: 48,
      justifyContent: 'center',
      px: 2.5,
    }}
  >
    <ListItemIcon
      sx={{
        minWidth: 0,
        mr: 3,
        justifyContent: 'center',
      }}
    >
      <ReceiptIcon /> {/* Use the ReceiptIcon here */}
    </ListItemIcon>
    <ListItemText primary="Enquiry" sx={{ opacity: 1 }} />
  </IconButton>
</ListItem>
            
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
          <DrawerHeader />
          <Stack direction="row" spacing={3} style={{
            justifyContent:"space-around",
            alignItems:"center",
            marginBottom:"30px"
          }}>
          <Card
        title="Total Complaints"
        description={count}
        className="custom-card"
        borderColor="#FF0000"
      />
      <Card
        title="Resolved Complaints"
        description="200"
        className="another-card"
        borderColor="#00FF00"
      />
      <Card
        title="Registered Users"
        description="100"
        borderColor="#71b9f6"
      />
         
          
  
</Stack>


<Stack direction="row" spacing={2} sx={{
  display:"flex",
  justifyContent:"space-evenly"
}}>
<div>
<Typography variant="h4" gutterBottom>
        Complaints 
      </Typography>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} style={{
        width:'700px'
      }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
           
            <TableCell align="right" sx={{textAlign:'center'}}>Name</TableCell>
            <TableCell align="right"  sx={{textAlign:'center'}}>Type Of Complaint</TableCell>
            <TableCell align="right"  sx={{textAlign:'center'}}>Mobile</TableCell>
            <TableCell align="right"  sx={{textAlign:'center'}}>Date of the Complaint</TableCell>
            <TableCell align="right"  sx={{textAlign:'center'}}>Description</TableCell>
            <TableCell align="right"  sx={{textAlign:'center'}}>status</TableCell>
            <TableCell align="right"  sx={{textAlign:'center'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {dataFetch.map((row) => {
            let content  = <p>No data available</p>;
        if (row.status === 'unresolved') {
          return (
            <TableRow
              key={row.category}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right" sx={{ textAlign: 'center' }}>
                {row.name}
              </TableCell>
              <TableCell align="right" sx={{ textAlign: 'center' }}>
                {row.category}
              </TableCell>
              <TableCell align="right" sx={{ textAlign: 'center' }}>
                {row.mobile}
              </TableCell>
              <TableCell align="right" sx={{ textAlign: 'center' }}>
                {row.date}
              </TableCell>
              <TableCell align="right" sx={{ textAlign: 'center' }}>
                {row.description}
              </TableCell>
              <TableCell align="right" sx={{ textAlign: 'center' }}>
                {row.status}
              </TableCell>
              
              <TableCell align="right">
                <IconButton color="primary" onClick={() => handleEditClick(row)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={()=>deleteComplaint(row._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        } else {
          return null; // Render nothing for rows with a status other than 'active'
        }
      })}
        </TableBody>
      </Table>
      <ExportButton data={dataFetch} />
    </TableContainer> 
    
</div>

      
<div>
<Typography variant="h4" gutterBottom>
       Registered User's
      </Typography>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</div>

</Stack>

{isModalOpen &&selectedRowData && <UpdateForm {...selectedRowData} onClose={handleCloseModal}   />}


        </Box>
      </Box>
    );
}

export default Dashboard