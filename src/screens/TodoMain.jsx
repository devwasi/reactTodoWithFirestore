import { Button, Divider, Stack, TextField, Typography } from '@mui/material'
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../config/firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const TodoMain = () => {
    const[todo, setTodo] = useState("")
    const[todoData, setTodoData] = useState([])
    const[refresh, setRefresh] = useState(false)
    const navigate = useNavigate()

const getTodoData = async ()=>{
    const arr = []
    try {
        const docSnap = await getDocs(collection(db,"todo"))

        docSnap.forEach(doc=>{
            arr.push({
                ...doc.data(),
                id: doc.id
            })
        })
        setTodoData([...arr])
        
    } catch (error) {
        console.log(error)
    }
    console.log("tododata", todoData)
}

    useEffect(()=>{
        getTodoData()
    },[refresh])

    // add todo
    const addTodoHandler = async ()=>{
        if(todo === ""){
            console.log("emty")
            return
        } else{
        try {
            const obj = {
                todo,
            }
           const uId = localStorage.getItem("uid")

            await setDoc(doc(db,"todo",uId),obj)
            setRefresh(!refresh)
            setTodo("")
            
        } catch (error) {
            console.log(error)
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
        await updateDoc(doc(db,"todo",id),updateObj)

        setRefresh(!refresh)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTodo = async(id)=>{
        console.log("runn")
        try {
            
        await deleteDoc(doc(db, "todo", id));
        setRefresh(!refresh)
            
        } catch (error) {
            console.log(error)
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