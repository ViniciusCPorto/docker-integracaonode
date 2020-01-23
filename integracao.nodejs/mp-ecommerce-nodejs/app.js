var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mercadopago = require('mercadopago');
var port = process.env.PORT || 3000
var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port);

app.get('/', function (req, res) {
  res.render('home');
});

app.get('/detail', function (req, res) {
  res.render('detail', req.query);

});

app.post('/pagar', function (req, res) {

  console.log(req.body);

  mercadopago.configurations.setAccessToken("TEST-169789813128334-032114-47f6f312d49be04a455c35e125094134-418849448");

  var payment_data = {
    transaction_amount: parseFloat(req.body.amount),
    token: req.body.token,
    description: req.body.description,
    installments: parseInt(req.body.installments),
    payment_method_id: req.body.paymentMethodId,
    payer: {
      email: req.body.email,
    }
  };

  mercadopago.payment.save(payment_data).then(function (data)  {
    console.log(data);
  //  res.send("O status do seu pagamento é: " + data.response.status + " - ID: " + data.responde.id);
    if(data.response.status == 'approved'){
      res.send("Parabéns! O status do seu pagamento foi " + data.response.status + "<br>ID do pagamento: " + data.response.id + "<br>Data aprovada em: " + data.response.date_created);

    } else{
      res.send("Lamentamos mas o status do seu pagamento foi recusado por motivo de: " + data.response.status + "<br> - ID: " + data.response.id);

    }
  }).catch(function (error) {
    console.log(error);
    if(error.cause[0].code == 3004){
    res.send("Token inválido " + error.cause[0].code);

    }else{
      res.send(error);

    }
    var mercadopago = require('mercadopago');
    mercadopago.configurations.setAccessToken("TEST-169789813128334-032114-47f6f312d49be04a455c35e125094134-418849448");

    payment_methods = mercadopago.get("/v1/payment_methods");

  });
});