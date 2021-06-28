var express = require('express');
var router = express.Router();
var graphdb = require('../utils/graphdb')

/* GET home page. */
router.get('/api/filmes', function(req, res, next) {
  let query = `select ?id ?t ?y where {
                    ?id rdf:type :Filme ;
                        :title ?t ;
                        :year ?y .
                }`

  graphdb.execQuery(query)
      .then(dados => {
        let a = dados.data.results.bindings
        a = a.map(elem => {
          let ret = {}
          ret.id = graphdb.pair2Value(elem.id)
          ret.title = graphdb.pair2Value(elem.t)
          ret.year = graphdb.pair2Value(elem.y)
          return ret
        })
        res.send(a)
      })
      .catch(error => {
        res.send(error)
      })
});

router.get('/api/filmes/:id', function(req, res, next) {
  let id = req.query.id
  let query = `select ?t ?y where {
                    ?${id} rdf:type :Filme ;
                        :title ?t ;
                        :year ?y .
                }`

  graphdb.execQuery(query)
      .then(dados => {
        let a = dados.data.results.bindings
        a = a.map(elem => {
          let ret = {}
          ret.title = graphdb.pair2Value(elem.t)
          ret.year = graphdb.pair2Value(elem.y)
          return ret
        })
        res.send(a)
      })
      .catch(error => {
        res.send(error)
      })
});

router.get('/api/atores/:id', function(req, res, next) {
  let id = req.query.id
  let query = `select ?t where {
                    ?${id} rdf:type :Ator ;
                        :title ?t .
                } ORDER BY (?t)`

  graphdb.execQuery(query)
      .then(dados => {
        let a = dados.data.results.bindings
        a = a.map(elem => {
          let ret = {}
          ret.title = graphdb.pair2Value(elem.t)
          return ret
        })
        res.send(a)
      })
      .catch(error => {
        res.send(error)
      })
});

router.get('/api/atores', function(req, res, next) {
  let query = `select distinct ?id ?t where {
                    ?id rdf:type :Ator ;
                        :title ?t .
                } ORDER BY (?t)`

  graphdb.execQuery(query)
      .then(dados => {
        let a = dados.data.results.bindings
        a = a.map(elem => {
          let ret = {}
          ret.title = graphdb.pair2Value(elem.t)
          ret.id = graphdb.pair2Value(elem.id)
          return ret
        })
        res.send(a)
      })
      .catch(error => {
        res.send(error)
      })
});

router.get('/api/generos', function(req, res, next) {
  let query = `select distinct ?t where {
                    ?id rdf:type :Genero ;
                        :title ?t .
                } ORDER BY (?t)`

  graphdb.execQuery(query)
      .then(dados => {
        let a = dados.data.results.bindings
        a = a.map(elem => {
          let ret = {}
          ret.title = graphdb.pair2Value(elem.t)
          return ret
        })
        res.send(a)
      })
      .catch(error => {
        res.send(error)
      })
});

module.exports = router;
