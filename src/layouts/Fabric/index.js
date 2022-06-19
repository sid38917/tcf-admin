import React, {useState, useEffect} from 'react'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from 'components/MDButton';
import {v4 as uuidv4} from 'uuid';
import { useForm } from "react-hook-form";
import axios from 'axios'

import {Grid, Button, Card, Row, Icon, TextField, Autocomplete, Stack, OutlinedInput, InputAdornment, Snackbar, Alert} from "@mui/material";
// import Card from "@mui/material/Card";
import DataTable from "examples/Tables/DataTable";
import AddIcon from "@mui/icons-material/Add"
import ModalComponent from "components/Modal"
import { resetWarningCache } from 'prop-types';
import FormFabric from 'components/Fabric/FormFabric';
const baseUrl = 'http://localhost:4000'

const FabricPage = () => {

  


    const [openForm, setOpenForm]= useState(false);
    const[submitLoading, setSubmitLoading ] = useState(false);  

    const [listPrice, setListPrice] = useState([{
      name: 'suit',
      price: 10000
    }])
    const [showMessage, setShowMessage] = useState({
      status: '',
      hide: true
    })

     const [data, setData] = useState([ 
        
    ])

   
    const code = [
      {header: 'ST123', value: '1'}
    ]

    const columns = [
      {Header: "Image", accessor: 'image', align: 'center'},

        {Header: "Code", accessor: "code", width: "45%", align:'left'},
        {Header: 'Name', accessor:'name', align:'left'},
        {Header: "Color", accessor: 'color', align: 'center'},

        {Header: "Pattern", accessor: 'pattern', align: 'center'},
        {Header: "Composition", accessor: 'composition', align: 'center'},
        {Header: "Price", accessor: 'price', align: 'center'},
        {Header: 'Action', accessor: 'action', align: 'center'}
       
        // {Header: 'Suit Price', accessor: 'suit price', align: 'center'},
        // {Header: 'Shirt Price', accessor:'shirt price', align: 'center'},
        // {header: 'Trouser Price', accessor: 'trouser price', align: 'center'},
        // {header: 'Jacket Price', accessor: 'jacket price', align: 'center'},
        // {Header: 'overcoat price', accessor: 'overcoat price', align: 'center'},
        // {Header: 'vests price', accessor: 'vests price', align: 'center'},
        // {Header: 'jeans price', accessor: 'jeans price', align: 'center'},
        // {Header: 'waistcoat price', accessor: 'waistcoat price', align: 'center'},
        // {Header: 'polo shirt price', accessor: 'polo shirt price', align: 'center'},
        // {Header: 'batik price', accessor: 'batik shirt price', align: 'center'},
   




    ]

    // const columns2 = [
    //   {Header: 'Suit Price', accessor: 'suit price', align: 'center'},
    //   {Header: 'Shirt Price', accessor:'shirt price', align: 'center'},
    //   {header: 'Trouser Price', accessor: 'trouser price', align: 'center'},
    //   {header: 'Jacket Price', accessor: 'jacket price', align: 'center'},
    //   {Header: 'overcoat price', accessor: 'overcoat price', align: 'center'},
    //   {Header: 'vests price', accessor: 'vests price', align: 'center'},
    //   {Header: 'jeans price', accessor: 'jeans price', align: 'center'},
    //   {Header: 'waistcoat price', accessor: 'waistcoat price', align: 'center'},
    //   {Header: 'polo shirt price', accessor: 'polo shirt price', align: 'center'},
    //   {Header: 'batik price', accessor: 'batik shirt price', align: 'center'},
    // ]

    const getFabric = async() => {
      try {
        const {data} = await axios.get(`${baseUrl}/fabric`)
        if(data) {
          console.log('data fabric')
          const formatData = data.data.map((item) => {
            return {
              id: item.code,
              name: item.name,
              color: item.color,
              pattern: item.pattern,
              composition: item.composition,
              image: <img height={50} width={50} src={item.image} />,
              price: item.price && <ul>{item.price.map((iPrice) => <li>{iPrice.name} - {iPrice.price}</li>)}</ul>,
              action: <Stack>
                <MDButton>
                  Update Price
                </MDButton>
                <MDButton>
                  Update Details
                </MDButton>
              </Stack>
            }
          })
          console.log(data.data)
          setData(formatData)
        }
      }catch (err) {
        console.log('error', err)
      }
    }

    useEffect(() => {
      getFabric()
    }, [])



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
    
    const fabricPattern = [{
        label: 'checks', value: 'checks'
    },
{label: 'stripes', value: 'stripes'}]

const fabricColor = [
    {label: 'blue', value: 'blue'},
    {label: 'red', value: 'red'}
]

const fabricComposition = [
  {label: 'wool', value: 'wool'},
  {label: 'cotton', value: 'cotton'}
]

const products = [
    {label: 'suit', value: 'suit'},
    {label: 'shirt', value: 'shirt'}
]



// const {register, handleSubmit, watch, formState: {errors}, reset} = useForm();
// // const onSubmit = async (value) => {
// //     console.log('value')
// //     try {
// //     const result = await axios.post(`${baseUrl}/fabric`, value)
// //     if(result){
// //       setShowMessage({
// //         status: 'success',
// //         hide: true
// //       })
// //     setOpenForm(false)
// //     getFabric()
// //     reset()
// //     console.log('resutl add fabric ', result)
// //     }

// //     }catch (err) {
// //       setShowMessage({
// //         status: 'error',
// //         hide: false
// //       })
// //       console.log('error add fabric', err)
// //     } 
// //       finally{
// //         setSubmitLoading(false)
// //     }
    
// };



  return (
      <>
     
      <ModalComponent open = {openForm} setOpen={(value) => setOpenForm(value)}> 
      <FormFabric onSuccess={() => {
          getFabric()
          setOpenForm(false)
      }}/>
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
                         <Button loading = {submitLoading} variant="outlined" startIcon={<AddIcon/>} onClick={() => setOpenForm(true)}> 
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

    {/* <Snackbar open ={ !showMessage.hide} autoHideDuration={6000} onClose={() => setShowMessage({ 
        status: '',
        hide: true})}>
        {
        showMessage.status === 'success' ? <Alert severity = 'success'>
        This is a success message! </Alert> : <Alert severity = 'error'>error submit data</Alert>
        }
      </Snackbar>
      <ModalComponent open = {openForm} setOpen={(value) => setOpenForm(value)}> 
      <FormFabric2/>
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
                  Fabric Price Table
                </MDTypography>
                         </Grid>
                         <Grid item>
                         <Button loading = {submitLoading} variant="outlined" startIcon={<AddIcon/>} onClick={() => setOpenForm(true)}> 
                    Add Fabric
                </Button>
                         </Grid>
                     </Grid>


                
               
                 </MDBox>
                 <MDBox pt={3}>
                <DataTable
                  table={{ columns2, rows: data }}
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

    </DashboardLayout> */}
    </>
    
  )
}

export default FabricPage
