$(document).ready(function () {
    var theCounter = 0;
    var theCorrectAnswers = 0;
    var theWrongAnswers = 0;
    var theNumberToWordConversion = ["one", "two", "three", "four", "five"]

    var theQuestions = {
        one: {
            heading: "a question",
            text: "a question's text",
            answer1: "bogus answer 1",
            answer2: "bogus answer 2",
            answer3: "real answer 3",
            correctAnswer: "button-3",
            correctGetsResponse: "yay, you did it",
            wrongGetsResponse: "mwah mwah, it was such-and-such"
        },
        two: {
            heading: "another question",
            text: "another question's text",
            answer1: "real answer 1",
            answer2: "bogus answer 2",
            answer3: "bogus answer 3",
            correctAnswer: "button-1",
            correctGetsResponse: "woot, awesome!",
            wrongGetsResponse: "zoinks, it was blah blah"
        },
        three: {
            heading: "one more question",
            text: "one more question text",
            answer1: "bogus answer 1",
            answer2: "bogus answer 2",
            answer3: "real answer 3",
            correctAnswer: "button-3",
            correctGetsResponse: "aww yissss!",
            wrongGetsResponse: "der der der"
        },
        four: {
            heading: "more questions?",
            text: "Yes! more questions text",
            answer1: "real answer 1",
            answer2: "bogus answer 2",
            answer3: "bogus answer 3",
            correctAnswer: "button-1",
            correctGetsResponse: "yeah, boi!",
            wrongGetsResponse: "estupido!"
        },
        five: {
            heading: "the last question",
            text: "the last question's text",
            answer1: "bogus answer 1",
            answer2: "real answer 2",
            answer3: "bogus answer 3",
            correctAnswer: "button-2",
            correctGetsResponse: "boo-yeah!",
            wrongGetsResponse: "ai chihuahua! wrong-o, pal"
        },
    }

    $("button").on("click", function () {
        if (this.id === "start" || this.id === "again") {
            $("#startscreen").attr({ "style": "display: none" });
            $("#gameplay").attr({ "style": "display: initial" });
            $("#roundend").attr({ "style": "display: none" });
            $("#gameend").attr({ "style": "display: none" });
            fillTheQuestionData()
        } else {
            $("#gameplay").attr({ "style": "display: none" });
            $("#roundend").attr({ "style": "display: initial" });
            if (this.id === theQuestions[theNumberToWordConversion[theCounter]].correctAnswer) {
                // console.log(theQuestions[theNumberToWordConversion[theCounter]].correctGetsResponse);
                $("#roundend-display").text(theQuestions[theNumberToWordConversion[theCounter]].correctGetsResponse);
                theCorrectAnswers++;
            } else {
                // console.log(theQuestions[theNumberToWordConversion[theCounter]].wrongGetsResponse);
                $("#roundend-display").text(theQuestions[theNumberToWordConversion[theCounter]].wrongGetsResponse);
                theWrongAnswers++;
            };
            setTimeout(function () {
                $("#gameplay").attr({ "style": "display: initial" });
                $("#roundend").attr({ "style": "display: none" });
                fillTheQuestionData()
            }, 2000);
            theCounter++;
            if (theCounter < Object.keys(theQuestions).length) {
                fillTheQuestionData();
            } else {
                $("#startscreen").attr({ "style": "display: none" });
                $("#gameplay").attr({ "style": "display: none" });
                $("#roundend").attr({ "style": "display: none" });
                $("#gameend").attr({ "style": "display: initial" });
                $("#gameend-display").text("The end! You got " + theCorrectAnswers + " correct and " + theWrongAnswers + " wrong.");
            }
        }
    });

    function fillTheQuestionData() {
        $("#question-heading").text(theQuestions[theNumberToWordConversion[theCounter]].heading);
        $("#question-text").text(theQuestions[theNumberToWordConversion[theCounter]].text);
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

    function initializeGame() {
        $("#startscreen").attr({ "style": "display: initial" });
        $("#gameplay").attr({ "style": "display: none" });
        $("#roundend").attr({ "style": "display: none" });
        $("#gameend").attr({ "style": "display: none" });
    };

    initializeGame()
});

