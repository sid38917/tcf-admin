import React from 'react'

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DataTable from "examples/Tables/DataTable";

 const TrouserCustomization = () => {

    const columns = [
        {Header: "Name", accessor: "name", width: "45%", align:'left'},
        {Header: 'Category', accessor:'category', align:'left'},
        {Header: "image", accessor: 'image', align: 'center'},
        {Header: 'action', accessor: 'action', align: 'center'}
        
    ]

    const rows = [
        {
            name: 'no lining',
            category: 'pants lining',
            image: 'https://i.ibb.co/MP7qgsQ/NJB-PC-0002-6420016-C-GREY.jpg',
            action: <button>Edit</button>
        }
    ]
  return (
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
              Trouser Customization Table
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
  )
}

export default TrouserCustomization