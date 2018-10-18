const express = require("express");
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const path = require("path");
const multer = require("multer")
const app = express();
const fs = require("fs")
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
mongoose.connect('mongodb://localhost/ecommerce', { useNewUrlParser: true });

var UserSchema = new mongoose.Schema({
	name: { type: String },
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	admin: { type: Boolean }
})
var ItemSchema = new mongoose.Schema({
	id: { type: Number },
	name: { type: String },
	count: { type: Number },
	sold: { type: Number },
	price: { type: Number },
	description: { type: String },
	category: { type: String },
	images: [{ name: { type: String}, path: { type: String}, id: { type: String } }],
	mainImage: { type: String}
})
var OrderSchema = new mongoose.Schema({
	id: { type: Number },
	name: { type: String },
	date: { type: String },
	phone: { type: String },
	billing: { address: { type: String }, city: { type: String }, state: { type: String },  zip: { type: String }},
	shipping: { address: { type: String }, city: { type: String }, state: { type: String },  zip: { type: String }},
	items: [{itemname: { type: String }, quantity: { type: Number }, price: { type: Number }, maximum: { type: Number }, itemid: { type: Number }, id: { type: String}}],
	status: { type: String },
	shippingPrice: { type: Number},
	total: { type: Number},
})
var ImageSchema = new mongoose.Schema({ 
	img: { data: Buffer, contentType: String },
	name: { type: String }
    });

UserSchema.plugin(uniqueValidator, { message: "Username is already taken"})

mongoose.model('User', UserSchema)
mongoose.model('Item', ItemSchema)
mongoose.model('Order', OrderSchema)
mongoose.model('Image', ImageSchema)

var User = mongoose.model('User')
var Item = mongoose.model('Item')
var Order = mongoose.model('Order')
var Image = mongoose.model('Image')

const storage = multer.diskStorage({
	destination: './imageuploads',
	filename: function(req, file, cb){
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})

const upload = multer({
	storage: storage,
	limits: {fileSize: 1000000},
	fileFilter: function(req, file, cb){
		checkFileType(file, cb);
	}
}).single('myImage')

function checkFileType(file, cb){
	let filetypes = /jpeg|jpg|png|gif/
	let extname = filetypes.test(path.extname(file.originalname).toLowerCase())
	let mimetype = filetypes.test(file.mimetype)
	if(mimetype && extname){
		return cb(null, true)
	}
	else{
		return false
	}
}

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static( __dirname + '/client/dist' ));
app.use(session({
  secret: 'slaminwartsasdfs',
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }
}))
app.post('/checkLogin', function(req,res){
	User.findOne({ username: req.body.username }, function(err, user) {
	    if(err){
	    	res.json(err)
	    }
	    else{
	    	if(user === null){
	    		res.json({errors: "Incorrect Username/Password"})
	    	}
	    	else{
	    		bcrypt.compare(req.body.password, user.password, function(err, res1){
		    		if(err){
		    			res.json(err)
		    		}
		    		else{
		    			if(res1 === false){
		    				res.json({errors: "Incorrect Username/Password"})
		    			}
		    			else if(res1 === true){
		    				if(!req.session.login){
		    					req.session.login = user._id
		    					req.session.admin = user.admin
		    				}
		    				res.json({message: "Login Success!", session: req.session})
		    			}
		    		}
		    	})
	    	}
	    }
  })
})
app.get('/logout', function(req,res){
	req.session.destroy(function(err){
		if(err){
			res.json(err)
		}
		else{
			res.json({message: "Logged Out"})
		}
	})
})
app.post('/registerUser', function(req,res){
	let pword = ""
	let admin = false
	if(req.body.name === "admin"){
		admin = true
	}
	bcrypt.hash(req.body.password, saltRounds, function(err, hash){
		if(err){
			res.json(err)
		}
		else{
			let user = new User({
				name: req.body.name,
				username: req.body.username,
				password: hash,
				admin: admin
			})
			user.save(function(err) {
			    if(err) {
			      res.json(err)
			    } 
			    else {
			      res.json({message: "Successfully Registered!"})
			    }
		  	})
		}
	})	
})
app.get('/getAllOrders', function(req,res){
	Order.find({}, null, {sort: 'id'}, function(err, orders){
		if(err){
			res.json(err)
		}
		else{
			res.json(orders)
		}
	})
})

