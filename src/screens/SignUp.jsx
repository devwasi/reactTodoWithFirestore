import { Button, Divider, Stack, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, db } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'

const Login = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()


    const signUpHandler = async ()=>{
        try {
          await  createUserWithEmailAndPassword(auth, email,password).then(async userCredentials=>{
                console.log(userCredentials)    
                const userObj = {
                    name,
                    email
                }
                // set user data in database
                await setDoc(doc(db,"users",userCredentials.user.uid),userObj)
                navigate("/")
            }
                ).catch(error=>{
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

  return (
<>
<Stack sx={{boxShadow: "0 0 5px black", maxWidth: 450, flexWrap: "wrap", justifyContent: "center", padding: 2, rowGap: 2, borderRadius: 2, mx: "auto"}}>
<Stack flexDirection={"row"} justifyContent={"center"}>
    <Typography variant='h3'>
        Sign Up
    </Typography>
</Stack>

    <Divider />

<Stack sx={{ flexDirection: "column", justifyContent: "space-between", borderRadius: 2, gap: 2}}>
    <TextField fullWidth placeholder='Name' onChange={e=>setName(e.target.value)} />
    <TextField fullWidth placeholder='email' type='email' onChange={e=>setEmail(e.target.value)} />
    <TextField fullWidth placeholder='Password' type='password' onChange={e=>setPassword(e.target.value)} />
        <Button onClick={signUpHandler} variant='contained' >SignUp</Button>
</Stack>

<Divider />
<Stack flexDirection={'row'} justifyContent={"center"} alignItems={"center"}>
    <Typography>
        already have an account ? 
    </Typography>
    <Button onClick={()=>navigate("/")}>
        Login
    </Button>
</Stack>


</Stack>
</>
  )
}

export default Login