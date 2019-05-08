var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/pohatdb");

var nameSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String
});

var User = mongoose.model("User", nameSchema);

var appRouter = function (app) {
    app.get("/", function(req, res) {
      res.status(200).send("Welcome to our restful API");
    });

    app.get("/books", function(req, res) {
        res.status(200).send(products);
    });

    app.post("/register", function(req, res) {
      console.log(req.body);

      var myData = new User(req.body);

      myData.save()
        .then(item => {
          res.send("Item saved to database");
        })
        .catch(err => {
          res.status(400).send("Unable to save to database");
        });
    });

    app.post("/login", function (req, res) {
      var user = req.body;
  
      var query = User.findOne({ email: user.email });
  
      query.select("email password");
  
      query.exec(function (err, dbuser) {
        console.log("Found user " + dbuser)
        if (dbuser.password == user.password) {
          res.status(200).send("User logged in.");
        }
        else {
          res.status(400).send("Wrong password.");
        }
      });  
    });
  }
  


  var products = [
    { productname: "...får leken tåla", authour: "MJ Arldige", category: "Pocket", price: 54, rating: 5.0, quantity: 1 },
    { productname: "Allt jag fått lära mig", authour: "Tara Westover", category: "Inbunden", price: 179, rating: 3, quantity: 1  },
    { productname: "En bur av guld", authour: "Camilla Läckberg", category: "Inbunden", price: 175, rating: 2.0, quantity: 1   },
    { productname: "En underbar död", authour:"Emma Ångström", category: "Inbunden", price: 149, rating: 1.2, quantity: 1  },
    { productname: "Lazarus", authour: "Lars Kepler", category: "Ljudbok", price: 106, rating: 4.0, quantity: 1  },
    { productname: "1793", authour: "Niklas Natt och Dag", category: "Ljudbok", price: 71, rating: 3.8, quantity: 1   },
    { productname: "Min historia", authour: "Michelle Obama", category: "E-bok", price: 98,rating: 4.2, quantity: 1   },
    { productname: "Bränn alla mina brev", authour: "Alex Schulman", category: "E-bok", price: 147, rating: 1.2, quantity: 1   },
    { productname: "En mors bekännelse", authour: "Kelly Rimmer", category: "Pocket", price: 59, rating: 4.7, quantity: 1   },
    { productname: "Saknad, förmodad död", authour: "Susie Steiner", category: "Pocket", price: 57, rating: 2.0, quantity: 1   },
    { productname: "Isfiskaren", authour: "Anna Ihrén", category: "Pocket", price: 54, rating: 4.9, quantity: 1   },
    { productname: "Fyrmästaren", authour: "Anna Ihrén", category: "Pocket", price: 54, rating: 1.8, quantity: 1   }
];

module.exports = appRouter;