-- -----------------------------------------------------
-- Insercion de Datos
-- -----------------------------------------------------

USE LabRem_Fisica;

-- -----------------------------------------------------
-- Laboratorios
-- -----------------------------------------------------

INSERT INTO Laboratorios (area, nombre, descripcion) 
VALUES 
('Física Experimental Básica','Lentes Convergentes','<p>La experiencia tiene como objetivos:<br/>Realizar experimentalmente la formación de imágenes por lentes convergentes, validar los supuestos del modelo teórico para lentes convergentes delgadas y determinar el valor acotado de la distancia  focal de una lente convergente.<br/>Al finalizar la experiencia el alumno deberia poder explicar el funcionamiento de las lentes convergentes en la formación  de imágenes, explicitar la diferencia entre una imagen "real" y una imagen "virtual" y contrastar el modelo de lentes  delgadas (ecuación de la lente delgada) con los resultados experimentales.<br/>La experiencia utiliza un sistema óptico sencillo (fuente luminosa - lente convergente - pantalla) en el cual los  estudiantes podrán observar a través de una cámara la imagen que forma la lente en la pantalla.<br/>Para una posición fija de la lente.<br/>1) se desplaza la fuente luminosa sobre un riel.<br/>2) se desplaza la pantalla sobre el riel para buscar el plano donde se forma una imagen nítida.<br/>3) se mide la distancia entre la lente y la pantalla, es decir, la distancia imagen.<br/>Se repite el procedimiento para varias distancias objeto, se obtendrá un conjunto de valores de distancias objeto e imagen  y el estudiante podra comprobar experimentalmente si la lente se comporta como lente delgada. Ademas El sistema permite incorporar un diafragma central para corregir posibles aberraciones de esfericidad.</p>'),
('Física Experimental Básica','Lentes Divergentes','<p>La experiencia tiene como objetivos:<br/>Realizar experimentalmente la formación de imágenes por lentes divergentes y medir la distancia focal de la lente divergente.<br/>Al finalizar la experiencia el alumno deberia poder explicar el funcionamiento de las lentes divergentes en la formación de imágenes, utilizar diagramas de marcha de rayos y explicitar los conceptos de "imagen real", "imagen virtual", "objeto real" y "objeto virtual".<br/>Se utilizara el mismo sistema experimental de la experiencia de lentes convergentes, al cual se incorpora además una lente divergente. Se utiliza como "objeto virtual" la imagen real que forma la lente convergente en un plano determinado ademas se coloca lente divergente de manera conveniente para que ésta forme una "imagen real" de ese objeto virtual en otro plano. El cual se localiza desplazando la pantalla.<br/>Como en el laboratorio de lentes convergentes la idea es detectar una imagen nitida en la pantalla utilizando un sistema de rieles.<br/>Se medirán la distancia entre la lente convergente y divergente (que permitirá calcular la distancia objeto) y la distancia lente divergente-pantalla. Con estas distancias el estudiante podrá calcular la distancia focal de la lente divergente, suponiendo modelo de lentes delgadas.<br/>En esta experiencia no se realiza control de ajuste de modelo.<br/>Se puede realizar con o sin diafragma central.</p>');

-- -----------------------------------------------------
-- Ensayos
-- -----------------------------------------------------

-- INSERT INTO Ensayos (idEnsayo, idUsuario, fechaHora, datosEntrada, datosSalida, idLaboratorio) 
-- VALUES  (DEFAULT, 1, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Sin diafragma"}', '{}',1),
--         (DEFAULT, 1, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Sin diafragma"}', '{}',1),
--         (DEFAULT, 2, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Sin diafragma"}', '{}',1),
--         (DEFAULT, 2, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Sin diafragma"}', '{}',1),
--         (DEFAULT, 3, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Sin diafragma"}', '{}',1),
--         (DEFAULT, 3, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma central"}', '{}',1),
--         (DEFAULT, 4, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma central"}', '{}',1),
--         (DEFAULT, 4, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma central"}', '{}',1),
--         (DEFAULT, 5, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma central"}', '{}',1),
--         (DEFAULT, 5, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma central"}', '{}',1),
--         (DEFAULT, 1, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma periferico"}', '{}',1),
--         (DEFAULT, 1, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma periferico"}', '{}',1),
--         (DEFAULT, 2, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma periferico"}', '{}',1),
--         (DEFAULT, 2, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma periferico"}', '{}',1),
--         (DEFAULT, 3, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma periferico"}', '{}',1),
--         (DEFAULT, 3, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Filtro rojo"}', '{}',1),
--         (DEFAULT, 4, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Filtro rojo"}', '{}',1),
--         (DEFAULT, 4, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Filtro rojo"}', '{}',1),
--         (DEFAULT, 5, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Filtro rojo"}', '{}',1),
--         (DEFAULT, 5, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Filtro rojo"}', '{}',1);

-- INSERT INTO Ensayos (idEnsayo, idUsuario, fechaHora, datosEntrada, datosSalida, idLaboratorio) 
-- VALUES  (DEFAULT, 1, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
--         (DEFAULT, 1, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
--         (DEFAULT, 2, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
--         (DEFAULT, 2, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
--         (DEFAULT, 3, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
--         (DEFAULT, 3, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
--         (DEFAULT, 4, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
--         (DEFAULT, 4, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
--         (DEFAULT, 5, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
--         (DEFAULT, 5, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
--         (DEFAULT, 1, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
--         (DEFAULT, 1, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
--         (DEFAULT, 2, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
--         (DEFAULT, 2, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
--         (DEFAULT, 3, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
--         (DEFAULT, 3, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
--         (DEFAULT, 4, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
--         (DEFAULT, 4, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
--         (DEFAULT, 5, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
--         (DEFAULT, 5, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2);
