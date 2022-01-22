import React, {useEffect, useState} from "react";
import axios from "axios";
import './styles/style.css'
import { DataGrid } from "@mui/x-data-grid";

let initialState =[
]

const columns=[
    {field: 'id1', headerName: 'ID', width:130},
    {field: 'fork1', headerName: 'Forks URL', width:400},
    {field: 'repo1', headerName: 'Repository', width:400},
    {field: 'visible1', headerName: 'Visibility', width:130}
]


const Fetch = () => {
    const [value, setValue] = useState("react")
    const [initial, setInitial] =useState([])


    const fetchApi = async () =>{
        
        const response = await axios.get("https://api.github.com/search/repositories?q="+value).catch((err) =>{
            return console.log("Error", err)
        })
      
           const  a= response.data
           //i<Object.keys(a).length
           for(let i=0; i<30; i++){
               const obj= {}
               obj['id1']= a.items[i].id
               obj['fork1']= a.items[i].forks_url
               obj['repo1']= a.items[i].owner.repos_url
               obj['visible1']= a.items[i].visibility
               initialState.push(obj)
           }
           setInitial(initialState)
           console.log(initial[0])
        
        
    }

    useEffect(()=>{
        console.log("useEffect calling")
        fetchApi()
       
    },[value])
    

    const submit =  (e) =>{
        e.preventDefault()
        setValue(e.target.elements.input.value)
        initialState=[]
         
    }

    return(
        <div style={{ height: 500, width: '100%' }}>
             <p>Serach your repositories here</p>
             <form onSubmit={submit}>
                 <input placeholder="React" name="input" />
                 <button >Search</button>
             </form>
             <DataGrid 
                    rows={initial}
                    columns={columns}
                    getRowId ={(row) => row.id1}
                    pageSize={7}
                    rowsPerPageOptions={[7]}
                    checkboxSelection
             />

        </div>
            
        
    )
 
 
   
}



export default Fetch