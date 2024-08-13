<h1>README / Lathund för Min Databas</h1>

<h2>Introduktion:</h2>

Detta dokument ger en översikt över databasen för min fiktiva godisbutik CandyHub, skapad som en del av ett skolprojekt. Databasen innehåller tre huvudtabeller: Products, Order, och Users, avsedda att hantera information om produkter, beställningar och användare.

<h2>Databasstruktur</h2>

Här följer beskrivningar av de tre huvudtabellerna i databasen:

<h3>Tabell: Products</h3>

Lagrar information om de produkter som finns tillgängliga i butiken.

- id (Integer): Unikt identifieringsnummer, genereras automatiskt.

- name (String): Produktnamnet.

- category (String): Produktkategori (t.ex. Chocolate, Gummies).

- price (Decimal): Priset på produkten i $.

- stock (Integer): Antal produkter i lager.

- image_path (String): Sökväg till produktens bild.

<h3>Tabell: Order</h3>

Hanterar information om kundbeställningar.

- id (Integer): Unikt identifieringsnummer, genereras automatiskt.

- name (String): Namnet på den beställda produkten.

- price (Decimal): priset/enskilld produkt.

- quantity (Integer): Antal beställda enheter.

- orderId (String): Unikt beställnings-ID, genereras med uuidv4.
  
- order_time (Timestamp): Tidsstämpel för när beställningen skapades, genereras automatiskt.

<h3>Tabell: Users</h3>

Innehåller information om användare som kan logga in och göra beställningar.

- id (Integer): Unikt identifieringsnummer, genereras automatiskt.

- username (String): Användarnamnet, unikt för varje användare.

- password (String): Lösenordet.

Observera att interaktion med databasen bör ske genom säkra metoder, särskilt när det gäller användarinformation och lösenordshantering.
