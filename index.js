const express = require('express')
const app = express()
const menuDessert = require('./menuDessert.json')
const menuDrinks = require('./menuDrinks.json')
const menuPasta = require('./menuPasta.json')
const menuPizza = require('./menuPizza.json')
const menuSalad = require('./menuSalad.json')
const menuSoup = require('./menuSoup.json')
//EJS view engine
app.set('view engine', 'ejs')
//Serveraufbau
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Listening at 5000');
})

app.set("view engine", "ejs")
//Public Ordner nutzen
app.use(express.static('public'))

//Aufruf von Body-Parser
const bodyParser = require('body-parser')
//fs erlaubt File zu lesen und zu schreiben
const fs = require("fs")
//Speichert den Kontaktformular in eine neue Json Datei
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//Routing Home
app.get("/", (req, res) => {
    res.render("index", { title: "Home", activeNav: "/" })
})
//Routing
app.get('/about', (req, res) => {
    res.render('about', { title: "About", activeNav: "/about" })
})
app.get('/team', (req, res) => {
    // console.log(req.path)
    res.render('team', { title: "Team", activeNav: "/team" })
})
app.get('/booking', (req, res) => {
    res.render('booking', { title: "Booking", activeNav: "/booking" })
})
app.get('/menu/:item', (req, res) => {
    if (req.params.item == "soup") {
        res.render('menu', {
            title: "Menu", activeNav: "/menu", activeMenu: "/menu/soup", menu: menuSoup,
        })
    } else if (req.params.item == "pizza") {
        res.render('menu', {
            title: "Menu", activeNav: "/menu", activeMenu: "/menu/pizza", menu: menuPizza,
        })
    } else if (req.params.item == "pasta") {
        res.render('menu', {
            title: "Menu", activeNav: "/menu", activeMenu: "/menu/pasta", menu: menuPasta,
        })
    } else if (req.params.item == "salad") {
        res.render('menu', {
            title: "Menu", activeNav: "/menu", activeMenu: "/menu/salad", menu: menuSalad,
        })
    } else if (req.params.item == "dessert") {
        res.render('menu', {
            title: "Menu", activeNav: "/menu", activeMenu: "/menu/dessert", menu: menuDessert,
        })
    } else if (req.params.item == "drinks") {
        res.render('menu', {
            title: "Menu", activeNav: "/menu", activeMenu: "/menu/drinks", menu: menuDessert,
        })
    }
})

app.get('/galerie', (req, res) => {
    res.render('galerie', { title: "Galerie", activeNav: "/galerie" })
})
app.get('/events', (req, res) => {
    res.render('events', { title: "Events", activeNav: "/events" })
})
app.get('/contact', (req, res) => {
    res.render('contact', { title: "Contact", activeNav: "/contact" })
})


//Verbindung zum Kontactformular & 
app.post('/new', urlencodedParser, (req, res) => {
    console.log(req.body.name)
    console.log(req.body.email)
    console.log(req.body.number)
    console.log(req.body.message)

    res.redirect('/contact')
})
//404
app.use((req, res) => {
    res.render('404', { title: "Error", activeNav: "/Error" })
}) 