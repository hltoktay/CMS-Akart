const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema
const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    client: {
        type: String,
        required: true 
    },
    location: {
        type: String,
        required: true 
    },
    surface: {
        type: Number,
        required: false 
    },
    website: {
        type: String,
        required: false
    },
    sector: {
        type: String,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    imagename: {
        type: String,
    }
});


const Projects = mongoose.model('projects', ProjectSchema);


module.exports = {
    Projects: Projects,
}