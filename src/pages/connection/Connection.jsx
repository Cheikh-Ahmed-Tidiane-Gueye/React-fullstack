import { Stack, Typography, Box, TextField, Button} from '@mui/material';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Connection() {

  const {handleSubmit, register, formState: { errors }} = useForm();
  const navigate  = useNavigate();
  useEffect(() =>{
      if(localStorage.getItem("utilisateur")){
        navigate("/")
      }
    })
  function onSubmit(data) {
    axios.get(`http://localhost:3000/utilisateurs?emailUtilisateur=${data.emailUtilisateur}&motDePasse=${data.motDePasse}`)
    .then((res) =>{
      if (res.data.length > 0) {
        localStorage.setItem("utilisateur", JSON.stringify(res.data[0]))
        navigate("/")
        toast.success("Connection reussie")
      } else {
        toast.error("Les identifiants sont incorrect")
      }
    })
  }

return (
<div>
  <Stack alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100vh"} backgrounColor={"#f5f5f5"}>

      <Box width={400} sx={{backgroudColor: "#fff",padding: 3}}>

          <Typography variant="h5" textAlign={"center"} sx={{marginBottom: 2}}>Connection</Typography>

          <form action="" style={{margiTop:2}} onSubmit={handleSubmit(onSubmit)}>

              <Stack direction={"column"} gap={2}>
                  <TextField id="outlined-basic" type='email' label="Veiller saisir votre adresse email" variant="outlined" fullWidth size='small' 
                      {...register("emailUtilisateur", {required: "Veiller saisir un email", pattern: "/^\w+([\.-]?\w+)*@\w+([\.-]?\.-]?\w+)*(\.\w{2,3})+$/"})}
                  />
                  <TextField id="outlined-basic" type='password' label="Veiller saisir un mot de passe" variant="outlined" fullWidth size='small' 
                      {...register("motDePasse", {required: "Veiller saisir un mot de passe", minLength: {value: 6, message: "Veuillez saisir un mot de passe de plus de 6 caractères"}})}
                  />
              </Stack>

              <Stack>
                  <Button variant="contained" type='submit' sx={{marginTop: 2, marginBottom: 2}}>Connection</Button>
                  <Typography sx={{fontSize:"12px"}}>Voulez-vous <Link style={{textDecoration:"none"}} to="/inscription">créer un compte</Link> ? {" "}</Typography>
              </Stack>
          </form>

      </Box>
      
  </Stack>
</div>
)
}