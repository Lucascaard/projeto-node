const mongoose = require("mongoose");
const dbConfig = "mongodb://0.0.0.0:27017/cliente";
//const dbConfig = "mongodb+srv://adslucascardoso:conection2500@cluster0.gsktlgs.mongodb.net/pessoa?retryWrites=true&w=majority";

(async () => {
    try {
        await mongoose.connect(dbConfig, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conexão com o banco de dados estabelecida com sucesso.");
    } catch (err) {
        console.error("Erro ao conectar-se ao banco de dados: ", err);
    }
})();
