var axios = require('axios')
var prefixes = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX noInferences: <http://www.ontotext.com/explicit>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX : <http://www.semanticweb.org/basto/ontologies/2021/5/cinema#>
        `

exports.execQuery = async function (query) {
    var getLink = "http://localhost:7200/repositories/Cinema?query="
    var encoded = encodeURIComponent(prefixes + query)
    return axios.get(getLink + encoded)
}

exports.execTransaction = async function (query) {
    var postLink = "http://localhost:7200/repositories/Cinema/statements"
    var encoded = encodeURIComponent(prefixes + query)
    var response
    try {
        response = await axios.post(postLink, `update=${encoded}`)
        return response.data
    } catch (error) {
        throw (error)
    }
}

exports.pair2Value = pair => {
    if(pair.type == 'uri')
        return pair.value.split('#')[1];
    else 
        return pair.value
}