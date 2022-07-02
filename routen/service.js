const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./medtimesql.db");
exports.getregistration = function(request,response){
    //if user exist go home
    if(request.session.user){
         gethome (request,response);
    }else{
        response.render('registration1');
    }
    
};

exports.postregistration = function(request,response){
    const data = request.body;
    let id = Math.floor(Math.random()*10000);
    db.serialize(() =>{
        db.run(`INSERT INTO User (ID, email, name,  pwd) 
                VALUES("${id}","${data.email}", "${data.name}", "${data.pwd}")`,
                (fehler) => {
                    if(fehler) {
                        console.log(fehler);
                        response.end("Fehler")
                    }
                    else{
                        request.session.user  = {ID:id, email:data.email, name:data.name };
                        gethome (request,response);
                    }
                     
                }); 
        });
};


var getlogin = exports.getlogin = function(request,response){
    if(request.session.user){
         gethome (request,response);
    }else{
        response.render('login1');
    }
    
};

exports.postlogin = function(request,response){
    const data = request.body;
        db.all("SELECT * FROM User",(fehler,daten) => {
           if(fehler){
               console.log(fehler);
               response(fehler);
           }
           else{
               console.log(daten);
               let isgood = true;
               let prufData = daten.find((d) => d.email == data.email && d.pwd == data.pwd) 
               //Überprüfen - prüft if you find email and password 
               if (prufData){
                   isgood = true;
               }else{
                   isgood = false;
               }
               //Ende Überpüfen
               if(isgood) {
                   request.session.user = {email: prufData.email, name: prufData.name, ID:prufData.ID}
                   gethome (request,response);
               }else{
                   response.render('login1');
               }
           }
       }); 
};


 var gethome = exports.gethome = function(request,response){
     // if no user go to login
    if (request.session.user){
         db.serialize(() => {
       db.all("SELECT * FROM Timer",(fehler,daten) => {
           if(fehler){
               console.log(fehler);
               response(fehler);
           }
           else{
               let userMedDaten = daten.filter((d) => d.UserId == request.session.user.ID);
               console.log(userMedDaten);
               response.render("home1",{'daten':userMedDaten,'user':request.session.user});
           }
       });   
    });
   } 
   else{
       getlogin(request,response);
   }
    
};

exports.getlogout = function(request,response){
    request.session.user = null;
    getlogin(request,response);
}
exports.getadd = function(request,response){
    //if no user go login
    if(request.session.user){
         response.render('add1',{'user':request.session.user});
    }
    else{
        getlogin(request,response);
    }
    
};

exports.postadd = function(request,response){
    const data = request.body;
    db.serialize(() =>{
        db.run(`INSERT INTO Timer (ID, UserId, Name,  Qrcode, TypeInterval, Interval) 
                VALUES("${(Math.floor(Math.random()*10000))}",${request.session.user.ID},"${data.medname}", "${data.qrcode}", "${data.in}", ${data.interval})`,
                (fehler) => {
                    if(fehler) {
                        console.log(fehler);
                        response.end("Fehler")
                    }
                    else{
                        response.render('add1');
                    }
                     
                }); 
        });
};


exports.initDB = function(request,response){
    db.serialize(() =>{
        db.run("CREATE TABLE IF NOT EXISTS Timer("+
               "ID TEXT PRIMARY KEY,"+
               "UserId TEXT,"+
               "Name TEXT NOT NULL,"+
               "Qrcode TEXT,"+
               "TypeInterval TEXT NOT NULL,"+
               "Interval NUMBER NOT NULL)",
               (fehler) => {
                   if(fehler){
                        console.log(fehler);
                         response.end("fehler");
                    }
                });
        
        db.run("CREATE TABLE IF NOT EXISTS User("+
               "ID TEXT PRIMARY KEY,"+
               "email TEXT NOT NULL,"+
               "name TEXT," +
               "pwd TEXT NOT NULL)",
               (fehler)=>{
                     if(fehler){
                        console.log(fehler);
                         response.end("fehler");
                    }
                    else{
                        response.end("datenbank initialisiert");
                    }
                });
        });
};

function fehlerInRoute(fehler,badMsg,antwort,goodMsg){
    if (fehler){
        console.log(badMsg,fehler);
        if (antwort)
        antwort.end(badMsg + fehler);
    }else{
        if (goodMsg){
            console.log(goodMsg);
            if(antwort)
            antwort.end(goodMsg);
        }
    }
}

