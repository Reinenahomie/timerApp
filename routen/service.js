const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("./medtimesql.db");
exports.getregistration = function(request,response){
    response.render('registration1')
};
exports.getlogin = function(request,response){
    response.render('login1')
};
exports.gethome = function(request,response){
    db.serialize(() => {
       db.all("SELECT * FROM Timer",(fehler,daten) => {
           if(fehler){
               console.log(fehler);
               response(fehler);
           }
           else{
               console.log(daten);
               response.render("home1",{'daten':daten});
           }
       });   
    });
};
exports.getadd = function(request,response){
    response.render('add1')
};

exports.postadd = function(request,response){
    const data = request.body;
    db.serialize(() =>{
        db.run(`INSERT INTO Timer (ID, UserId, Name,  Qrcode, TypeInterval, Interval) 
                VALUES("${(Math.floor(Math.random()*10000))}","5","${data.medname}", "${data.qrcode}", "${data.in}", ${data.interval})`,
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

