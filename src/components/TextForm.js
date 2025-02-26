import React, { useState, useEffect } from 'react';

export default function TextForm(props) {
  const [text, setText] = useState("");
  const [filterText, setFilterText] = useState("");

  const handleUpClick = () => {
    setText(text.toUpperCase());
  };

  const handleLoClick = () => {
    setText(text.toLowerCase());
  };

  const handleMailClick = () => {
    const mailFormat = /[\w.-]+@[\w.-]+\.\w+/g;
    const extractedEmails = text.match(mailFormat) || [];
    setText(extractedEmails.join("\n"));
  };

  const handleExSpClick = () => {
    setText(text.replace(/\s+/g, ' ').trim());
  };

  const handleClearClick = () => {
    setText("");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleFilterClick = () => {
    if (!filterText.trim()) return;
    const filterWords = filterText.split(/\s+/).map(word => word.toLowerCase());
    let emails = text.split("\n");
    let filteredEmails = emails.filter(email => 
      !filterWords.some(word => email.toLowerCase().includes(word))
    );
    setText(filteredEmails.join("\n"));
  };

  const getHighlightedText = (inputText, highlight) => {
    if (!highlight.trim()) return inputText;
    const regex = new RegExp(`(${highlight})`, 'gi');
    return inputText.replace(regex, match => `<mark>${match}</mark>`);
  };

  return (
    <>
      <div className="container">
        <div className="mb-3">
          <h1>{props.heading}</h1>
          <textarea 
            className="form-control my-3" 
            value={text} 
            onChange={handleOnChange} 
            id="myBox" 
            rows="8"
          ></textarea>
          <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert to Uppercase</button>
          <button className="btn btn-primary mx-2" onClick={handleLoClick}>Convert to Lowercase</button>
          <button className="btn btn-primary mx-2" onClick={handleMailClick}>Extract Emails</button>
          <button className="btn btn-primary mx-2" onClick={handleExSpClick}>Remove Extra Spaces</button>
          <button className="btn btn-primary mx-2" onClick={handleClearClick}>Clear Text</button>
          
          <input className="form-control my-2" type="text" value={filterText} onChange={handleFilterChange} placeholder="Enter words to filter emails" aria-label="filter" />
          <button className="btn btn-primary m-2" onClick={handleFilterClick}>Filter Emails</button>
        </div>
      </div>
      <div className="container my-3">
        <h3>Text Summary</h3>
        <p>Words: {text.trim().split(/\s+/).filter(word => word !== "").length} words and {text.replace(/\s/g, "").length} characters</p>
        <p>{0.08 * text.trim().split(/\s+/).filter(word => word !== "").length} minutes read</p>
        <h3>Preview</h3>
        <p dangerouslySetInnerHTML={{ __html: getHighlightedText(text, props.searchText) }}></p>
      </div>
    </>
  );
}
