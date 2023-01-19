import {Form,Button,Alert} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import  {addcontactdetail} from '../redux/index';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ContactUS(){
  const navigate= useNavigate();

  const dispatch=useDispatch();

  const [show, setShow] = useState(true);

  const [Email,setemail]=useState('');
  const [Mobile,setmobile]=useState('');
  const [Location,setlocation]=useState('');
  const [Facebook,setfacebook] = useState('');
  const [Link,setlink] = useState('');
  const [Twitter,settwiiter] = useState('');
  const [Github,setgithub] = useState('');

  function auth(){
    if(!localStorage.getItem('loginuid')){
    navigate('/')
  }
  }
  useEffect(()=>{ 
    getdetail()
   } ,[auth()])
   function getdetail(){
      
    var config = {
      method: 'get',
      url: `http://localhost:4000/contact/user_contact_detail_get/${localStorage.getItem('loginuid')}`,
      headers: { }
    };
    
     axios(config)
    .then(function (response) {
       console.log(JSON.stringify(response.data,'rrrrrrrr'));
      var sscdata= response.data.data;
      const email =sscdata['contact_email'];
      const mobile= sscdata['contact_phone'];
      const location= sscdata['contact_location'] ;
      const  facebook= sscdata['facebook'] ;
      const linklin= sscdata['linklin'] ;
      const twitter= sscdata['twitter'];
      const github = sscdata['github'];
      setemail(email)
      setmobile(mobile)
      setlocation(location)
      setfacebook(facebook)
      setlink(linklin)
      settwiiter(twitter)
      setgithub(github)
  
    })
    .catch(function (error) {
      console.log(error);
    });
    
          }

          
  const usermsg=useSelector(state=>state.user.constmsg);
  const userstatus=useSelector(state=>state.user.conststatus);

  const validationSchema = Yup.object().shape({
    email:Yup.string().email('Invalid email').required('Email Is Required'),
    mobile:Yup.string().min(10,'Too short').max(10,'Too Long!').required('Contact Number Is Required'),
    location:Yup.string().required('location Is  Required'),
    facebook:Yup.string().required('Facebook Profile Required'),
    linkedin:Yup.string().required('Linkedin Profile Is Required'),
    twitter:Yup.string().required('Twiiter profile Is Required'),
    github:Yup.string().required('Github profile is Required')
  });

  const formik = useFormik({
    initialValues:{
      email:Email,
      mobile:Mobile,
      location:Location,
      facebook:Facebook,
      linkedin:Link,
      twitter:Twitter,
      github:Github,
    },
    validationSchema,
    enableReinitialize:true,
    onSubmit:(data)=>{
      console.log(JSON.stringify(data),'data')
      let email=data.email;
      let mobile=data.mobile;
      let location=data.location;
      let facebook=data.facebook;
      let linkedin=data.linkedin;
      let twitter = data.twitter;
      let github = data.github;
      let userid= localStorage.getItem('loginuid');
       //console.log(email,username,password,'email')
       dispatch(addcontactdetail(email,mobile,location,facebook,linkedin,twitter,github,userid))
     
    }
  })
  

    return(
      
        <>
        <div className='form-div'>
 
 <h3 className='text-center text-primary'>Add Contact Us Detail</h3>

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
  <Form.Group className="mb-3" controlId="contact_email">
    <Form.Label>Contact Email</Form.Label>
    <Form.Control type="email" name='email' placeholder="Enter Contact Email"  className={
              'form-control' +
              (formik.errors.email && formik.touched.email
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.email}/>
       <div className="invalid-feedback">
            {formik.errors.email && formik.touched.email
              ? formik.errors.email
              : null}
          </div>
  </Form.Group>

  <Form.Group className="mb-3" controlId="Contact Number">
    <Form.Label>Contact Number</Form.Label>
    <Form.Control type="number" name='mobile' placeholder="Enter Contact Number" className={
              'form-control' +
              (formik.errors.mobile && formik.touched.mobile
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.mobile}/>
             <div className="invalid-feedback">
            {formik.errors.mobile && formik.touched.mobile
              ? formik.errors.mobile
              : null}
          </div>
  </Form.Group>

  <Form.Group className="mb-3" controlId="Contat_location">
    <Form.Label>Contact Location</Form.Label>
    <Form.Control type="text" name='location' placeholder='Enter Contact Location' className={
              'form-control' +
              (formik.errors.location && formik.touched.location
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.location} />
                         <div className="invalid-feedback">
            {formik.errors.location && formik.touched.location
              ? formik.errors.location
              : null}
          </div>
 </Form.Group>

    <Form.Group className="mb-3" controlId="Facebook Profile">
    <Form.Label>Facebook Profile</Form.Label>
    <Form.Control type="text" name='facebook' placeholder='Facebook Profile' className={
              'form-control' +
              (formik.errors.facebook && formik.touched.facebook
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.facebook}/>
              <div className="invalid-feedback">
            {formik.errors.facebook && formik.touched.facebook
              ? formik.errors.facebook
              : null}
          </div>
 </Form.Group>

 <Form.Group className="mb-3" controlId="linkedin Profile">
    <Form.Label>linkedin Profile</Form.Label>
    <Form.Control type="text" name='linkedin' placeholder="Enter linkedin Profile" className={
              'form-control' +
              (formik.errors.linkedin && formik.touched.linkedin
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.linkedin}/>
              <div className="invalid-feedback">
            {formik.errors.linkedin && formik.touched.linkedin
              ? formik.errors.linkedin
              : null}
          </div>
  </Form.Group>

  <Form.Group className="mb-3" controlId="Twitter Profile">
    <Form.Label>Twitter Profile</Form.Label>
    <Form.Control type="text" name='twitter' placeholder="Enter Twitter Profile" className={
              'form-control' +
              (formik.errors.twitter && formik.touched.twitter
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.twitter}/>
              <div className="invalid-feedback">
            {formik.errors.twitter && formik.touched.twitter
              ? formik.errors.twitter
              : null}
          </div>
  </Form.Group>

  <Form.Group className="mb-3" controlId="Github Profile">
    <Form.Label>Github Profile</Form.Label>
    <Form.Control type="text" name='github' placeholder="Enter Github Profile" className={
              'form-control' +
              (formik.errors.github && formik.touched.github
                ? ' is-invalid'
                : '')
            }
            onChange={formik.handleChange}
            value={formik.values.github}/>
              <div className="invalid-feedback">
            {formik.errors.github && formik.touched.github
              ? formik.errors.github
              : null}
          </div>
  </Form.Group>
  

  <Button variant="primary" type="submit" className='mb-5'>
   Add Post Graduation Detail
  </Button>
</Form>


</div>
      </>
    )

}
export default ContactUS;