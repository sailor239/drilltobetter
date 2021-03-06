var dict = JSON.parse(window.dict);
document.getElementById('btnStartTest').focus();
document.getElementById('btnContinueTest').style.display = 'none';
document.getElementById('btnGetNewWord').style.display = 'none';
document.getElementById('chineseTest').style.display = 'none';
document.getElementById('btnEndTest').style.display = 'none';
document.getElementById('inputArea').style.display = 'none';

var canvas = new handwriting.Canvas(document.getElementById('canvas'), 3);
var width = document.getElementById("instruction").clientWidth;
canvas.cxt.canvas.width  = width < 200 ? width : 200;
canvas.cxt.canvas.height = width < 200 ? width : 200;
canvas.setCallBack(function(data, err) {
    if (err) {
        throw err;
    } else {
        var answer = document.getElementById('answer').innerHTML;
        var result = document.getElementById("result");
        if (data[0] == answer) {
            result.innerHTML = `<span style="color: green">Good job!</span> The answer is: <h2><span style="color: green">${answer}</span></h2>`;
        } else {
            result.innerHTML = `<span style="color: red">Wrong...</span> Wanna try again?`;
            setTimeout(function () {
                result.innerHTML = '';
            }, 1500);
            setTimeout(function () {
                document.getElementById("erase").click();
            }, 2000);
        }
    }
});
canvas.set_Undo_Redo(true, true);

function startTest(){
    var resultSummary = "";
    testCharArr = [];
    charsToTest = dict.slice();
    document.getElementById('instruction').innerHTML = 'Write the <span id="charToTest"> red </span>character in Chinese';
    document.getElementById('btnStartTest').style.display = 'none';
    document.getElementById('btnContinueTest').style.display = 'none';
    document.getElementById('btnGetNewWord').style.display = 'block';
    document.getElementById('chineseTest').style.display = 'block';
    document.getElementById('btnCheckAnswer').style.display = 'block';
    document.getElementById('btnEndTest').style.display = 'block';
    document.getElementById('inputArea').style.display = 'block';
    getNewWord();
}
function continueTest(){
    document.getElementById('instruction').innerHTML = 'Write the <span id="charToTest"> red </span>character in Chinese';
    document.getElementById('btnStartTest').style.display = 'none';
    document.getElementById('btnContinueTest').style.display = 'none';
    document.getElementById('btnGetNewWord').style.display = 'block';
    document.getElementById('chineseTest').style.display = 'block';
    document.getElementById('btnCheckAnswer').style.display = 'block';
    document.getElementById('btnEndTest').style.display = 'block';
    document.getElementById('inputArea').style.display = 'block';
    getNewWord();
}
function checkAnswer() {
    document.getElementById("result").innerHTML = '<h2><span style="color: green">' + document.getElementById('answer').innerHTML + '</span></h2>';
}
function endTest(){
    btnStartTest.innerHTML = "Re-Start?";
    instruction.innerHTML = resultSummary;
    document.getElementById('instruction').style.display = 'block';
    document.getElementById('chineseTest').style.display = 'none';
    document.getElementById('btnGetNewWord').style.display = 'none';
    document.getElementById('btnCheckAnswer').style.display = 'none';
    document.getElementById('btnEndTest').style.display = 'none';
    document.getElementById('inputArea').style.display = 'none';
    document.getElementById('btnStartTest').style.display = 'block';
    if (charsToTest.length != 0) {
        document.getElementById('btnContinueTest').style.display = 'block';
    }
    //showScore();
}
function writeChineseChar() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ccffcc";
    ctx.fillRect(0, 0, 200, 200);
}
class ChineseChar {
    constructor(char, pinyin) {
        this.char = char;
        this.pinyin = pinyin;
    }
}

// pinyinsToTest = dictChinesePinyin.slice();
var dictChinesePhrase = [
    "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????",
    "???????????????", "????????????", "????????????", "??????", "??????", "??????????????????????????????",
    "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????",
    "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????",
    "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????",
    "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "?????????", "??????", "??????", "??????",
    "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????",
    "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????"
];

function getNewWord() {
    document.getElementById("erase").click();
    document.getElementById("result").innerHTML = '';
    document.getElementById('answer').style.display = 'none';
    var outputStr = '';
    // Check if there is any character left for test
    if (charsToTest.length == 0) {
        outputStr = 'Test done!';
        // document.getElementById('subInstruction').style.display = 'none';
        document.getElementById('btnGetNewWord').style.display = 'none';
        document.getElementById('btnEndTest').style.display = 'block';
        document.getElementById('btnEndTest').focus();
    } else {
        // Randomly select a Chinese character from the dictinary
        var tmpCharIndex = Math.floor(Math.random() * charsToTest.length);
        var testChar = charsToTest[tmpCharIndex].char;
        document.getElementById('answer').innerHTML = testChar;
        // Save the test characters in a list
        testCharArr.push(testChar);
        // Get all the phrases containing the test character
        var tmpPhraseArr = dictChinesePhrase.filter(element => element.includes(testChar));
        // If there are more than one phrases containing the current test Chinese character, randomly output one
        var phraseIndex = Math.floor(Math.random() * tmpPhraseArr.length);
        testPhrase = tmpPhraseArr[phraseIndex];
        // Split the test phrase into an array
        testPhraseList = testPhrase.split('');
        // pinyinArr = [];
        // Find Pinyin of all the characters in the test phrase
        for (i = 0; i < testPhraseList.length; i++) {
            matched = dict.filter((obj) => obj.char == testPhraseList[i]);
            testPinyin = matched[0].pinyin;
            // pinyinArr.push(testPinyin);
            if (testPhraseList[i] == testChar) {
                outputStr = outputStr.concat(' ' + '<span id="charToTest">' + testPinyin + '</span>' + ' ');
            } else {
                outputStr = outputStr.concat(testPhraseList[i], ' (', testPinyin, ') ');
            }
        }
        outputStr = testCharArr.length + '. ' + outputStr;
        // Remove the tested Chienese character from the array of potential test characters
        charsToTest = charsToTest.filter((obj) => obj.char != testChar);
        resultSummary = `Congratulations!<br>You finished:<br>${testCharArr}`;
    }
    chineseTest.innerHTML = outputStr;
}
