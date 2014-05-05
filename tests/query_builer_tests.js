require('should');

var SqlQueryBuilder = require('../sql_builder');

var sqlQueryBuilder = new SqlQueryBuilder();

describe("Quey Builder", function(){

   it("Creates the Select part of a query", function(){
      sqlQueryBuilder.select();
      (sqlQueryBuilder.getQuery()).should.equal("select * from ");
   });

   it("Adds the table name to the query", function(){
      sqlQueryBuilder.select().from("tableName");
      (sqlQueryBuilder.getQuery()).should.equal("select * from tableName");
   });

   it('Adds the where clause to the query', function(){
      sqlQueryBuilder.select().from('tableName').where({id: 1});
      (sqlQueryBuilder.getQuery()).should.equal('select * from tableName where id=1');
      (sqlQueryBuilder.select().from('tableName').where({id: 1, name: "someName"}).getQuery())
         .should.equal("select * from tableName where id=1 and name='someName'");
   });

});
