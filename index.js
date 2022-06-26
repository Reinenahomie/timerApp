const Express = require("express");
const Ejs = require("ejs");
const app = Express();
const bodyParser = require("body-parser");
const service = require('./routen/service')

var sha1 = require("sha1");

app.use (Express.static('public'));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => service.getregistration(req, res));
app.get('/registration', (req, res) => service.getregistration(req, res));
app.get('/login', (req, res) => service.getlogin(req, res));
app.get('/home', (req, res) => service.gethome(req, res));

app.get('/add', (req, res) => service.getadd(req, res));
app.post('/add', (req, res) => service.postadd(req, res));

app.get ('/initDB', (req, res) => service.initDB(req, res));


















// function fehlerInRoute(fehler,badMsg,antwort,goodMsg){
//     if (fehler){
//         console.log(badMsg,fehler);
//         if (antwort)
//         antwort.end(badMsg + fehler);
//     }else{
//         if (goodMsg){
//             console.log(goodMsg);
//             if(antwort)
//             antwort.end(goodMsg);
//         }
//     }
// }


// function zufall(min,max){
//     return (Math.floor(Math.random()*(max-min+1))+min);
// }


// app.get ('/initDB', function(anfrage,antwort){
//     db.serialize(() =>{
//         db.run("CREATE TABLE IF NOT EXISTS Timer("+
//               "ID TEXT PRIMARY KEY,"+
//               "Name TEXT,"+
//               "Interval NUMBER NOT NULL)",
//               (fehler) => {
//                   fehlerInRoute(fehler,"Tabelle Timer konnte nicht erstellt werden ",
//                           antwort,"Tabelle Timer erstellt.");
//         });
        
//         db.run("INSERT INTO TIMER (ID, Name, Interval)  " +
//               "VALUES('4lsi34@sj','EveryTenSec',10)," +
//               "       ('ldfu08234j','EveryMin', 60)",
//                 (fehler) => {
//                              fehlerInRoute(fehler,"Daten konnte nict in Tabelle Timer eingefügt werden.");
                    
//         });  
        
//         db.run("CREATE TABLE IF NOT EXISTS User("+
//               "email TEXT PRIMARY KEY,"+
//               "vorname TEXT," +
//               "nachname TEXT," +
//               "pwd TEXT NOT NULL)",
//               (fehler)=>{
//                      fehlerInRoute(fehler,"Tabelle User konnte nicht erstellt werden");
//         });
        
//     });
    
    
// });
// app.get('/runTimer', function(anfrage,antwort){
//     db.serialize(() => {
//       db.all("SELECT * FROM Timer",(fehler,daten) => {
//           if(fehler)
//           fehlerInRoute(fehler,"Daten konnte nicht aus Tablle Timer gelesen werden");
           
//           else{
//               let zeile = zufall(0,daten.length-1);
//               let dta = {'datum':daten[zeile]};
//               console.log(JSON.stringify(dta));
//               antwort.render("runTimer",dta);
//           }
//       });   
//     });
// });




// app.get('/login', function(anfrage,antwort) {
//     antwort.render("login",{});
// });

// app.post('/login', function(anfrage,antwort) {
//     //check if user exists
//     var sha1 = require('sha1');
//     let pwdSha1 = sha1(anfrage.body.pwd);   
//     db.serialize(() => {
//         db.all("SELECT * FROM User WHERE email='"+anfrage.body.email+
//                 "' AND pwd='"+pwdSha1+"'",(fehler,daten) => {
//             if(fehler) 
//                 antwort.redirect("login");
//             else {
//                 if(daten.length == 1)
//                     antwort.render("success",{});
//                 else
//                   antwort.redirect("login"); 
//             }
//         });
//     });    
// });



// app.get('/signup', function(anfrage,antwort) {
//     antwort.render("runTimer",{datum:{Name:"Test"}});
// });
// 3.216.48.179
app.listen(8080); 