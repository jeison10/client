import React from 'react'
import './ChatPage.css'
import  {useState, useEffect} from 'react';
import io from "socket.io-client";
import axios from 'axios';
import Navbar from '../components/Navbar'
import ScrollToBottom from "react-scroll-to-bottom";


const socket = io.connect("http://localhost:3001");


const Chatpage = () => {

 const [onlineUsers, SetOnlineUsers] = useState([]);
 const [Users, setUsers] = useState([]);
 const [userName, setUserName] = useState('');
 const [currentMessage, setCurrentMessage] = useState("");
 const [destination, setDestination] = useState("");
 const [messageList, setMessageList] = useState([]);
 const [newMsg, setNewMsg] = useState('');

       

 
 
    const sendMessage = async () => {
            if (currentMessage !== "") {
            const messageData = {
                author: userName,
                to: destination,
                message: currentMessage,
                time:
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
            };

            await socket.emit('send_message',messageData);
            setCurrentMessage("");
            }
        };

   
        function mostraMsg(props){

            
            const msg=props.msg
            const time= props.time
            const author=props.author
            let esquema =[]

            for(var i=0; i<=msg.length; i++){
                esquema.push( {msg:msg[i], time:time[i], author:author[i] })
            }
                                
                 const html= esquema.map((dados) => 
              (

                <li className="clearfix">
                 <div className= "message-data">
                      <span className= {userName === dados.author ? "message-data-time" : "message-data-time-other"} >{dados.time}</span>
                                                
                  </div>
                 <div className= {userName === dados.author ? "message my-message": "message other-message float-right"} > {dados.msg} </div>
                </li>
                ))

                return (html)

                }

            
    useEffect(() =>{

    
             axios.get("http://localhost:3001/api/messages",{headers: {'x-access-token': localStorage.getItem('token')}})
            .then((response) => {
                setMessageList(response.data.data); //populate this variable with the response
                               
            })
    },[])

    

      useEffect( () => {

       const pegaDados = async ()=>{
        await axios.get("http://localhost:3001/api/users",{headers: {'x-access-token': localStorage.getItem('token')}})
        .then((response) => {
                setUsers(response.data.datas);  //populate this variable with the response
        
                            
                         
                socket.emit("join_room",{name: response.data.idUser , room:'chat'}); 
                setUserName(response.data.idUser)
            })
            
       }     
       
        
          
    

       socket.on("online", (data)=>{
        SetOnlineUsers(data.users);
                        
           
             })

      

        pegaDados();
          
    
      
        socket.on("receive_message", (data) => {
                        
            
            setMessageList(data.res);
            setNewMsg(data.data)
            console.log(data.data)
            
                       
          });
    


               
             
    }, [socket]);
    






    return (
        <>

        <Navbar newMsg={newMsg} />

            <div className="container mt-5">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card chat-app">
                            <div id="plist" className="people-list">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-search"></i></span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Search..."/>
                                </div>
                                <ul className="list-unstyled chat-list mt-2 mb-0">
                                {onlineUsers.map((datas) => (
                                  
                                    <li className="clearfix" onClick= {() => {setDestination(datas.name); setNewMsg(false) }} > 

                                      
                                        <img src={"https://bootdey.com/img/Content/avatar/avatar1.png"} alt="avatar"/>
                                            <div className="about" > 
                                                <div className="name">{datas.name}</div>
                                                <div className="status">  <i className= "fa fa-circle online"> </i> Online </div>
                                            </div>
                                    </li> 

                                   ))}
                                </ul>
                            </div>
                            <div className="chat">
                                <div className="chat-header clearfix">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"/>
                                            </a>
                                            <div className="chat-about">
                                                <h6 className="m-b-0">{destination}</h6>
                                                <small>Last seen: 2 hours ago</small>
                                            </div>
                                        </div>
                                      </div>
                                </div>
                                <ScrollToBottom className='chat-history'> 
                                <div className="chat-history" > 
                                 
                                    <ul className="m-b-0">
                                    {messageList.map((messageContent) => {
                                         return (
                                        
                                              <div>  
                                                                               
                                              {mostraMsg(messageContent)}  
                                            
                                              </div> 
                                       
                                         )})}
                                        
                                    </ul>
                                </div>
                                </ScrollToBottom>
                                <div className="chat-message clearfix">
                                    <div className="input-group mb-0">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-send" onClick={sendMessage}> </i></span>
                                        </div>
                                        <input type="text" value={currentMessage} onChange={(event) => {
                                         setCurrentMessage(event.target.value); }}
                                          onKeyPress={(event) => { event.key === "Enter" && sendMessage();}}
                                         className="form-control" placeholder="Enter text here..."/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Chatpage