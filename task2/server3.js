const {ApolloServer , gql} = require('apollo-server');
const typeDefs = gql`
    type Details{
        id: ID!
        name: String!
        age: Int!
        college: String!
    }
    type Query {
        getAllDetails: [Details]
        getDetail(id:ID!) : Details
    }
    type Mutation {
        addDetail(name:String! , age:Int!, college:String!) : Details
        deleteDetail(id:ID!) : Details
        updateDetail(id:ID!,name : String,age:Int!,college:String!) : Details
    }
`;
let counter = 2;
const Detailsdata = [{
    id:"1",
    name:"Kishore",
    age:21,
    college:"NEC"
},{
    id:"2",
    name:"Guru",
    age:20,
    college:"NIT",
}];

const resolvers = {
    Query : {
        getAllDetails:() => Detailsdata,
        getDetail: (parent,args) => {
            const user = Detailsdata.find((user) => user.id === args.id);
            if(!user)
            {
                throw new Error("User not found");
            }
            return user;
        }
    },
    Mutation : {
        addDetail : (parent, args) => {
            const newDetail = {
                id: String(++counter),
                name : args.name,
                age: args.age,
                college : args.college,
            }
            Detailsdata.push(newDetail);
            console.log("Inserted successfully");
            return newDetail;
        },
        deleteDetail: (parent, args) => {
            const user = Detailsdata.findIndex((user) => user.id === args.id)
            if(user === 0)
            {
                throw new Error('User not found');
            }
            const deletedDetail = Detailsdata.splice(user,1)[0];
            return deletedDetail;
        },
        updateDetail:(parent,args) => {
            const userId = Detailsdata.find((user) => user.id === args.id);
            if(!userId)
            {
                throw new Error('User not found');
            }
            if(args.name !== undefined) userId.name = args.name;
            if(args.age !== undefined) userId.age = args.age;
            if(args.college !== undefined) userId.college = args.college; 
            return userId;
        }
    }
}

const app = new ApolloServer({typeDefs,resolvers});
app.listen().then(({url}) =>{
    console.log(`the port is running in ${url}`);
})