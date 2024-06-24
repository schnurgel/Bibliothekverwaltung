-- Kategorien erstellen
INSERT INTO CATEGORY (CATEGORYID, NAME, BESCHREIBUNG)
VALUES (1, 'Drama', 'Drama category description'),
       (2, 'Romance', 'Romance category description'),
       (3, 'Family', 'Family category description'),
       (4, 'Action', 'Action category description');

-- Autoren erstellen
INSERT INTO AUTHOR (AUTHORID, VORNAME, NACHNAME, BIRTHDAY)
VALUES (1, 'John', 'Doe', '1970-01-01'),
       (2, 'Jane', 'Smith', '1980-02-15'),
       (3, 'Robert', 'Brown', '1990-03-30'),
       (4, 'Emily', 'Johnson', '1985-04-20');

-- Bücher erstellen
INSERT INTO BOOK (BUCHID, TITLE, DESCRIPTION, PUBLISHDATE, ISBORROWED, IMGPATH, AUTHOR_ID, CATEGORY_ID)
VALUES (1, 'Psychologie 1x1', 'Psychologie 1x1', '2020-01-01', false, './assets/img_1.png',
        (SELECT AUTHORID FROM AUTHOR WHERE VORNAME = 'John' AND NACHNAME = 'Doe'),
        (SELECT CATEGORYID FROM CATEGORY WHERE NAME = 'Drama')),

       (2, 'Fitzek Mimik', 'Description of Romance Book 1', '2020-02-01', false, '../assets/img.png',
        (SELECT AUTHORID FROM AUTHOR WHERE VORNAME = 'Jane' AND NACHNAME = 'Smith'),
        (SELECT CATEGORYID FROM CATEGORY WHERE NAME = 'Romance')),

       (3, 'Icebreaker', 'Description of Family Book 1', '2020-03-01', false, '../assets/img_3.png',
        (SELECT AUTHORID FROM AUTHOR WHERE VORNAME = 'Robert' AND NACHNAME = 'Brown'),
        (SELECT CATEGORYID FROM CATEGORY WHERE NAME = 'Family')),

       (4, 'Ich bleib immer bei dir', 'Description of Action Book 1', '2020-04-01', false, '../assets/img_4.png',
        (SELECT AUTHORID FROM AUTHOR WHERE VORNAME = 'Emily' AND NACHNAME = 'Johnson'),
        (SELECT CATEGORYID FROM CATEGORY WHERE NAME = 'Action')),

       (5, 'Gesang der Flusskrebse', 'Description of Drama Book 2', '2021-01-01', false, '../assets/img_5.png',
        (SELECT AUTHORID FROM AUTHOR WHERE VORNAME = 'John' AND NACHNAME = 'Doe'),
        (SELECT CATEGORYID FROM CATEGORY WHERE NAME = 'Drama')),

       (6, 'Meine Reise zu mir selbst', 'Description of Romance Book 2', '2021-02-01', false, '../assets/img_6.png',
        (SELECT AUTHORID FROM AUTHOR WHERE VORNAME = 'Jane' AND NACHNAME = 'Smith'),
        (SELECT CATEGORYID FROM CATEGORY WHERE NAME = 'Romance')),

       (7, 'Gute Menschen', 'Description of Family Book 2', '2021-03-01', false, '../assets/img_7.png',
        (SELECT AUTHORID FROM AUTHOR WHERE VORNAME = 'Robert' AND NACHNAME = 'Brown'),
        (SELECT CATEGORYID FROM CATEGORY WHERE NAME = 'Family')),

       (8, 'Sommer ist meine Lieblingsfarbe', 'Description of Action Book 2', '2021-04-01', false, '../assets/img_8.png',
        (SELECT AUTHORID FROM AUTHOR WHERE VORNAME = 'Emily' AND NACHNAME = 'Johnson'),
        (SELECT CATEGORYID FROM CATEGORY WHERE NAME = 'Action'));

-- Borrow entries for Action Book 1
/*INSERT INTO Borrow (borrowid, borrowdate, returndate, buchid)
VALUES (1, '2023-03-01', '2023-03-10', 4),
       (2, '2023-01-20', '2023-01-30', 5),
       (3, '2023-03-15', '2023-03-25', 5),
       (10, '2023-03-15', '2023-03-30', 5),
       (11, '2023-03-15', '2023-03-27', 5),
       (12, '2023-02-15', '2023-02-27', 5),
       (13, '2023-01-25', '2023-02-05', 6),
       (4, '2023-01-25', '2023-02-05', 6),
       (5, '2023-04-10', '2023-04-20', 6),
       (6, '2023-02-05', '2023-02-15', 7),
       (7, '2023-05-15', '2023-05-25', 7),
       (8, '2023-02-10', '2023-02-20', 8),
       (9, '2023-03-20', '2023-03-30', 8);*/
