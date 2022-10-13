const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const contentSchema = new Schema({
    name: {
        type : String
    },
    typeContent: {
            type:String
    },
    contentUrl: {
        type: String
    }
});


const Content = mongoose.model('Content', contentSchema);

exports.findByType = (typeContent) => {
    return Content.find({typeContent:"video"})
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
    });
}

exports.findByName = (name) => {
    console.log("heyyyyy")
    return Content.find({
        "$or":[
            {
                name:{$regex:name}
            }
        ]
    }).then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
}


exports.createContent = (contentData) => {
    const content = new Content(contentData);
    return content.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Content.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, contents) {
                if (err) {
                    reject(err);
                } else {
                    resolve(contents);
                }
            })
    });
};










