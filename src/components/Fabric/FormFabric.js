import React, { useState } from 'react'
import { Button, TextField, Autocomplete, Stack, Snackbar, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from 'axios'


const fabricPattern = [{
    label: 'checks', value: 'checks'
},
{ label: 'stripes', value: 'stripes' }]

const fabricColor = [
    { label: 'blue', value: 'blue' },
    { label: 'red', value: 'red' }
]

const fabricComposition = [
    { label: 'wool', value: 'wool' },
    { label: 'cotton', value: 'cotton' }
]

const baseUrl = 'http://localhost:4000'

const FormFabric = ({ onSuccess }) => {
    const [listPrice, setListPrice] = useState([{
        name: ' suit',
        price: 10000
    }])
    const [showMessage, setShowMessage] = useState({
        status: '',
        hide: true
    })
    const [submitLoading, setSubmitLoading] = useState(false);



    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const onSubmit = async (value) => {
        console.log('value', value)
        const payload = {
            ...value,
            price: listPrice
        }
        try {
            const result = await axios.post(`${baseUrl}/fabric`, payload)
            if (result) {
                setShowMessage({
                    status: 'success',
                    hide: true
                })
                onSuccess()
                reset()
                console.log('resutl add fabric ', result)
            }

        } catch (err) {
            setShowMessage({
                status: 'error',
                hide: false
            })
            console.log('error add fabric', err)
        }
        finally {
            setSubmitLoading(false)
        }
    };

    const onChangePrice = (index, field, value) => {
       const newData = listPrice.map((item, idx) => {
        if(idx === index) {
            item[field] = value
        }
        return item
       })
       setListPrice(newData)
    }

    return (
        <>
        <Snackbar open={!showMessage.hide} autoHideDuration={6000} onClose={() => setShowMessage({
        status: '',
        hide: true
      })}>
        {
          showMessage.status === 'success' ? <Alert severity='success'>
            This is a success message! </Alert> : <Alert severity='error'>error submit data</Alert>
        }
      </Snackbar>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" spacing={2}>
                <Stack direction={'row'} spacing={1}>
                    <TextField sx={{ width: 250, height: 50 }} placeholder='Code' id='outlined-basic' {...register("code")} label="code" />
                    <TextField sx={{ width: 250, height: 50 }} placeholder='Name' id='outlined-basic' {...register("name")} label="name" />
                </Stack>
                <Stack direction={'row'} spacing={1}>
                    <Autocomplete options={fabricColor}
                        sx={{ width: 250, height: 50 }}
                        renderInput={(params) => <TextField {...params} label="Color"  {...register("color")} />}
                    />
                    <Autocomplete options={fabricPattern}
                        sx={{ width: 250 }}
                        renderInput={(params) => <TextField {...params} label="Pattern"  {...register("pattern")} />}
                    />
                </Stack>
                <Stack direction={'row'} spacing={1}>
                <Autocomplete options={fabricComposition}
                    sx={{ width: 250, height: 50  }}
                    renderInput={(params) => <TextField {...params} label="Composition"  {...register("composition")} />}
                />
                <TextField sx={{ width: 250,height: 50  }} placeholder='Image' id='outlined-basic'  {...register("image")} />
                </Stack>

                <Button onClick={() => {
                    setListPrice([...listPrice, { name: '', price: 0 }])
                }}>Add Price</Button>
                {
                    listPrice.map((item, index) => (
                        <Stack key={index} direction={'row'}>
                            <TextField fullWidth placeholder='' id='outlined-basic' value={item.name} onChange={(e) => onChangePrice(index, 'name', e.target.value)} />
                            <TextField fullWidth placeholder='' id='outlined-basic' value={item.price} onChange={(e) => onChangePrice(index, 'price', e.target.value)}/>
                        </Stack>
                    ))
                }
                <Button variant='contained' type='submit'>Save</Button>
            </Stack>
        </form>
        </>
    )
}

export default FormFabric