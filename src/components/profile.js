import React,{useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import {useSelector,useDispatch} from 'react-redux'
import  {userlogin} from '../redux/index';
var FormData = require('form-data');

function Profile(){
  const navigate= useNavigate();

    const [show, setShow] = useState(true);
    const [avtar,useravtar]=useState(null);
    const [ierror,seterror]=useState(false);
    const [msg,setmsg] = useState(null);
    const [Sstatus,setstaus] = useState(null)
  const dispatch=useDispatch();


  function auth(){
    if(!localStorage.getItem('loginuid')){
    navigate('/')
  }
  }

  useEffect(()=>{
    auth()
  },[auth()])
  
  console.log(avtar,'avtar')


  function postimage(){
    console.log(avtar,'avtaravtaravtar')
if(avtar==null){
    seterror(true)
}
else{
    var data = new FormData();
data.append('userid', localStorage.getItem('loginuid'));
data.append('sampleFile', avtar);

var config = {
  method: 'post',
  url: 'http://localhost:4000/users/add_user_profile',
  headers: { 
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
    "type": "formData"
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  const sstatus = response.data.status;
  const mmsg=response.data.message;
  setmsg(mmsg);
  setstaus(sstatus)
})
.catch(function (error) {
  console.log(error);
});
}
  }

    

    return(
        <>
        <div className='form-div'>

<h3 className='text-center text-primary'>User Profile</h3>

{Sstatus === true && show===true ? <Alert className='form-body' variant="success" onClose={() => setShow(false)}  dismissible>
        <p>
          {msg}
        </p>
      </Alert > 
      
      : Sstatus === false && show===true ? <Alert className='form-body' variant="danger" onClose={() => setShow(false)}  dismissible>
        <p>    
          {msg}
        </p>
      </Alert> :''}

<Form className='form-body'  >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="file" name='Image' 
            onChange={(event) => {
                useravtar( event.currentTarget.files[0]);
              }} 
              className={
                'form-control' +
                (avtar=== null
                  ? ' is-invalid'
                  : '')
              }
            />
            {ierror===true ?
            <div className="invalid-feedback">
                Select File To Upload
          </div>
            :''}
            
      </Form.Group>

    
      <Button variant="primary"  onClick={postimage}>
        Change profile Image
      </Button>
    </Form>

</div>
        </>
    )
}

export default Profile