"use client";
import React, { useState } from "react";
import "./App.css";
import emailjs from "emailjs-com";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 5 + 16;

  // Get email
  const queryParameters = new URLSearchParams(window.location.search);
  const email = queryParameters.get("email");

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const sendEmail = () => {
    const templateParams = {
      to_email: email, // Change this to the recipient's email address
      message:
        "The user has accepted your Valentine request!\nHe/She pressed no " +
        noCount +
        " times.", // Customize the email message
    };

    if (email !== null) {
      emailjs
        .send(
          "service_izhqfqu", // Replace with your email service ID
          "template_ms4kqbp", // Replace with your email template ID
          templateParams,
          "sxmgFIru-gZZfY5sA", // Replace with your user ID
        )
        .then((response) => {
          console.log("Email sent successfully:", response);
        })
        .catch((error) => {
          console.error("Email send error:", error);
        });
    } else {
      console.log("No email");
    }
  };

  return (
    <div className="container">
      {yesPressed ? (
        <>
          <img src="https://media.tenor.com/eiMqmu0vXz8AAAAi/kiss.gif" alt="" />
          <div className="textBody">Ok yay!!!</div>
        </>
      ) : (
        <>
          <img
            className="image"
            src="https://media.tenor.com/PxwDtGv_ROkAAAAi/cute-love.gif"
            alt=""
          />
          <h1 className="textTitle">Will you be my Valentine?</h1>
          <div className="buttonDiv">
            <button
              className="yesButton"
              style={{
                fontSize: yesButtonSize,
                //width: yesButtonSize * 3,
                height: yesButtonSize * 2,
              }}
              onClick={() => {
                setYesPressed(true);
                sendEmail();
              }}
            >
              Yes
            </button>
            <button onClick={handleNoClick} className="noButton">
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
