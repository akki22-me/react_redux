import { Form,Button,Alert } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch,useSelector} from 'react-redux';
import  {addhsc} from '../redux/index';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

var qs = require('qs');
function Hsc(){
  const [show, setShow] = useState(true);

  const [Hsc_end,setssc_end]=useState('');
  const [Hsc_location,sethsc_location] = useState('');
 const [Hsc_percentage,sethsc_percentage] = useState('');
const [Hsc_school_name,sethsc_school_name] = useState('');
const [Hsc_start,sethsc_start] = useState('')

  const dispatch=useDispatch();
  const navigate= useNavigate();

  const usermsg=useSelector(state=>state.user.hscmsg);
  const userstatus=useSelector(state=>state.user.hscstatus);

  function auth(){
    if(!localStorage.getItem('loginuid')){
    navigate('/')
  }
  }
  useEffect(()=>{ 
    auth()
    getdetail()
   } ,[ auth()])
  
    function getdetail(){
      // dispatch(sscgetdetail(localStorage.getItem('loginuid')))
  
      
  var config = {
    method: 'get',
    url: `http://localhost:4000/hsc/hsc_detail_get/${localStorage.getItem('loginuid')}`,
    headers: { }
  };
  
   axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    var sscdata= response.data.data;
    const hsc_end =sscdata['hsc_end'];
    const hsc_location= sscdata['hsc_location'];
    const hsc_percentage= sscdata['hsc_percentage'] ;
    const  hsc_school_name= sscdata['hsc_school_name'] ;
    const hsc_start= sscdata['hsc_start'] ;
    setssc_end(hsc_end)
    sethsc_location(hsc_location)
    sethsc_percentage(hsc_percentage)
    sethsc_school_name(hsc_school_name)
    sethsc_start(hsc_start)
  })
  .catch(function (error) {
    console.log(error);
  });
  
     
         
        }
  const validationSchema = Yup.object().shape({
    collagename:Yup.string().min(2,'Too Short').required('Collage Name Is Required'),
    collagelocation:Yup.string().min(2,'Too short').required('Collage Location Is Required'),
    startdate:Yup.string().required('HSC Start Date Required'),
    enddate:Yup.string().required('HSC End Date Required'),
    percentage:Yup.string().required('HSC percentage Is Required'),
  });

  const formik = useFormik({
    initialValues:{
      collagename:Hsc_school_name,
      collagelocation:Hsc_location,
      startdate:Hsc_start,
      enddate:Hsc_end,
      percentage:Hsc_percentage
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
  
       let collagename=data.collagename;
       let collagelocation=data.collagelocation;
       let startdate=data.startdate;
       let enddate=data.enddate;
       let percentage=data.percentage;
       let userid= localStorage.getItem('loginuid');
        //console.log(email,username,password,'email')
        dispatch(addhsc(collagename,collagelocation,startdate,enddate,percentage,userid))
      
    }
  })

    return(
 
        <>
        <div className='form-div'>
 
 <h3 className='text-center text-primary'>Add HHC Detail</h3>

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


<Form className='form-body mt-5' onSubmit={formik.handleSubmit}>
  <Form.Group className="mb-3" controlId="collage_name">
    <Form.Label>Collage Name</Form.Label>
    <Form.Control type="text" name='collagename' placeholder="Enter Collage Name" className={
              'form-control' +
              (formik.errors.collagename && formik.touched.collagename
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.collagename}/>
             <div className="invalid-feedback">
            {formik.errors.collagename && formik.touched.collagename
              ? formik.errors.collagename
              : null}
          </div>
  </Form.Group>

  <Form.Group className="mb-3" controlId="Collage_location">
    <Form.Label>Collage Location</Form.Label>
    <Form.Control type="text" name='collagelocation' placeholder="Enter Collage Location" className={
              'form-control' +
              (formik.errors.collagelocation && formik.touched.collagelocation
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.collagelocation}/>
             <div className="invalid-feedback">
            {formik.errors.collagelocation && formik.touched.collagelocation
              ? formik.errors.collagelocation
              : null}
          </div>
  </Form.Group>

  <Form.Group className="mb-3" controlId="Collage_start">
    <Form.Label>HSC start</Form.Label>
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

    <Form.Group className="mb-3" controlId="Collage_end">
    <Form.Label>HSC End</Form.Label>
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

 <Form.Group className="mb-3" controlId="collage_percentage">
    <Form.Label>Collage Percentage</Form.Label>
    <Form.Control type="number" name='percentage' placeholder="Enter HSC Percentage" className={
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
   Add HSC Detail
  </Button>
</Form>


</div>
      </>
        )
}

export default Hsc;
