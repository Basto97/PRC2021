const data = require('./movies.json')
const fs = require('fs')

let filmes = []
let atores = []
let genres = []

a = 0

data.forEach(elem => {
    a = a+1
    filme = {
        id: "filme"+String(a),
        title: elem.title.replace(/"/g, '').replace(/(\r\n|\n|\r)/gm,""),
        year: String(elem.year),
        cast: elem.cast
    }

    filmes.push(filme)

    elem.cast.forEach(atorName => {
        a = a+1
        if (!atores.some(e => e.name === atorName))
            atores.push({id: a, name: atorName, actedMovies: []})
        atores.find( a => a.name === atorName ).actedMovies.push(filme.id)
    })

    elem.genres.forEach(genreName => {
        a = a+1
        if (!genres.some(e => e.name === genreName))
            genres.push({id: a, name: genreName, actedMovies: []})
        genres.find( a => a.name === genreName ).actedMovies.push(filme.id)
    })


})

filmes.forEach(filme => {
    let text = `###
:${filme.id} rdf:type owl:NamedIndividual ,
        :Filme ;
        :title "${filme.title}" ;
        :year "${filme.year}" .`
    console.log(text)
})


atores.forEach(ator =>{
    let text = `###
:${ator.id} rdf:type owl:NamedIndividual ,
        :Ator ;
        `
    ator.actedMovies.forEach(movieId => {
    text += `:atuou <http://www.semanticweb.org/basto/ontologies/2021/5/cinema#${movieId}' \n        `
})
    text += `:title "${ator.name}
                `
    console.log(text)
})

genres.forEach(genre =>{
    let text = `###
:${genre.id} rdf:type owl:NamedIndividual ,
        :Género ;
        `
    genre.actedMovies.forEach(movieId => {
        text += `:estaNoFilm <http://www.semanticweb.org/basto/ontologies/2021/5/cinema#${movieId}' \n`
    })
    text += `:title "${genre.name}
                `
    console.log(text)
})
