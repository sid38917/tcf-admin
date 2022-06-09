import React from 'react'

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DataTable from "examples/Tables/DataTable";
import ModalComponent from 'components/Modal';

const ShirtCustomization = () => {

  const [openForm, setOpenForm]= useState(false);
  const [data, setData] = useState([ {
      id: uuidv4(),
      name: 'blue button',
      category: 'buttons',
      image: 'https://i.ibb.co/MP7qgsQ/NJB-PC-0002-6420016-C-GREY.jpg',
      action: <button>Edit</button>
  }
])

    const columns = [
        {Header: "Name", accessor: "name", width: "45%", align:'left'},
        {Header: 'Category', accessor:'category', align:'left'},
        {Header: "image", accessor: 'image', align: 'center'},
        {Header: 'action', accessor: 'action', align: 'center'}
        
    ]

    const cateogory = [{label:'BUTTON', value: 'BUTTON'},
    {label:'COLLAR STYLE', value: 'COLLAR STYLE'},
    {label: 'CUFFS',value: 'CUFFS'},
    {label: 'SLEEVES', value: 'SLEEVES'},
    {label: 'PLACKET', value: 'PLACKET'},
    {label: 'SHIRT POCKET STYLE', value: 'SHIRT POCKET STYLE'},
    {label: 'SHIRT BACK STYLE', value: 'SHIRT BACK STYLE'},
    {label: 'POCKET STYLE', value: 'POCKET STYLE'},
    {label: 'CUFF STYLE CUT', value: 'CUFF STYLE CUT'}
    ]

    // const rows = [
    //     {
    //         name: 'blue button',
    //         category: 'buttons',
    //         image: 'https://i.ibb.co/MP7qgsQ/NJB-PC-0002-6420016-C-GREY.jpg',
    //         action: <button>Edit</button>
    //     }
    // ]

    const {register, handleSubmit, watch, formState: {errors}} = useForm();
const onSubmit = value => {
    setData([...data, value])
};

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
    <ModalComponent>
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
             coloredShadow="info">

<MDTypography variant="h6" color="white">
              Shirt Customization Table
            </MDTypography>
             </MDBox>
             <MDBox pt={3}>
            <DataTable
              table={{ columns, rows }}
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

export default ShirtCustomization