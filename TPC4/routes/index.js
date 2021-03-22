const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
    res.render('index');
});


const axios = require('axios');
const prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX : <http://www.daml.org/2003/01/periodictable/PeriodicTable#>
    `;

router.get('/elems', function(req, res) {
    const query = `select ?symbol ?name  where { 
                    ?s a :Element ;
                        :atomicNumber ?anumber;
                        :name			?name ;
                        :symbol		?symbol.
                  } 
                  order by asc(?anumber)
                  `;
    axios.get("https://localhost:7200/repositories/TabelaPeriodica" + "?query=" + encodeURIComponent(prefixes + query))
        .then(dados =>{
            const e = dados.data.results.bindings.map(bind => {
                return ({
                    symbol: bind.symbol.value,
                    name: bind.name.value
                })
            });
            res.render('elems', { elements: e });
        })
        .catch(erro => console.log(erro))

});

router.get('/elems/:id', function(req, res) {
    const name = req.params.id;
    const query = `select * where {
    
    ?s a :Element ;
     :symbol ?symbol;
     :name   ?name;
     :atomicNumber ?anumber;
     :group		?group;
     :period		?period;
     :standardState ?sstate;
     :symbol	"${name}".
   Optional{   
     ?s a :Element ;
     :atomicWeight ?aweight;
     :color			?color;
     :classification	?classification.
    }
}		
                  `;

    axios.get("http://localhost:7200/repositories/TabelaPeriodica" + "?query=" + encodeURIComponent(prefixes + query))
        .then(dados =>{
            console.dir(dados.data.results.bindings)

            const e = dados.data.results.bindings.map(bind => {
                let aweight;
                let color;
                let classification;
                if (!bind.aweight || !bind.color || !bind.classification) {
                    aweight = "-";
                    color = "-";
                    classification = "-";
                } else {
                    aweight = bind.aweight.value;
                    color = bind.color.value;
                    classification = bind.classification.value.split("#")[1];

                }
                return ({
                    Symbol: bind.symbol.value,
                    Name: bind.name.value,
                    "Atomic Number": bind.anumber.value,
                    "Atomic Weight": aweight,
                    Group: bind.group.value.split("_")[1],
                    Period: bind.period.value.split("_")[1],
                    "Standard State": bind.sstate.value,
                    Color: color,
                    Classification: classification
                })
            })[0];

            res.render('elem', { element: e });

        })
        .catch(erro => console.log(erro))

});


router.get('/groups/', function(req, res) {

    const query = `select * where {
    ?s a :Group ;
     :number ?number ;
     :name   ?name .
  }
  order by asc(?number) 
  `;

    axios.get("http://localhost:7200/repositories/TabelaPeriodica" + "?query=" + encodeURIComponent(prefixes + query))
        .then(dados =>{
            const g = dados.data.results.bindings.map(bind => {
                return ({
                    Number: bind.number.value,
                    Name: bind.name.value,

                })
            });

            res.render('groups', { groups: g });

        })
        .catch(erro => console.log(erro))

});


router.get('/groups/:id', function(req, res) {
    const number = req.params.id;
    const query = `select ?symbol ?name ?number where {
    ?s a :Group ;
      :name ?name;
      :number  ?number;
      :number  ${number}. 
    ?s :element ?symbol .
} 
      `;

    axios.get("http://localhost:7200/repositories/TabelaPeriodica" + "?query=" + encodeURIComponent(prefixes + query))
        .then(dados =>{
            const g = dados.data.results.bindings.map(bind => {
                return ({
                    Symbol: bind.symbol.value.split("#")[1],
                    Group: bind.name.value,
                    Number: bind.number.value
                })
            });

            res.render('group', { group: g,name: g[0].Group });

        })
        .catch(erro => console.log(erro))

});

router.get('/periods/', function(req, res) {
    const query = `select  distinct ?number   where {
    ?s a :Period;
      :number ?number.
      ?s ?p ?o .
      }
    
      order by asc(?number)
  `;
    axios.get("http://localhost:7200/repositories/TabelaPeriodica" + "?query=" + encodeURIComponent(prefixes + query))
        .then(dados =>{
            const p = dados.data.results.bindings.map(bind => {
                return ({
                    Number: bind.number.value,
                })
            });
            res.render('periods', { periods: p });
        })
        .catch(erro => console.log(erro))
});

router.get('/periods/:id', function(req, res) {
    const number = req.params.id;
    const query = `select  ?element  where {
                       ?s a :Period;
                       :element ?element;
                       :number ${number}.
                }
  `;
    axios.get("http://localhost:7200/repositories/TabelaPeriodica" + "?query=" + encodeURIComponent(prefixes + query))
        .then(dados =>{
            const p = dados.data.results.bindings.map(bind => {
                return ({
                    Symbol: bind.element.value.split("#")[1]
                })
            });
            res.render('period', { period: p,number:number });
        })
        .catch(erro => console.log(erro))
});

module.exports = router;