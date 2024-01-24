import { Button, Divider, Stack, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, db } from '../config/firebase'
import { json, useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()


    const loginHandler = async ()=>{
        try {
          await  signInWithEmailAndPassword(auth, email,password).then(async userCredentials=>{
                console.log(userCredentials.user.uid)
                navigate("/todo")
                localStorage.setItem("uid",userCredentials.user.uid);
                const docData = await getDoc(doc(db,"users", userCredentials.user.uid))
                localStorage.setItem("userData",JSON.stringify(docData.data()))
            }
                ).catch(error=>{
                    toast.error(error.code, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                })
        } catch (error) {
            toast.error(error.code, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    // Google sign in handler

    const googleSignInHandler =async ()=>{

     try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
          .then(async(result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log("credentials===>", credential)
            // The signed-in user info.
            const userUId = result.user.uid;
            const email = result.user.email
            const name = result.user.displayName

            const userObj = {
                name,
                email 
            }
            await setDoc(doc(db,"users",userUId),userObj)
            localStorage.setItem("uid",userUId);
            localStorage.setItem("userData",JSON.stringify(userObj))
            navigate("/todo")
            // get users data from database
                // const docData = await getDoc(doc(db,"users", userUId))
            console.log("user===>", user.uid)
            
          }).catch((error) => {
            toast.error(error.code, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        });
     } catch (error) {
        toast.error(error.code, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
     }
    }

    // Github sign in handler

    const githubSignInHandler =async ()=>{
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider)
              .then(async(result) => {
                const credential = GithubAuthProvider.credentialFromResult(result);
                console.log("credentials===>", credential)
                // The signed-in user info.
                const userUId = result.user.uid;
                const email = result.user.email
                const name = result.user.displayName
    
                const userObj = {
                    name,
                    email 
                }
                await setDoc(doc(db,"users",userUId),userObj)
                localStorage.setItem("uid",userUId);
                localStorage.setItem("userData",JSON.stringify(userObj))
                navigate("/todo")
                // get users data from database
                    // const docData = await getDoc(doc(db,"users", userUId))
                console.log("user===>", user.uid)
                
              }).catch((error) => {
                toast.error(error.code, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            });
         } catch (error) {
            toast.error(error.code, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
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
<Stack>
<Button onClick={googleSignInHandler} variant='contained'>Continue with Google</Button>
</Stack>
<Stack>
<Button onClick={githubSignInHandler} variant='contained'>Continue with Github</Button>
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