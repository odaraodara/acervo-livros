import mongoose, {Schema} from "mongoose";

const livroSchema = new Schema ({

    titulo : {type: String, required: true },
    autoria : { type: String, requuired: true},
    editora : { type: String, requuired: true},
    statusLeitura : { type: Boolean, required: false}

 })

 export const livroModel = (mongoose.models.livro || mongoose.model('livros', livroSchema));