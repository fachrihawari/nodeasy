var fs = require('fs')

function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  fs.chmod(target, 0644, (err) => {
      console.log(err)
  })
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}


copyFile('node_modules/bulma/css/bulma.css', 'src/public/css/bulma.css', (err)=>{
    console.log(err)
})
copyFile('node_modules/font-awesome/css', 'src/public/css', (err)=>{
    console.log(err)
})
