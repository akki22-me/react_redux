import React, { useState,useEffect } from 'react';
import {Button,Alert} from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Formik, Form, Field, FieldArray, getIn, ErrorMessage } from 'formik';
import * as yup from 'yup';
import {useDispatch,useSelector} from 'react-redux';
import  {addskill_detail} from '../redux/index';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object().shape({
  Skills: yup.array().of(
    yup.object().shape({
      skillname: yup.string().required('Skill Name Is Required'),
      skillpercentage: yup.string().required('Skill Percentage Is Required'),
    })
  ),
});




function Skills() {
  const [show, setShow] = useState(true);
  const [Sskill,setskill] = useState('');
  const [first,setfirst]=useState([])
const dispatch =useDispatch();
          
  const usermsg=useSelector(state=>state.user.skillmsg);
  const userstatus=useSelector(state=>state.user.skillstatus);
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
      url: `http://localhost:4000/skill/get_skills/${localStorage.getItem('loginuid')}`,
      headers: { }
    };
    
     axios(config)
    .then(function (response) {
       console.log(JSON.stringify(response.data,'rrrrrrrr'));
      var sscdata= response.data.data;
      const email = sscdata['skill_details'];
   console.log( (email),'email')
      setskill(email)

      if(!email){
        setfirst([{"skillname":'',"skillpercentage":''}])
      }
      else{
        setfirst(JSON.parse(Sskill))

      }
 
    })
    .catch(function (error) {
      console.log(error);
    });
    
          }

  return (
    <>

      <div className='form-div'>

        <h3 className='text-center text-primary'>Login User</h3>
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
        <Formik
        enableReinitialize
          initialValues={{
             Skills:first
          
          }}
          onSubmit={(values) => {
            //JSON.stringify(values,'data')
             //console.log(JSON.stringify(values.Skills, null, 2),'val')
             if(values.Skills.length == 0){
              alert('Required!')
             }
             else{
              let skill = JSON.stringify(values.Skills);
              console.log(skill,'skill')
              let userid= localStorage.getItem('loginuid');
               //console.log(email,username,password,'email')
               dispatch(addskill_detail(skill,userid))
             
             }
           }}
          validationSchema={validationSchema}

         /// enableReinitialize:true

        >

    
          {({ values, handleSubmit, handleChange, errors }) => (
            <Form onSubmit={handleSubmit} className='form-body'>
              <FieldArray name="Skills">
                {({ remove, push }) => (
                  <div>
                    {values.Skills.map((p, index) => {
                      /*to get the error message*/
                      // const name = `people[${index}].lastName`;
                      // const errorMessage = getIn(errors, name);
                      return (
                        <div >
                          <div className='mt-2'>

                            <label>Enter Skill Name</label>
                            <Field className='form-control'
                              name={`Skills[${index}].skillname`}

                            />
                            <ErrorMessage style={{ color: 'red' }} name={`Skills.${index}.skillname`} />

                          </div>
                          <div className='mt-2'>
                            <label>Enter Skill Name</label>
                            <Field className='form-control'
                              name={`Skills[${index}].skillpercentage`}

                            />
                            <ErrorMessage style={{ color: 'red' }} name={`Skills.${index}.skillpercentage`} />

                          </div>
                          <div onClick={() => remove(index)} className='btn btn-danger'>X</div>
                        </div>
                      );
                    })}
                    <button className='btn btn-info mb-2'
                      type="button"
                      onClick={() =>
                        push({ 'skillname': '', 'skillpercentage': '' })
                      }
                    >
                      Add to list
                    </button>
                  </div>
                )}
              </FieldArray>

              {/* <div>
              <button type="submit">Submit</button>
            </div> */}

              <Button variant="primary" type="submit">
                Add Skills
              </Button>
              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}


            </Form>
          )}


        </Formik>
      </div>

    </>
  )
}

export default Skills;