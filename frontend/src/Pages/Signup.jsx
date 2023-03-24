import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  import axios from "axios";
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  const initial = {
    name:"",
    email:"",
    password:""
  }
 
  export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);

    const [formData,setFormData] = useState(initial);

    const navigate = useNavigate();
    const handleChange=(e)=>{
        let {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }

    console.log(formData)

     const handleClick = () =>{
        if(formData.email !== "" && formData.password !== "" & formData.name !== "" ){
            localStorage.setItem("name",JSON.stringify(formData.name));
        
        axios.post("http://localhost:1234/signup",formData)
        .then((res)=>{
          
          alert("Signup Successfully")
        })
        .catch((err)=>{
          console.log(err)
        })
      
          setFormData(initial);
          toast.success('🦄 Login Successful!', {
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

            navigate("/login")
          },1300)
        
      }

      else{
        alert("Please Fill the details Correctly")
      }


    }
  
    return (
      <>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={10} mx={'auto'} maxW={'2xl'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={6}>
             
              
                {/* <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input onChange={(e)=>setFirstname(e.target.value)} type="text" />
                  </FormControl>
                </Box> */}
               
                  <FormControl id="name"isRequired>
                    <FormLabel> Name</FormLabel>
                    <Input value={formData.name} name="name" onChange={handleChange}  type="text" required />
                  </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input  value={formData.email} name="email" onChange={handleChange}  type="email" required />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input  value={formData.password} name="password" onChange={handleChange} type={showPassword ? 'text' : 'password'} required/>
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                onClick={handleClick}
                  loadingText="Submitting"

                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              
              </Stack>
            
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link href='/login' color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
       <ToastContainer />
       </>
    );
  }