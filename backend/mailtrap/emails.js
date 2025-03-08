import {mailtrapClient, sender} from "./mailtrap.config.js"
import {VERIFICATION_EMAIL_TEMPLATE} from "./emailTemplates.js"
import {PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE} from "./emailTemplates.js"

export const sendVerificationEmail = async(email, verificationToken)=> {
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        console.log("Email sent successfully!", response)
    } catch (error) {
        console.log(`Error sending verification`,error)
        throw new Error(`Error sending verification email: ${error}`)
    }
}

export const sendWelcomeEmail= async(email, name)=> {
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "eeb4146b-9650-46b2-b084-2153d5d3f1a7",
            template_variables: {
                "name": name,
                "company_info_name": "MERN AUTH"
            },
        })
        console.log("Welcome Email sent successfully!", response)
    } catch (error) {
        console.log(`Error sending welcome email`,error)
        throw new Error(`Error sending welcome email: ${error}`)
    }
}

export const sendPasswordResetEmail= async(email, resetURL)=> {
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })
        console.log("Welcome Email sent successfully!", response)
    } catch (error) {
        console.log(`Error sending password reset email`,error)
        throw new Error(`Error sending password reset email: ${error}`)
    }
}

export const sendResendSuccessEmail= async(email)=> {
    const recipient = [{email}]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful!",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        })
        console.log("Password reset Email sent successfully!", response)
    } catch (error) {
        console.log(`Error sending password reset success email`,error)
        throw new Error(`Error sending password reset success email: ${error}`)
    }
}