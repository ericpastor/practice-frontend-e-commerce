import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { toast } from 'sonner'
import { Container, Typography, Grid, Box, TextField, Card } from '@mui/material'

import { CreateUser, } from '../types/User'
import { createUserAsync } from '../redux/reducers/userReducer'
import { useAppDispatch } from '../hooks/useAppDispatch'
import BoxLineBlue from '../custom-components/homePage/BoxLineBlue'
import ButtonSort from '../custom-components/homePage/buttons/ButtonSort'

const initialValues: CreateUser = {
    name: '', email: '', password: '', avatar: ''
}

const validationSchema = yup.object().shape({
    name: yup.string().min(3).max(12).required(),
    email: yup.string().email().required(),
    password: yup.string().min(5, 'At least 5 charaters, please!').max(200, 'No more than 200 characters, please!').required(),
    avatar: yup.string().required()
})

function RegisterPage() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    return (
        <Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(219, 218, 221 )' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: '70px' }}>
                <Card sx={{ display: 'flex', alignItems: 'center', padding: '16px', border: '1px solid #e0e0e0', width: '320px' }}>
                    <Container maxWidth='md' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '10px' }}>
                        <BoxLineBlue />
                        <Typography
                            align='center'
                            variant='h6'
                            style={{ lineHeight: 1.25, marginBottom: 16 }}
                        >
                            REGISTER
                        </Typography>
                        <Formik
                            validateOnChange={false}
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async (values: CreateUser, { setSubmitting }) => {
                                try {
                                    const result = await dispatch(createUserAsync({
                                        name: values.name,
                                        email: values.email,
                                        password: values.password,
                                        avatar: values.avatar,
                                    }))
                                    if (createUserAsync.fulfilled.match(result)) {
                                        toast.success(`You have been registered, ${values.name}. Login!`)
                                        setTimeout(() => {
                                            navigate('/login');
                                        }, 2000)
                                    }

                                } catch (error) {
                                    toast.error(`Hey ${values.name}! Something went wrong, User not registered`)
                                } finally {
                                    setSubmitting(false)
                                }
                            }}
                        >
                            {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                name='name'
                                                label='Name'
                                                size='small'
                                                value={values.name}
                                                onChange={handleChange}
                                                helperText={<span style={{ color: 'red', fontSize: '10px' }}>{errors.name}</span>}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name='email'
                                                label='email'
                                                size='small'
                                                value={values.email}
                                                onChange={handleChange}
                                                helperText={<span style={{ color: 'red', fontSize: '10px' }}>{errors.email}</span>}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name='password'
                                                label='Password'
                                                size='small'
                                                value={values.password}
                                                onChange={handleChange}
                                                helperText={<span style={{ color: 'red', fontSize: '10px' }}>{errors.password}</span>}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name='avatar'
                                                label='Avatar'
                                                size='small'
                                                value={values.avatar}
                                                onChange={handleChange}
                                                helperText={<span style={{ color: 'red', fontSize: '10px' }}>{errors.avatar}</span>}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ButtonSort
                                                type='submit'
                                                size='large'
                                                color='primary'
                                                disabled={isSubmitting}
                                                sx={{
                                                    width: '100%',
                                                    marginTop: 2,
                                                }}
                                            >
                                                REGISTER
                                            </ButtonSort>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Container>
                </Card>
            </Box>
        </Box>
    )
}

export default RegisterPage