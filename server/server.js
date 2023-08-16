const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json())

const PORT  = process.env.PORT || 8080;
const mongoose = require('mongoose');





mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://kenpachi:12345@ac-prvdrdy-shard-00-00.bzqvhzl.mongodb.net:27017,ac-prvdrdy-shard-00-01.bzqvhzl.mongodb.net:27017,ac-prvdrdy-shard-00-02.bzqvhzl.mongodb.net:27017/Airwave?ssl=true&replicaSet=atlas-qu9syl-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
//  Schema
const RegisterSchema= mongoose.Schema({
    name:String,
    email:String,
    mobile:String,
},{
    timestamps:true
})

// cosnt mdoel 
 const userModel= mongoose.model('User',RegisterSchema);
//   this is for read
 app.get("/users",async(req,res)=>{
    const data =  await userModel.find({})
    res.json({
        sucees:true,
        data:data
    })
});
// create data
app.post("/create",async(req,res)=>{
   
    const data = new userModel(req.body);
    await data.save();
    res.send({
        success:true,
        message:"data saved Succesfully"
    })
})
//  update method 
// app.put('/update',async(req,res)=>{
//     console.log(req.body);
//     const { id,...rest}= req.body;
//     console.log(rest)
//   const data=   await 
//     userModel.updateOne({
//         _id:id
//     },
//        rest
//     )
   
//     res.send({
//         sucess:true,
//         message:"data sved successfully",data:data
//     })
// })

app.put('/update', async (req, res) => {
    console.log(req.body);
    const { id, ...rest } = req.body;
    console.log(rest);
    
    try {
        const data = await userModel.updateOne({ _id: id }, rest);
        res.send({
            success: true,
            message: "Data saved successfully",
            data: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error occurred while updating data"
        });
    }
});

// delete api

app.delete("/delete/:id",async(req,res)=>{
 const id= req.params.id
const data = await userModel.deleteOne({_id:id});
res.send({
    success:true,
    message:"data deleted  suceesfully ",data:data
})
})

app.listen(PORT,()=>console.log("server is running "));


//++++++++++++++++++++++++++++++++++ this is the complaint Side server code for inserting the data
const complaintSchema = mongoose.Schema({
    name:String,
    mobile:String, 
    category:String,
    description:String,
    date: {
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        default: 'unresolved'
    }
},{
    timestamps:true
}); 

const comModel = mongoose.model('Complaints',complaintSchema);
//  this complaint  create api 
app.post('/comCreate' ,  async(req , res)=>{
  const data = new comModel(req.body)
  await data.save();
    res.send({
        success:true,
        message:"data saved Succesfully"
    })

});

app.get("/com",async(req,res)=>{
    const data =  await comModel.find({})
    res.json({
        success:true,
        data:data
    })
});
app.delete("/comDelete/:id",async(req,res)=>{
    const id = req.params.id;
    const data = await comModel.deleteOne({_id:id});
    res.send({
        success:true,
        message:"complaint is deleted",data:data
    })


})
//  +++++++++++++++++++++ this is employee serevr code ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const employeeSchema  =  mongoose.Schema({
    name:String,
    mobile:String,

},{
    timestamps:true
});

const empModel = mongoose.model('employee', employeeSchema);
//  this is for create data  in employeee
app.post('/empCreate', async(req,res)=>{
 const data = new empModel(req.body);
 await data.save();
 res.send({
    success:true,
    message:"Employee data saved "
 })
});
 
// +++++++++++++++++++++++++++++++++++++ this is enquiores code ++++++++++++++++++++++++++++++++++++++++++++++++++++
const engSchema = mongoose.Schema({
     name:String,
    mobile:String,
    address:String,
    email:String,
    description:String,
     date: {
        type:Date,
        default:Date.now()
    },
    category:String
});

const enqModel = mongoose.model ('enquiry',engSchema);

app.post('/engCreate',async(req,res)=>{
    const data = new enqModel(req.body);
    await data.save();
    res.send({
        success:true,
        message:"Enquiry recorded"
    })
})

app.put('/engUpdate/:id', async (req, res) => {
    try {
      const id = req.params.id; 
      const data = req.body; 
      // Use updateOne to update the document
      await enqModel.updateOne({ _id: id }, data);
  
      res.json({
        success: true,
        message: 'Enquiry updated successfully.',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error occurred while updating enquiry.',
      });
    }
  });
//    this is  condition for storing the data after the value is change into new 

  

//   this is a api to update and return the data in another post 
const resolvedComplaints= mongoose.Schema({
    name:String,
    mobile:String, 
    category:String,
    description:String,
    date: {
        type:Date,
      
    },
    status:{
        type:String,
       
    }
},{
    timestamps:true
}); 

const resolvedComplaintsModel = mongoose.model('resolvedComs',resolvedComplaints)
// app.post("/resolve",async(req,res)=>{
//     const data = new resolvedComplaintsModel(req.body);
//     await data.save();
//     res.send({
//         success:true,
//         message:"Enquiry recorded"
//     })

// })   this wqs for xhecking puprpose 
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ this is updatea and post in another collection
app.put('/updateStatus/:complaintId', async (req, res) => {
    try {
      const { complaintId } = req.params;
      const newStatus = req.body.status;
  
      // Find the complaint by ID
      const complaint = await comModel.findById(complaintId);
  
      if (!complaint) {
        return res.status(404).json({ message: 'Complaint not found' });
      }
  
      // Update status in the original complaints
      complaint.status = newStatus;
      await complaint.save();
  
      // Insert into resolvedComplaints
      const resolvedComplaint = new resolvedComplaintsModel(complaint.toJSON());
      await resolvedComplaint.save();
  
      return res.json({ message: 'Status updated and inserted into resolvedComplaints' });
    } catch (error) {
        console.log(error)
      return res.status(500).json({ error: 'Internal Server Error' });

    }
  });
// this is get the resolved complaints from the database 
app.get('/resolvedComp' , async(req,res)=>{
    const data =  await resolvedComplaintsModel.find({})
    res.send({
        message:'Sucess',
        data:data
    })
})
