import { useEffect, useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import * as yup from 'yup'
import { Formik, ErrorMessage } from 'formik'
import axios from 'axios'
import { ERole } from 'src/types'
import { mutate } from 'swr'

const instanceAxios = axios.create()

const schema = yup.object().shape({
   email: yup.string().required(),
   password: yup.string().required(),
})

const SignIn = () => {
   const navigate = useNavigate()
   const searchParam = useLocation().search
   const location = searchParam?.slice(searchParam.indexOf('=') + 1)

   const [valid, setValid] = useState<boolean>(false)

   useEffect(() => {
      if (localStorage.getItem('token')) {
         switch (localStorage.getItem('role')) {
            case ERole.admin.toString():
               return navigate('/admin')
            case ERole.formateur.toString():
               return navigate('/former')
            default:
               return navigate('/')
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const onSubmit = async (values: any, { setFieldError, resetForm }: any) => {
      setValid(true)
      try {
         const { token, role } = await instanceAxios
            .post('http://localhost:4000/auth/signin', values)
            .then((res) => res.data)

         localStorage.setItem('token', token)
         localStorage.setItem('role', role)

         axios.interceptors.request.use(
            async (config) => {
               if (token) {
                  config.headers = {
                     Authorization: token ?? '',
                  }
               } else {
                  config.cancelToken = axios.CancelToken.source().token
               }
               return config
            },
            (error) => {
               Promise.reject(error)
            }
         )

         mutate('http://localhost:4000/user/token')

         if (location?.length > 0) return navigate(location)

         switch (role) {
            case ERole.admin:
               return navigate('/admin')
            case ERole.formateur:
               return navigate('/former')
            default:
               return navigate('/')
         }
      } catch (error: any) {
         setFieldError(true)
      }
   }

   return (
      <div style={{ padding: '0 24px', height: '100%' }}>
         <Row
            style={{
               marginTop: '16px',
               height: '100%',
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
            <Col
               style={{
                  backgroundColor: 'white',
                  padding: '24px ',
                  borderRadius: '8px',
                  maxWidth: '400px',
                  marginBottom: '30px',
               }}
            >
               <Formik
                  validationSchema={schema}
                  onSubmit={onSubmit}
                  initialValues={{
                     email: '',
                     password: '',
                  }}
               >
                  {({
                     handleSubmit,
                     handleChange,
                     handleBlur,
                     handleReset,
                     values,
                     touched,
                     isValid,
                     errors,
                  }) => (
                     <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                           <Form.Group
                              as={Col}
                              md="12"
                              style={{ marginTop: '12px' }}
                           >
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                 placeholder="Email"
                                 type="email"
                                 name="email"
                                 value={values.email}
                                 onChange={handleChange}
                                 isInvalid={
                                    valid && (!touched.email || !!errors.email)
                                 }
                              />
                              <span style={{ color: 'red' }}>
                                 <ErrorMessage name="email" />
                              </span>
                           </Form.Group>

                           <Form.Group
                              as={Col}
                              md="12"
                              style={{ marginTop: '12px' }}
                           >
                              <Form.Label>Mot de passe</Form.Label>
                              <Form.Control
                                 placeholder="Mot de passe"
                                 type="password"
                                 name="password"
                                 value={values.password}
                                 onChange={handleChange}
                                 isInvalid={
                                    valid &&
                                    (!touched.password || !!errors.password)
                                 }
                              />
                              <span style={{ color: 'red' }}>
                                 <ErrorMessage name="password" />
                              </span>
                           </Form.Group>
                        </Row>

                        <div
                           style={{
                              width: '100%',
                              textAlign: 'center',
                              marginTop: '16px',
                           }}
                        >
                           <Button type="submit">Se connecter</Button>
                        </div>
                        <div
                           style={{
                              width: '100%',
                              textAlign: 'center',
                           }}
                        >
                           <Link
                              to={'/signup'}
                              style={{ textDecoration: 'unset' }}
                           >
                              Cree un compte
                           </Link>
                        </div>
                     </Form>
                  )}
               </Formik>
            </Col>
         </Row>
      </div>
   )
}

export default SignIn
