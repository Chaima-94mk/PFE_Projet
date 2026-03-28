use pfe_projet;
DELIMITER $$

CREATE TRIGGER before_insert_produit
BEFORE INSERT ON produit
FOR EACH ROW
BEGIN
  DECLARE cnt INT;
  SELECT COUNT(*) + 1 INTO cnt
  FROM produit
  WHERE PPA = NEW.PPA;
  
  SET NEW.id_produit = CONCAT(NEW.PPA, 'XXXXX', cnt);
END$$

DELIMITER ;
