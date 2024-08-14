import {Schema,model,models} from 'mongoose';


const userScheme = new Schema({
    email:{
        type: 'string',
        unique:[true,'Email already exists'],
        required:[true,'Email is required']
    },
    username:{
        type: 'string',
        required:[true,'Username is required'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
    },
    image:{
        type: 'string',
    }
},{
    timestamps: true
});


const User = models.User || model('User',userScheme);

export default User;