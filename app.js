var  express 			=  require("express"),
	 app				=  express(),
	 bodyParser  		=  require("body-parser"),
	 mongoose 			=  require('mongoose'),
	 logger				=  require('morgan');

var app = express();
mongoose.connect('mongodb://localhost/rank-2');


var AthleteSchema=new mongoose.Schema({
			name 		    :String,
			weight          :String,
			fed             :String,
			height          :String,
			coach           :String,
            insta           :String,
            achievement     :String,
            contact         :String           
});
var FedSchema=new mongoose.Schema({
            name 		:String,
            details     :String,
            address     :String,
            contact     :String           
});
const Athlete = mongoose.model("Athlete",AthleteSchema);
const Fed = mongoose.model("Fed",FedSchema);

app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/',function(req,res){
    res.render('index');
});
app.get('/registration-form-athlete',function(req,res){
	res.render('ath-reg-form');
});
app.get('/ranking',function(req,res){
	res.render('ranking');
});
app.get('/blog1',function(req,res){
    res.render('blog1');
});
app.get('/blog2',function(req,res){
    res.render('blog2');
});
app.get('/blog3',function(req,res){
    res.render('blog3');
});
app.get('/admin',function(req,res){
	
	Athlete.find({},function(err,doc){
			res.render("admin-ath",{ath: doc});
		});
});

app.post('/registration-form-athlete',function(req,res){
	var newAth=new Athlete({
		name 		    	:req.body.name,
			weight          :req.body.weight,
			fed             :req.body.fed,
			height          :req.body.height,
			coach           :req.body.coach,
            insta           :req.body.insta,
            achievement     :req.body.achievement,
            contact         :req.body.contact  
	});
	newAth.save()
    .then(item => {
      res.redirect("/registration-form-athlete");
    })
    .catch(err => {
      res.send(err);
    });
});




app.listen(8080,function(){
	console.log("NKM's server is working just fine!");
});