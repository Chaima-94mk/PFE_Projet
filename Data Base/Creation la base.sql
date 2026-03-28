USE pfe_projet;
#table opérateur
CREATE TABLE operateur (
    matricule_operateur INT(6) PRIMARY KEY,
    nom_operateur VARCHAR(50) not null,
    prenom_operateur VARCHAR(50) not null
);
#table machine
CREATE TABLE machine (
    num_machine varchar(5) PRIMARY KEY,
    nom_machine VARCHAR(50) not null
);
#table process 
CREATE TABLE process (
    code_process varchar(5) PRIMARY KEY,
    nom_process VARCHAR(50) not null,
    num_machine INT not null,
    FOREIGN KEY (num_machine) REFERENCES machine(num_machine)
);
#table default 
CREATE TABLE defaut (
    code_defaut VARCHAR(5) PRIMARY KEY,
    description_defaut VARCHAR(200) not null,
    code_process INT not null,
    num_machine INT not null,
    FOREIGN KEY (code_process) REFERENCES process(code_process),
    FOREIGN KEY (num_machine) REFERENCES machine(num_machine)
);
#table produit 
CREATE TABLE produit (
    id_produit VARCHAR(11) PRIMARY KEY,
    ppa INT(6) not null,
    temps DATETIME DEFAULT CURRENT_TIMESTAMP not null,
    num_machine INT not null,
    code_process INT not null,
    code_defaut VARCHAR(30) not null,
    matricule_operateur INT not null,
    etat_produit VARCHAR(30) not null,

    FOREIGN KEY (num_machine) REFERENCES machine(num_machine),
    FOREIGN KEY (code_process) REFERENCES process(code_process),
    FOREIGN KEY (code_defaut) REFERENCES defaut(code_defaut),
    FOREIGN KEY (matricule_operateur) REFERENCES operateur(matricule_operateur)
);
#table administrateur
CREATE TABLE Administrateur (
    matricule INT(6) PRIMARY KEY,
    nom VARCHAR(50),
    prenom VARCHAR(50)
);