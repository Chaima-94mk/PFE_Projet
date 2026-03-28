use pfe_projet;

#changer le type de champ code_process
#sumprimer le clé étrangére
ALTER TABLE defaut DROP FOREIGN KEY defaut_ibfk_1; 
ALTER TABLE produit DROP FOREIGN KEY produit_ibfk_2;
#changer le type 
ALTER TABLE process MODIFY code_process varchar(5);
ALTER TABLE process ADD CONSTRAINT chk_format CHECK (code_process LIKE 'P%');

#changer type de champ code_defaut
#sumprimer les clés étrangéres
ALTER TABLE produit DROP FOREIGN KEY produit_ibfk_3;
#changer le type
ALTER TABLE defaut MODIFY code_defaut varchar(5);
ALTER TABLE defaut ADD CONSTRAINT chd_format CHECK (code_defaut LIKE 'Q3%');

ALTER TABLE produit DROP FOREIGN KEY produit_ibfk_1;
ALTER TABLE process DROP FOREIGN KEY process_ibfk_1;
ALTER TABLE machine MODIFY num_machine VARCHAR(5);
ALTER TABLE machine ADD CONSTRAINT chm_code_format CHECK (num_machine REGEXP '^(A|ML|B|D)[0-9]{2}$');