import { conectarMongoDB } from '@/middlewares/conectarMongoDB';
import { requestCadastro } from '@/types/requestCadastro';
import {livroModel} from '../../models/livroModel';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const endpointCadastro = nc()
.post( async (req:NextApiRequest, res:NextApiResponse)=> {
    const livro = req.body as requestCadastro;

    if (!livro) {
        return res.status(400).json({erro: 'Requisição inválida'});
    }

    if (!livro.autoria || livro.autoria === ""){
        return res.status(400).json({erro: 'O campo da autoria é obrigatório'});
    }
    if (!livro.titulo || livro.titulo === ""){
        return res.status(400).json({erro: 'O campo do título é obrigatório'});
    }
    if (!livro.editora || livro.editora === ""){
        return res.status(400).json({erro: 'O campo da editora é obrigatório'});
    }

    const livroASerSalvo ={
        titulo : livro.titulo,
        autoria : livro.autoria,
        editora : livro.editora,
        statusLeitura : livro.statusLeitura
    };

    await livroModel.create(livroASerSalvo);
    return res.status(201).json({msg: 'Livro cadastrado com sucesso!'});
})

.get (async (req:NextApiRequest, res:NextApiResponse)=>{

    const livros = await livroModel.find();
    return res.status(200).json({ data: livros });
})

.delete(async (req:NextApiRequest, res:NextApiResponse)=>{

    const {idLivro} = req.query;
    const livroEncontrado = await livroModel.findById(idLivro);

    if(!livroEncontrado){
        return res.status(404).json({erro: 'Livro não encontrado'});
    }

    await livroModel.findByIdAndDelete(idLivro);
    return res.status(204).json({});
})

.put(async (req:NextApiRequest, res:NextApiResponse)=>{

    const livroEditado = req.body as requestCadastro;
    const { idLivro } = req.query;

    const livroEncontrado = await livroModel.findById(idLivro);

    if(!livroEncontrado){
        return res.status(404).json({erro: 'Livro não encontrado'}); 
    }

    livroEncontrado.titulo = livroEditado.titulo;
    livroEncontrado.autoria = livroEditado.autoria;
    livroEncontrado.editora = livroEditado.editora;
    livroEncontrado.statusLeitura = livroEditado.statusLeitura;

    await livroModel.findByIdAndUpdate({ _id : livroEncontrado._id}, livroEncontrado);
    return res.status(404).json({})

})


export default conectarMongoDB (endpointCadastro);