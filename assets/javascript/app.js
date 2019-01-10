$(document).ready(function () {
    var theCounter = 0;
    var theCorrectAnswers = 0;
    var theWrongAnswers = 0;
    var theCountdownTime = 0;
    var theCountdownInterval = 0;

    function resetVariables() {
        theCounter = 0;
        theCorrectAnswers = 0;
        theWrongAnswers = 0;
        theCountdownTime = 0;
        theCountdownInterval = 0;
    }
    var theNumberToWordConversion = ["one", "two", "three", "four", "five"]

    var theQuestions = {
        one: {
            questionHeading: "a question",
            questionText: "a question's text",
            answer1: "bogus answer 1",
            answer2: "bogus answer 2",
            answer3: "real answer 3",
            correctAnswer: "button-3",
            correctGetsResponse: "yay, you did it",
            wrongGetsResponse: "mwah mwah, it was such-and-such",
            questionImage: ""
        },
        two: {
            questionHeading: "another question",
            questionText: "another question's text",
            answer1: "real answer 1",
            answer2: "bogus answer 2",
            answer3: "bogus answer 3",
            correctAnswer: "button-1",
            correctGetsResponse: "woot, awesome!",
            wrongGetsResponse: "zoinks, it was blah blah",
            questionImage: ""
        },
        three: {
            questionHeading: "one more question",
            questionText: "one more question text",
            answer1: "bogus answer 1",
            answer2: "bogus answer 2",
            answer3: "real answer 3",
            correctAnswer: "button-3",
            correctGetsResponse: "aww yissss!",
            wrongGetsResponse: "der der der",
            questionImage: "assets/images/DR650.png"
        },
        four: {
            questionHeading: "more questions?",
            questionText: "Yes! more questions text",
            answer1: "real answer 1",
            answer2: "bogus answer 2",
            answer3: "bogus answer 3",
            correctAnswer: "button-1",
            correctGetsResponse: "yeah, boi!",
            wrongGetsResponse: "estupido!",
            questionImage: ""
        },
        five: {
            questionHeading: "the last question",
            questionText: "the last question's text",
            answer1: "bogus answer 1",
            answer2: "real answer 2",
            answer3: "bogus answer 3",
            correctAnswer: "button-2",
            correctGetsResponse: "boo-yeah!",
            wrongGetsResponse: "ai chihuahua! wrong-o, pal",
            questionImage: ""
        },
    }

    $("button").on("click", function () {
        $("#countdown-timer").html("&nbsp;");
        clearInterval(theCountdownInterval);
        theCountdownTime = 0;
        if (this.id === "start" || this.id === "again") {
            resetVariables();
            $("#startscreen").attr({ "style": "display: none" });
            $("#gameplay").attr({ "style": "display: initial" });
            $("#roundend").attr({ "style": "display: none" });
            $("#gameend").attr({ "style": "display: none" });
            fillTheQuestionData()
            setCountDownTimer();
        } else {
            if (this.id === theQuestions[theNumberToWordConversion[theCounter]].correctAnswer) {
                $("#roundend-display").text(theQuestions[theNumberToWordConversion[theCounter]].correctGetsResponse);
                theCorrectAnswers++;
                finishTheRound()
            } else {
                handleWrongAnswerOrTimeout()
            };
        }
    });

    function handleWrongAnswerOrTimeout() {
        $("#roundend-display").text(theQuestions[theNumberToWordConversion[theCounter]].wrongGetsResponse);
        theWrongAnswers++;
        finishTheRound()
    }

    function finishTheRound() {
        $("img").remove();
        $("#countdown-timer").html("&nbsp;");
        $("#gameplay").attr({ "style": "display: none" });
        $("#roundend").attr({ "style": "display: initial" });
        theCounter++;
        if (theCounter < Object.keys(theQuestions).length) {
            setTimeout(function () {
                $("#gameplay").attr({ "style": "display: initial" });
                $("#roundend").attr({ "style": "display: none" });
                fillTheQuestionData()
                setCountDownTimer();
            }, 1500);
        } else {
            setTimeout(function () {
                $("#startscreen").attr({ "style": "display: none" });
                $("#gameplay").attr({ "style": "display: none" });
                $("#roundend").attr({ "style": "display: none" });
                $("#gameend").attr({ "style": "display: initial" });
                $("#gameend-display").text("The end! You got " + theCorrectAnswers + " correct and " + theWrongAnswers + " wrong.");
            }, 500);
        }
    }

    function fillTheQuestionData() {
        let theString = "<img src=\"" + theQuestions[theNumberToWordConversion[theCounter]].questionImage + "\" style=\"position: absolute; top: -60px; left: -700px;\"\>";
        $(".carousel-caption").prepend(theString);
        $("img").animate({ "left": 700 }, 1500);
        $("#question-heading").text(theQuestions[theNumberToWordConversion[theCounter]].questionHeading);
        $("#question-text").text(theQuestions[theNumberToWordConversion[theCounter]].questionText);
        $("#heading-1").text(theQuestions[theNumberToWordConversion[theCounter]].answer1); // TODO: do headings?
        $("#answer-1").text(theQuestions[theNumberToWordConversion[theCounter]].answer1);
        $("#heading-2").text(theQuestions[theNumberToWordConversion[theCounter]].answer2); // TODO: do headings?
        $("#answer-2").text(theQuestions[theNumberToWordConversion[theCounter]].answer2);
        $("#heading-3").text(theQuestions[theNumberToWordConversion[theCounter]].answer3); // TODO: do headings?
        $("#answer-3").text(theQuestions[theNumberToWordConversion[theCounter]].answer3);
        $("li").removeClass("active");
        let theIndicatorString = "#indicator-" + theCounter;
        $(theIndicatorString).attr({ class: "active" });
    }

    function setCountDownTimer() {
        theCountdownTime = new Date().getTime() + 6000;
        // Update the count down every 1 second
        theCountdownInterval = setInterval(function () {
            // Find the distance between now and the countdown time
            var distance = theCountdownTime - new Date().getTime();
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            $("#countdown-timer").text("Countdown Timer: " + seconds);
            if (distance < 0) {
                clearInterval(theCountdownInterval);
                $("#countdown-timer").text("Time's up!");
                handleWrongAnswerOrTimeout();
            }
        }, 100);
    };

    function initializeGame() {
        resetVariables()
        $("#startscreen").attr({ "style": "display: initial" });
        $("#gameplay").attr({ "style": "display: none" });
        $("#roundend").attr({ "style": "display: none" });
        $("#gameend").attr({ "style": "display: none" });
    };

    initializeGame()
});

