import React, { useState, useEffect } from "react";
import { postData } from "../api";
import CareerSuggestions from './CareerSuggestions';

const SubmitSkill = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/fetch-skills.php");
        const data = await response.json();
        if (data.Skills && Array.isArray(data.Skills)) {
          const formattedQuestions = data.Skills.map((skill) => ({
            ElementId: skill.ElementId,
            ElementName: skill.ElementName,
            question: skill.Question,
            options: [
              { text: skill.AnchorFirst ? `Beginner: ${skill.AnchorFirst}` : "Beginner", value: skill.DataPoint20 },
              { text: skill.AnchorSecond ? `Basic: ${skill.AnchorSecond}` : "Basic", value: skill.DataPoint35 },
              { text: skill.AnchorThrid ? `Skilled: ${skill.AnchorThrid}` : "Skilled", value: skill.DataPoint50 },
              { text: skill.AnchorFourth ? `Advanced: ${skill.AnchorFourth}` : "Advanced", value: skill.DataPoint65 },
              { text: skill.AnchorLast ? `Expert: ${skill.AnchorLast}` : "Expert", value: skill.DataPoint80 },
            ],
          }));
          setQuestions(formattedQuestions);
          setAnswers(Array(formattedQuestions.length).fill(null));
        } else {
          throw new Error("Invalid data format from the API.");
        }
      } catch (err) {
        setError(`Failed to load questions: ${err.message}`);
      }
    };

    fetchQuestions();
  }, []);


  useEffect(() => {
    if (questions.length > 0) {
      setProgress(((currentQuestionIndex + 1) / questions.length) * 100);
    }
  }, [currentQuestionIndex, questions]);

  const handleNext = () => {
    if (answers[currentQuestionIndex] === null) {
      setError(`Please answer Question ${currentQuestionIndex + 1} before proceeding.`);
      return;
    }
    setError("");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (answers.includes(null)) {
        setError("Please complete all questions before submitting.");
      } else {
        submitSkills();
      }
    }
  };

  const handleBack = () => {
    setError("");
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswer = (value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = value;
    setAnswers(updatedAnswers);
  };

  const submitSkills = async () => {
    try {
      const formattedData = {
        SKAValueList: answers.map((dataValue, index) => ({
          ElementId: questions[index].ElementId,
          DataValue: dataValue,
        })),
      };
      console.log("Formatted Data: ", formattedData);
      const response = await postData("skills.php", formattedData);
      setResults(response);
      setIsComplete(true);
    } catch (err) {
      setError(`Failed to submit skills: ${err.message}`);
    }
  };

  const styles = {
    container: {
        maxWidth: "800px",
        padding: "20px",
        paddingTop: "0px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    progressBar: {
        width: "100%",
        backgroundColor: "#e0e0e0",
        borderRadius: "5px",
        marginBottom: "20px",
    },
    progress: {
        height: "10px",
        backgroundColor: "#007BFF",
        borderRadius: "5px",
    },
    question: {
        marginBottom: "20px",
        padding: "15px",
        minWidth:"800px"
    },
    label: {
        display: "block",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s, border-color 0.3s",
    },
    labelHover: {
        backgroundColor: "#f9f9f9",
        borderColor: "#007BFF",
    },
    button: {
        display: "inline-block",
        width: "48%",
        padding: "15px",
        fontSize: "1.2em",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        textAlign: "center",
        transition: "background-color 0.3s",
    },
    congratsMessage: {
        display: "none",
        fontSize: "2em",
        textAlign: "center",
        marginTop: "20px",
        color: "#28a745",
    },
    errorMessage: {
        color: "#dc3545",
        textAlign: "center",
        marginTop: "20px",
    },
        container: {
          maxWidth: "800px",
          margin: "20px auto",
          fontFamily: "'Arial', sans-serif",
        },
        table: {
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          fontSize: "14px",
        },
        th: {
          border: "1px solid #ddd",
          padding: "10px",
          backgroundColor: "#f4f4f4",
          color: "#333",
          fontWeight: "bold",
          textAlign: "left",
        },
        td: {
          border: "1px solid #ddd",
          padding: "10px",
          textAlign: "left",
          color: "#555",
        },
        trHover: {
          transition: "background-color 0.2s ease-in-out",
        },
        tr: {
          "&:hover": {
            backgroundColor: "#f9f9f9",
          },
        },
        link: {
          color: "#0077cc",
          textDecoration: "underline",
          fontWeight: "bold",
        },
};

  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];
    return (
        <div style={styles.question}>
            <p><strong>{question.ElementName}:</strong></p>
            <p style={{ marginBottom: '20px' }}><strong>{question.question}</strong></p>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {question.options.map((option, index) => (
                <li key={index}>
                <label
                                style={styles.label}
                >
                <input
                  type="radio"
                  name={`q${currentQuestionIndex}`}
                  checked={answers[currentQuestionIndex] === option.value}
                  onChange={() => handleAnswer(option.value)}
                />
                <span style={{ marginLeft: "10px" }}>{option.text}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  };


  if (isComplete) {
    return (
        <CareerSuggestions
        isComplete={isComplete}
        results={results}
      />
    );
  }

  if (questions.length === 0) {
    return <div style={{ marginLeft: "50px", color: "#074384", fontWeight: "bold", marginTop: "10px"}}>Loading questions...</div>;
  }

  return (
    <div style={styles.container}>
        <div style={styles.progressBar}>
            <div style={{ ...styles.progress, width: `${progress}%` }}></div>
        </div>
        <form id="skills-matcher-form" style={{ display: 'flex', flexDirection: "column" }}>
            {renderQuestion()}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                    type="button"
                    style={{ ...styles.button, ...styles.backButton }}
                    disabled={currentQuestionIndex === 0}
                    onClick={handleBack}
                    id="back-button"
                >
                    Back
                </button>
                <button
                    type="button"
                    style={{ ...styles.button, ...styles.nextButton }}
                    onClick={handleNext}
                    id="next-button"
                >
                    {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
                </button>
            </div>
        </form>
        {error && <div style={styles.errorMessage}>{error}</div>}
    </div>
);
};

export default SubmitSkill;
