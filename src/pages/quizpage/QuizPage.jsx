import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./QuizPage.css";
import { quizData1 } from '../../data/quizData';
import { quizData2 } from '../../data/quizData2';
import { quizData3 } from '../../data/quizData3';
import { quizData4 } from '../../data/quizData4';
import { quizData5 } from '../../data/quizData5';
import { quizData6 } from '../../data/quizData6';
import { quizData7 } from '../../data/quizData7';
import { quizData8 } from '../../data/quizData8';
import { quizData9 } from '../../data/quizData9';
import { quizData10 } from '../../data/quizData10';

function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const storageKey = `quiz_session_${id}`; // Har bir bo'lim uchun alohida xotira kaliti

  const quizSets = {
    "part-1": quizData1, "part-2": quizData2, "part-3": quizData3,
    "part-4": quizData4, "part-5": quizData5, "part-6": quizData6,
    "part-7": quizData7, "part-8": quizData8, "part-9": quizData9,
    "part-10": quizData10,
  };

  const currentQuizSet = quizSets[id] || quizData1;

  // --- LOCALSTORAGE BILAN STATE'LARNI INITIALIZATSIYA QILISH ---
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved).currentQuestion : 0;
  });

  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved).score : 0;
  });

  const [showResult, setShowResult] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved).showResult : false;
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);

  const question = currentQuizSet[currentQuestion];

  // --- HAR O'ZGARIShDA LOCALSTORAGE'GA YOZISH ---
  useEffect(() => {
    const sessionData = { currentQuestion, score, showResult };
    localStorage.setItem(storageKey, JSON.stringify(sessionData));
  }, [currentQuestion, score, showResult, storageKey]);

  // --- SAVOL O'ZGARIShI VA VARIANTLARNI ARALASHTIRISH ---
  useEffect(() => {
    if (question && !showResult) {
      const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffle(question.options));
      setTimeLeft(60); // Taymerni yangilash
    }
  }, [currentQuestion, question, showResult]);

  // --- TAYMER MANTIQI ---
  useEffect(() => {
    if (showResult || selectedOption !== null) return;
    if (timeLeft === 0) {
      handleAnswerClick(null);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResult, selectedOption]);

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < currentQuizSet.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowResult(true);
    }
  };

  const handleAnswerClick = (option) => {
    if (selectedOption !== null) return;

    // Xavfsiz tekshiruv (answer yoki correctAnswer)
    const rightAnswer = (question?.answer || question?.correctAnswer || "").toString().trim();
    const userChoice = option ? option.toString().trim() : "";

    setSelectedOption(option);
    const correct = userChoice === rightAnswer;
    setIsCorrect(correct);

    if (correct) setScore(score + 1);
    setTimeout(() => handleNext(), 1200);
  };

  // --- PROGRESSNI TOZALASH (RESTART) ---
  const resetQuiz = () => {
    localStorage.removeItem(storageKey);
    navigate("/");
  };

  // --- NATIJA EKRANI ---
  if (showResult) {
    const percentage = Math.floor((100 / currentQuizSet.length) * score);
    return (
      <div className="quiz-page-wrapper">
        <div className="result-card">
          <h2>Quiz Yakunlandi!</h2>
          <div className="percentage-badge">{percentage}%</div>
          <p className="score-summary">
            Siz <b>{currentQuizSet.length}</b> tadan <b>{score}</b> ta to'g'ri javob berdingiz.
          </p>
          <div className="result-actions">
             <button className="back-btn" onClick={resetQuiz}>Bosh sahifaga qaytish</button>
          </div>
        </div>
      </div>
    );
  }

  if (!question) return <div className="loading">Yuklanmoqda...</div>;

  return (
    <div className="quiz-page-wrapper">
      <div className="quiz-container">
        <div className="quiz-header">
          <div className="header-top">
            <span className="quiz-category">📦 {id.replace('part-', '')}-qism</span>
            <button className="exit-btn" onClick={resetQuiz}>✕</button>
          </div>

          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((currentQuestion + 1) / currentQuizSet.length) * 100}%` }}
              ></div>
            </div>
            <div className="header-info">
              <span className="quiz-progress">Savol: {currentQuestion + 1}/{currentQuizSet.length}</span>
              <div className={`timer-badge ${timeLeft <= 10 ? "danger" : ""}`}>
                ⏱ {timeLeft}s
              </div>
            </div>
          </div>
        </div>

        <div className="question-card">
          <h3 className="question-text">{question.question}</h3>

          <div className="options-grid">
            {shuffledOptions.map((option, index) => {
              let btnState = "";
              if (selectedOption !== null) {
                const rightAnswer = (question?.answer || question?.correctAnswer || "").toString().trim();
                const isThisCorrect = (option || "").toString().trim() === rightAnswer;
                const isThisSelected = option === selectedOption;

                if (isThisCorrect) btnState = "correct";
                else if (isThisSelected && !isCorrect) btnState = "wrong";
                else btnState = "disabled";
              }

              return (
                <button
                  key={index}
                  className={`option-btn ${btnState}`}
                  onClick={() => handleAnswerClick(option)}
                  disabled={selectedOption !== null}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="quiz-footer">
          <button className="cancel-text-btn" onClick={resetQuiz}>
             Quizni to'xtatish va tozalash
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;