
import  nodemailer from 'nodemailer';


export const sendMail = async(to, subject, text) => {

    try {
        const transporter = nodemailer.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: 'mdbablunilu@gmail.com',   //rabi.mtcg@gmail.com
                pass: 'rewkczhokeguibfs',    //gitanjali_754103
            },
            // secure: true, // upgrades later with STARTTLS -- change this based on the PORT
        });

        const mailOptions = {
            to: resetUser.email,
            from: process.env.EMAIL_USER,
            subject: subject, //"Password Reset Confirmation",
            text: text //"Your Password Changed succesfully"
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
              return res.send(err)
            }else if(info){
                response.status = true;
                response.msg = "Your Password Changed succesfully"
                return res.send(response);
            }
       
        })
    } catch (error) {
        console.log("failed send mail, something went wrong")
    }
}




const prepareTemplate = (type, host, data) => {
    let message;

    switch (type) {
        case 'reset':
            message = template.resetEmail(host, data);
            break;

        case 'reset-confirmation':
            message = template.confirmResetPasswordEmail();
            break;

        case 'signup':
            message = template.signupEmail(data);
            break;

        case 'merchant-signup':
            message = template.merchantSignup(host, data);
            break;

        case 'merchant-welcome':
            message = template.merchantWelcome(data);
            break;

        case 'newsletter-subscription':
            message = template.newsletterSubscriptionEmail();
            break;

        case 'contact':
            message = template.contactEmail();
            break;

        case 'merchant-application':
            message = template.merchantApplicationEmail();
            break;

        case 'order-confirmation':
            message = template.orderConfirmationEmail(data);
            break;

        default:
            message = '';
    }

    return message;
};






