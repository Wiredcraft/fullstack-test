var disableAllMethods = require('../../utils/helper').disableAllMethods;

module.exports = function(Publisher) {
  //disable the all methods
  disableAllMethods(Publisher, "create");

  // override the user register method
  Publisher.on('attached', function() {
    Publisher.create = function(filter, cb){
      var username = filter.username;
      var password = filter.password;
      Publisher.find({where: {username: username}}, function(err, publishers) {
        if(publishers.length === 0){
          //create a publisher instance
          Publisher.create({
            username: username,
            password: password
          }, function(err, user) {
            cb(null, {
              success: true,
              username: user.username,
              userId: user.id
            });
          });
        } else {
          cb(null, {
            success: false,
            message: 'Username is already existed.'
          });
        }
      });
    }
  });

  // use for user verified
  Publisher.verify = function(username, password, cb) {
    Publisher.find({where: {username: username}}, function(err, publishers) {
      if(publishers.length === 0){
        cb(null, {
          success: false,
          message: 'Username is not existed. Please check the username and password.'
        });
      }
      var user = publishers[0];
      if(user.password === password){
        cb(null, {
          success: true,
          username: user.username,
          userId: user.id
        });
      } else {
        cb(null, {
          success: false,
          message: 'Password is not match. Please try it again.'
        });
      }
    });
  };
  Publisher.remoteMethod(
    'verify',
    {
      accepts: [
        {
          arg: 'username', type: 'string'
        },
        {
          arg: 'password', type: 'string'
        },
      ],
      http: {path: '/verify', verb: 'post'},
      returns: {arg: 'status', type: 'string'}
    }
  );

};


