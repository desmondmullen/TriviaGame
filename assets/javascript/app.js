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
            questionText: "Today, Honda Motor Company makes cars, motorcycles, and power equipment such as generators. Which did it produce first?",
            answer1: "cars",
            answer2: "motorcycles",
            answer3: "power equipment",
            correctAnswer: "button-2",
            correctGetsResponse: "That's correct!",
            wrongGetsResponse: "A lousy guess! It was motorcycles.",
            questionImage: ""
        },
        two: {
            questionText: "Similar to Honda, Suzuki Motor Corporation makes cars, motorcycles and power equipment. What made its founder, Michio Suzuki, famous first?",
            answer1: "weaving looms",
            answer2: "garden tillers",
            answer3: "concrete mixers",
            correctAnswer: "button-1",
            correctGetsResponse: "How did you know that?!",
            wrongGetsResponse: "No siree, it was weaving looms.",
            questionImage: "assets/images/DR650.png"
        },
        three: {
            questionText: "The logo to be found on a Yamaha motorcycle consists of three tuning forks. This is because Yamaha Corporation originally did what?",
            answer1: "fine-tuned car engines",
            answer2: "produced pianos",
            answer3: "invented electric tuners",
            correctAnswer: "button-2",
            correctGetsResponse: "Aww yissss!",
            wrongGetsResponse: "Derp derp derp. Yamaha made pianos and reed organs long before it made motorcycles.",
            questionImage: ""
        },
        four: {
            questionText: "Honda Motor Company is the world's largest manufacturer of what?",
            answer1: "motorcycles",
            answer2: "internal combustion engines",
            answer3: "motorcycles and engines",
            correctAnswer: "button-3",
            correctGetsResponse: "Yeah, boi!",
            wrongGetsResponse: "Estupido! They're the largest manufacturers of both motorcycles and internal combustion engines.",
            questionImage: ""
        },
        five: {
            questionText: "Between Honda and Suzuki, which company produced a car before the other company did?",
            answer1: "Honda",
            answer2: "Suzuki",
            answer3: "They tied",
            correctAnswer: "button-2",
            correctGetsResponse: "Boo-yeah! Suzuki's first car came out in 1955, Honda's in 1963.",
            wrongGetsResponse: "Ai chihuahua! Wrong-o, pal. Suzuki's first car came out in 1955, Honda's in 1963.",
            questionImage: "assets/images/Suzulight.png"
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
            }, ($(".robo-response").text().length * 10) + 500);
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
        $(".question-background").prepend(theString);
        $("img").animate({ "left": "100vw" }, 4000);
        $("#question-text").text(theQuestions[theNumberToWordConversion[theCounter]].questionText);
        $("#button-1").text(theQuestions[theNumberToWordConversion[theCounter]].answer1);
        $("#button-2").text(theQuestions[theNumberToWordConversion[theCounter]].answer2);
        $("#button-3").text(theQuestions[theNumberToWordConversion[theCounter]].answer3);
        let theIndicatorString = "#indicator-" + theCounter;
        $(theIndicatorString).attr({ class: "active" });
    }

    function setCountDownTimer() {
        console.log(($(".robo-response").text().length * 10) + 500);
        setTimeout(function () {
            theCountdownTime = new Date().getTime() + 16000;
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
        }, ($(".robo-response").text().length * 7)); //this gives a little extra time for a long question
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

