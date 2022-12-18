const { ApolloServer, gql } = require('apollo-server');

const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');
     
const typeDefs = gql`

    type Conta {
        _id : String!,
        email: String,
        password : String,
        nome : String,
        telefone: String,
        token : String
    }

    type Radar { 
        id : ID!,
        lat : String,
        lng : String,
        name : String
    }

    type Query {
        login(email: String!, password : String!) : Conta
    }

    type Mutation {
        createRadar( lat: String, lng : String , name : String  ) : Radar!
    } 
`;


const resolvers = {

    Query: {
        login : (_, args) => {


            let usuarios = [
                { _id: "10001" , email : "usuario1@velocidademonstra.com" ,   password:"12345", nome:"Usuário 01", telefone: "(21) 98500-0625" , token: "30090909012371273907900uy9090179498792138698y72r897hh8fd3bn93b9dgh83bgh98!@Rh9HR(H#@R(H32r032rhj9023rh0329rh093hr0293hr2903h9j0rejiopfjoh9jj90hh903pewf90709ujopowjefopewqjpoewj"    },
                { _id: "10002" , email : "usuario2@velocidademonstra.com" ,   password:"12345", nome:"Usuário 02", telefone: "(21) 99989-0625" , token: "93u3u90u90j9d02n.buyc.qyb.r2qrf5462r4f45634t68545644t4893t448944t49t4t96469u87i9884o998p4098p[40-9[p804p9894l9h84h86k89kf5674fgj7k698gkr864gk9884kg898k864kg6898k4g9gk884gk898gk489"    },
                { _id: "10003" , email : "usuario3@velocidademonstra.com" ,   password:"12345", nome:"Usuário 03", telefone: "(21) 81234-0625" , token: "32154546784123165416352154151545451548745415498496849864df89564dtg986gh4er98g4er98g4ert984ert89e4rt89ert4gre984fr89rew4yjku894ilo89op4op[p[]4io\]4[o9[4ol98iu4iuk89iklouuo;liu89kiuo98p08978767898047-"   }
            ]


            console.log(args.email)
            console.log(args.password)

            var conta = usuarios.find((obj) => obj.email ===  args.email);
            
            if(conta.password === args.password) {
                conta.password= "********";
                return conta;
            } else {
                return null;
            }

                        
        }
    },

    Mutation : {
        //retorna o radar criado
        createRadar : (_, args) => {
            const r = {
                id :  uuidv1()  ,
                lat :  args.lat ,
                lng : args.lng,
                name : args.name                 
            }

            return r;
        }
        

    }
    

};



const server = new ApolloServer({  cors: true, typeDefs, resolvers})


server.listen({port : 80 }).then(({ url }) => console.log(  'Iniciado' ) );
