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
import axios from 'axios'

const baseUrl = 'http://localhost:4000'

const JacketCustomization = () => {

  const [openForm, setOpenForm]= useState(false);
  const [showMessage, setShowMessage] = useState({
      status: '',
      hide: true
  })
  const [data, setData] = useState([ {
      id: uuidv4(),
      name: "double breasted 4 button",
      category: "Suit Type",
      image: "https://i.ibb.co/MP7qgsQ/NJB-PC-0002-6420016-C-GREY.jpg",
      action: <button>Edit</button>
  }
])

  const columns = [
    { Header: "Name", accessor: "name", width: "45%", align: "left" },
    { Header: "Category", accessor: "category", align: "left" },
    { Header: "image", accessor: "image", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  const getJacketCustomization = async() => {
    try {
      const {data} = await axios.get(`${baseUrl}/jacketcustomization`)
      if(data) {
        console.log('data jacket customization')
        setData(data.data)
      }
    }catch (err) {
      console.log('error', err)
    }
  }

  useEffect(() => {
    getJacketCustomization()
  }, [])

  // const rows = [
  //   {
  //     name: "double breasted 4 button",
  //     category: "Suit Type",
  //     image: "https://i.ibb.co/MP7qgsQ/NJB-PC-0002-6420016-C-GREY.jpg",
  //     action: <button>Edit</button>,
  //   },
  // ];

  const {register, handleSubmit, watch, formState: {errors}} = useForm();
const onSubmit = async (value) => {

  try {
    const result = await axios.post(`${baseUrl}/jacketcustomization`, value)
    if(result) {
      setShowMessage({
        status: 'success',
        hide: true
      })
      setOpenForm(false)
      getJacketCustomization()
      reset()
      console.log('resutl add jacket customization ', result)
    }
// setData([...data, value])
} catch(err) {
setShowMessage({
  status: 'error',
  hide: false
})
console.log('error add jacket', err)
} finally {
setSubmitLoading(false)

}
    }
  


const FormCustomization = () => {
        
  return <form onSubmit={handleSubmit(onSubmit)}> 
      <Stack direction = "column" spacing = {2}>
  
 
      <TextField fullWidth placeholder='Name'  id='outlined-basic' {...register("name")} label="Name"/>
      


  
      <Autocomplete options = {cateogory}
      sx={{ width: 300 }}
     
      renderInput={(params) => <TextField {...params} label="Type"  {...register("category")}/>}
    />

  

 

     

  <TextField fullWidth placeholder='Image' id='outlined-basic'  {...register("image")}/>

 


    <MDButton variant = 'contained' color = 'info' type='submit' >Submit</MDButton>

  </Stack>
  </form>
}

  return (
    <>
     <Snackbar open ={ !showMessage.hide} autoHideDuration={6000} onClose={() => setShowMessage({ 
        status: '',
        hide: true})}>
        {
        showMessage.status === 'success' ? <Alert severity = 'success'>
        This is a success message! </Alert> : <Alert severity = 'error'>error submit data</Alert>
        }
      </Snackbar>
   <ModalComponent open = {openForm} setOpen={(value) => setOpenForm(value)}>
     <FormCustomization/>
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
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
          Jacket Customization Table
            </MDTypography>
            <Grid item>
                         <Button variant="outlined" startIcon={<AddIcon/>} onClick={() => setOpenForm(true)}> 
                    Add Suit Customization 
                </Button>
                         </Grid>
             </MDBox>
             <MDBox pt={3}>
            <DataTable
              table={{ columns, rows:data}}
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
  );
};

export default JacketCustomization;
