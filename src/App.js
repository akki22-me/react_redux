// import logo from './logo.svg';
 import './App.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { BrowserRouter, Routes, Route ,Link} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/login';
import Sinup from './components/signup';
import HSC from './components/hsc';
import SSC from './components/ssc';
import Graduation from './components/graduation';
import Postgraduation from './components/postgraduation';
import Skills from './components/skill';
import Contactus from './components/contactus';
import Profile from './components/profile';
import { useEffect, useState } from 'react';

function App() {

  const [auth,setauth]=useState(false)

  
  const user = localStorage.getItem('loginuid');

  function check(){
    if(user){
      setauth(true)
    }
    else{
      setauth(false)
    }
  }

  useEffect(()=>{
    check()
  },[])

 const  userlogout=()=>{
    localStorage.removeItem('loginuid')
  }


  let button = 
  <Navbar bg="light" expand="lg">
 <Container>
   <Navbar.Brand href="#home">Website</Navbar.Brand>
   <Navbar.Toggle aria-controls="basic-navbar-nav" />
   <Navbar.Collapse id="basic-navbar-nav">
     <Nav className="me-auto">
    
       <Link className=' nav-link' to="/SSC">SSC</Link>
       <Link className=' nav-link' to="/HSC">HSC</Link>
       <Link className=' nav-link' to="/Graduation">Graduation</Link>
       <Link className=' nav-link' to="/Postgraduation">Postgraduation</Link>
       <Link className=' nav-link' to="/Skills">Skills</Link>
       <Link className=' nav-link' to="/Contactus">Contactus</Link>
       <Link className='nav-link' to='/Profile'>Profile</Link>
       <Link className='nav-link' onClick={userlogout}>Logout</Link>
     </Nav>
   </Navbar.Collapse>
 </Container>
</Navbar>

let button2=  <Navbar bg="light" expand="lg">
<Container>
  <Navbar.Brand href="#home">Website</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
   
      <Link className=' nav-link' to="/">Login</Link>
      <Link className=' nav-link' to="/Sinup">Create Account</Link>
     
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>
  
  return (
    <>
 <Provider store={store}>

    <BrowserRouter>

 {auth===true ? button :
  auth === false ? button2 :''}

    <Routes>
      <Route path='/'  element={<Login/>}/>
      <Route path='/Sinup' element={<Sinup/>} />
      <Route path='/HSC' element={<HSC/>} />
      <Route path='/SSC' element={<SSC/>} />
      <Route path='/Graduation' element={<Graduation/>}/>
      <Route path='/Postgraduation' element={<Postgraduation/>} />
      <Route path='/Skills' element= {<Skills/>} />
      <Route path='/Contactus' element={<Contactus/>}/>
     <Route path='/Profile' element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
    </Provider>
</>
  );
  
  
}

export default App;
