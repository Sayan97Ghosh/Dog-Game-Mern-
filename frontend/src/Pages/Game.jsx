import { Box, Button, Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import "./Game.css";
import { BiLike } from "react-icons/bi";
import axios from "axios"
import Navbar from '../Components/Navbar';
import { Navigate, useNavigate } from 'react-router-dom';
function Game() {
  const toast = useToast()
  const [dog1,setDog1] = useState({});
  const [dog2,setDog2] = useState({});
  const[user,userData] = useState([]);
  const navigate = useNavigate()

  const getDog1 = async() =>{

    try{
        let res = await fetch ("https://dog.ceo/api/breeds/image/random");
        let data = await res.json();
        setDog1(data)
    }
    catch(err){
       console.log(err)
    }
      
  }
  const getDog2 = async() =>{

    try{
        let res = await fetch ("https://dog.ceo/api/breeds/image/random");
        let data = await res.json();
        setDog2(data)
    }
    catch(err){
       console.log(err)
    }
      
  }


  useEffect(()=>{
    getDog1();
    getDog2();
    
  },[]);

  // post liked data into the server

  localStorage.setItem("dogs",JSON.stringify([dog1.message,dog2.message]));

  // this is for collect the time and token

  const userId=(localStorage.getItem("token"));
  const email = JSON.parse(localStorage.getItem("email"));
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
   
  console.log(dateTime)


  function likedDog2(){

    
    toast({
      title: 'Data created.',
      description: "We've created your data for you.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })

   

    let payload = {
      userid:userId,
      email:email,
      time:dateTime,
      image1:dog2.message,
      stat1:"winner",
      image2:dog1.message,
      stat2:"loser"
     
    }

    setTimeout(()=>{

      postData(payload)
    },1000)

     


  }
  function likedDog1(){

    toast({
      title: 'Data Created',
      description: "We've created your data for you.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
   
    let payload = {
      userid:userId,
      email:email,
      time:dateTime,
      image1:dog1.message,
      stat1:"winner",
      image2:dog2.message,
      stat2:"loser"
      
    }
    setTimeout(()=>{

      postData(payload)
    },1000)
  }

  // post data specific user




  // post data in like section 

   const postData = async(payload) =>{
    const userId=(localStorage.getItem("token"));
    
    if(userId.length>1){
        const resp = await fetch("http://localhost:1234/like/post",{
            method:"POST",
            headers:{"Content-type":"application/json","authorization":`bearer ${userId}`},
            body:JSON.stringify(payload)
        })
        const data=await resp.json();
       
        if(resp.status==200){
           alert("data added successfully")
        }else{
            console.log("data not added")
        }
       
    }else{
      console.log("Something error")
        
    }
    
   }
      

  return (
    <>
    <Navbar/>
    <VStack spacing={10} className='main-container' p="20"  height={"2xl"} width="80%" >
      {/* This is for dog details */}

      <Heading  color='red.300'>Please Like Any of Your faviourite Dog👌</Heading>

      <HStack   gap={50}>
        {/* no1 */}
        <Box spacing={8} className='card'    h={"400px"} w={"350px"} >
          <Image className='image' w="100%" h="80%" src = {dog1.message} alt='server error'/>

           <Box className='box-content'>
           <Button p={3} className='btn' onClick={likedDog1} colorScheme='blue'  ><BiLike size={20}/></Button>
           </Box>
           <Heading mt={2} >Dog1</Heading>
           
        </Box>
        {/* no2 */}

        <Box spacing={8} className='card'  h={"400px"} w={"350px"} >
          <Image className='image' w="100%" h="80%" src = {dog2.message} alt='server error'/>

           <Box className='box-content'>
             <Button p={3} className='btn' onClick={likedDog2}colorScheme='blue'><BiLike size={20}/></Button>
           </Box>
             <Heading mt={2}>Dog2</Heading>
           
        </Box>

      </HStack>

      <Container>
         <Text size={"md"} color={"gray"}>This is a Specialized dog game and this is very funny to like any dog  so if you like any dog just tumbs up 👍 and the dog will got winner 🥇 </Text>
      </Container>

    </VStack>
    </>
  )
}

export default Game
