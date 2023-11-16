import { Stack, TextField, Button } from '@mui/material';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import axios from "axios";

import { useMutation, useQueryClient } from '@tanstack/react-query';
export default function AjouterPublication() {

  const user = JSON.parse(localStorage.getItem("utilisateur"))
  const {handleSubmit, register,reset, formState: { errors }} = useForm();

  const useQuery = useQueryClient()

  const mutation = useMutation({
    mutationFn: (publication) => {
      return axios.post("http://localhost:3000/publications", publication)
    },
    onError: (error) => {
      toast.error("Une erreur est survenue")
    },
    onSuccess: () =>{
      useQuery.invalidateQueries("publications")
      toast.success("Publication ajouter avec succès")
    }
  })

  function onSubmit(data) {
    console.log(data);
    const publication = {...data, 
      idUtilisateur: user.id, 
      datePublication: new Date(), 
      likePublication: 0, 
      auteur: user.nomUtilisateur
    }
    mutation.mutate(publication)
    
  }
  return (
    <Stack width={"60%"} margin={"auto"}  marginBottom={3}>
        <h1>Ajouter une publication</h1>
        <form action="" style={{marginTop:4}} onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={2}>
              <TextField id="outlined-basic" label="Parlez-nous de votre journée" variant="outlined" fullWidth size="small" type="text" multiline rows={4} 
                {...register("textePublication", {required: "Veuiller saisir un texte", minLength: { value: 10, message: "Veuiller saisir un texte de plus de 5 caractères"}})}
              />
              <TextField id="outlined-basic" label="Saisir l'url de votre image" variant="outlined" fullWidth size="small" type="text"
                {...register("imagePublication", {required: "Veuiller saisir une url", minLength: { value: 10, message: "Veuiller saisir un texte de plus de 5 caractères"}})}
              />
              <Button variant="contained" type="submit">Publier</Button>
          </Stack>
        </form>
    </Stack>
  )
}
