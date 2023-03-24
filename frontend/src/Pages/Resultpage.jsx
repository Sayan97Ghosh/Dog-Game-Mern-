
import React,{useState,useEffect} from 'react';
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Image,
  Tr,
  Th,
  Td,
  VStack,
  TableContainer,
  Text,
} from '@chakra-ui/react'
import "./Game.css";
import Navbar from '../Components/Navbar';


function Resultpage() {

  const [data,setData] = useState([])
  const getData = () =>{
    const userId=(localStorage.getItem("token"));
    const email=JSON.parse(localStorage.getItem("email"));
    axios({
      method: "get",
      baseURL: `http://localhost:1234`,
      url: `/like/${email}`,
      headers: { authorization: `Bearer ${userId}` },
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  
  }

  useEffect(()=>{
    getData()
  },[]);

  console.log(data)

  return (
    <>
    <Navbar/>
    
         <VStack spacing={10} className='main-container' p="20"  height="auto" width="80%">
               <TableContainer>
  <Table p = {2} size='lg' width="full">
    <Thead>
      <Tr p={10}>
        <Th>Winner </Th>
        <Th>Status</Th>
        <Th><p>Time & Current Date with Current Region</p></Th>
        <Th>Status</Th>
        <Th>Looser </Th>
      </Tr>
    </Thead>
    <Tbody>
      {data.map((el,i)=>(
          <Tr key = {i}>
          <Td><Image w="100px" h="100px" src={el.image1}/></Td>
          <Td  color="green"> {el.stat1}🥇</Td>
          <Td>{el.time}</Td>
          <Td  color="red"> {el.stat2}👎</Td>
          <Td><Image w="100px" h="100px" src={el.image2}/></Td>
        </Tr>
      ))}
     
      </Tbody>
  </Table>
</TableContainer>
 </VStack>
 </>
    
  )
}

export default Resultpage
