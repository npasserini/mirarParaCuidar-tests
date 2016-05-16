import {server, resource} from './test-fwk'

resource("shops", function() {
  describe("GET /shops", function() {
    var res
    before(function(done) {
      server.get("/shops").end((err,response) => {
        res = response
        done(err)
      })
    })

    it("should be OK", function() { res.status.should.equal(200) })
    it("should return a json", function() { res.should.be.json() })
    it("body should be an object with paging and items", function() {
      res.body.should.be.an.Object()
      res.body.should.have.keys('items', 'paging')
    })
    it("body.items should be a list of shops", function() {
      res.body.items.should.be.an.Array()
      res.body.items.forEach(item => {
        item.should.be.an.Object()
        item.should.have.keys('latitude', 'longitude', 'name', 'address', 'location', 'id')
      })
    })

    it("body.paging should be an object with limit, offset and total", function() {
      res.body.paging.should.be.an.Object()
      res.body.paging.should.have.keys('limit', 'offset', 'total')
    })
  })

  describe("POST /shops", function() {
    var shop = {
      name: 'Coto San Cristóbal',
      address: 'Av. San Juan 2168',
      location: 'San Cristóbal, CABA',
      latitude: -34.6230723,
      longitude: -58.3979462,
    }
    var res
    before(function(done) {
      server.post("/shops")
        .send(shop)
        .end((err,response) => {
          res = response
          done(err)
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
