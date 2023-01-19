import {Add_user,User_login,ssc_add,sscdetail,hscadd,graduation_add,postgradd,contactdetail,addskill}  from '../action/actiontype';

import axios from 'axios';
var qs = require('qs');

export const adduser=(email,username,password)=>{
   

    return function(dispach){
    var data = qs.stringify({
      'user_email': email,
      'user_name':username ,
      'user_password': password
    });
    var config = {
      method: 'post',
      url: 'http://localhost:4000/users/add_user_account',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    
    axios(config)
    .then(response=> {
      console.log(JSON.stringify(response.data));
      const message=response.data.message;
      const status=response.data.status;
      console.log(message,'messagemessagemessage');
      console.log(status,'statusstatusstatusstatusstatusstatus')
      dispach({
        type:Add_user,
        useraddmsg:message,
        useraddstatus:status
    })
    })
    .catch(function (error) {
      console.log(error);
      dispach({
        type:Add_user,
      errmsg:'Something Went Wrong Please Try Latter'
    })
    });
}
}


export const userlogin =(email,password)=>{
  return function(dispatch){
    var data = qs.stringify({
      'user_email': email,
      'user_password': password 
    });
    var config = {
      method: 'post',
      url: 'http://localhost:4000/users/user_login',
      headers: { 
        'Authorization': '', 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    
    axios(config)
    .then(response =>{
      console.log(JSON.stringify(response.data));
      const status=response.data.status;
      const msg=response.data.message
      const token= response.data.token;
      const dbid=response.data.dbid;
      dispatch({
        type:User_login,
        loginstatus:status,
        loginmsg:msg,
        token:token,
        dbid:dbid
      })
    
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export const addssc=(schoolname,schoollocation,startdate,enddate,percentage,userid)=>{
  return function(dispach){
    var data = qs.stringify({
      'school_name': schoolname,
      'ssc_start': startdate,
      'ssc_end': enddate,
      'ssc_percentage': percentage,
      'ssc_location': schoollocation,
      'userid': userid
    });
    var config = {
      method: 'post',
      url: 'http://localhost:4000/ssc/add_ssc_detail',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    
    axios(config)
    .then(response=> {
      console.log(JSON.stringify(response.data));
      const status=response.data.status;
      const msg =response.data.message; 

      dispach({
        type:ssc_add,
        sscaddstatus:status,
        sscaddmsg:msg,
      })
    
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
}

export const sscgetdetail=(id)=>{
  return async function(dispach){
    var config = {
      method: 'get',
      url: `http://localhost:4000/ssc/get_user_sscdetail/${id}`,
      headers: { }
    };
    
  await  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      var data= response.data.data;

      
          // console.log(data['ssc_school_name'],'id')

      dispach({
        type:sscdetail,
        sscdata:data
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export const addhsc=(collagename,collagelocation,startdate,enddate,percentage,userid)=>{
  return function(dispach){
    var data = qs.stringify({
      'hsc_school_name': collagename,
      'hsc_start': startdate,
      'hsc_end': enddate,
      'hsc_percentage': percentage,
      'hsc_location': collagelocation,
      'userid': userid 
    });
    var config = {
      method: 'post',
      url: 'http://localhost:4000/hsc/addhsc',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    
    axios(config)
    .then(response=> {
      console.log(JSON.stringify(response.data));
   const   msg = response.data.message;
    const  status= response.data.status;
      dispach({
    type:hscadd,
    hscmsg:msg,
    hscstatus:status
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export const addgraduation=(collagename,collagelocation,startdate,enddate,percentage,userid)=>{
  return function(dispatch){
    var data = qs.stringify({
      'gr_collage_name': collagename,
      'gr_start': startdate,
      'gr_end': enddate,
      'ge_percentage': percentage,
      'gr_location': collagelocation,
      'userid': '1' 
    });
    var config = {
      method: 'post',
      url: 'http://localhost:4000/geaduation/add_graduation_detail',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    
    axios(config)
    .then(response=> {
      console.log(JSON.stringify(response.data));
      const status= response.data.status;
      const msg = response.data.message;
      dispatch({
        type:graduation_add,
        graduationmsg:msg,
        graduationstatus:status
      });
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
}


export const addpostgedetail=(collagename,collagelocation,startdate,enddate,percentage,userid)=>{
  return function(dispatch){
    var data = qs.stringify({
      'pg_collage': collagename,
      'pg_start':startdate,
      'pg_end': enddate,
      'pg_percentage': percentage,
      'pg_location': collagelocation,
      'userid': userid 
    });
    var config = {
      method: 'post',
      url: 'http://localhost:4000/postdetail/add_post_graduation',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    
    axios(config)
    .then(response=> {
      console.log(JSON.stringify(response.data));
      const msg= response.data.message;
      const status = response.data.status;
      dispatch({
        type:postgradd,
        postmsg:msg,
        poststatus:status
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export const addcontactdetail=(email,mobile,location,facebook,linkedin,twitter,github,userid)=>{
  return function(dispach){
    var data = qs.stringify({
      'contact_location': location,
      'contact_email': email,
      'contact_phone': mobile,
      'facebook':facebook,
      'linklin':linkedin,
      'twitter': twitter,
      'github': github,
      'user_id': userid
    });
    var config = {
      method: 'post',
      url: 'http://localhost:4000/contact/add_contact_detail',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    
    axios(config)
    .then(response=> {
      console.log(JSON.stringify(response.data));
      const msg=response.data.message;
      const status = response.data.status;
      console.log(status,'statusstatusstatusstatusstatus')
      dispach({
        type:contactdetail,
        constmsg:msg,
        conststatus:status
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export const addskill_detail=(skill,userid)=>{
  return function(dispatch){
    var data = qs.stringify({
      'skill_details': skill,
      'userid': userid 
    });
    var config = {
      method: 'post',
      url: 'http://localhost:4000/skill/add_skills',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    
    axios(config)
    .then(response=> {
      console.log(JSON.stringify(response.data));
      const msg= response.data.message;
      const status = response.data.status;
      console.log(status,'statusstatusstatusstatusstatusstatusstatusstatus')
      dispatch({
        type:addskill,
        skillmsg:msg,
        skillstatus:status
      })
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
}