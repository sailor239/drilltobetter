var dict = JSON.parse(window.dict);

document.getElementById('btnContinueTest').style.display = 'none';
document.getElementById('subInstruction').style.display = 'none';
document.getElementById('btnGetNewWord').style.display = 'none';
document.getElementById('chineseTest').style.display = 'none';
document.getElementById('btnEndTest').style.display = 'none';
function startTest(){
    var resultSummary = "";
    testCharArr = [];
    charsToTest = dict.slice();
    document.getElementById('instruction').style.display = 'none';
    document.getElementById('btnStartTest').style.display = 'none';
    document.getElementById('btnContinueTest').style.display = 'none';
    document.getElementById('subInstruction').style.display = 'block';
    document.getElementById('btnGetNewWord').style.display = 'block';
    document.getElementById('chineseTest').style.display = 'block';
    document.getElementById('btnEndTest').style.display = 'block';
    document.getElementById('btnGetNewWord').focus();
    getNewWord();
}
function continueTest(){
    document.getElementById('instruction').style.display = 'none';
    document.getElementById('btnStartTest').style.display = 'none';
    document.getElementById('btnContinueTest').style.display = 'none';
    document.getElementById('subInstruction').style.display = 'block';
    document.getElementById('btnGetNewWord').style.display = 'block';
    document.getElementById('chineseTest').style.display = 'block';
    document.getElementById('btnEndTest').style.display = 'block';
    document.getElementById('btnGetNewWord').focus();
    getNewWord();
}
function endTest(){
    btnStartTest.innerHTML = "Re-Start?";
    instruction.innerHTML = resultSummary;
    document.getElementById('instruction').style.display = 'block';
    document.getElementById('subInstruction').style.display = 'none';
    document.getElementById('chineseTest').style.display = 'none';
    document.getElementById('btnGetNewWord').style.display = 'none';
    document.getElementById('btnEndTest').style.display = 'none';
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
    "中国", "花朵", "写字", "铅笔", "手机", "枕头", "头发", "毛巾", "手足", "宇宙", "生活", "生气",
    "东西南北中", "春夏秋冬", "哥姐弟妹", "爸妈", "男女", "一二三四五六七八九十",
    "大小", "多少", "上下", "左右", "深浅", "宽窄", "长短", "来去", "上学", "下班", "举手", "星期",
    "乌云", "云层", "天空", "大地", "树木", "说话", "山羊", "巴士", "米饭", "好吃", "剪刀",
    "朋友", "夜晚", "雨伞", "闪电", "灯光", "事情", "困难", "文具", "玩具", "吃饭", "汽车", "火车",
    "打扫", "大象", "小猪", "小狗", "小猫", "鸟窝", "好人", "坏人", "白开水", "开门", "关门", "田地",
    "我们", "你们", "他们", "她们", "它们"
];

function getNewWord() {
    var outputStr = '';
    // Check if there is any character left for test
    if (charsToTest.length == 0) {
        outputStr = 'Test done!';
        document.getElementById('subInstruction').style.display = 'none';
        document.getElementById('btnGetNewWord').style.display = 'none';
        document.getElementById('btnEndTest').style.display = 'block';
    } else {
        // alert(JSON.stringify(charsToTest));
        // Randomly select a Chinese character from the dictinary
        var tmpCharIndex = Math.floor(Math.random() * charsToTest.length);
        var testChar = charsToTest[tmpCharIndex].char;
        // Save the test characters in a list
        testCharArr.push(testChar);
        // Get all the phrases containing the test character
        var tmpPhraseArr = dictChinesePhrase.filter(element => element.includes(testChar));
        alert(tmpPhraseArr);
        // If there are more than one phrases containing the current test Chinese character, randomly output one
        var phraseIndex = Math.floor(Math.random() * tmpPhraseArr.length);
        alert(phraseIndex);
        testPhrase = tmpPhraseArr[phraseIndex];
        alert(testPhrase);
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
        resultSummary = "Congratulations!<br><br>You finished:<br><br>" + testCharArr;
    }
    chineseTest.innerHTML = outputStr;
}
