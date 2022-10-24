import classes from "./newsletter-registration.module.css";
import { useRouter } from "next/router";

import { useRef } from "react";

function NewsletterRegistration() {
  const router = useRouter();
  const emailRef = useRef();
  function registrationHandler(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    console.log(email);
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      router.push("/events");
    });
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
