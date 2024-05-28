import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.pass,
  },
});

export const sendEmailOnPostCreation = functions.firestore
  .document("posts/{postId}")
  .onCreate(async (snap, context) => {
    const post = snap.data();
    const postId = context.params.postId;

    const usersSnapshot = await admin.firestore()
      .collection("users").where("superuser", "==", true).get();
    const recipientEmails: string[] = [];
    usersSnapshot.forEach((userDoc) => {
      const user = userDoc.data();
      recipientEmails.push(user.email);
    });

    const mailOptions = {
      from: "My Husband Cooks <myhusbandcooks.us@gmail.com>",
      bcc: recipientEmails,
      subject: `New Post Created: ${post.title}`,
      html: `
        <p>A new post has been created by ${post.authorId}:</p>
        <p>Title: ${post.title}</p>
        <p>Content: ${post.content}</p>
        <p><a href="https://myhusbandcooks.us/post/${postId}">View Post</a></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Emails sent to:", recipientEmails.join(", "));
  });
