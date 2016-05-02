import supertest from 'supertest'
import 'should'
import 'should-http'
import config from '../config.json'
// This agent refers to PORT where program is runninng.

const url = process.env.URL || config.url
const server = supertest.agent(url)

// UNIT test begin

describe("Resource /shops", function() {
  describe("GET /shops", function() {
    var res
    before(function(done) {
      server.get("/shops").end((err,response) => {
        res = response
        done()
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
    var res
    before(function(done) {
      server.post("/shops")
        .send({
          name: 'Coto San Cristóbal',
          address: 'Av. San Juan 2168',
          location: 'San Cristóbal, CABA',
          latitude: -34.6230723,
          longitude: -58.3979462,
        })
        .end((err,response) => {
          console.log(response)
          res = response
          done()
        })
    })

    it("should be OK", function() { res.status.should.equal(200) })
  })
})
