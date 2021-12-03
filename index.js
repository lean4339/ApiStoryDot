const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const productsRouter = require("./routes/productsRouter");
const {logErrors,boomErrorHandler,errorHandler} = require("./middlewares/error");



app.get("/",(req,res)=>{
    res.send("holis como va? esto es una api");
});
app.use(express.json());
app.use(cors());

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler); 
app.use("/products",productsRouter);
app.use("*",(req,res)=>{
    res.status(404).json({
        mesagge: "Nada que ver aquí"
    });
});
app.listen(port,()=>{
    console.log(`Corriendo en el puerto ${port}`);
})