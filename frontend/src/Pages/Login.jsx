import React,{useState} from 'react'
import {Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,} from "@chakra-ui/react";
    import axios from "axios";
    
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import { Navigate, useNavigate } from 'react-router-dom';
 const Initial = {
    email:"",
    password:""
 }
function Login() {
//   here we need an login post method to post data
const [formData,setFormData] = useState(Initial);
const navigate = useNavigate();


const handleChange = (e) =>{
    let {name,value}= e.target;
        setFormData({...formData,[name]:value})
}

const handleSubmit = () =>{

    if(formData.email !== "" && formData.password !== "" ){
        axios.post("http://localhost:1234/login",formData)
    .then((res)=>{
        // console.log(res.data);
        localStorage.setItem("token",JSON.stringify(res.data.token));
        localStorage.setItem("email",JSON.stringify(formData.email));


        toast.success('🦄 Wow so easy!', {
          position: "top-right",
          autoClose: 1100,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

      setTimeout(()=>{

        navigate("/private/game")
      },1300)
    })
    .catch((err)=>{
      console.log(err)
      toast.error('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 1100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    })
  
      setFormData(Initial)
    }

    else{
        alert("Please Enter all the valid details")
    }
    
}
  return (
    <>
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>brands</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input value={formData.email} name="email" onChange={handleChange} type="email" required />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input value={formData.password} name="password" onChange={handleChange} type="password" required />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
               onClick={handleSubmit}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>

    </Flex>
    <ToastContainer />
    </>
  )
}

export default Login