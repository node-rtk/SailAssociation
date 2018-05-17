/**
 * CompanyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

  /**
   * `CompanyController.create()`
   */
  create: async function (req, res) {
    try{
      let{name, address, city}= req.allParams();
      const company = await Company.create({name, address, city});
      return res.ok(company);
    }catch(err){
      return res.serverError(err);
    }
  },

  /**
   * `CompanyController.find()`
   */
  find: async function (req, res) {
   try{
     sails.log('Get')
       const company = await Company.find()
       .populate('jobs');
       return res.ok(company);
   }catch(err){
     return res.serverError(err);
   }
  }

};

