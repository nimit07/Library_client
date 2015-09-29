
/**
 * Module dependencies.
 */

var render = require('./libs/render');
var logger = require('koa-logger');
//var route = require('koa-route');
var router=require('koa-router')();
var parse = require('co-body');
var koa = require('koa');
var app = koa();
var request = require('koa-request');

// "database"

var posts = [];

// middleware

app.use(logger());
app
  .use(router.routes())
 // .use(router.allowedMethods());
// route middleware

//app.use(router.get('/', list));


router
    .get('/', list)
    .get('/branch/new', add)
    .get('/update/branch/:branch', show)
    .post('/bpb/branch/:branch', update)
    .post('/bpb/del/:branch', deleteI)
    .post('/branch', create)
    .get('/branch/del/', del);

// route definitions

/**
 * Post listing.
 */

function *list() {
 var options = {
        url: 'http://127.0.0.1:8000/library/branch-view?',

    };

    var response = yield request(options); //Yay, HTTP requests with no callbacks!
    var info = JSON.parse(response.body);



  this.body = yield render('list', { info: info });
}

/**
 * Show creation form.
 */

function *add() {

  this.body = yield render('new');
}
function *del(){
this.body=yield render('delete');
}
/**
 * Show post :id.
 */

function *show(branch) {

 var options = {
        url: 'http://127.0.0.1:8000/library/branch-view/'+this.params.branch,

    };

    var response = yield request(options); //Yay, HTTP requests with no callbacks!
    var info = JSON.parse(response.body);



  this.body = yield render('update', { form: info });

}
 function *update(branch) {
  var data = yield parse(this);
  var options = {
        url: 'http://127.0.0.1:8000/library/branch-view/'+this.params.branch+'/',
        body: JSON.stringify(data),

    };

    var response = request.put(options); //Yay, HTTP requests with no callbacks!

    yield response;
    //this.body= response;
    this.redirect('/');

    //var info = JSON.parse(response.body);

}

function *create() {
  var data = yield parse(this);
console.log(data);
  var options = {
        url: 'http://127.0.0.1:8000/library/branch-view?',
        body: JSON.stringify(data),

    };

    var response = request.post(options); //Yay, HTTP requests with no callbacks!




    yield response;


    //var info = JSON.parse(response.body);
  this.redirect('/');
}

/**
 * Delete a post.
 */
function *deleteI(branch){
var options = {
        url: 'http://127.0.0.1:8000/library/branch-view/'+this.params.branch+'/',


    };

    var response =  request.del(options); //Yay, HTTP requests with no callbacks!
    yield response;




  this.redirect('/');


}
// listen

app.listen(3000);
console.log('listening on port 3000');