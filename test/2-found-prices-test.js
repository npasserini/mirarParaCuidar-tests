import supertest from 'supertest'
import 'should'
import 'should-http'
import config from '../config.json'

const url = process.env.URL || config.url
const server = supertest.agent(url)

describe("Resource /found_prices", function() {
  describe("POST /found_prices", function() {
    var foundPrice = {
      product_id: 7501234512343,
      price: 23.50,
      datetime: new Date().toJSON()
    }
    var res
    before(function(done) {
      server.post("/found_prices")
        .send(foundPrice)
        .end((err,response) => {
          console.log(response)
          res = response
          done()
        })
    })

    it("should be OK", function() { res.status.should.equal(201) })
    it("should return the location of the created product", function(done) {
      server.get(res.headers.location)
        .end(function(err, response) {
          response.status.should.equal(200,
            `The POST request returned an invaled location header URL: ${res.headers.location}. The URL should be GETable and return HTTP status 200.`)
          done()
        })
    })
  })
})
