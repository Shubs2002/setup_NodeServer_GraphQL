import mongoose from "mongoose";
// import uuid from "node-uuid";
import { v4 as uuidv4 } from "uuid";
const schema = mongoose.Schema;

const EmployeeSchema = new schema({
    id: {
        type: String,
        default: uuidv4,
        trim: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    department:{
        type: String,
        required: true,
    },
    salary: Number,
    birthdate: {
        type: Date,
        required: true,
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER',
    }

    
})

const Employeemodel = mongoose.model('Employee', EmployeeSchema)
export default Employeemodel