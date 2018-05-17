/**
 * JobController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  /**
   * `JobController.create()`
   */
  create: async function (req, res) {

    try {
      let {
        title,
        description,
        position,
        salary,
        companyId
      } = req.allParams();

      //validation
      if (!title) {
        return res.badRequest({
          err: 'title is required field!'
        })
      }

      if (!salary) {
        return res.badRequest({
          err: 'salary is required field!'
        })
      }

      /**
       * Create Job Details first
       */
      const jobDetails = await JobDetail.create({
        description,
        salary,
        position
      }).fetch();

      /**
       * Create Job
       */
      sails.log(jobDetails);
      const job = await Job.create({
        title,
        jobDetail: jobDetails.id,
        company:companyId
      }).fetch();
      return res.ok(job);


    } catch (err) {
      return res.serverError(err);
    }
  },

  /**
   * `JobController.find()`
   */
  find: async function (req, res) {
    try{

      const job = await Job.find().populate('jobDetail').populate('company');

      return res.ok(job);

    }catch(err){
      return res.serverError(err);
    }
  }

};
