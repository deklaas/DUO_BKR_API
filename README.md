# DUO_BKR_API
demo api voor TOCBA

Deze API maakt het mogelijk gebruikers toe te voegen en op te vragen in JSON, DUO en BKR zijn Booleans die je kan testen voor je Apex applicatie 

| URL        | method           | result  |
| ------------- |:-------------:| -----:|
| /gebruikers     | GET | alle gebruikers uit de db |
| /gebruikers    | POST      |   gebruiker toevoegen |
| /duo/:bsn | GET    |    gebruiker (basis bsn) |
| /bkr/:name | GET    |    gebruiker (basis duo)  |

Beginnen:
```javascript
npm install 
node server.js
```
Output ex.
```javascript

[{"_id":"5603f1a98c43cc2e244073d6","bkr":false,"duo":true,"bsn":"200137360","name":"brem","__v":0}]
```
Gebruik een REST client om makkelijk te posten naar de DB, er is een mongo in de app die je kunt gebruiken maar makkelijkste is zelf eentje opzetten
![alt text](http://i.imgur.com/jE57XJm.png "Logo Title Text 1")

De BSN moet altijd uniek zijn in de app om te werken. 
