**22/09/2026**

# Struggle

## ENV management

Issues on the .env file to be read correctly, I forgot the `ConfigModule` pass some heavy minutes to understand my DB connection was not working because the process.env.PORT was not read correctly.

I had to add the `ConfigModule` to the imports of the AppModule, and I had to pass the `process.env.PORT` to the AppModule.

## Testing

Quickly found out that the main controller test was not working, I had to add the `AppRepository` to the providers of the `AppService` to be able to test it.

## Drizzle

Hard to find a centralized documentation to implement Drizzle by hand, I still have some doubt about the file namming espacially the `index.ts` file. It's a mix of content I found on the internet, Youtube and the documentation. Very glad I found this drizzle studio which will be very useful for me in the future.

## Miscellaneous

Small type issues because of the missing type config on the `tsconfig.json` file.

**25/09/2026**

I use `command` namming in my use case in the `execute` methods by pur imitation of what is done at work, is there any convention on this ?

I have some doubt about the mapper namming or/and file arrangement.

# TODO

1 interface / dto / mapper par fichier

Test d'integration du controller get all bicycle
Outillage: Prerequis être capable de démarrer une DB (avec les migrations run dessus) dans les tests et de la reset à chaque test

1. Arrange: Insérer en DB 2 bicycles
2. Act Faire l'appel GET /bicycles
3. Assert: le retour http

---

I'm able to create parts and now I have to think of :

-> get Warnings from part from a bike
-> Limite part number allow on a bike
-> Update a replace part on a bike

TODO : Add Spare part should be an array so we can create several part in the same time for a bike

TODO: A spare part cannot have a brand that is bycicleonly

**24/11**

Changement de paradigme avec le save et l'agrégat, la DB pert la responsabilité de la création des ID, c'est maintenant le domaine qui gère ses objets et va créer lui même les ID avant les insertions en DB

**Notion de transactions :**

On pourrait enchainer les actions d'update dans le repository MAIS la transaction permet de prendre ce batch d'action et de rollback, cad si j'update les kilomètres de mon vélo, mais qu'il y a un soucis au moment de l'update des pièces on va pouvoir faire un rollback propre et sans créer de décalage entre les données. Dans certains cas cela peux aussi permettre de s'assurer de la cohérence des objets du domaine et donc de ne pas se retrouver dans des cas non prévu.

**28/11**

TODO: `POST /brands` et `POST /bicycles-models` doivent renvoyer `{ id }` (actuellement `void`) pour que le front puisse sélectionner direct la marque / le modèle créé

TODO: Mount d'une pièce au-delà de la limite (ex: 2e chaîne) renvoie un 500 "Internal server error" → renvoyer une 4xx (400/409/422) avec un message clair
