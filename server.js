var express = require("express");
var path = require("path");
var multer = require("multer")
var app = express();
var fs = require("fs")
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecommerce', { useNewUrlParser: true });

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
	date: { type: Date },
	billing: { type: String },
	shipping: { type: String },
	items: [{itemname: { type: String }, quantity: { type: Number }, price: { type: Number }}],
	status: { type: String }
})
var ImageSchema = new mongoose.Schema({ 
	img: { data: Buffer, contentType: String },
	name: { type: String }
    });

mongoose.model('Item', ItemSchema)
mongoose.model('Order', OrderSchema)
mongoose.model('Image', ImageSchema)

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

app.get('/getAllOrders', function(req,res){
	Order.find({}, null, {sort: 'id'}, function(err, orders){
		if(err){
			res.json(err)
		}
		else{
			var idcount = orders.length
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
