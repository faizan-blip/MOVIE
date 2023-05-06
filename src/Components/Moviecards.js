import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
export default function Moviecards() {
  let { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [popup , setPopup] = useState(false)
  const[form, setForm ] = useState(false);
  const getdetails = async (id) =>{
    try {
      const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
      const data = await res.json();
      setShowDetails(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getdetails(id)
  }, [id])


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    if(name === '' || email === '' || phone === ''){
    alert("ERROR OCCURED!!")
    }
   else{
    event.preventDefault();
    setForm(false)
    const formData = {
      name: name,
      email: email,
      phone: phone,
    };

    localStorage.setItem('formData', JSON.stringify(formData));
    setPopup(true);
    setName('');
    setEmail('');
    setPhone('');
   }
  };

  useEffect(() => {
    if (popup) {
      const timeoutId = setTimeout(() => {
        setPopup(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [popup]);

  if (!showDetails) {
    return <div style={{display:"flex" , justifyContent:"center" , height:"100vh" ,  alignItem:"center" , background:"black"}}></div>;
  }


  const formie = ()=>{
    setForm(true)
  }

  const close = ()=>{
    setForm(false)
  }

  return (
    <>
    <div style={{display:"flex" , justifyContent:"center" , alignItems:"center"}}>
    <div style={{   
      backgroundImage:`url(${showDetails.image.original})` ,
      width: "100vw",
      backgroundRepeat: "no-repeat",  
      display: "flex", 
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundSize:"100% 100%",
      backgroundPosition:"center",
      backgroundColor:"#1e1e1e",
      height:"100vh",
      position:"relative"
      }}>
        {/* <div style={{, minHeight:"100vh"}}></div> */}
      <div style={{
        height: "auto", 
        width: "50%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection:"column"
    ,padding:"1.5em 1em"
        }}>
            <div style={{display:"flex" , justifyContent:"flex-start" , gap:"20px" ,alignItems:"center"}}>
        <h1 className='heading' style={{color: "white"}}>{showDetails.name}</h1>
        <p style={{display:"flex" , gap:"10px" , color:"white" , fontSize:"17px"}} ><ThumbUpIcon sx={{color:"#008a1e" , transform:"Scale(1.5)"}} />{showDetails.rating.average}</p>
        </div>
        <div className='release' style={{width:"13em" , height:"3.5em" , background:"none" ,  border:"2px solid #d2d2d2" ,  borderRadius:"15px" , color:"white" , display:"flex" , justifyContent:"center" , alignItems:"center" , fontSize:"17px"}}>
            <p>Releasing on {showDetails.premiered}</p>
        </div>
        <p className='summary' style={{color: "white", fontSize: "19px", textAlign: "justify"}}>{showDetails.summary.replace(/<[^>]*>?/gm, '')}</p>
        <div style={{display:"flex" , justifyContent:"flex-start" , gap:"10px"}}>
        <div className='genre' style={{display:"flex" , justifyContent:"center" ,alignItems:"center" , width:"auto" , height:"2em" , background:"whitesmoke" , borderRadius:"5px" , fontWeight:"bold" , padding:"0.5em 0.5em"}}>
            <p>{showDetails.language}</p>
        </div>
        <div className='genre' style={{display:"flex" , justifyContent:"center" ,alignItems:"center" , width:"auto" , height:"2em" , background:"whitesmoke" , borderRadius:"5px" , fontWeight:"bold" , padding:"0.5em 0.5em"}}>
            <p>{showDetails.genres}</p>
        </div>
        </div>
        <div style={{marginTop:"2em" ,display:"flex" , justifyContent:"flex-start" ,alignItems:"center" , gap:"20px" }}>
        <button onClick={formie} style={{width:"auto" ,  background:"#f84464 " , borderRadius:"7px", border:"none" , padding:"1em 1em" , fontSize:"18px" ,fontWeight:"600" , color:"white" , boxShadow:"inset 2px 2px #ff5278", height:"3em"}} className='book'>Book Ticket</button>
       <Link to='/'><button className='back' style={{width:"auto" ,  background:"white" , borderRadius:"7px", border:"none" , padding:"1em 1em" , fontSize:"18px" ,fontWeight:"600" , color:"black", cursor:"pointer" , height:"3em"}} >Back</button></Link> 
        </div>
      </div >
      {form && (
      <div className='overlay' style={{}} >
        <div style={{background:"rgba(37, 37, 37, 0.75)" , backdropFilter:"blur(16px) saturate(180%)" , width:"20em" ,height:"auto", padding:"1em 1em" , display:"flex" , flexDirection:"column" , alignItems:"center" , justifyContent
      :"flex-start" , borderRadius:"15px"}}>
      <p style={{color: "white" , textTransform:"none" , fontSize:"20px" , fontWeight:"600"}}>Book Ticket For : {showDetails.name}</p>
        <div >  
        <form onSubmit={handleSubmit} > 
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
       <TextField id="outlined-basic" label="FULL NAME" variant="outlined" onChange={handleNameChange} type='name' value={name} sx={{
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'pink',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'pink',
    },
  }}  InputLabelProps={{
    style: { color: 'white' }
  }}  />
       </Box>
       <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
       <TextField id="outlined-basic" label="EMAIL" variant="outlined" onChange={handleEmailChange} type='email' value={email} sx={{
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'pink',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'pink',
    },
  }}  InputLabelProps={{
    style: { color: 'white' }
  }}  />
       </Box>
       <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
       <TextField id="outlined-basic" label="PHONE NO." variant="outlined" onChange={handlePhoneChange} type='phone' value={phone}  sx={{
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'pink',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'pink',
    },
  }} InputLabelProps={{
    style: { color: 'white' }
  }}  />
       </Box>
       <Box sx={{display:"flex" , gap:"10px" , justifyContent:"center" , alignItems:"center" , marginTop:"0.5em"}}>
       <Button variant="contained" type='submit' sx={{background:"#c63650", fontWeight:"600"}} className='submitform' >Submit</Button>
       <Button variant="contained" onClick={close} sx={{background:"white" , color:"black", fontWeight:"600"}}  className='submitform1' >Close</Button>
       </Box>
    </form>
           </div>
           </div>
      </div>
      )
}
{popup && (

<div className='overlay1' style={{}} >
        <div style={{background:" #c63650" , backdropFilter:"blur(16px) saturate(180%)" , width:"auto" ,height:"auto", padding:"1em 1em" , display:"flex", alignItems:"center" , justifyContent
      :"center"}}>
        <p style={{color:"white" , fontWeight:"600"}}>Successfully Booked the Ticket!!</p>
        </div>
        </div>
          
)}
    </div>
    </div>
    </>
  )
}
