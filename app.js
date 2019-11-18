const express = require('express')
const app = express()
const bodyParser = require ('body-parser')
const path = require('path')
const koneksi = require('./config/db')
const bcrypt = require('bcryptjs')
// membuat folder public menjadi static
app.use(express.static('public'))
// setting template engine
app.set('views', path.join(__dirname, '/views'))
// setting view engine
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())

let mahasiswa = [
    {id:1, nim:'0001', nama:'Akim Parman', jurusan:'Sistem Informasi'},
    {id:2, nim:'0002', nama:'Mustaqim H. Parman', jurusan:'Sistem Informasi'},
    {id:3, nim:'0003', nama:'Mustaqim H. Parman, S.Kom', jurusan:'Sistem Informasi'}

]

app.get('/', function(req, res){
    res.render('index')
})

app.get('/register', function(req, res){
    res.render('register', {msg:''})
})

app.post('/register', function(req, res){
    bcrypt.hash(req.body.password, 12, function(err, hashPassword){
        koneksi.query('INSERT INTO user SET ?', {
            username: req.body.username,
            password: hashPassword,
            level: req.body.level,
            email: req.body.email
        }, function(err, data){
            if(err){
                res.render('register', {msg:'Data gagal disimpan'})
            }else{
                res.render('register', {msg:'Data berhasil disimpan'})
            }
        
        })
    })
})

app.get('/mahasiswa', function(req, res){
    res.render('mahasiswa', { data:mahasiswa })
})

app.post('/mahasiswa', function(req, res){
    let id = mahasiswa.length
    mahasiswa.push({id:id + 1, nim:req.body.nim, nama:req.body.nama, jurusan:req.body.jurusan})
    res.redirect('/mahasiswa')
})
app.get('/about', function(req, res){
    let dataPribadi = {
        nama: "Mustaqim H. Parman, S.Kom",
        umur: 23,
        kelamin: "laki-laki",
        alamat: "Batudaa",
        no_hp: "082290059781" 
    }
    res.render('about', dataPribadi)
})

app.listen(3000, function(){
    console.log('server sudah siap!!!')
})
