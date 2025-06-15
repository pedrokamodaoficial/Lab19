import axios from "axios";

export default axios.create({
  baseURL:"http://grupo2senai-001-site1.htempurl.com/", //Larissa, não apaga, só comenta e coloca pra baixo <3
  //"https://192.168.0.193:5000/",
  //https://localhost:5001/ ~ Matheus
  headers: {
    "Content-type": "application/json"
  }
});
