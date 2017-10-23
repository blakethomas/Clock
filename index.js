const express = require('express')
const {MongoClient} = require('mongodb')
const app = express()


MongoClient.connect("mongodb://localhost/clock", (err, db) => {
  const timezones = db.collection('timezones')

  app.get('/', (req,res) => {
    timezones
    .find({})
    .toArray()
    .then( result => {
      res.send(result)
    })
  })

})
app.listen(3000, () => console.log('listening on port 3000.'))
