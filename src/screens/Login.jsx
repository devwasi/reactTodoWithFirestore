import { Button, Divider, Stack, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()


    const loginHandler = async ()=>{
        try {
          await  signInWithEmailAndPassword(auth, email,password).then(userCredentials=>{
                console.log(userCredentials)    
                navigate("/todo")
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
        Login
    </Typography>
</Stack>

    <Divider />

<Stack sx={{ flexDirection: "column", justifyContent: "space-between", borderRadius: 2, gap: 2}}>
    <TextField fullWidth placeholder='email' type='email' onChange={e=>setEmail(e.target.value)} />
    <TextField fullWidth placeholder='Password' type='password' onChange={e=>setPassword(e.target.value)} />
        <Button onClick={loginHandler} variant='contained' >Login</Button>
</Stack>

<Divider />
<Stack flexDirection={'row'} justifyContent={"center"} alignItems={"center"}>
    <Typography>
        don't have an account ? 
    </Typography>
    <Button onClick={()=>navigate("/signup")}>
        Signup
    </Button>
</Stack>


</Stack>
</>
  )
}

export default Login