import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import axios from "axios";


import {
  Grid,
  Button,
  Card,
  Row,
  Icon,
  TextField,
  Autocomplete,
  Stack,
  OutlinedInput,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
// import Card from "@mui/material/Card";
import DataTable from "examples/Tables/DataTable";
import AddIcon from "@mui/icons-material/Add";
import ModalComponent from "components/Modal";
import { resetWarningCache } from "prop-types";
const baseUrl = 'http://localhost:4000'
const Category = () => {
  const [openForm, setOpenForm] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(1)
  const [showMessage, setShowMessage] = useState({
    status: "",
    hide: true,
  });

  const products = [
    {
      label: "suit",
      value: "1",
    },
    { label: "shirt", value: "2" },
    { label: "trouser", value: "3" },
    { label: "jacket", value: "4" },
    {label: 'overcoat', value: '5'},
    {label: 'vests', value: '6'},
    {label: 'jeans', value: '7'},
    {label: 'waistcoat', value: '8'},
    {label: 'tuxedo', value: '9'},
    {label: 'polo shirt', value: '10'},
    {label: 'batik', value: '11'}

  ];

  const columns = [
    { Header: "Name", accessor: "name", width: "45%", align: "left" },
    { Header: "Product", accessor: "product", align: "left" },
    { Header: "action", accessor: "action", align: "center" },
  ];


  const [data, setData] = useState([
    // {
    //   id: uuidv4(),
    //   name: "sample a",
    //   product: <div>{products[selectedProduct-1]}</div>,
    //   action: <button>Edit</button>,
    // },
  ]);
  const getCategory = async() => {
    try {

      const {data} = await axios.get(`${baseUrl}/category/${selectedProduct}`)
      if(data) {
        console.log('data category')
        const formatData = data.data.map((item) => {
            return {
                id: item.id,
                name: item.name,
                product: <div>{products[item.productId-1].label}</div>,
                action:<button>Edit</button>

            }
        })
        setData(formatData)
      }
    }catch (err) {
      console.log('error', err)
    
    }
  }

  useEffect(() => {
    getCategory()
  }, [selectedProduct])
  const FormCategory = () => {
    return (


      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2}>
          <TextField
            fullWidth
            placeholder="Name"
            id="outlined-basic"
            {...register("name")}
            label="Name"
          />

    

          

          <Autocomplete
            options={products}
            sx={{ width: 300 }}
       
            renderInput={(params) => (
              <TextField {...params} label="Product" {...register("product")}
              value = {selectedProduct} />
            )}
          />

          

          <MDButton variant="contained" color="info" type="submit">
            Submit
          </MDButton>
        </Stack>
      </form>
    );
  };
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
      <FormCategory/>
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
                <Grid
                  direction={"row"}
                  container
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <MDTypography variant="h6" color="white">
                      Category Table
                    </MDTypography>
                  </Grid>
                  <Grid xs = {8} item direction={"row"} spacing={2}>
                      <Stack direction = {'row'}>
                    <Autocomplete
                      options={products}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="product" />
                      )}
                      value={products[selectedProduct-1]}
                      onChange={(e, value) => setSelectedProduct(value.value)}
                    />
                    </Stack>
                  </Grid>
                  <Grid item>
                     <Button
                      loading={submitLoading}
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => setOpenForm(true)}
                    >
                      Add Category
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
  );
};

export default Category;
