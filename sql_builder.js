var _ = require('underscore');

var SqlQueryBuilder = function(){
   var query = '';
};

SqlQueryBuilder.prototype.select = function(){
   this.query = "select * from ";
   return this;
};

SqlQueryBuilder.prototype.from = function(tableName){
   this.query += tableName;
   return this;
};

SqlQueryBuilder.prototype.getQuery = function(){
   return this.query;
};

SqlQueryBuilder.prototype.where = function(params){
   var self = this;
   var keys = _.keys(params);
   if(params){
      this.query += " where ";
   }
   var wheres = [];

   _.each(keys, function(k){
      if(!_.isNumber(params[k]) && !_.isNaN(params[k])){
         wheres.push("" + k + "='" + params[k] + "' ");
      } else {
         wheres.push("" + k + "=" + params[k] + " ");
      }
   });
   if(keys.length > 1 ){
      self.query += wheres.join('and ');
   } else {
      self.query += wheres[0];
   }
   self.query = self.query.trim();
   return this;
};

module.exports = SqlQueryBuilder;
