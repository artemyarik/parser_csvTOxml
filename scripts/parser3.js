let input = document.getElementById('textin');
let output = document.getElementById('textout');
let butt = document.getElementById('butt');
let buttonCopy = document.getElementById('buttcopy');
let buttonDownload = document.getElementById('buttdown')
buttonCopy.style.display='none'
buttonDownload.style.display='none'

// Кнопка форматировать
butt.onclick = function() {
    buttonCopy.style.display='';
    buttonDownload.style.display='';
    var value = input.value;
    test(value);  
    output.textContent = parsefun(input.value);
};

// Кнопка копирование результат
buttonCopy.onclick = function(){
    output.select();
    navigator.clipboard.writeText(output.value);
}

// Пока в разработке работа с несколькими квизами в одном csv файле
function test(value){
    var quizes = value.split(/\r?\n|\r/);
    for (var k = 0; k < quizes.length; k++) {
        var quizesNames = quizes[k].split(';', 1);
        console.log(quizesNames);
        for (var z = 1; z < quizesNames.length-1; z++){
            if(quizesNames[z-1] == quizesNames[z]){
                //csv[k-1] += quizes[k-1]
                console.log(z-1);
            }
        }
    }
};

// Загрузка файла
buttonDownload.addEventListener('click', function() {
    var text = output.value;
    var inp = input.value.split(';', 1);
    var filename = `${inp}.xml`;
    download(filename, text);
}, false);

