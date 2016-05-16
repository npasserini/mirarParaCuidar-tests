import {server, resource, config} from './test-fwk'
const { foundPrices } = config

var newShop = {
  name: 'Carrefour City Lille Cordonnier',
  address: 'Avenue de l\'Architecte Louis Cordonnier',
  location: 'Lille Vauban, France',
  latitude: 50.6312615,
  longitude: 3.035714,
}

describe("Create a shop and post a product", function() {
  var shopsCount, shopId

  it("retrieve the current number of shops", function(done) {
    server.get("/shops").end((err, res) => {
      shopsCount = res.body.paging.total
      done(err)
    })
  })

  it("create a new shop", function(done) {
    server.post("/shops").send(newShop).end((err, res) => {
      const temp = res.headers.location.split("/")
      shopId = temp[temp.length - 1]
      done(err)
    })
  })

  it("GET /shops should retrieve the new shop", function(done) {
    server.get("/shops").end((err, res) => {
      const createdShop = res.body.items.find(shop => shop.id == shopId)
      createdShop.should.not.be.undefined()
      done(err)
    })
  })

  it("should be able to POST a new price with the new shop", function(done) {
    server.post("/found-prices").send({
      product_id: '7501234512343',
      shop_id: shopId,
      price: 23.50,
      datetime: new Date().toJSON()
    }).end((err, res) => {
      res.status.should.equal(201)
      done(err)
    })
  })
})
