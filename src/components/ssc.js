import { Button,Form,Alert } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch,useSelector} from 'react-redux';
import  {addssc,sscgetdetail} from '../redux/index';
import { useNavigate } from "react-router-dom";

import axios from 'axios';
var qs = require('qs');
function SSC(){
  const navigate= useNavigate();

  function auth(){
    if(!localStorage.getItem('loginuid')){
    navigate('/')
  }
  }
 
  const [show, setShow] = useState(true);
  
  const [Sssc_end,setssc_end]=useState('');
  const [Sssc_location,setssc_location] = useState('');
 const [Sssc_percentage,setssc_percentage] = useState('');
const [Sssc_school_name,setssc_school_name] = useState('');
const [Sssc_start,setssc_start] = useState('')

  const dispatch=useDispatch();

  const usermsg=useSelector(state=>state.user.sscaddmsg);
  const userstatus=useSelector(state=>state.user.sscaddstatus);
  const sscdata=useSelector(state=>state.user.sscdata);

 useEffect(()=>{ 
  auth()
  getdetail()
  
 } ,[ auth()])

  function getdetail(){
    // dispatch(sscgetdetail(localStorage.getItem('loginuid')))

    
var config = {
  method: 'get',
  url: `http://localhost:4000/ssc/get_user_sscdetail/${localStorage.getItem('loginuid')}`,
  headers: { }
};

 axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  var sscdata= response.data.data;
  const ssc_end =sscdata['ssc_end'];
  const ssc_location= sscdata['ssc_location'];
  const ssc_percentage= sscdata['ssc_percentage'] ;
  const  ssc_school_name= sscdata['ssc_school_name'] ;
  const ssc_start= sscdata['ssc_start'] ;
  setssc_end(ssc_end)
  setssc_location(ssc_location)
  setssc_percentage(ssc_percentage)
  setssc_school_name(ssc_school_name)
  setssc_start(ssc_start)
})
.catch(function (error) {
  console.log(error);
});

    // if(sscdata!=null){
    //   const ssc_end =sscdata['ssc_end'];
    //   const ssc_location= sscdata['ssc_location'];
    //   const ssc_percentage= sscdata['ssc_percentage'] ;
    //   const  ssc_school_name= sscdata['ssc_school_name'] ;
    //   const ssc_start= sscdata['ssc_start'] ;
    //   setssc_end(ssc_end)
    //   setssc_location(ssc_location)
    //   setssc_percentage(ssc_percentage)
    //   setssc_school_name(ssc_school_name)
    //   setssc_start(ssc_start)
    //   console.log(ssc_end,'ssc_school_name')
      
    //     }
       
      }

 

const validationSchema = Yup.object().shape({
  schoolname:Yup.string().min(2,'Too Short').required('School Name Is Required'),
  schoollocation:Yup.string().min(2,'Too short').required('Schhol Location Is Required'),
  startdate:Yup.string().required('SSC Start Date Required'),
  enddate:Yup.string().required('SSC End Date Required'),
  percentage:Yup.string().required('SSC percentage Is Required'),
});

const formik = useFormik({
  initialValues:{
    schoolname:Sssc_school_name,
    schoollocation:Sssc_location,
    startdate:Sssc_start,
    enddate:Sssc_end,
    percentage:Sssc_percentage
  },
  enableReinitialize: true,

  validationSchema,
  onSubmit:(data)=>{
    console.log(JSON.stringify(data,'data'))
    if(userstatus===true   ) {
      setShow(true)
    }
    if(userstatus===false ){
      setShow(true)
    }
    
      console.log(JSON.stringify(data,"data"))

     let schoolname=data.schoolname;
     let schoollocation=data.schoollocation;
     let startdate=data.startdate;
     let enddate=data.enddate;
     let percentage=data.percentage;
     let userid= localStorage.getItem('loginuid');
      //console.log(email,username,password,'email')
      dispatch(addssc(schoolname,schoollocation,startdate,enddate,percentage,userid))
    
  }
})

    return(     
        <>
          <div className='form-div'>
   
   <h3 className='text-center text-primary'>Add SSC Detail</h3>
   
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

  <Form className='form-body mt-5'  onSubmit={formik.handleSubmit} >
    <Form.Group className="mb-3" controlId="school_name">
      <Form.Label>School Name</Form.Label>
      <Form.Control type="text" name='schoolname' placeholder="Enter School Name" className={
              'form-control' +
              (formik.errors.schoolname && formik.touched.schoolname
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.schoolname}/>
              <div className="invalid-feedback">
            {formik.errors.schoolname && formik.touched.schoolname
              ? formik.errors.schoolname
              : null}
          </div>
    </Form.Group>

    <Form.Group className="mb-3" controlId="school_location">
      <Form.Label>School Location</Form.Label>
      <Form.Control type="text" name='schoollocation' placeholder="Enter School Location"  className={
              'form-control' +
              (formik.errors.schoollocation && formik.touched.schoollocation
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.schoollocation}/>
             <div className="invalid-feedback">
            {formik.errors.schoollocation && formik.touched.schoollocation
              ? formik.errors.schoollocation
              : null}
          </div>
    </Form.Group>

    <Form.Group className="mb-3" controlId="School_start">
      <Form.Label>SSC start</Form.Label>
      <Form.Control type="date" name='startdate' className={
              'form-control' +
              (formik.errors.startdate && formik.touched.startdate
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.startdate}/>
              <div className="invalid-feedback">
            {formik.errors.startdate && formik.touched.startdate
              ? formik.errors.startdate
              : null}
          </div>
   </Form.Group>

      <Form.Group className="mb-3" controlId="School_end">
      <Form.Label>SSC End</Form.Label>
      <Form.Control type="date" name='enddate' className={
              'form-control' +
              (formik.errors.enddate && formik.touched.enddate
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.enddate}/>
             <div className="invalid-feedback">
            {formik.errors.enddate && formik.touched.enddate
              ? formik.errors.enddate
              : null}
          </div>
   </Form.Group>

   <Form.Group className="mb-3" controlId="school_percentage">
      <Form.Label>SSC Percentage</Form.Label>
      <Form.Control type="number" name='percentage' placeholder="Enter SSC Percentage" className={
              'form-control' +
              (formik.errors.percentage && formik.touched.percentage
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.percentage}/>
             <div className="invalid-feedback">
            {formik.errors.percentage && formik.touched.percentage
              ? formik.errors.percentage
              : null}
          </div>
    </Form.Group>
    
  
    <Button variant="primary" type="submit">
     Add SSC Detail
    </Button>
  </Form>

  
  </div>
        </>
    )
}

export default SSC;