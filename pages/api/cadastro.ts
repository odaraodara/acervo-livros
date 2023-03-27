import type {NextApiRequest,NextApiResponse} from 'next';
import type {requestCadastro} from '../../types/requestCadastro';
import {livroModel} from '../../models/livroModel';
import { conectarMongoDB } from '@/middlewares/conectarMongoDB';


const endpointCadastro = 
    async (req : NextApiRequest, res : NextApiResponse) =>{

// verificar se o método é POST e passar mensagem de erro se não for

if (req.method === 'POST'){

    const livro = req.body as requestCadastro;

    if (!livro.autoria || livro.autoria === ""){
        return res.status(400).json({erro: 'O campo da autoria é obrigatório'});
    }
    if (!livro.titulo || livro.titulo === ""){
        return res.status(400).json({erro: 'O campo do título é obrigatório'});
    }
    if (!livro.editora || livro.editora === ""){
        return res.status(400).json({erro: 'O campo da editora é obrigatório'});
    }

    await livroModel.create(livro);
    return res.status(200).json({msg: 'Livro cadastrado com sucesso!'});

}
return res.status(405).json({ erro: 'O método informado não é válido'})

}

export default conectarMongoDB (endpointCadastro);