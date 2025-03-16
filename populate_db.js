const fs = require("fs");
const db = require("./db");

const jsonData = JSON.parse(fs.readFileSync("models.json","utf-8"));

const insertData = async (data)=>{
    try {
        await db.promise().query("Start transaction");

        for(let item of data){

            const [result1] = await db.promise().query(
                "SELECT id FROM brand WHERE name = ?",
                [item.brand_name]
            );
            
            let brandId;

            if(result1.length === 0){
                const [result2] = await db.promise().query("INSERT INTO brand(name) VALUE(?)",
                    [item.brand_name]
                );
                brandId = result2.insertId;
            }else{
                brandId = result1[0].id;
            }

            await db.promise().query("INSERT INTO brand_model(brand_id,model_name,average_price) VALUES (?,?,?)",
                [brandId, item.name, item.average_price]
            );
        }

        await db.promise().query("Commit");
        console.log("Data populeted successfully");
        
    } catch (error) {
        await db.promise().query("Rollback");
        console.log("error loading data: ",error)
        
    }
};

insertData(jsonData);