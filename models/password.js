const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const passwordSchema=new mongoose.Schema({
    username : {
    type :String
    },
    password : {
        type :String               
        }
    });   

passwordSchema.pre('save',async function()
{
    const hash=await bcrypt.hash(this.password,10);
    this.password=hash;
})

module.exports=mongoose.model('credential',passwordSchema);