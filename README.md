# DUO_BKR_API
demo api voor TOCBA

Deze API maakt het mogelijk gebruikers toe te voegen en op te vragen in JSON, DUO en BKR zijn Booleans die je kan testen voor je Apex applicatie

URL         | method | result
----------- | :----: | ------------------------:
/gebruikers | GET    | alle gebruikers uit de db
/gebruikers | POST   |       gebruiker toevoegen 
/duo/:bsn   | GET    |     gebruiker (basis bsn)
/bkr/:name  | GET    |     gebruiker (basis duo)

Beginnen:

```javascript
npm install
node server.js
```

Output ex.

```javascript

[{"_id":"5603f1a98c43cc2e244073d6","bkr":false,"duo":true,"bsn":"200137360","name":"brem","__v":0}]
```
verbinding maken door een get request vanuit oracle 
```javascript
DECLARE 
    request  utl_http.req; 
    response utl_http.resp; 
    value    VARCHAR2(1024); 
    url      VARCHAR2(4000); 
    opt      VARCHAR2(1000); 
BEGIN 
    url := 'https://ingapi.herokuapp.com/duo/200137360'; 
    dbms_output.Put_line('connecting..'); 
    utl_http.Set_response_error_check(FALSE); 
    request := utl_http.Begin_request(url, 'GET'); 
    utl_http.Set_header(request, 'User-Agent', 'Mozilla/4.0'); 
    response := utl_http.Get_response(request); 
    dbms_output.Put_line('HTTP response status code: ' 
                         || response.status_code); 
END; 

/ 
--output commands          
SET serveroutput ON 
```

De app staat ook
[online](https://ingapi.herokuapp.com/gebruikers)

Gebruik een REST client om makkelijk te posten naar de DB, er is een mongo in de app die je kunt gebruiken maar makkelijkste is zelf eentje opzetten<br>

De BSN moet altijd uniek zijn in de app om te werken.
