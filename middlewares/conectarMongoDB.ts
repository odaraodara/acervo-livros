import {NextApiRequest,NextApiResponse,NextApiHandler} from 'next';
import mongoose from 'mongoose';


export const conectarMongoDB = (handler : NextApiHandler) =>
   async (req: NextApiRequest, res: NextApiResponse) => {

        //verificar se o banco ja está conectado
        //se estiver > seguir para o endpoint ou próximo middleware

        if (mongoose.connections[0].readyState){
            return handler(req,res);
        }

        // se não estiver conectada, vamos conectar usando a variável de ambiente

        const{DB_CONEXAO_STRING} = process.env;

        // se a env estiver vazia

        if (!DB_CONEXAO_STRING){
            return res.status(500).json({erro: 'ENV do banco de dados não informada'});
        }

        mongoose.connection.on('connection', ()=> console.log('Banco de Dados conectado'));
        mongoose.connection.on('error', error => console.log(`Ocorreu um erro ao conectar ao Banco de Dados ${error}`));  

        await mongoose.connect(DB_CONEXAO_STRING);
        // uma vez conectado, podemos seguir para o endpoint
        return handler(req,res);
    }

