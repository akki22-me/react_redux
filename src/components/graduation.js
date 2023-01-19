import { Button,Form,Alert } from "react-bootstrap"
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import {useDispatch,useSelector} from 'react-redux';
import  {addgraduation} from '../redux/index';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
var qs = require('qs');
function Graduation(){

  const [show, setShow] = useState(true);

  const [GR_end,setgr_end]=useState('');
  const [GR_location,setgr_location] = useState('');
 const [GR_percentage,setgr_percentage] = useState('');
const [GR_school_name,setgr_school_name] = useState('');
const [GR_start,setgr_start] = useState('')

const navigate= useNavigate();

function auth(){
  if(!localStorage.getItem('loginuid')){
  navigate('/')
}
}

useEffect(()=>{ 
  auth()
  getdetail()
  
 } ,[auth()])

  const dispatch=useDispatch();

  const usermsg=useSelector(state=>state.user.graduationmsg);
  const userstatus=useSelector(state=>state.user.graduationstatus);

 
  
    function getdetail(){
    
  var config = {
    method: 'get',
    url: `http://localhost:4000/geaduation/getgraduation/${localStorage.getItem('loginuid')}`,
    headers: { }
  };
  
   axios(config)
  .then(function (response) {
     console.log(JSON.stringify(response.data,'rrrrrrrr'));
    var sscdata= response.data.data;
    const gr_end =sscdata['gr_end'];
    console.log(gr_end,'gr_end')
    const gr_location= sscdata['gr_location'];
    const gr_percentage= sscdata['ge_percentage'] ;
    const  gr_school_name= sscdata['gr_collage_name'] ;
    const gr_start= sscdata['gr_start'] ;
    setgr_end(gr_end)
    setgr_location(gr_location)
    setgr_percentage(gr_percentage)
    setgr_school_name(gr_school_name)
    setgr_start(gr_start)
  })
  .catch(function (error) {
    console.log(error);
  });
  
     
         
        }
    

  const validationSchema = Yup.object().shape({
    collagename:Yup.string().min(2,'Too Short').required('Collage Name Is Required'),
    collagelocation:Yup.string().min(2,'Too short').required('Collage Location Is Required'),
    startdate:Yup.string().required('Graduation Start Date Required'),
    enddate:Yup.string().required('Graduation End Date Required'),
    percentage:Yup.string().required('Graduation percentage Is Required'),
  });

  const formik = useFormik({
initialValues:{
  collagename:GR_school_name,
  collagelocation:GR_location,
  startdate:GR_start,
  enddate:GR_end,
  percentage:GR_percentage
},   
enableReinitialize: true,
validationSchema,
onSubmit:(data)=>{
  console.log(JSON.stringify(data),'data')
  if(userstatus===true   ) {
    setShow(true)
  }
  if(userstatus===false ){
    setShow(true)
  }
    console.log(JSON.stringify(data,"data"))
   let collagename=data.collagename;
   let collagelocation=data.collagelocation;
   let startdate=data.startdate;
   let enddate=data.enddate;
   let percentage=data.percentage;
   let userid= localStorage.getItem('loginuid');
    //console.log(email,username,password,'email')
    dispatch(addgraduation(collagename,collagelocation,startdate,enddate,percentage,userid))
  
}
  });


    return(
        <>
        <div className='form-div'>
 
 <h3 className='text-center text-primary'>Add Graduation Detail</h3>


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

<Form className='form-body mt-5' onSubmit={formik.handleSubmit} >
  <Form.Group className="mb-3" controlId="graduation_name">
    <Form.Label>Graduation Collage Name</Form.Label>
    <Form.Control type="text" name='collagename' placeholder="Enter Graduation Collage Name" className={
              'form-control' +
              (formik.errors.collagename && formik.touched.collagename
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.collagename} />
             <div className="invalid-feedback">
            {formik.errors.collagename && formik.touched.collagename
              ? formik.errors.collagename
              : null}
          </div>
  </Form.Group>

  <Form.Group className="mb-3" controlId="Graduation_location">
    <Form.Label>Graduation Collage Location</Form.Label>
    <Form.Control type="text" name='collagelocation' placeholder="Enter Graduation Collage Location" className={
              'form-control' +
              (formik.errors.collagelocation && formik.touched.collagelocation
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.collagelocation}  />
              <div className="invalid-feedback">
            {formik.errors.collagelocation && formik.touched.collagelocation
              ? formik.errors.collagelocation
              : null}
          </div>
  </Form.Group>

  <Form.Group className="mb-3" controlId="Graduation_start">
    <Form.Label>Graduation start</Form.Label>
    <Form.Control type="date" name='startdate' className={
              'form-control' +
              (formik.errors.startdate && formik.touched.startdate
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.startdate} />
              <div className="invalid-feedback">
            {formik.errors.startdate && formik.touched.startdate
              ? formik.errors.startdate
              : null}
          </div>
 </Form.Group>

    <Form.Group className="mb-3" controlId="Graduation_end">
    <Form.Label>Graduation End</Form.Label>
    <Form.Control type="date" name='enddate' className={
              'form-control' +
              (formik.errors.enddate && formik.touched.enddate
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.enddate} />
             <div className="invalid-feedback">
            {formik.errors.enddate && formik.touched.enddate
              ? formik.errors.enddate
              : null}
          </div>
 </Form.Group>

 <Form.Group className="mb-3" controlId="Graduation_percentage">
    <Form.Label>Graduation Percentage</Form.Label>
    <Form.Control type="number" name='percentage' placeholder="Enter Graduation Percentage"  className={
              'form-control' +
              (formik.errors.percentage && formik.touched.percentage
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.percentage} />
              <div className="invalid-feedback">
            {formik.errors.percentage && formik.touched.percentage
              ? formik.errors.percentage
              : null}
          </div>
  </Form.Group>
  

  <Button variant="primary" type="submit">
   Add Graduation Detail
  </Button>
</Form>


</div>
      </>
    )
}

export default Graduation 