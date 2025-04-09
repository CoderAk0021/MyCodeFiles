const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
        answer: "Harper Lee"
    },
    {
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        answer: "8"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Osmium", "Silver"],
        answer: "Oxygen"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Galileo Galilei"],
        answer: "Albert Einstein"
    },
    {
        question: "Which country is famous for the Great Wall?",
        options: ["India", "China", "Egypt", "Peru"],
        answer: "China"
    },
    {
        question: "What is the main language spoken in Brazil?",
        options: ["Spanish", "Portuguese", "French", "English"],
        answer: "Portuguese"
    },
    {
        question: "Which is the longest river in the world?",
        options: ["Amazon River", "Yangtze River", "Mississippi River", "Nile River"],
        answer: "Nile River"
    }
];

console.log(quizQuestions);


let currentIndex = 0;
let selectedAnswers = {};
let quizSubmitted = false;
let inReviewMode = false;
let timer;
let timeLeft = 120;

const questionContainer = document.querySelector(".question-container");
const optionContainer = document.querySelector(".option-container");
const statusContainer = document.createElement("div"); // Status container
statusContainer.classList.add("status-container", "fw-bold", "mt-2", "p-2", "text-center");
optionContainer.after(statusContainer); // Insert status container after options

const nextBtn = document.querySelectorAll(".buttons button")[2];
const prevBtn = document.querySelectorAll(".buttons button")[0];
const submitBtn = document.querySelectorAll(".buttons button")[1];
const timerDisplay = document.querySelector(".time-remaining");

// Load Question
function loadQuestion(index) {
    const currentQues = quizQuestions[index];
    questionContainer.innerHTML = `<h2>${index + 1}. ${currentQues.question}</h2>`;
    
    optionContainer.innerHTML = "";
    currentQues.options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("option-btn", "p-2", "m-2", "border", "border-dark", "rounded-2", "btn", "btn-light");
        button.textContent = option;

        if (selectedAnswers[index] === option) {
            button.classList.add("selected", "bg-dark", "text-light");
        }

        if (quizSubmitted) {
            if (selectedAnswers[index] === option) {
                if (option === currentQues.answer) {
                    button.classList.replace("bg-dark", "bg-success", "text-white");
                } else {
                    button.classList.replace("bg-dark", "bg-danger", "text-white");
                }
            }
            if (option === currentQues.answer) {
                button.classList.add("bg-success", "text-white");
            }
        } else {
            button.addEventListener("click", () => selectAnswer(index, option));
        }

        optionContainer.appendChild(button);
    });

    updateStatus(index);
    
    prevBtn.style.display = inReviewMode || index > 0 ? "inline-block" : "none";
    nextBtn.style.display = inReviewMode || index < quizQuestions.length - 1 ? "inline-block" : "none";
}

// Update Status
function updateStatus(index) {
    if (!quizSubmitted) {
        statusContainer.innerHTML = "";
        return;
    }

    const selected = selectedAnswers[index];
    const correct = quizQuestions[index].answer;

    if (selected === correct) {
        statusContainer.innerHTML = `<span class=" text-success p-1 rounded">✅ You are Correct !! </span>`;
    } else if (selected) {
        statusContainer.innerHTML = `<span class=" text-danger p-1 rounded"> ❌You are Wrong !!</span>`;
    } else {
        statusContainer.innerHTML = `<span class=" text-secondary p-1 rounded">⏳ You Skipped</span>`;
    }
}

// Select Answer
function selectAnswer(index, answer) {
    if (quizSubmitted) return;
    selectedAnswers[index] = answer;
    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.classList.remove("selected", "bg-dark", "text-light");
    });
    event.target.classList.add("selected", "bg-dark", "text-light");
}

// Next Question
nextBtn.addEventListener("click", () => {
    if (currentIndex < quizQuestions.length - 1) {
        currentIndex++;
        loadQuestion(currentIndex);
    }
});

// Previous Question
prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        loadQuestion(currentIndex);
    }
});

// Start Timer
function startTimer() {
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

// Submit Quiz with Confirmation
submitBtn.addEventListener("click", () => {
    if (!quizSubmitted) {
        showConfirmationModal("Are you sure you want to submit the quiz?", submitQuiz);
    } else {
        reviewAnswers();
    }
});

function submitQuiz() {
    clearInterval(timer);
    quizSubmitted = true;
    inReviewMode = false;

    let score = 0;
    quizQuestions.forEach((q, i) => {
        if (selectedAnswers[i] === q.answer) {
            score++;
        }
    });

    questionContainer.innerHTML = `<h2 class="text-center">Your Score: ${score} / ${quizQuestions.length}</h2>`;
    optionContainer.innerHTML = "";
    statusContainer.innerHTML = ""; // Remove status display in score page

    nextBtn.style.display = "none";
    prevBtn.style.display = "none";

    submitBtn.textContent = "Analyse";
}

// Review Answers
function reviewAnswers() {
    inReviewMode = true;
    quizSubmitted = true;
    currentIndex = 0;
    loadQuestion(currentIndex);

    submitBtn.style.display = "none";

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Restart";
    restartBtn.classList.add("flex-fill", "m-1", "border-0", "p-2", "rounded-2", "btn", "btn-warning");
    restartBtn.addEventListener("click", () => {
        showConfirmationModal("Are you sure you want to restart the quiz?", () => {
            location.reload(); // Reloads the page to restart
        });
    });

    document.querySelector(".buttons").appendChild(restartBtn);
}

// Show Confirmation Modal
function showConfirmationModal(message, callback) {
    const modal = document.createElement("div");
    modal.innerHTML = `
        <div class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5);">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirmation</h5>
                        <button type="button" class="btn-close" onclick="this.closest('.modal').remove()"></button>
                    </div>
                    <div class="modal-body">
                        <p>${message}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button>
                        <button type="button" class="btn btn-primary" id="confirmAction">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById("confirmAction").addEventListener("click", () => {
        modal.remove();
        callback();
    });
}

// Initialize
loadQuestion(currentIndex);
startTimer();
