var supertest = require("supertest");
var should = require("should");
require("should-http")

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:9200");

// UNIT test begin

describe("SAMPLE unit test",function(){

  // #1 should return home page

  it("should return home page",function(done){

    // calling home page api
    server.get("/shops").end(function(err,res){
      res.status.should.equal(200)
      res.should.be.json()
      res.body.should.be.an.Object()
      res.body.should.have.keys('items', 'paging')
      res.body.items.should.be.an.Array()

      console.log(res.body)
      done();
    });
  });

});
