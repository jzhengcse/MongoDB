const assert = require('assert')
const User = require('../src/user')
describe('Deleteing a user', () => {
  let joe
  beforeEach((done) => {
    joe = new User({name: 'Joe'})
    joe.save()
      .then(() => done())
  })

  function assertName (operation, done) {
    operation
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user === null)
        done()
      })
  }

  it('model instance remove', (done) => {
    assertName(
      joe.remove(),
      done
    )
  })
  it('class method remove', (done) => {
    // Remove a bunch of records with some given criteria
    assertName(
      User.remove({name: 'Joe'}),
      done
    )
  })
  it('class method findAndRemove', (done) => {
    assertName(
      User.findOneAndRemove({name: 'Joe'}),
      done
    )
  })
  it('class method findByIDAndRemove', (done) => {
    assertName(
      User.findByIdAndRemove(joe._id),
      done
    )
  })
})
