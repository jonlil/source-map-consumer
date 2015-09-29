var fs = require('fs');
var request = require('request');
var SourceMap = require('source-map');
var SourceMapConsumer = SourceMap.SourceMapConsumer;
var Q = require('q');


module.exports = function(params) {

  var bufs = [];
  var deferred = Q.defer();

  request({
    method: 'GET',
    url: params.sourcemap,
    strictSSL: false,
    gzip: true
  })
  .on('response', function(response) {
    console.log(arguments);
  })
  .on('data', function(d) {
    bufs.push(d);
  })
  .on('end', function() {
    var data, smc;

    data = JSON.parse(Buffer.concat(bufs).toString('utf8'));
    data.sourceRoot = '/';

    smc = new SourceMapConsumer(data);

    deferred.resolve(smc.originalPositionFor({
      line: parseInt(params.row, 10),
      column: parseInt(params.column, 10)
    }));
  })
  .on('error', function(err) {
    console.log(err);
    deferred.reject(err);
  });

  return deferred.promise;
};
