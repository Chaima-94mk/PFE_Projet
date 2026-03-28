USE pfe_projet;

-- 1. Process → num_machine
ALTER TABLE process
ADD CONSTRAINT fk_process_machine
FOREIGN KEY (num_machine) REFERENCES machine(num_machine);

-- 2. Defaut → code_process
ALTER TABLE defaut
ADD CONSTRAINT fk_defaut_process
FOREIGN KEY (code_process) REFERENCES Process(code_process);

-- 3. Defaut → num_machine
ALTER TABLE defaut
ADD CONSTRAINT fk_defaut_machine
FOREIGN KEY (num_machine) REFERENCES machine(num_machine);

-- 4. Produit → code_process
ALTER TABLE produit
ADD CONSTRAINT fk_produit_process
FOREIGN KEY (code_process) REFERENCES Process(code_process);

-- 5. Produit → code_defaut
ALTER TABLE produit
ADD CONSTRAINT fk_produit_defaut
FOREIGN KEY (etat_produit) REFERENCES defaut(code_defaut);

-- 6. Produit → num_machine
ALTER TABLE produit
ADD CONSTRAINT fk_produit_machine
FOREIGN KEY (num_machine) REFERENCES Machine(num_machine);
