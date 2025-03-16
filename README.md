nexu_test
Karen Torres Evaluation Test

Este programa fue creado con MySQL (MariaDB versión 10.4.32) y Node.js (versión 22.14.0).  
Para este programa y para ejecutarlo, es necesario:

1. Clonar el repositorio.
2. Crear la base de datos y las tablas usando el archivo `nexu_brands.sql`. (Usé XAMPP porque no tengo MySQL en mi computadora personal).
  en mysql:
  # CREATE DATABASE nexu_brand;

  Después, en la terminal:
  #  mysql -u root -p nexu_brands < C:\ruta\del\nexu_brands.sql  

3. Una vez creada la base de datos, vamos a poblarla. El dump que les proporciono ya agregará toda la información, pero si desean probar el script, pueden truncar las tablas y luego deben ejecutar el archivo populate_db.js con Node.js:
#  node populate_db.js

Nota: El archivo JSON que compartieron en su repositorio tiene un brand con un model duplicado. Considero que, a menos que se especifique, no se deben omitir los duplicados automáticamente durante la ejecución del programa. En una situación real, esto podría causar la pérdida de información importante, por lo que debería investigarse primero la causa del duplicado. No agregué ninguna funcionalidad para omitir duplicados; solo removí el registro del archivo. Si usan el models.json que proporciono en este repositorio, no tendrán problema. Sin embargo, si usan el de ustedes, saltará un error por duplicado con su respectivo mensaje.
   
6. Correr el archivo server.js con node y ya tendremos nuestro programa escuchando
# node server.js
   
8. Usar Postman o abrir el navegador para empezar a probar los endpoints (yo usé el navegador con la función /**fetch()**/ de JavaScript en la consola).
   
  Usar GET para traer todas las brands:
    localhost:3000/brands

  Usar GET para traer todos los modelos de una brand:
    localhost:3000/brands/:id/models
    Remplazar :id con el id del brand 

  Usar POST para agruegar una nueva brand
    localhost:3000/brands
    En el cuerpo del request agregar un objecto con la propiedad brand_name

  Usar POST para agregar un nuevo model:
    localhost:3000/brands/:id/models
    En el cuerpo del request agregar un objecto con la propiedad model_name y opcionalmente average_price
    Remplazar :id con el id del brand al que se le agregara el model
  
    Si especifica un average_price menor a $100,000 el registro se guardara con 0 en la base de datos para ese campo, 
    vi que no tienen valores nulos en ese campo y pero si 0s supuse que asi es como debe de funcionar el programa.

  Usar PUT para agregar un nuevo modelo a una brand:
    localhost:3000/models/:id
    En el cuerpo del request agregar un objecto con la propiedad average_price
    Remplazar :id con el id del model al que se le editara el valor

  Usar GET para traer la lista de modelos de un rango:
    localhost:3000/models?greater=[lowerlimit]&lower=[higherlimit]
    Remplazar [lowerlimit] con el limite inferior y [higherlimit] con el limite superior

En la base de datos podran ver un par de ejemplos que agregué, y tambien instale eslint si gustan revisar el codigo para ello solo corremos:
# npx eslint .  
