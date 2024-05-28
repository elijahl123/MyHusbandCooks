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

    // Fetch author details
    const authorDoc = await admin.firestore().collection("users")
      .doc(post.authorId).get();
    const author = authorDoc.data()!;
    const authorName = `${author.firstName} ${author.lastName}`;

    // Fetch all users
    const usersSnapshot = await admin.firestore().collection("users").get();
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
        <p>Hi there,</p>
        <p>A new post has been created by ${authorName}:</p>
        <p><strong>Title:</strong> ${post.title}</p>
        <p><strong>Content:</strong> ${post.content}</p>
        <p><a href="https://myhusbandcooks.us/post/${postId}">View Post</a></p>
        <p>Best regards,<br/>My Husband Cooks</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Emails sent to:", recipientEmails.join(", "));
  });
