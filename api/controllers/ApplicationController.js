module.exports={
    async create(req, res){
        try{
            const {name, email, jobId}= req.allParams();

            const candidate = await Candidate.create({
                name, email
            }).fetch();

            const app = await Application.create({
                candidate:candidate.id,
                job:jobId
            }).fetch();

            return res.ok(app);

        }catch(err){
            return res.serverError(err);
        }
    },
    async find(req, res){
        try{
            const apps = await Application.find()
            .populate('job')
            .populate('candidate');
            return res.ok(apps);
        }catch(err){
            return res.serverError(err);
        }
    }
}