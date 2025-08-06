
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser'

const Contact = () => {
  const form =useRef()

const handleSubmit =(e)=>{
  e.preventDefault()
  emailjs.sendForm(
    "service_1qah7m4",
    "template_27jn438",
    form.current,
    "VsQK7wKZhblZ9tmW_"
  ).then((res)=>{
       console.log(res.text)
       alert("Message sent Successfully!!")
       form.current.reset();
    },
    (err)=>{
      console.log(err.text)
      alert("Failed to Send message")
    }
  )
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-6 sm:px-10">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-4xl font-bold text-yellow-400 mb-7 mt-4">Contact Us</h2>
        <p className="text-gray-300 text-lg">
          Have a question or feedback? We'd love to hear from you.
        </p>

        <form className="space-y-4 text-left" onSubmit={handleSubmit} ref={form}>
          <input
            type="text"
            name='user_name'
            placeholder="Your Name"
            required
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="email"
            name='user_email'
            placeholder="Your Email"
            required
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <textarea
            placeholder="Your Message"
            name='message'
            rows="5"
            required
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Send Message
          </button>        
        </form>
      </div>
      
    </div>
  );
};

export default Contact;
