import { 
        Stack, Typography, Box, TextField, Button} from '@mui/material';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

export default function Inscription() {

    const {handleSubmit, register, formState: { errors }} = useForm();
    const navigate  = useNavigate();

    function onSubmit(data) {
    if (data.motDePasse !== data.motDePasseConfirmation) {
        toast.error("Les mots de passe ne correspondent pas")
    } else {
        axios.get(`http://localhost:3000/utilisateurs?emailUtilisateur=${data.emailUtilisateur}`)
            .then((res) => {
                if (res.data.length > 0) {
                    toast.error("Un compte existe déjà avec cette adresse mail")
                } else {
                    axios.post("http://localhost:3000/utilisateurs", data)
                        .then((res) => {
                            // console.log(res);

                            toast.success("Inscription reussie");

                            // Ajout d'un délai de 5 secondes avant la redirection
                            setTimeout(() => {
                                navigate("/connection");
                            }, 2000);
                        }).catch((err) => {
                            console.log(err);
                            toast.error("Une erreur est survenue")
                        })
                }
            })
    }
}
  return (
    <div>
        <Stack alignItems={"center"} justifyContent={"center"} width={"100%"} height={"100vh"} backgrounColor={"#f5f5f5"}>

            <Box width={400} sx={{backgroudColor: "#fff",padding: 3}}>

                <Typography variant="h5" textAlign={"center"} sx={{marginBottom: 2}}>Inscription</Typography>

                <form action="" style={{margiTop:2}} onSubmit={handleSubmit(onSubmit)}>

                    <Stack direction={"column"} gap={2}>
                        <TextField id="outlined-basic" type='text' label="Veiller saisir votre nom" variant="outlined" fullWidth size='small' 
                            {...register("nomUtilisateur", {required: "Veiller saisir un nom", minLength: {value: 5, message: "Veuillez saisir un nom de plus de 5 caractères"}})}
                        />
                        <TextField id="outlined-basic" type='email' label="Veiller saisir votre adresse email" variant="outlined" fullWidth size='small' 
                            {...register("emailUtilisateur", {required: "Veiller saisir un email", pattern: "/^\w+([\.-]?\w+)*@\w+([\.-]?\.-]?\w+)*(\.\w{2,3})+$/"})}
                        />
                        <TextField id="outlined-basic" type='password' label="Veiller saisir un mot de passe" variant="outlined" fullWidth size='small' 
                            {...register("motDePasse", {required: "Veiller saisir un mot de passe", minLength: {value: 6, message: "Veuillez saisir un mot de passe de plus de 6 caractères"}})}
                        />
                        <TextField id="outlined-basic" type='password' label="Veiller cofirmer votre mot de passe" variant="outlined" fullWidth size='small' 
                            {...register("motDePasseConfirmation", {required: "Veiller confirmer un mot de passe", minLength: {value: 6, message: "Veuillez confirmer un mot de passe de plus de 6 caractères"}})}
                        />
                    </Stack>

                    <Stack>
                        <Button variant="contained" type='submit' sx={{marginTop: 2, marginBottom: 2}}>inscription</Button>
                        <Typography sx={{fontSize:"12px"}}>Voulez-vous déjà un compte ? <Link style={{textDecoration:"none"}} to="/connection">connectez-vous</Link> {" "}</Typography>
                    </Stack>
                </form>

            </Box>
            
        </Stack>
    </div>
  )
}