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
            questionText: "a question's text",
            answer1: "bogus answer 1",
            answer2: "bogus answer 2",
            answer3: "real answer 3",
            correctAnswer: "button-3",
            correctGetsResponse: "yay, you did it",
            wrongGetsResponse: "mwah mwah, it was such-and-such",
            questionImage: "assets/images/DR650.png"
        },
        two: {
            questionText: "another question's text",
            answer1: "real answer 1",
            answer2: "bogus answer 2",
            answer3: "bogus answer 3",
            correctAnswer: "button-1",
            correctGetsResponse: "woot, awesome!",
            wrongGetsResponse: "zoinks, it was blah blah",
            questionImage: "assets/images/DR650.png"
        },
        three: {
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
            $("span").removeClass("active");
            $("#startscreen").attr({ "style": "display: none" });
            $("#gameplay").attr({ "style": "display: initial" });
            $("#roundend").attr({ "style": "display: none" });
            $("#gameend").attr({ "style": "display: none" });
            fillTheQuestionData()
            setCountDownTimer();
        } else {
            if (this.id === theQuestions[theNumberToWordConversion[theCounter]].correctAnswer) {
                $("#roundend-display").html(theQuestions[theNumberToWordConversion[theCounter]].correctGetsResponse + "<br><br>(The Trivi-o-Matic 5000&reg; is impressed. You must be cheating.)");
                theCorrectAnswers++;
                finishTheRound()
            } else {
                handleWrongAnswerOrTimeout()
            };
        }
    });

    function handleWrongAnswerOrTimeout() {
        $("#roundend-display").html(theQuestions[theNumberToWordConversion[theCounter]].wrongGetsResponse + "<br><br>(The Trivi-o-Matic 5000&reg; is not impressed by your shenanigans.)");
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
            }, 3500);
        } else {
            setTimeout(function () {
                $("#startscreen").attr({ "style": "display: none" });
                $("#gameplay").attr({ "style": "display: none" });
                $("#roundend").attr({ "style": "display: none" });
                $("#gameend").attr({ "style": "display: initial" });
                if (theCorrectAnswers === theCounter) {
                    var theMessage = "You got every answer correct.<br><br>You have beaten the Trivi-o-Matic 5000&reg;!";
                } else {
                    if (theCorrectAnswers > theWrongAnswers) {
                        var theMessage = "You got " + theCorrectAnswers + " out of " + theCounter + " correct.<br><br>That's better than most monkeys.";
                    } else {
                        var theMessage = "You got " + theCorrectAnswers + " out of " + theCounter + " correct.<br><br>Were you out that one day they taught everything at school?";
                    }
                }
                $("#gameend-display").html(theMessage);
            }, 3500);
        }
    }

    function fillTheQuestionData() {
        let theString = "<img src=\"" + theQuestions[theNumberToWordConversion[theCounter]].questionImage + "\" style=\"position: absolute; left: -100vw\"\>";
        $(".carousel-item").prepend(theString);
        $("img").animate({ "left": "70vw" }, 4000);
        $("#question-text").text(theQuestions[theNumberToWordConversion[theCounter]].questionText);
        $("#button-1").text(theQuestions[theNumberToWordConversion[theCounter]].answer1);
        $("#button-2").text(theQuestions[theNumberToWordConversion[theCounter]].answer2);
        $("#button-3").text(theQuestions[theNumberToWordConversion[theCounter]].answer3);
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

