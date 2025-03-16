const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

app.get("/brands", (req, res) => {
    let query_str = `SELECT b.id, b.name, ROUND(avg(bm.average_price),2) average_price FROM nexu_brands.brand b left join nexu_brands.brand_model bm on b.id = bm.brand_id group by b.id;`

    db.query(query_str, (err, results) =>{
        if(err){
            return res.status(500).json({error: err.message});
        }
        res.json(results);
    });
});

app.get("/brands/:id/models",(req, res) => {
    const brandId = req.params.id;

    db.query(
        "SELECT id, model_name, average_price from nexu_brands.brand_model where brand_id = ?", 
        [brandId],
        (err, results) =>{
            if(err){
                return res.status(500).json({error: err.message});
            }
            if(results.length === 0){
                return res.status(400).json("No models found for this brand")
            }

            res.json(results);
        }
    );
});

app.post("/brands", async (req, res) => {
    const {brand_name} = req.body;

    if(!brand_name){
        return res.status(400).json({error: "brand name is requiered"});
    }

    try {
        const [result1] = await db.promise().query(
            "SELECT name FROM nexu_brands.brand WHERE name = ?",
            [brand_name]
          );
      
          if(result1.length > 0) {
            return res.status(400).json({ error: "This brand already exists" });
          }
      
          await db.promise().query(
            "INSERT INTO nexu_brands.brand (name) VALUES (?)",
            [brand_name]
          );

          res.status(201).json({ message: "Brand added successfully ", brand_name: brand_name });

    } catch (error) {
        return res.status(500).json({error: error});
    }
});

app.post("/brands/:id/models/", async (req, res) => {
    const {model_name} = req.body;
    let average_price = req.body.average_price;

    const brandId = req.params.id;

    if(!model_name){
        return res.status(400).json({error: "model name is requiered"});
    }

    try {
        console.log("SELECT name FROM nexu_brands.brand WHERE id = ?",brandId)
        const [result1] = await db.promise().query(
            "SELECT name FROM nexu_brands.brand WHERE id = ?",
            [brandId]
          );
          
          console.log('result1.length',result1.length)
          if(result1.length === 0) {
            return res.status(400).json({ error: "This brand doesn't exist" });
          }

          const [result2] = await db.promise().query(
            "SELECT model_name FROM nexu_brands.brand_model WHERE model_name = ? and brand_id = ?",
            [model_name, brandId]
          );
      
          if(result2.length > 0) {
            return res.status(400).json({ error: "This model already exists for this brand" });
          }
      
          
          if(average_price <= 100000){
            average_price = 0;
          }

          await db.promise().query(
            "INSERT INTO nexu_brands.brand_model (brand_id, model_name, average_price) VALUES (?,?,?)",
            [brandId, model_name, average_price]
          );

          res.status(201).json({ message: "Model added successfully", model_name: model_name, average_price: average_price });

    }catch (error) {
        return res.status(500).json({error: error});
    }
});

app.put("/models/:id", async (req, res) => {
    const  modelId  = req.params.id
    const { average_price } = req.body;
  
    if(average_price <= 100000) {
      return res.status(400).json({ error: "The average price must be greater than 100000" });
    }
  
    try{
  
      const [modelResult] = await db.promise().query("SELECT * FROM nexu_brands.brand_model WHERE id = ?", [modelId]);
      if(modelResult.length === 0) {
        return res.status(404).json({ error: "Model not found" });
      }
  
      await db.promise().query("UPDATE nexu_brands.brand_model SET average_price = ? WHERE id = ?", [average_price, modelId]);
  
      res.status(200).json({ message: "Average price updated successfully", average_price: average_price });

    }catch (error) {
      res.status(500).json({ error: error });
    }
  });

app.get("/models", async (req, res) => {
    const { greater, lower } = req.query;
  
    if (!greater || !lower) {
      return res.status(400).json({ error: "Both 'greater' and 'lower' parameters are required" });
    }
  
    try {

        let values = [Number(greater), Number(lower)];
        const [models] = await db.promise().query("SELECT id, model_name as name, average_price FROM brand_model WHERE average_price > ? AND average_price < ?", values);
  
        res.status(200).json(models);
    } catch (error) {
      res.status(500).json({ error: error });
    }
});
  
  

app.listen(3000, () => {
    console.log("Server running");
})
