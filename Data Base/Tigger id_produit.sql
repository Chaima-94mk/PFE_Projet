use pfe_projet;

SET @current_ppa := '';
SET @i := 0;

UPDATE produit p
JOIN (
    SELECT id_produit, PPA,
           @i := IF(@current_ppa = PPA, @i + 1, 1) AS cnt,
           @current_ppa := PPA
    FROM produit
    ORDER BY PPA, temps
) AS sub ON p.id_produit = sub.id_produit
SET p.id_produit = CONCAT(sub.PPA, 'XXXXX', sub.cnt);