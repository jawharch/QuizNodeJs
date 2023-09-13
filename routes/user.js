const User=require('../models/User')
const cryptoJS=require('crypto-js')
const { verifyTokenAndAuthorization } = require('./verifyToken')
const router=require('express').Router()
const nodemailer=require('nodemailer')
const transporter= nodemailer.createTransport(
  {
      service:'Gmail',
      auth:{
          user:'djochouri@gmail.com',
          pass:'xguvitvruvekiffs'
      },
  }
)
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
      req.body.password = cryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }h
  });
router.post('/email-check',async(req,res)=>
{
  try {
    const user=await User.findOne({email:req.body.email})
    if(user)
    {
      res.status(200).json('Email already exists')
    }
    
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
    
  }
})
router.post('/send-success-email', async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
   

    const mailOptions = {
      from: 'djochouri@gmail.com',
      to: userEmail,
      subject: 'Congratulations on Your Success',
      text:` Congratulations! You have successfully completed the quiz.\n correctAnswers:${req.body.correctIndex}`,
    };

    
    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully');
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'An error occurred while sending the email' });
  }
});

  module.exports=router