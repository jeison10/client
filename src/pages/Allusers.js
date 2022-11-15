import React from 'react'
import './Allusers.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Allusers = () => {

    const [Users, setUsers] = useState([]);

    useEffect( () => {

       
         axios.get("http://localhost:3001/api/users",{headers: {'x-access-token': localStorage.getItem('token')}})
         .then((response) => {
                 setUsers(response.data.datas);  //populate this variable with the response
            
              
           
             
        }) 
        
     
    },[])


  return (
            <>

            <Navbar />
            

             <div class="container profile-page mt-4">
             <div class="row">
           
             
             
               
                                    
                        {Users.map((data)=>(
                             
                             <div class="col-xl-6 col-lg-7 col-md-12">
                            <div class="card profile-header">
                                <div class="body">
                                    <div class="row">
                                        <div class="col-lg-4 col-md-4 col-12">
                                            <div class="profile-image float-md-right"> <img src={data.idImage} alt=""/> </div>
                                        </div>
                                        <div class="col-lg-8 col-md-8 col-12">
                                            <h4 class="m-t-0 m-b-0"><strong>{data.name}</strong></h4>
                                            <span class="job_post">{data.email}</span>
                                            <p>{data.quote}</p>
                                            <div>
                                                <button class="btn btn-primary btn-round btn-simple">Message</button>
                                            </div>
                                         </div>                
                                    </div>
                                </div>                    
                            </div>
                            </div>  
                 
                        ))}
                    

                    </div>
             
            </div>
            </>
            
                    
               
           
            
        )
}

export default Allusers