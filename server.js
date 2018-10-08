var express = require("express");
var path = require("path");
var app = express();
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
	category: { type: String }
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
mongoose.model('Item', ItemSchema)
mongoose.model('Order', OrderSchema)

var Item = mongoose.model('Item')
var Order = mongoose.model('Order')

app.use(bodyParser.json());
app.use(express.static( __dirname + '/client/dist' ));

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
app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./client/dist/index.html"))
});

app.listen(8000, function() {
 console.log("listening on port 8000");
});
