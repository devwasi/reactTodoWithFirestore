import { Button, Divider, Stack, TextField, Typography } from '@mui/material'
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../config/firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const TodoMain = () => {
    const[todo, setTodo] = useState("")
    const[todoData, setTodoData] = useState([])
    const[refresh, setRefresh] = useState(false)
    const navigate = useNavigate()


    const uid = localStorage.getItem("uid")

const getTodoData = async ()=>{
    const arr = []
    try {
        const docSnap = await getDocs(collection(db,"users",uid,"todos"))

        docSnap.forEach(doc=>{
            arr.push({
                ...doc.data(),
                id: doc.id
            })
        })
        setTodoData([...arr])
        
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

    useEffect(()=>{
        getTodoData()
    },[refresh])

    // add todo
    const addTodoHandler = async ()=>{
        if(todo === ""){
            toast.error("add something ", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return
        } else{
        try {
            const obj = {
                todo,
            }
            const randomId = Math.floor(Math.random()*1236583546464).toString()
            await setDoc(doc(db,"users",uid,"todos",randomId),obj)
            setRefresh(!refresh)
            setTodo("")
            
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
    }

    // edit todo
    const editTodo = async (id)=>{
        try {
            
const editValue = prompt("enter edit todo")

const updateObj = {
todo: editValue
}
        await updateDoc(doc(db,"users",uid,"todos",id),updateObj)

        setRefresh(!refresh)
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

    const deleteTodo = async(id)=>{
        try {
            
        await deleteDoc(doc(db, "users",uid,"todos", id));
        setRefresh(!refresh)
            
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

    const signOutHandler = ()=>{
        signOut(auth)
        localStorage.clear()
        navigate("/")
    }

  return (
    <>

    <Stack sx={{boxShadow: "0 0 5px black", maxWidth: 450, flexWrap: "wrap", justifyContent: "center", padding: 2, rowGap: 2, borderRadius: 2, mx: "auto"}}>

    <Stack sx={{position: "fixed", top:2 , right: 2}}>
        <Button onClick={signOutHandler}>
            Sign Out
        </Button>
    </Stack>

    <Stack sx={{boxShadow: "0 0 5px black ", flexDirection: "row", justifyContent: "space-between", borderRadius: 2,}}>
        <TextField fullWidth value={todo} placeholder='Enter Todo' onChange={e=>setTodo(e.target.value)} />
            <Button onClick={addTodoHandler}>Add</Button>
    </Stack>

    <Divider />

        {/* todos */}
   {
       todoData.map((e,i)=>{
           return <Stack key={i}>
        <Stack sx={{boxShadow: "0 0 5px black ", flexDirection: "row", justifyContent: "space-between", borderRadius: 2, paddingInlineStart: 2}}>
         <Typography variant='h6' >
            {e.todo}
        </Typography>
                
            <Stack flexDirection={"row"}>
            <Button onClick={()=>editTodo(e.id)}>edit</Button>
            <Button onClick={()=>deleteTodo(e.id)}>Del</Button>
            </Stack>
    </Stack>
        </Stack>
    })
   }
  
    </Stack>
    </>
  )
}

export default TodoMain