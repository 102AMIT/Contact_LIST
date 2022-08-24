const express=require('express');//require the libary to run the peace of code
const path=require('path');//we are not installing path because this is inbuild module

const port=8000;

const db=require('./config/mongoose');

const Contact=require('./models/contact');

const app=express();// now app have all the functionality of express


app.set('view engine','ejs');//here we tell the express to set ejs for us basically we told that now we are working on ejs and please read the code on that formet,we are creating a property view engine and set the value ejs

app.set('views',path.join(__dirname,'views'));//here we set the view for this we need to set the module path for the the directory in specific folder here __dirname is a global varibale to set the directory

app.use(express.urlencoded());//this is middleware for encoding the code basically parsing the code we need to use for parse the data from form and responce according to the request

app.use(express.static('assets'));

//for every controller we need middleware so in express we simply use the default if it's needed then we can create out own middleware
// we can create our own middleware 


// app.use(function(req,res,next){//here next is the pre defined function for calling the next controller 
//     console.log("middleware 1")
//     next();//if we are not calling next then only middleware 1 is called other functions are not run or execute 

// })



var contactList = [   //creating a object in array form with key value pairs


    {
        name:"Amit Kumar",
        phone:"1234567890"
    },
    {
        name:"Arpan Ghosh",
        phone:"0987654321"
    },

    {
        name:"Arun Seal",
        phone:"0987612345"
    },

]



app.get('/',function(req,res){

    // we are also find the perticular conatact by name also we just need to pass in find function all we pass is query
    // Contact.find({name:"new"},function(err,contacts){  just like that we get all contact of name new 
    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fatching contacts in db');
            return;
        }
        return res.render('home',{
            title:"Contact List",
            contact_list : contacts
        });
    })


    // res.send('<h1>cool,it is running</h1>');
    // return res.render('home',{
    //     title:"Contact List",
    //     contact_list : contactList
    // });//render out first title via js on ejs and contact list

    
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"let us play with ejs"
    })
});

//access the form data 

app.post('/create-contact',function(req,res){
    // return res.redirect('/practice');

    // here we are reding the data and store the data on runtime through parsing this data store on temporary basis and ram memory not on data base 

    //here we are push the data in our contact list array 

    //method 1: putting the data in key value pair name and phone we are using in ejs in input tag in name attribute

    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });

    //method 2: basically we are pasing the key value pair in form of body so we can directly pass the body so we are written less line of code 
    // contactList.push(req.body);//this is a post request the data come in form are crete key body and body content the data


    //using database
    //here we are push into database or my collection for this schema has been generated
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log("error is creating a contact");
            return ;
        }
        console.log('*******',newContact);
        return res.redirect('back');
    });
    // return res.redirect('back');//here back is the sorter version of home if we want to redirect on home page we don't need to write the url we simply write the 'back'.

});

//for deleting the conatact 
    app.get('/delete-contact',function(req,res){
        // console.log(req.params);//we can also use req.params
        // let phone=req.params.phone;

        // get the query  from request url
        // let phone=req.query.phone;

        // let contactIndex=contactList.findIndex(contact => contact.phone ==phone);

        // if(contactIndex != -1){
        //     contactList.splice(contactIndex,1);
        // }

        // return res.redirect('back');


        // here we are using our database unique id for delete the contact

        let id=req.query.id;

        //find the conatact in the database using id and delete
        Contact.findByIdAndDelete(id,function(err){
            if(err){
                console.log('error in deleting and object from database');
                return;
            }
            console.log(req.query);
            return res.redirect('back');
        });
        
    });





app.listen(port,function(err){
    if(err){
        console.log("error in running the server",err);

    }
    console.log("Yup my server running on port :",port);

})