app.get('/findOrder/:id', function(req, res){
	Order.findOne({_id: req.params.id}, function(err, order) {
	    if(err){
	    	res.json(err)
	    }
	    else{
	    	res.json(order)
	    }
  })
})
app.post('/newOrder', function(req, res) {
  let order = new Order({
  	id: req.body.id,
	name: req.body.name,
	date: req.body.date,
	phone: req.body.phone,
	billing: req.body.billing,
	shipping: req.body.shipping,
	items: req.body.items,
	status: req.body.status,
	shippingPrice: req.body.shippingPrice,
	total: req.body.total
  })
  for(let i = 0; i<req.body.items.length; i++){
  	Item.findOne({_id: req.body.items[i]["id"]}, function(err, product){
  		if(err){
  			res.json(err)
  		}
  		else{
  			product['count'] -= req.body.items[i]['quantity']
  			product['sold'] += req.body.items[i]['quantity']
  			product.save()
  		}
  	})
  }
  order.save(function(err) {
    if(err) {
      res.json(err)
    } 
    else {
      res.json({order: order})
    }
  })
})
app.put('/updateOrder/:id', function(req, res){
	Order.findOne({_id: req.params.id}, function(err, order){
		if(err){
	    	res.json(err)
	    }
	    else{
	    	order.status = req.body.status
	    	order.save(function(err){
	    		if(err){
	    			res.json(err)
	    		}
	    		else{
	    			res.json({order: order})
	    		}
	    	})
	    }
	})
})
app.get('/getAllProduct', function(req,res){
	Item.find({}, null, {sort: 'id'}, function(err, products){
		if(err){
			res.json(err)
		}
		else{
			res.json(products)
		}
	})
})
app.get('/getProduct/:id', function(req, res){
	Item.findOne({_id: req.params.id}, function(err, product) {
	    if(err){
	    	res.json(err)
	    }
	    else{
	    	res.json(product)
	    }
  	})
})
app.get('/findSimilar/:category', function(req, res){
	Item.find({category: req.params.category}, null, {sort: {'sold': -1}}, function(err, products) {
	    if(err){
	    	res.json(err)
	    }
	    else{
	    	res.json(products)
	    }
  	})
})
app.post('/image', function(req, res){
	upload(req, res, function(err){
	  	if(err){
	  		console.log(err)
	  		res.json({err: err})
	  	}
	  	else{
	  		var image = new Image()
	  		image.img.data = fs.readFileSync(req.file.path)
	  		image.img.contentType = req.file.mimetype
	  		image.name = req.file.originalname
	  		fs.unlink(req.file.path, function(err){
	  			if(err){
	  				res.json(err)
	  			}
	  		})
	  		res.json(image)
	  	}
  })
})
app.post('/newProduct', function(req, res) {
  let product = new Item({
  	id: req.body.id, 
  	name: req.body.name, 
  	description: req.body.description, 
  	category: req.body.category, 
  	count: req.body.count, sold: 0, 
  	price: req.body.price, 
  	images: req.body.images,
  	mainImage: req.body.mainImage
  })
  product.save(function(err) {
    if(err) {
      res.json(err)
    } 
    else {
      res.json({product: product})
    }
  })
})
app.put('/updateProduct/:id', function(req, res){
	Item.findOne({_id: req.params.id}, function(err, product){
		if(err){
	    	res.json(err)
	    }
	    else{
	    	product.name = req.body.name
	    	product.description = req.body.description
	    	product.category = req.body.category
	    	product.count = req.body.count
	    	product.price = req.body.price
	    	product.images = req.body.images
	    	product.mainImage = req.body.mainImage
	    	product.save(function(err){
	    		if(err){
	    			res.json(err)
	    		}
	    		else{
	    			res.json({product: product})
	    		}
	    	})
	    }
	})
})
app.delete('/deleteProduct/:id', function(req, res){
	Item.remove({_id: req.params.id}, function(err, product){
		if(err){
			res.json(err)
		}
		else{
			res.json({product: product})
		}
	})
})
app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./client/dist/index.html"))
});

app.listen(8000, function() {
 console.log("listening on port 8000");
});
