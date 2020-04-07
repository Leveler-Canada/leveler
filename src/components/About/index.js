// import React, { Component } from "react";
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Header from '../Header';
import FooterNav from '../FooterNav';
import aboutPath from './About.md';

const AboutPage = () => (
  <div className="wrapper">
    <Header />
    <AboutBody />
    <FooterNav />
  </div>
);

const AboutBody = () => {
  const [pageText, setText] = useState('');

  useEffect(() => {
    fetch(aboutPath)
      .then((response) => {
        if (response.ok) return response.text();
        return Promise.reject("Didn't fetch text correctly");
      })
      .then((text) => {
        setText(text);
      })
      .catch((error) => console.error(error));
  });

  return (
    <section>
      <ReactMarkdown parserOptions={{ commonmark: true }} source={pageText} />
    </section>
  );
};

export default AboutPage;

export { AboutBody };
