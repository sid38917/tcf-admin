import React from 'react'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DataTable from "examples/Tables/DataTable";


const FabricPage = () => {

    const columns = [
        {Header: "Name", accessor: "fabricName", width: "45%", align:'left'},
        {Header: 'Type', accessor:'type', align:'left'},
        {Header: "Color", accessor: 'color', align: 'center'},
        {Header: "Image", accessor: 'image', align: 'center'},
        {Header: 'Product', accessor: 'proudct', align: 'center'},
        {Header: 'Price', accessor:'price', align: 'center'},
        {Header: 'action', accessor: 'action', align: 'center'}

    ]

    const rows = [
        {
            fabricName: 'sample a',
            type: 'checks',
            color: 'grey',
            image: 'https://i.ibb.co/MP7qgsQ/NJB-PC-0002-6420016-C-GREY.jpg',
            product: 'suit',
            price: 1000,
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
                  Fabric Table
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

export default FabricPage
