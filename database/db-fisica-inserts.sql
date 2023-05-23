-- -----------------------------------------------------
-- Insercion de Datos
-- -----------------------------------------------------

USE LabRem_Fisica;

-- -----------------------------------------------------
-- Laboratorios
-- -----------------------------------------------------

INSERT INTO Laboratorios (area, nombre, descripcion) 
VALUES 
(DEFAULT,'Lentes Convergentes','La experiencia tiene como objetivos: estudiar experimentalmente la formación de imágenes por lentes convergentes, validar los supuestos del modelo teórico para lentes convergentes delgadas y determinar el valor acotado de la distancia focal de una lente convergente. Se espera que el alumno adquiera capacidades para explicar el funcionamiento de las lentes convergentes en la formación de imágenes, explicitar la diferencia entre una imagen "real" y una imagen "virtual", contrastar el modelo de lentes delgadas (ecuación de la lente delgada) con los resultados experimentales y elaborar conclusiones acerca del trabajo experimental.. La experiencia utiliza un sistema óptico sencillo (fuente luminosa - lente convergente - pantalla) en el cual los estudiantes podrán observar a través de una cámara la imagen que forma la lente en la pantalla. Para una posición fija de la lente, se varía la distancia objeto desplazando la fuente luminosa sobre un riel. Una vez seleccionada la distancia objeto se desplaza la pantalla sobre el riel para buscar el plano donde se forma una imagen nítida. En este momento se mide la distancia entre la lente y la pantalla, es decir, la distancia imagen. Repitiendo el procedimiento para varias distancias objeto, se obtendrá un conjunto de valores de distancias objeto e imagen que el estudiante podrá procesar en forma gráfica y comprobar experimentalmente si la lente se comporta como lente delgada. El sistema permite incorporar un diafragma central para corregir posibles aberraciones de esfericidad. Para desarrollar esta experiencia de manera presencial, actualmente se dispone de seis equipos completos (rieles con escala graduada en mm, conjuntos de lentes convergentes, filtros y colimadores).'),
(DEFAULT,'Lentes Divergentes','La experiencia tiene como objetivos: estudiar experimentalmente la formación de imágenes por lentes divergentes y medir la distancia focal de la lente divergente. Se espera que el alumno genere capacidades para explicar el funcionamiento de las lentes divergentes en la formación de imágenes, utilizar diagramas de marcha de rayos y explicitar los conceptos de "imagen real", "imagen virtual", "objeto real" y "objeto virtual". Se utiliza el mismo sistema experimental de la experiencia de lentes convergentes, al cual se incorpora además una lente divergente. Se utiliza como "objeto virtual" la imagen real que forma la lente convergente en un plano determinado y se coloca lente divergente de manera conveniente para que ésta forme una "imagen real" de ese objeto virtual en otro plano que se localiza desplazando la pantalla. Como dato de entrada se necesita distancia focal de la lente convergente para planificar la medición y elegir adecuadamente la posición de la lente divergente. La cámara (que enfoca la pantalla) se emplea para detectar una imagen nítida en la pantalla y un sistema de rieles permite medir las diferentes distancias. Se medirán la distancia entre la lente convergente y divergente (que permitirá calcular la distancia objeto) y la distancia lente divergente-pantalla, con los cuales el estudiante podrá calcular la distancia focal de la lente divergente, suponiendo modelo de lentes delgadas. En esta experiencia no se realiza control de ajuste de modelo. Se puede realizar con o sin diafragma central. Para desarrollar esta experiencia en forma presencial actualmente se dispone de seis equipos (rieles con escala graduada en mm, conjuntos de lentes convergentes y divergentes, filtros y colimadores)');

-- -----------------------------------------------------
-- Ensayos
-- -----------------------------------------------------

INSERT INTO Ensayos (idEnsayo, idUsuario, fechaHora, datosEntrada, datosSalida, idLaboratorio) 
VALUES  (DEFAULT, 1, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Sin diafragma"}', '{}',1),
        (DEFAULT, 1, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Sin diafragma"}', '{}',1),
        (DEFAULT, 2, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Sin diafragma"}', '{}',1),
        (DEFAULT, 2, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Sin diafragma"}', '{}',1),
        (DEFAULT, 3, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Sin diafragma"}', '{}',1),
        (DEFAULT, 3, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma central"}', '{}',1),
        (DEFAULT, 4, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma central"}', '{}',1),
        (DEFAULT, 4, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma central"}', '{}',1),
        (DEFAULT, 5, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma central"}', '{}',1),
        (DEFAULT, 5, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma central"}', '{}',1),
        (DEFAULT, 1, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma periferico"}', '{}',1),
        (DEFAULT, 1, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma periferico"}', '{}',1),
        (DEFAULT, 2, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma periferico"}', '{}',1),
        (DEFAULT, 2, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma periferico"}', '{}',1),
        (DEFAULT, 3, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Diafragma periferico"}', '{}',1),
        (DEFAULT, 3, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Filtro rojo"}', '{}',1),
        (DEFAULT, 4, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Filtro rojo"}', '{}',1),
        (DEFAULT, 4, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Filtro rojo"}', '{}',1),
        (DEFAULT, 5, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Filtro rojo"}', '{}',1),
        (DEFAULT, 5, DEFAULT, '{"distanciaLente": 350, "distanciaPantalla": 450, "diafragma": "Filtro rojo"}', '{}',1);

INSERT INTO Ensayos (idEnsayo, idUsuario, fechaHora, datosEntrada, datosSalida, idLaboratorio) 
VALUES  (DEFAULT, 1, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
        (DEFAULT, 1, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
        (DEFAULT, 2, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
        (DEFAULT, 2, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
        (DEFAULT, 3, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
        (DEFAULT, 3, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
        (DEFAULT, 4, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
        (DEFAULT, 4, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
        (DEFAULT, 5, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
        (DEFAULT, 5, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
        (DEFAULT, 1, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
        (DEFAULT, 1, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
        (DEFAULT, 2, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
        (DEFAULT, 2, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
        (DEFAULT, 3, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
        (DEFAULT, 3, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
        (DEFAULT, 4, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
        (DEFAULT, 4, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
        (DEFAULT, 5, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2),
        (DEFAULT, 5, DEFAULT, '{"distanciaLente": 40, "distanciaLenteLente": 25, "distanciaPantalla": 25}', '{}',2);
