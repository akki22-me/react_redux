import React, { useState } from 'react';
import {Button,Form} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import Alert from 'react-bootstrap/Alert';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import  {adduser} from '../redux/index';


function Sinup(){

  const [show, setShow] = useState(true);
  const dispatch=useDispatch();

  const usermsg=useSelector(state=>state.user.useraddmsg);
  const userstatus=useSelector(state=>state.user.useraddstatus);

  
  const validationSchema = Yup.object().shape({
    email:Yup.string().email('Invalid email').required('Email Required'),
    username:Yup.string().min(2,'Too Short!').required('Name Is Required'),
    password:Yup.string().min(6,'Too Short!').required('Password Required'),
  });

  const formik = useFormik({
    initialValues:{
  email:'',
  username:'',
  password:'',
},
validationSchema,
onSubmit:(data)=>{
  if(userstatus===true   ) {
  setShow(true)
}
if(userstatus===false ){
  setShow(true)
}

  console.log(JSON.stringify(data,"data"))
  let email=data.email;
  let username= data.username;
  let password=data.password;
  //console.log(email,username,password,'email')
  dispatch(adduser(email,username,password))
}
  })

    return(
        <>
        <div className='form-div'>
   
        <h3 className='text-center text-primary'>Create A New Account For  User</h3>

        {userstatus === true && show===true ? <Alert className='form-body' variant="success" onClose={() => setShow(false)}  dismissible>
        <p>
          {usermsg}
        </p>
      </Alert > 
      
      : userstatus === false && show===true ? <Alert className='form-body' variant="danger" onClose={() => setShow(false)}  dismissible>
        <p>
          {usermsg}
        </p>
      </Alert> :''} 
    
       <Form className='form-body'  onSubmit={formik.handleSubmit}>

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

         <Form.Group className="mb-3" controlId="formBasicname">
           <Form.Label>User name</Form.Label>
           <Form.Control type="text" name='username' placeholder="Enter User Name" className={
              'form-control' +
              (formik.errors.username && formik.touched.username
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.username}/>

           <div className="invalid-feedback">
            {formik.errors.username && formik.touched.username
              ? formik.errors.username
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
              value={formik.values.password}/>
           <Form.Text className="text-muted">
          We'll never share your password with anyone else.
        </Form.Text>
        <div className="invalid-feedback">
            {formik.errors.password && formik.touched.password
              ? formik.errors.password
              : null}
          </div>
         </Form.Group>
       
         <Button variant="primary" type="submit" >
           Create Account
         </Button>
       </Form>
   
       <div className='card form-body p-2 mt-3'>
       <Link to="/">User Login</Link>
   
       </div>
       </div>
           
           </>
    )
}

export default Sinup;