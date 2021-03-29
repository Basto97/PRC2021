const express = require('express');
const router = express.Router();
const axios = require('axios');

const prefixes = `
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX xml: <http://www.w3.org/XML/1998/namespace>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX : <http://www.semanticweb.org/celso/ontologies/2021/2/pubs#>
    `;

const link = 'http://epl.di.uminho.pt:8738/api/rdf4j/query/A83655-TP5'
const linkUpdate = 'http://epl.di.uminho.pt:8738/api/rdf4j/update/A83655-TP5'

router.get('/pubs', function(req, res, next) {
    let urlQuery = req.query
    let query;
    query = !urlQuery.type ? ` SELECT ?entity
                    WHERE {
                        ?entity rdf:type ?type.
                        ?type rdfs:subClassOf* :Publicacao.
                    }
                  ` : ` SELECT ?entity
                    WHERE {
                        ?entity rdf:type :` + urlQuery.type.charAt(0).toUpperCase() + urlQuery.type.slice(1) + `
                    }
                  `;
    axios.get(link+"?query= "+ encodeURIComponent(prefixes + query))
        .then(dados =>{
            const e = dados.data.results.bindings.map(bind => bind.entity.value.split("#")[1]);
            res.send(e)
        })
        .catch(erro => console.log(erro))
});

router.get('/pubs/:id', function(req, res, next) {
    let query =  `SELECT ?p ?o WHERE { :`+req.params.id+` ?p ?o }`
    axios.get(link+"?query= "+ encodeURIComponent(prefixes + query))
        .then(dados => {
            const e = dados.data.results.bindings.map(binding => {
                return {
                    p : binding.p.value,
                    o : binding.o.value
                }
            })
            res.send(e)
        })
        .catch(erro => console.log(erro))
});


router.get('/authors', function(req, res, next) {
    let query =  `SELECT DISTINCT ?a WHERE { ?e :temAutor ?a }`
    axios.get(link+"?query= "+ encodeURIComponent(prefixes + query))
        .then(dados =>{
            const e = dados.data.results.bindings.map(bind => bind.a.value.split("#")[1]);
            res.send(e)
        })
        .catch(erro => console.log(erro))
});

router.get('/authors/:id', function(req, res, next) {
    let query =  `SELECT ?e WHERE { ?e :temAutor :`+req.params.id+` }`
    axios.get(link+"?query= "+ encodeURIComponent(prefixes + query))
        .then(dados =>{
            const e = dados.data.results.bindings.map(bind => bind.e.value.split("#")[1]);
            res.send(e)
        })
        .catch(erro => console.log(erro))
});


router.delete('/authors/:id', function(req, res, next) {
    let query =  `DELETE DATA {
                ?e :temAutor :`+req.params.id+` .
             }`
    axios({
        method: 'post',
        url: linkUpdate,
        headers: {},
        data: {
            query: encodeURIComponent(prefixes + query), // This is the body part
        }
    }).then(() =>{ res.send({ok: true})})
        .catch(erro => console.log(erro))
});




module.exports = router;
