nexu_test
Karen Torres Evaluation Test

Este programa fue creado con MySQL (MariaDB versión 10.4.32) y Node.js (versión 22.14.0).  
Para este programa y para ejecutarlo, es necesario:

1. Clonar el repositorio.
2. Crear la base de datos y las tablas usando el archivo `nexu_brands.sql`. (Usé XAMPP porque no tengo MySQL en mi computadora personal).

   En MySQL:
      ```sql
      CREATE DATABASE nexu_brands;

2.5 Después, en la terminal:
   ```
   mysql -u root -p nexu_brands < C:\ruta\del\nexu_brands.sql


3. Una vez creada la base de datos, vamos a poblarla. El dump que les proporciono ya agregará toda la información, pero si desean probar el script, pueden truncar las tablas y luego deben ejecutar el archivo `populate_db.js` con Node.js:

   ```sql
   node populate_db.js


**Nota:** El archivo JSON que compartieron en su repositorio tiene un "brand" con un modelo duplicado. Considero que, a menos que se especifique, no se deben omitir los duplicados automáticamente durante la ejecución del programa. En una situación real, esto podría causar la pérdida de información importante, por lo que debería investigarse primero la causa del duplicado. No agregué ninguna funcionalidad para omitir duplicados; solo removí el registro del archivo. Si usan el `models.json` que proporciono en este repositorio, no tendrán problema. Sin embargo, si usan el de ustedes, saltará un error por duplicado con su respectivo mensaje.

4. Correr el archivo `server.js` con Node.js, y ya tendremos nuestro programa escuchando:

   ```js
   node server.js


5. Usar Postman o abrir el navegador para empezar a probar los endpoints (yo usé el navegador con la función `fetch()` de JavaScript en la consola).

   - **Usar GET para traer todas las brands**:
     localhost:3000/brands

   - **Usar GET para traer todos los modelos de una brand**:
     localhost:3000/brands/:id/models
     Reemplazar `:id` con el ID de la brand.

   - **Usar POST para agregar una nueva brand**:
     localhost:3000/brands
     En el cuerpo del request, agregar un objeto con la propiedad `brand_name`.

   - **Usar POST para agregar un nuevo modelo**:
     localhost:3000/brands/:id/models
     En el cuerpo del request, agregar un objeto con la propiedad `model_name` y opcionalmente `average_price`.  
     Reemplazar `:id` con el ID de la brand a la que se le agregará el modelo.  
     
     Si se especifica un `average_price` menor a $100,000, el registro se guardará con `0` en la base de datos para ese campo.  
     Obsérvese que no hay valores nulos en ese campo, solo `0`. Supuse que así es como debe funcionar el programa.

   - **Usar PUT para actualizar el `average_price` de un modelo**:
     localhost:3000/models/:id
     En el cuerpo del request, agregar un objeto con la propiedad `average_price`.  
     Reemplazar `:id` con el ID del modelo al que se le editará el valor.

   - **Usar GET para traer la lista de modelos en un rango de precios**:
     localhost:3000/models?greater=[lowerlimit]&lower=[higherlimit]
     Reemplazar `[lowerlimit]` con el límite inferior y `[higherlimit]` con el límite superior.

6. En la base de datos podrán ver un par de ejemplos que agregué, y también instalé ESLint para que puedan revisar el código. Para ello, solo ejecuten:

   ```sh
   npx eslint .
