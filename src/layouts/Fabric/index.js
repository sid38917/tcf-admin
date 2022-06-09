import React, {useState} from 'react'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from 'components/MDButton';
import {v4 as uuidv4} from 'uuid';
import { useForm } from "react-hook-form";


import {Grid, Button, Card, Row, Icon, TextField, Autocomplete, Stack, OutlinedInput, InputAdornment} from "@mui/material";
// import Card from "@mui/material/Card";
import DataTable from "examples/Tables/DataTable";
import AddIcon from "@mui/icons-material/Add"
import ModalComponent from "components/Modal"

const FabricPage = () => {

    const [openForm, setOpenForm]= useState(false);
    const [data, setData] = useState([ {
        id: uuidv4(),
        name: 'sample a',
            type: 'checks',
            color: 'grey',
            image: 'https://i.ibb.co/MP7qgsQ/NJB-PC-0002-6420016-C-GREY.jpg',
            product: 'suit',
            price: 1000,
            action: <button>Edit</button>
    }
        
    ])

    const columns = [
        {Header: "Name", accessor: "name", width: "45%", align:'left'},
        {Header: 'Type', accessor:'type', align:'left'},
        {Header: "Color", accessor: 'color', align: 'center'},
        {Header: "Image", accessor: 'image', align: 'center'},
        {Header: 'Product', accessor: 'product', align: 'center'},
        {Header: 'Price', accessor:'price', align: 'center'},
        {Header: 'action', accessor: 'action', align: 'center'}

    ]



    // const rows = [
    //     {
    //         fabricName: 'sample a',
    //         type: 'checks',
    //         color: 'grey',
    //         image: 'https://i.ibb.co/MP7qgsQ/NJB-PC-0002-6420016-C-GREY.jpg',
    //         product: 'suit',
    //         price: 1000,
    //         action: <button>Edit</button>
    //     }
    // ]
    
    const fabricType = [{
        label: 'checks', value: 'checks'
    },
{label: 'stripes', value: 'stripes'}]

const fabricColor = [
    {label: 'blue', value: 'blue'},
    {label: 'red', value: 'red'}
]

const products = [
    {label: 'suit', value: 'suit'},
    {label: 'shirt', value: 'shirt'}
]

const {register, handleSubmit, watch, formState: {errors}} = useForm();
const onSubmit = value => {
    setData([...data, value])
};

    const FormFabric = () => {
        
        return <form onSubmit={handleSubmit(onSubmit)}> 
            <Stack direction = "column" spacing = {2}>
        
       
            <TextField fullWidth placeholder='Name'  id='outlined-basic' {...register("name")} label="Name"/>
            

     
        
            <Autocomplete options = {fabricType}
            sx={{ width: 300 }}
           
            renderInput={(params) => <TextField {...params} label="Type"  {...register("type")}/>}
          />

        
   
       
      
            <Autocomplete options = {fabricColor}
            sx={{ width: 300 }}
        
            renderInput={(params) => <TextField {...params} label="Color"     {...register("color")}/>}
          />
   
        <TextField fullWidth placeholder='Image' id='outlined-basic'  {...register("image")}/>

             <Autocomplete options = {products}
            sx={{ width: 300 }}
           
            renderInput={(params) => <TextField {...params} label="Product"  {...register("product")}/>}
          />

<OutlinedInput
            id="outlined-adornment-amount"
  
            startAdornment={<InputAdornment position="start">Rp.</InputAdornment>}
            {...register("price")}
            label="Price"
          />

          <MDButton variant = 'contained' color = 'info' type='submit' >Submit</MDButton>

        </Stack>
        </form>
    }
  return (
      <>
      <ModalComponent open = {openForm} setOpen={(value) => setOpenForm(value)}> 
      <FormFabric/>
      </ModalComponent>
    <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
                <MDBox
                 mx={2}
                 mt={-3}
                 py={3}
                 px={2}
                 variant="gradient"
                 bgColor="info"
                 borderRadius="lg"
                 coloredShadow="info">
                     <Grid direction={"row"} container spacing={2} justifyContent="space-between" alignItems='center'>
                         <Grid item>
                         <MDTypography variant="h6" color="white">
                  Fabric Table
                </MDTypography>
                         </Grid>
                         <Grid item>
                         <Button variant="outlined" startIcon={<AddIcon/>} onClick={() => setOpenForm(true)}> 
                    Add Fabric
                </Button>
                         </Grid>
                     </Grid>


                
               
                 </MDBox>
                 <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows: data }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
                
            </Card>
        </Grid>
    </Grid>

        </MDBox>

    </DashboardLayout>
    </>
    
  )
}

export default FabricPage