// Парсер
function parsefun(data) {
    let csvData = data;
    var allRows = csvData.split(/\r?\n|\r/);
    var table = `<?xml version="1.0" encoding="utf-8"?><wpProQuiz><header version="0.28" exportVersion="1" ld_version="4.3.0.2" LEARNDASH_SETTINGS_DB_VERSION="2.5"/><data>`;
    for (var i = 0; i < allRows.length; i++) {
        var rowCells = allRows[i].split(';');
        if (i == 0) {
            table += '<quiz><title titleHidden="true">';
            table += `<![CDATA[${rowCells[0]}]]>`;
            table += `</title><text><![CDATA[AAZZAAZZ]]></text><resultText gradeEnabled="true"><text prozent="0"><![CDATA[]]></text></resultText><btnRestartQuizHidden>false</btnRestartQuizHidden><btnViewQuestionHidden>false</btnViewQuestionHidden><questionRandom>false</questionRandom><answerRandom>false</answerRandom><timeLimit>0</timeLimit><showPoints>false</showPoints><statistic activated="true" ipLock="0"/><quizRunOnce type="0" cookie="false" time="0">false</quizRunOnce><numberedAnswer>false</numberedAnswer><hideAnswerMessageBox>false</hideAnswerMessageBox><disabledAnswerMark>false</disabledAnswerMark><showMaxQuestion showMaxQuestionValue="0" showMaxQuestionPercent="false">false</showMaxQuestion><toplist activated="false"><toplistDataAddPermissions>1</toplistDataAddPermissions><toplistDataSort>1</toplistDataSort><toplistDataAddMultiple>false</toplistDataAddMultiple><toplistDataAddBlock>0</toplistDataAddBlock><toplistDataShowLimit>0</toplistDataShowLimit><toplistDataShowIn>0</toplistDataShowIn><toplistDataCaptcha>false</toplistDataCaptcha><toplistDataAddAutomatic>false</toplistDataAddAutomatic></toplist><showAverageResult>false</showAverageResult><prerequisite>false</prerequisite><showReviewQuestion>true</showReviewQuestion><quizSummaryHide>true</quizSummaryHide><skipQuestionDisabled>true</skipQuestionDisabled><emailNotification>0</emailNotification><userEmailNotification>false</userEmailNotification><showCategoryScore>false</showCategoryScore><hideResultCorrectQuestion>false</hideResultCorrectQuestion><hideResultQuizTime>false</hideResultQuizTime><hideResultPoints>false</hideResultPoints><autostart>false</autostart><forcingQuestionSolve>false</forcingQuestionSolve><hideQuestionPositionOverview>true</hideQuestionPositionOverview><hideQuestionNumbering>true</hideQuestionNumbering><sortCategories>false</sortCategories><showCategory>false</showCategory><quizModus questionsPerPage="0">0</quizModus><startOnlyRegisteredUser>false</startOnlyRegisteredUser><forms activated="true" position="0"><form type="8" required="true" fieldname="Шей"/></forms>`;
            table += '<questions>';
        } 
        for (var j = 1; j < rowCells.length; j++) {
            if(j == 1) {
                table += '<question answerType="assessment_answer"><title>';
                table += `<![CDATA[${rowCells[j]}]]>`
                table += '</title><points>3</points>'
            }
            else if(i==allRows.length-1 && j==rowCells.length-1){
                table += '<questionText>';
                table += `<![CDATA[<p>${rowCells[j]}</p>]]>`
                table += '</questionText>';
                table += '<correctMsg><![CDATA[]]></correctMsg><incorrectMsg><![CDATA[]]></incorrectMsg><tipMsg enabled="false"><![CDATA[]]></tipMsg><category/><correctSameText>false</correctSameText><showPointsInBox>false</showPointsInBox><answerPointsActivated>true</answerPointsActivated><answerPointsDiffModusActivated>false</answerPointsDiffModusActivated><disableCorrect>false</disableCorrect><answers><answer points="1" correct="false"><answerText html="false"><![CDATA[<p><strong><span class="description-red">{</span> [Да] [Частично] [Нет] <span class="description-red">}</span></strong></p>]]></answerText><stortText html="false"><![CDATA[]]></stortText></answer></answers></question>';
                table += `</questions><post><post_title><![CDATA[${rowCells[0]}]]></post_title><post_content><![CDATA[<!-- wp:paragraph -->`;
            }
            else{
                table += '<questionText>';
                table += `<![CDATA[<p>${rowCells[j]}</p>]]>`
                table += '</questionText>';
                table += '<correctMsg><![CDATA[]]></correctMsg><incorrectMsg><![CDATA[]]></incorrectMsg><tipMsg enabled="false"><![CDATA[]]></tipMsg><category/><correctSameText>false</correctSameText><showPointsInBox>false</showPointsInBox><answerPointsActivated>true</answerPointsActivated><answerPointsDiffModusActivated>false</answerPointsDiffModusActivated><disableCorrect>false</disableCorrect><answers><answer points="1" correct="false"><answerText html="false"><![CDATA[<p><strong><span class="description-red">{</span> [Да] [Частично] [Нет] <span class="description-red">}</span></strong></p>]]></answerText><stortText html="false"><![CDATA[]]></stortText></answer></answers></question>';
            }
          }
    } 
    let desc = document.getElementById('descquiz').value;
    if(desc === ''){
        desc = 'Я текст с описанием того, о чем будут спрашивать в опроснике!'
    }
    table += `<p>${desc}</p><!-- /wp:paragraph -->]]></post_content></post><post_meta><meta_key><![CDATA[_timeLimitCookie]]></meta_key><meta_value><![CDATA[["0"]]]></meta_value></post_meta><post_meta><meta_key><![CDATA[_viewProfileStatistics]]></meta_key><meta_value><![CDATA[["1"]]]></meta_value></post_meta><post_meta><meta_key><![CDATA[_sfwd-quiz]]></meta_key><meta_value>`;
    table += `<![CDATA[["1"]]]></meta_value></post_meta><post_meta><meta_key><![CDATA[_sfwd-quiz]]></meta_key><meta_value><![CDATA[[{"0":"","sfwd-quiz_quiz_pro":33,"sfwd-quiz_course":3074,"sfwd-quiz_lesson":3076,"sfwd-quiz_lesson_schedule":"","sfwd-quiz_visible_after":"","sfwd-quiz_visible_after_specific_date":"","sfwd-quiz_startOnlyRegisteredUser":false,"sfwd-quiz_prerequisiteList":"","sfwd-quiz_prerequisite":"","sfwd-quiz_retry_restrictions":"","sfwd-quiz_quiz_resume":false,"sfwd-quiz_quiz_resume_cookie_send_timer":5,"sfwd-quiz_repeats":"","sfwd-quiz_quizRunOnceType":"","sfwd-quiz_quizRunOnceCookie":"","sfwd-quiz_passingpercentage":"80","sfwd-quiz_certificate":"","sfwd-quiz_threshold":"","sfwd-quiz_quiz_time_limit_enabled":"","sfwd-quiz_timeLimit":0,"sfwd-quiz_forcingQuestionSolve":false,"sfwd-quiz_quizRunOnce":false,"sfwd-quiz_quiz_materials_enabled":"","sfwd-quiz_quiz_materials":"","sfwd-quiz_custom_sorting":"","sfwd-quiz_autostart":false,"sfwd-quiz_showReviewQuestion":true,"sfwd-quiz_quizSummaryHide":true,"sfwd-quiz_skipQuestionDisabled":true,"sfwd-quiz_sortCategories":false,"sfwd-quiz_questionRandom":"","sfwd-quiz_showMaxQuestion":"","sfwd-quiz_showMaxQuestionValue":"","sfwd-quiz_showPoints":false,"sfwd-quiz_showCategory":false,"sfwd-quiz_hideQuestionPositionOverview":true,"sfwd-quiz_hideQuestionNumbering":true,"sfwd-quiz_numberedAnswer":false,"sfwd-quiz_answerRandom":false,`;
    table += `"sfwd-quiz_quizModus":0,"sfwd-quiz_quizModus_multiple_questionsPerPage":0,"sfwd-quiz_quizModus_single_back_button":"","sfwd-quiz_quizModus_single_feedback":"end","sfwd-quiz_titleHidden":true,"sfwd-quiz_custom_question_elements":"","sfwd-quiz_resultGradeEnabled":false,"sfwd-quiz_resultText":"","sfwd-quiz_btnRestartQuizHidden":false,"sfwd-quiz_showAverageResult":"","sfwd-quiz_showCategoryScore":"","sfwd-quiz_hideResultPoints":false,"sfwd-quiz_hideResultCorrectQuestion":false,"sfwd-quiz_hideResultQuizTime":false,"sfwd-quiz_hideAnswerMessageBox":false,"sfwd-quiz_disabledAnswerMark":false,"sfwd-quiz_btnViewQuestionHidden":false,"sfwd-quiz_custom_answer_feedback":"on","sfwd-quiz_custom_result_data_display":"on","sfwd-quiz_associated_settings_enabled":"","sfwd-quiz_toplistDataShowIn_enabled":"","sfwd-quiz_statisticsIpLock_enabled":"","sfwd-quiz_formActivated":true,"sfwd-quiz_formShowPosition":"0","sfwd-quiz_toplistDataAddPermissions":"1","sfwd-quiz_toplistDataAddMultiple":false,"sfwd-quiz_toplistDataAddBlock":0,"sfwd-quiz_toplistDataAddAutomatic":false,"sfwd-quiz_toplistDataShowLimit":0,"sfwd-quiz_toplistDataSort":"1","sfwd-quiz_toplistActivated":false,"sfwd-quiz_toplistDataShowIn":0,"sfwd-quiz_toplistDataCaptcha":false,"sfwd-quiz_statisticsOn":true,"sfwd-quiz_viewProfileStatistics":true,"sfwd-quiz_statisticsIpLock":0,"sfwd-quiz_email_enabled":"","sfwd-quiz_email_enabled_admin":"","sfwd-quiz_emailNotification":0,"sfwd-quiz_userEmailNotification":false,"sfwd-quiz_timeLimitCookie_enabled":"","sfwd-quiz_timeLimitCookie":"","sfwd-quiz_templates_enabled":"","sfwd-quiz_custom_fields_forms":"","sfwd-quiz_advanced_settings":""}]]]></meta_value></post_meta></quiz></data></wpProQuiz>`;
    return(table);
} 

//Скачивание
function download(file, text) {
             
    //creating an invisible element
    var element = document.createElement('a');
    element.setAttribute('href',
    'data:text/plain;charset=utf-8,'
    + encodeURIComponent(text));
    element.setAttribute('download', file);
 
    // Above code is equivalent to
    // <a href="path of file" download="file name">
 
    document.body.appendChild(element);
 
    //onClick property
    element.click();
 
    document.body.removeChild(element);
}
