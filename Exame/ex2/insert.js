var axios = require('axios')
var prefixes = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX noInferences: <http://www.ontotext.com/explicit>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX : <http://prc.di.uminho.pt/2021/myfamily#>
        `

execQuery = async function (query) {
    var getLink = "http://localhost:7200/repositories/familia?query="
    var encoded = encodeURIComponent(prefixes + query)
    return axios.get(getLink + encoded)
}

execTransaction = async function (query) {
    var postLink = "http://localhost:7200/repositories/familia/statements"
    var encoded = encodeURIComponent(prefixes + query)
    var response
    try {
        response = await axios.post(postLink, `update=${encoded}`)
        return response.data
    } catch (error) {
        throw (error)
    }
}

constructAdd = query => gdb.execQuery(query).then(dados => {
    gdb.execTransaction(`
        INSERT DATA {
            ${dados.data}
        }
    `)
}).catch(e => console.log(e))

constructAdd(`CONSTRUCT {
    ?filho1 :eIrmao ?filho2
} WHERE {
   	?filho1 :temProgenitor ?pai .
    ?pai :eProgenitorDe ?filho2
    FILTER (?filho1 != ?filho2)
} `)