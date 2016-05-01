import supertest from 'supertest'
import 'should'
import 'should-http'

// This agent refers to PORT where program is runninng.

const server = supertest.agent("http://localhost:9200")

// UNIT test begin

describe("Resource /shops", () => {

  // #1 should return home page

  it("GET should return a list of shops",function(done){

    // calling home page api
    server.get("/shops").end((err,res) => {
      res.status.should.equal(200)
      res.should.be.json()
      res.body.should.be.an.Object()
      res.body.should.have.keys('items', 'paging')
      res.body.items.should.be.an.Array()
      res.body.items.forEach(item => {
        item.should.be.an.Object()
        item.should.have.keys('latitude', 'longitude', 'name', 'address', 'location', 'id')
      })

      console.log(res.body)
      done()
    })
  })

})
