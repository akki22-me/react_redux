import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { BrowserRouter, Routes, Route ,Link, useNavigate} from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useSelector,useDispatch} from 'react-redux'
import  {userlogin} from '../redux/index';


function Login(){

 
  const [show, setShow] = useState(true);
  const [rem,setrem] = useState(false);
  const dispatch=useDispatch();

const navigate= useNavigate();


function setcheck(event){

  if (event.target.checked) {
    setrem(true)
    console.log('✅ Checkbox is checked');
    console.log(rem,'rem 2')

  } else {
    setrem(false)
    console.log('⛔️ Checkbox is NOT checked');
    console.log(rem,'rem 2')

  }



}

  const loginstatus=useSelector(state=>state.user.loginstatus);
  const loginmsg=useSelector(state=>state.user.loginmsg);
  const token=useSelector(state=>state.user.token);
  const dbid=useSelector(state=>state.user.dbid);


  const validationSchema = Yup.object().shape({
    email:Yup.string().email('Invalid email').required('Email Required'),
    password:Yup.string().min(6,'Too Short!').required('Password Required'),
  });

  const formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema,
    onSubmit:(data)=>{
      console.log(JSON.stringify(data),'data')
      if(loginstatus===true   ) {
        // setShow(true)
        localStorage.setItem('logintoken',token);
        localStorage.setItem('loginuid',dbid)
        navigate('/SSC')
      }
      if(loginstatus===false ){
        setShow(true)
      }
      
        console.log(JSON.stringify(data,"data"))
        let email=data.email;
        let password=data.password;
        //console.log(email,username,password,'email')
        if(rem===true){
          localStorage.setItem('user_remember',1)
        }
        if(rem===false && localStorage.getItem('user_remember')){
          localStorage.removeItem('user_remember')
        }
        dispatch(userlogin(email,password))

    }
  })
    return(
        <>
   
     <div className='form-div'>

     <h3 className='text-center text-primary'>Login User</h3>

     {/* {loginstatus === true && show===true ? <Alert className='form-body' variant="success" onClose={() => setShow(false)}  dismissible>
        <p>
          {loginmsg}
        </p>
      </Alert >  */}
      
      { loginstatus === false && show===true ? <Alert className='form-body' variant="danger" onClose={() => setShow(false)}  dismissible>
        <p>
          {loginmsg}
        </p>
      </Alert> :''} 
    

    <Form className='form-body' onSubmit={formik.handleSubmit} >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email"  className={
              'form-control' +
              (formik.errors.email && formik.touched.email
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.email} />
            <div className="invalid-feedback">
            {formik.errors.email && formik.touched.email
              ? formik.errors.email
              : null}
          </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password' placeholder="Password"  className={
              'form-control' +
              (formik.errors.password && formik.touched.password
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.password}  />
        <Form.Text className="text-muted">
          We'll never share your password with anyone else.
        </Form.Text>
        <div className="invalid-feedback">
            {formik.errors.password && formik.touched.password
              ? formik.errors.password
              : null}
          </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" onChange={setcheck} checked={rem}  label="Remember me" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    <div className='card form-body p-2 mt-3'>
    <Link to="/Sinup">Create a account</Link>

    </div>
    </div>
        
        </>
    )
  
}

export default Login;