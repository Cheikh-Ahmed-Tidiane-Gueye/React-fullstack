import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box} from '@mui/material';
import Navbar from './Composants/Navbar'
import AjouterPublication from './Composants/AjouterPublication'
import axios from 'axios';
import { useQueryClient , useQuery } from '@tanstack/react-query';
import CartePub from './Composants/CartePub';


export default function Dashbord() {

  const navigate = useNavigate();
  const [publications, setPublications] = useState([]) 

  useEffect(() => {
    if (!localStorage.getItem("utilisateur")) {
      navigate("/connection");
    }
    axios.get("http://localhost:3000/publications")
    .then((res) => {
      setPublications(res.data)
    })
  }, [])

  const queryClient = useQueryClient()
  const {data:publication, error, isLoading} = useQuery({
    queryKey: ["publications"],
    queryFn: () => axios.get("http://localhost:3000/publications")
    .then((res)=> res.data),
    onerror: (error) => console.log(error)
  })

  if (isLoading){
    return <div>Chargement en cours ...</div>
  }
  let pubTrier = publication.sort((a, b) =>{
    return new Date(b.datePublication) - new Date(a.datePublication)
  })
  if (publication) {
    
  }
  return (
    <Box bgcolor={"#eef4ff"}>
      <Navbar/>
      <AjouterPublication/>
      <Box width={"60%"} margin={"auto"}>
        {publication && pubTrier.map((publication) => 
          <CartePub publication={publication}/>
        )}
      </Box>
    </Box>
  )
}