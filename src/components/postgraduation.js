import { Button,Form,Alert } from "react-bootstrap";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import  {addpostgedetail} from '../redux/index';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

var qs = require('qs');

function Postgraduation(){
  const dispatch=useDispatch();

  const [show, setShow] = useState(true);

  const [PR_end,setpr_end]=useState('');
  const [PR_location,setpr_location] = useState('');
 const [PR_percentage,setpr_percentage] = useState('');
const [PR_school_name,setpr_school_name] = useState('');
const [PR_start,setpr_start] = useState('')
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
 function getdetail(){
    
  var config = {
    method: 'get',
    url: `http://localhost:4000/postdetail/get_detailpostdetail/${localStorage.getItem('loginuid')}`,
    headers: { }
  };
  
   axios(config)
  .then(function (response) {
     console.log(JSON.stringify(response.data,'rrrrrrrr'));
    var sscdata= response.data.data;
    const pr_end =sscdata['pg_end'];
    const pr_location= sscdata['pg_location'];
    const pr_percentage= sscdata['pg_percentage'] ;
    const  pr_school_name= sscdata['pg_collage'] ;
    const pr_start= sscdata['pg_start'] ;
    setpr_end(pr_end)
    setpr_location(pr_location)
    setpr_percentage(pr_percentage)
    setpr_school_name(pr_school_name)
    setpr_start(pr_start)
  })
  .catch(function (error) {
    console.log(error);
  });
  
        }


  const usermsg=useSelector(state=>state.user.postmsg);
  const userstatus=useSelector(state=>state.user.poststatus);


  const validationSchema = Yup.object().shape({
    collagename:Yup.string().min(2,'Too Short').required('Collage Name Is Required'),
    collagelocation:Yup.string().min(2,'Too short').required('Collage Location Is Required'),
    startdate:Yup.string().required('Post Graduation Start Date Required'),
    enddate:Yup.string().required('Post Graduation End Date Required'),
    percentage:Yup.string().required('Post Graduation percentage Is Required'),
  });
  
  const formik = useFormik({
    initialValues:{
      collagename:PR_school_name,
      collagelocation:PR_location,
      startdate:PR_start,
      enddate:PR_end,
      percentage:PR_percentage
      },
      enableReinitialize:true,
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
        dispatch(addpostgedetail(collagename,collagelocation,startdate,enddate,percentage,userid))
      
      }
  })
  
    return(
      
        <>
        <div className='form-div'>
 
 <h3 className='text-center text-primary'>Add Post Graduation Detail</h3>


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
  <Form.Group className="mb-3" controlId="postgraduation_name">
    <Form.Label>Post Graduation Collage Name</Form.Label>
    <Form.Control type="text" name='collagename' placeholder="Enter Post Graduation Collage Name"  className={
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

  <Form.Group className="mb-3" controlId="post_Graduation_location">
    <Form.Label>Post Graduation Collage Location</Form.Label>
    <Form.Control type="text" name='collagelocation' placeholder="Enter Post Graduation Collage Location"  className={
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

  <Form.Group className="mb-3" controlId="post_Graduation_start">
    <Form.Label>Post Graduation start</Form.Label>
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

    <Form.Group className="mb-3" controlId="post_Graduation_end">
    <Form.Label>Post Graduation End</Form.Label>
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

 <Form.Group className="mb-3" controlId="post_Graduation_percentage">
    <Form.Label>Post Graduation Percentage</Form.Label>
    <Form.Control type="number" name='percentage' placeholder="Enter Post Graduation Percentage" className={
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
   Add Post Graduation Detail
  </Button>
</Form>


</div>
      </>
    )
}

export default Postgraduation;