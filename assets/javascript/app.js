$(document).ready(function () {
    var theCounter = 0;
    var theCorrect = 0;
    var theWrong = 0;
    var theNumberToWordConversion = ["one", "two", "three"]

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
        if (this.id === theQuestions[theNumberToWordConversion[theCounter]].correctAnswer) {
            alert(theQuestions[theNumberToWordConversion[theCounter]].correctGetsResponse);
        } else {
            alert(theQuestions[theNumberToWordConversion[theCounter]].wrongGetsResponse);
        };
        theCounter++;
        if (theCounter < Object.keys(theQuestions).length) {
            fillTheQuestionData();
        } else {
            alert("the end!");
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
    fillTheQuestionData()
});

