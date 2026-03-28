USE pfe_projet;
-- Operateur
INSERT INTO operateur VALUES
(568124, 'Mansouri', 'Ahmed'),
(658901, 'Chebbi', 'Maha'),
(658477, 'Abdnnej', 'Samira'),
(369531, 'Ben mohamed', 'Mahdi'),
(489235, 'Ghnimi', 'Atef'),
(658422, 'Kalboussi', 'Ahmed'),
(236589, 'Harrathi', 'Marwen'),
(478562, 'Chaouch', 'Chawki');

-- Machine
INSERT INTO machine VALUES
('A01', 'Auskammen'),
('B01', 'Bestuker'),
('DM01', 'Découpage Manuel'),
('EOL', 'Control vision'),
('F01', 'Four'),
('F02', 'Four'),
('ML01', 'Lasaire'),
('ML02', 'Lasaire'),
('ML03', 'Lasaire'),
('ML04', 'Lasaire');
-- Administrateur
INSERT INTO administrateur VALUES
(123789, 'Ouirfelli', 'Ayoub'),
(365894, 'Fathallah', 'Hosni'),
(485621, 'Hossem', 'Hossem'),
(486047, 'Msek', 'Imen'),
(512365, 'Msek', 'Chaima'),
(546856, 'Ouirghemmi', 'Dhia');
-- Process
INSERT INTO process VALUES
('P1022', 'Zuschniit hinter', 'ML01'),
('P1040', 'Auskammen', 'A01'),
('P1050',  'Bestuker', 'B01'),
('P1060', 'Abfischen bearbeit', 'ML02'),
('P1070',  'Activieren', 'ML03'),
('P1092',  'Tempern', 'F01'),
('P1093',  'Tempern final', 'F02'),
('P1120', 'Kante abschneiden', 'DM01'),
('P1130', 'EOL prufung', 'EOL');

-- Defaut
INSERT INTO Defaut VALUES
('Q3003', 'Aktivierung NIO', 'P1022', 'ML02'),
('Q3007', 'Schlouch NIO', 'P1130', 'EOL'),
('Q3013', 'Schaum beschadigt', 'P1050', 'B01'),
('Q3017', 'fault de controle montage', 'P1060', 'ML03'),
('Q3023', 'sur ne s enleve pas de maniere', 'P1040', 'A01'),
('Q3029', 'Mauvaise découpage de mousse', 'P1022', 'ML01'),
('Q3030', 'Montage d etiquettes incorrectes', 'P1120', 'DM01'),
('Q3OK', 'Etat bien', 'P1093', 'F02');


-- Produit
INSERT INTO Produit (ppa, num_machine, code_process, etat_produit, matricule_operateur, temps) VALUES
(785120, 'ML02', 'P1022', 'Q3003', 568124, '2026-03-26 11:42:00'),
(785120,  'EOL', 'P1130', 'Q3007', 658901, '2026-03-26 11:42:00'),
(785120, 'B01', 'P1050', 'Q3013', 658477, '2026-03-26 11:42:00'),
(785120, 'ML03', 'P1060', 'Q3003', 369531, '2026-03-26 11:42:00'),
(785120, 'A01', 'P1040', 'Q3023', 489235, '2026-03-26 11:42:00'),
(798456, 'ML01', 'P1022', 'Q3029', 658422, '2026-03-26 11:42:00'),
(798456,  'DM01', 'P1120', 'Q3030', 236589, '2026-03-26 11:42:00'),
(798456, 'F02', 'P1093', 'Q3OK', 478562, '2026-03-26 11:42:00');