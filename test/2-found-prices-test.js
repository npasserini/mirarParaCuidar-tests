import {server, resource, config} from './test-fwk'
const { foundPrices } = config

resource(foundPrices, function() {
  describe.skip(`POST /${foundPrices}`, function() {
    var foundPrice = {
      product_id: '7501234512343',
      price: 23.50,
      datetime: new Date().toJSON()
    }
    var res
    before(function(done) {
      server.post(`/${foundPrices}`)
        .send(foundPrice)
        .end((err,response) => {
          res = response
          done(err)
        })
    })

    it("should be OK", function() {
      res.status.should.equal(201, `Http error message: "${res.error.text}"`)
    })
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
