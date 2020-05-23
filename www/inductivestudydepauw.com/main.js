
//used for the jspych timeline
var timeline = [];
var study_time = 100; // ms to study each painting
var fixation_time = 100; //ms for the fixation between trials
var instruction_time = 1000;//5000;





/* another way to do the informed consent
// declare the block.
var informed_consent = {
  type:'external-html',
  url: "http://127.0.0.1:8080/informed_consent.html",
  cont_btn: "start",
  check_fn: check_consent
};

timeline.push(informed_consent);
*/
/*
var check_consent = function(elem) {
  if (document.getElementById('consent_checkbox').checked) {
    return true;
  }
  else {
    alert("If you wish to participate, you must check the box next to the statement 'I agree to participate in this study.'");
    return false;
  }
  return false;
}

var check_consent =  function() {
  var consent = true;
  while(consent){
    if (document.getElementById('consent_checkbox').checked) {
      consent = false;
      //jsPsych.finishTrial();
    }
    else {
      alert("If you wish to participate, you must check the box next to the statement 'I agree to participate in this study.'");
      //jsPsych.endExperiment('Thank you for visiting the experiment page!');
    }
  }
}
*/

var informed_consent = {
  //type: "call-function",
  type: "html-keyboard-response",
  choices: ['y','n'],
  //data: jsPsych.timelineVariable('data'),
  //prompt: jsPsych.timelineVariable('testprompt'),
  stimulus: '<div id="consent">' + "<h3>INVITATION TO PARTICIPATE</h3>"
  + "<p>You are invited to participate in this research study investigating people's ability to remember paintings and the artists that produced them.  This is an example of ''inductive learning,'' and we are testing different training methods to see which lead to the most effective learning. The study is being conducted by researchers associated with DePauw University's Psychology and Neuroscience Department.</p>"
  + "<p>This experiment requires Javascript functionality in your web browser to present images; therefore, you may only complete the experiment if Javascript works correctly in your browser.</p>"
  + "<h3>PURPOSE AND PROCEDURE FOR THIS STUDY</h3>"
  //change time
  + "<p>The purpose of this study is to determine how well people can learn individual paintings and learn the styles of the artists who painted them.  For the first part of the experiment -- the training phase -- you will be shown paintings and artists' names, and you will be asked to respond to one of the 3 different questions about each painting. For the second part of the experiment -- the testing phase -- you will be presented with previous paintings and new paintings and asked whether you recognize the painting from the training phase, asked to identify the artist, and asked how much you like each painting.  The procedure will take approximately 50 minutes. You must be 18 years or older to participate.</p>"
  + "<h3>RISKS AND DISCOMFORTS</h3>"
  + "<p>There are no known risks or discomforts associated with this study.</p>"
  + "<h3>POTENTIAL BENEFITS</h3>"
  + "<p>By participating you may gain a greater understanding of experimental methods in psychology, and you will receive money for completing the experiment while taking it seriously and having reasonable performance on the response boxes. A bonus of $1.50 will be given to the top 25% of workers on the recognition memory task.</p>"
  + "<h3>ASSURANCE FOR CONFIDENTIALITY</h3>"
  + "<p>--paste here--</p>"
  + "<h3>WITHDRAWAL FROM PARTICIPATION</h3>"
  + "<p>Participation is voluntary.  Your decision whether or not to participate will not affect your present or future relationship with the Psychology Department or with DePauw University.  You are free to withdraw from this study at any time without penalty.</p>"
  + "<h3>OFFER TO ANSWER QUESTIONS</h3>"
  + "<p>If you have any questions regarding the experiment, please feel free to contact Michael Roberts (michaelroberts@depauw.edu). This project has been approved by the DePauw University Institutional Review Board (IRB).  Please contact the IRB by email (irb@depauw.edu) with any questions or concerns.</p>"
  + '<p>' + "<em>If you understand and agree to the above terms and are at least 18 years of age, press 'y'. If not, press 'n' to end the experiment.</em>" + '</p>'
  //+ "<p>" + '<input type="checkbox" id="consent_checkbox" />' + 'I agree to take part in this study.' + "</p>"
  + '</div>',
  //func: check_consent
  on_finish: function(data){
    if (jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press) == 'y'){
    }
    else {
      jsPsych.endExperiment("Thank you for visiting our experiment!")
    }
  }

}

timeline.push(informed_consent);

var random_string = ""
var prolificid = ""

var subject = {
    type: 'call-function',
    func: function(){return subjectNum},
    on_finish: function(data){
      jsPsych.data.addProperties({subjectNum: subjectNum})
      random_string = jsPsych.randomization.randomID(2);
      prolificid = jsPsych.data.getURLVariable('PROLIFIC_PID')
      jsPsych.data.get().addToLast({id: random_string, prolificid: prolificid});
    }
 }

 timeline.push(subject);

 timeline.push({
   type: 'fullscreen',
   fullscreen_mode: true
 });


//practice
var practiceset = [];
practiceset.push({stimulus:"<img src=" + 'img/practice/DonaldSultan1.png' +">", data:{test_part:'practicetrained',artist:'Donald Sultan', condition: 'n/a'},
instruction:"<p>What is the dominant color palette in the painting?</p>"+"<p>Artist: "+ 'Donald Sultan' + "</p>",
answer: "<p>If the question is, 'What is the dominant color palette in the painting?' then you might type 'black' or 'red' for this painting.</p>"});
practiceset.push({stimulus:"<img src=" + 'img/practice/allisoncarmicheal2.jpg' +">", data:{test_part:'practicetrained',artist:'Allison Carmichael', condition: 'n/a'},
instruction:"<p>Is there a smooth or abrupt transition between earth and sky in the painting?</p>"+"<p>Artist: " + 'Allison Carmichael' + "</p>",
answer: "<p>If the question is, 'Is there a smooth or abrupt transition between earth and sky in the painting?' then you might type 'abrupt' because you view a sudden shift to the blue sky in the background.</p>"});
practiceset.push({stimulus:"<img src=" + 'img/practice/BeverlyHallberg3.jpg' +">", data:{test_part:'practicetrained',artist:'Beverly Hallberg', condition: 'n/a'},
instruction:"<p>What is the 'entry point' that leads you into the painting?</p>"+ "<p>Artist: "+ 'Beverly Hallberg' + "</p>",
answer: "<p>If the question is, ''What is the 'entry point' that leads you into the painting?'' then maybe you type 'bush', 'sky', or any area of the painting that catches your attention and leads you to look at other parts.</p>"});
practiceset.push({stimulus:"<img src=" + 'img/practice/DonaldSultan4.png' +">", data:{test_part:'practicetrained',artist:'Donald Sultan', condition: 'n/a'},
instruction:"<p>What is the 'entry point' that leads you into the painting?</p>"+"<p>Artist: "+ 'Donald Sultan' + "</p>",
answer: "<p>If the question is, ''What is the 'entry point' that leads you into the painting?'' then maybe you type 'red Tulips', 'stems of the Tulips', or any area of the painting that catches your attention and leads you to look at other parts.</p>"});

var practice_artists = ["Allison Carmichael", "Helen Frankenthaler", "Beverly Hallberg", "Donald Sultan"];


var welcome = {
  type: "html-keyboard-response",
  stimulus: "Welcome to the experiment. Press any key to begin."
};
timeline.push(welcome);


var welcome1 = {
  type: "html-keyboard-response",
  stimulus: '<p class="left">' + "Thank you for your participation. Through this experiment and similar experiments, we are examining factors that may help people learn more effectively. This experiment examines inductive learning -- learning to categorize old and new examples through experience with examples of the categories." + '</p>'
  + '<p class="left">' + "You will be trained to identify landscape artists' styles by studying certain paintings by those artists, and later we will test your memory for those paintings as well as your ability to identify which artists painted other landscape paintings that weren't shown to you during the training. Please press any key to continue." + '</p>'
};
timeline.push(welcome1);

var welcome2 = {
  type: "html-keyboard-response",
  stimulus: '<p class="left">' + "First, you will complete a few practice trials so you understand how the experiment works. We will show you 4 paintings as part of a practice 'training phase.'  For each painting, you will be asked a question to help you focus on a certain aspect of the painting as you are learning to recognize that painting and the artist's style. Please focus your attention on the highlighted aspect, because we are trying to examine the effectiveness of specific instructions for learning different types of paintings. Then press the Enter key and type a brief answer to the question in the response box." + '</p>'
};
timeline.push(welcome2);

var practice = []
//here
var fixationforpractice = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: fixation_time,
  //data: {test_part: 'fixation'}
}

var trainingforpractice = {
  type: "image-keyboard-response",
  stimulus: '<div class="container">' + jsPsych.timelineVariable('stimulus') + '</div>',
  //stimulus_height: 5,
  //stimulus_width: 10,
  //maintain_aspect_ration: true,
  choices: jsPsych.NO_KEYS,
  data: jsPsych.timelineVariable('data'),
  prompt: jsPsych.timelineVariable('instruction'),
  trial_duration: study_time,
  //!!Hard coded the connection of the prompt and stimulus.
}

var pre_survey_trialforpractice = {
  type: 'html-keyboard-response',
  stimulus: jsPsych.timelineVariable('instruction'),
  choices: jsPsych.NO_KEYS,
  trial_duration: instruction_time,
  //data: {test_part: 'presurvey_trial'}
}

var pre2_survey_trialforpractice = {
  type: 'html-keyboard-response',
  stimulus: function(){
  return  jsPsych.timelineVariable('stimulus', true) + "<p>" + jsPsych.timelineVariable('instruction', true)+"</p>"
},
  choices: jsPsych.ALL_KEYS,
  //data: {test_part: 'presurvey_trial'}
}

var pre3_survey_trialforpractice = {
  type: 'survey-text',
  questions: [{prompt: jsPsych.timelineVariable('instruction')}],
  preamble: jsPsych.timelineVariable('stimulus'),
};

var survey_trialforpractice = {
  type: "html-keyboard-response",
  stimulus: function(){
    return jsPsych.timelineVariable('answer', true);
  }
};

var training_procedureforpractice = {
  timeline: [fixationforpractice, pre_survey_trialforpractice,pre2_survey_trialforpractice,pre3_survey_trialforpractice,survey_trialforpractice],
  timeline_variables: practiceset,
  repetitions: 1,
};

practice.push(training_procedureforpractice);

var welcome3 = {
  type: "html-keyboard-response",
  stimulus: "You will now complete 5 trials from the practice 'testing phase.'  You will be given feedback on the results, but you will not be given feedback during the actual experiment."
};
practice.push(welcome3);


//////////////////////////////
var practice1recognition = {
    type: 'image-keyboard-response',
    stimulus: 'img/practice/allisoncarmicheal2.jpg',
    choices: ['y', 'n'],
    prompt: "<p>Have you seen this painting in the training? Type 'y' for yes and 'n' for no.</p>",
};

practice.push(practice1recognition);

var practice1recognitionresponse = {
  type: "html-keyboard-response",
  stimulus: "The correct answer was 'Seen during training.' You will not receive feedback during the actual experiment."

};
practice.push(practice1recognitionresponse);

var practice1identification = {
    type: 'survey-multi-choice',
    questions: [
      {prompt: "<p>Identify the artist who painted this.</p>",
       options:practice_artists, required:true}
    ],
    preamble: '<img src= img/practice/allisoncarmicheal2.jpg>',
};


practice.push(practice1identification);

var practice1identificationresponse = {
  type: "html-keyboard-response",
  stimulus: "The correct answer was 'Allison Carmichael.' You will not receive feedback during the actual experiment."
};
practice.push(practice1identificationresponse);

var practice1likeability = {
    type: 'image-keyboard-response',
    stimulus: 'img/practice/allisoncarmicheal2.jpg',
    choices: ['1','2','3','4','5','6','7','8','9'],
    prompt: "<p>How much do you like this painting? Choose from 1 to 9 (1: strongly dislike, 9: strongly like).</p>"
  };


practice.push(practice1likeability);

var practice2recognition = {
    type: 'image-keyboard-response',
    stimulus: 'img/practice/DonaldSultan5.png',
    choices: ['y', 'n'],
    prompt: "<p>Have you seen this painting in the training? Type 'y' for yes and 'n' for no.</p>",
};

practice.push(practice2recognition);

var practice2recognitionresponse = {
  type: "html-keyboard-response",
  stimulus: "The correct answer was 'Have not seen during training.' You will not receive feedback during the actual experiment."

};
practice.push(practice2recognitionresponse);

var practice2identification = {
  type: 'survey-multi-choice',
  questions: [
    {prompt: "<p>Identify the artist who painted this.</p>",
     options:practice_artists, required:true}
  ],
  preamble: '<img src= img/practice/DonaldSultan5.png>',
};


practice.push(practice2identification);

var practice2identificationresponse = {
  type: "html-keyboard-response",
  stimulus: "The correct answer was 'Donald Sultan.' You will not receive feedback during the actual experiment."
};
practice.push(practice2identificationresponse);

var practice2likeability = {
    type: 'image-keyboard-response',
    stimulus: 'img/practice/DonaldSultan5.png',
    choices: ['1','2','3','4','5','6','7','8','9'],
    prompt: "<p>How much do you like this painting? Choose from 1 to 9 (1: strongly dislike, 9: strongly like).</p>"
  };


practice.push(practice2likeability);


var practice3recognition = {
    type: 'image-keyboard-response',
    stimulus: 'img/practice/BeverlyHallberg3.jpg',
    choices: ['y', 'n'],
    prompt: "<p>Have you seen this painting in the training? Type 'y' for yes and 'n' for no.</p>",
};

practice.push(practice3recognition);

var practice3recognitionresponse = {
  type: "html-keyboard-response",
  stimulus: "The correct answer was 'Have seen during training.' You will not receive feedback during the actual experiment."

};
practice.push(practice3recognitionresponse);

var practice3identification = {
  type: 'survey-multi-choice',
  questions: [
    {prompt: "<p>Identify the artist who painted this.</p>",
     options:practice_artists, required:true}
  ],
  preamble: '<img src= img/practice/BeverlyHallberg3.jpg >',
};


practice.push(practice3identification);

var practice3identificationresponse = {
  type: "html-keyboard-response",
  stimulus: "The correct answer was 'Beverly Hallberg.' You will not receive feedback during the true experiment."
};

practice.push(practice3identificationresponse);

var practice3likeability = {
    type: 'image-keyboard-response',
    stimulus: 'img/practice/BeverlyHallberg3.jpg',
    choices: ['1','2','3','4','5','6','7','8','9'],
    prompt: "<p>How much do you like this painting? Choose from 1 to 9 (1: strongly dislike, 9: strongly like).</p>"
  };


practice.push(practice3likeability);


var practice4recognition = {
    type: 'image-keyboard-response',
    stimulus: 'img/practice/HelenFrankenthaler6.png',
    choices: ['y', 'n'],
    prompt: "<p>Have you seen this painting in the training? Type 'y' for yes and 'n' for no.</p>",
};

practice.push(practice4recognition);

var practice4recognitionresponse = {
  type: "html-keyboard-response",
  stimulus: "The correct answer was 'Have not seen during training.' You will not receive feedback during the actual experiment."

};
practice.push(practice4recognitionresponse);

var practice4identification = {
  type: 'survey-multi-choice',
  questions: [
    {prompt: "<p>Identify the artist who painted this.</p>",
     options:practice_artists, required:true}
  ],
  preamble: '<img src= img/practice/HelenFrankenthaler6.png >',
};


practice.push(practice4identification);

var practice4identificationresponse = {
  type: "html-keyboard-response",
  stimulus: "The correct answer was 'Helen Frankenthaler.' You will not receive feedback during the actual experiment."
};
practice.push(practice4identificationresponse);

var practice4likeability = {
    type: 'image-keyboard-response',
    stimulus: 'img/practice/HelenFrankenthaler6.png',
    choices: ['1','2','3','4','5','6','7','8','9'],
    prompt: "<p>How much do you like this painting? Choose from 1 to 9 (1: strongly dislike, 9: strongly like).</p>"
  };


practice.push(practice4likeability);


var practice5recognition = {
    type: 'image-keyboard-response',
    stimulus: 'img/practice/DonaldSultan4.png',
    choices: ['y', 'n'],
    prompt: "<p>Have you seen this painting in the training? Type 'y' for yes and 'n' for no.</p>",
};

practice.push(practice5recognition);

var practice5recognitionresponse = {
  type: "html-keyboard-response",
  stimulus: "The correct answer was 'Have seen during training.' You will not receive feedback during the true experiment."

};
practice.push(practice5recognitionresponse);

var practice5identification = {
  type: 'survey-multi-choice',
  questions: [
    {prompt: "<p>Identify the artist who painted this.</p>",
     options:practice_artists, required:true}
  ],
  preamble: '<img src= img/practice/DonaldSultan4.png >',
};


practice.push(practice5identification);

var practice5identificationresponse = {
  type: "html-keyboard-response",
  stimulus: "The correct answer was 'Donald Sultan.' You will not receive feedback during the actual experiment."
};
practice.push(practice5identificationresponse);

var practice5likeability = {
    type: 'image-keyboard-response',
    stimulus: 'img/practice/DonaldSultan4.png',
    choices: ['1','2','3','4','5','6','7','8','9'],
    prompt: "<p>How much do you like this painting? Choose from 1 to 9 (1: strongly dislike, 9: strongly like).</p>",
    on_finish: function(){
      jsPsych.setProgressBar(0.1);
    }
  };


practice.push(practice5likeability);

timeline.push(...practice);


//training-----------------------------------------------------------------------


var pre_training = {
  type: 'html-keyboard-response',
  stimulus: "Please wait a couple of seconds until the training phase starts.",
  choices: jsPsych.NO_KEYS,
  trial_duration: 3000
}

timeline.push(pre_training);

var instructionend = {
  type: "html-keyboard-response",
  stimulus: "<p>You have now completed the practice trials.</p>" +
  '<p class="left">' + "For the training phase in the actual experiment -- starting from now -- you will see 36 paintings by 12 different landscape artists. As you answer each question and try to learn each artist's style, please try to remember each painting and the artist who created it. Afterwards, you will be tested on these 'trained' paintings and also asked to identify which artists painted many additional paintings by these artists that you haven't seen during the training and answer the three kinds of questions given during the practice trials." + '</p>',
  //trial_duration: 50000
};
timeline.push(instructionend);


var fixation = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: fixation_time,
  //data: {test_part: 'fixation'}//?
}


var pre_training = {
  type: 'html-keyboard-response',
  stimulus: jsPsych.timelineVariable('instruction'),
  choices: jsPsych.NO_KEYS,
  trial_duration: instruction_time,
  //data: {test_part: 'presurvey_trial'}
}

//wait and show stimulus and instruction
var pre2_training = {
  type: 'html-keyboard-response',
  stimulus: function(){
  return  "<img src=" + jsPsych.timelineVariable('stimulus',true) + ">" + "<p>" + jsPsych.timelineVariable('instruction', true)+"</p>"
},
  choices: jsPsych.ALL_KEYS,
  //data: {test_part: 'presurvey_trial'}
}

//type responses
var trainingProgress = 0.1;

var training = {
  type: 'survey-text',
  questions: [{prompt: jsPsych.timelineVariable('instruction'),required:true}],
  on_finish: function(){
    trainingProgress += 0.4/36;
    jsPsych.setProgressBar(trainingProgress);
  },
  //stimulus: "<img src=' " + jsPsych.timelineVariable('stimulus') + " '>"
  preamble: function(){
  return  "<img src=" + jsPsych.timelineVariable('stimulus',true) + ">"
  }
};


var training_procedure = {
  timeline: [fixation, pre_training,pre2_training,training],
  timeline_variables: experiment,
  repetitions: 1,
}

timeline.push(training_procedure);



//testing

var pre_testing = {
  type: 'html-keyboard-response',
  stimulus: "Please wait a couple of seconds until the testing phase starts.",
  choices: jsPsych.NO_KEYS,
  trial_duration: 3000,
  on_start: function(){
    jsPsych.setProgressBar(0.5);
  }
}

timeline.push(pre_testing);

var testinstruction = {
  type: "html-keyboard-response",
  stimulus: "You have now completed the training phase. For the testing phase, you will see 72 paintings by 12 different landscape artists under three different questions to answer.",
  //trial_duration: 10000
};

timeline.push(testinstruction);

var testrecognition = {
  type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: ['y','n'],
  data: jsPsych.timelineVariable('data'),
  //prompt: jsPsych.timelineVariable('testprompt'),
  prompt: "<p>Have you seen this painting in the training? Type 'y' for yes and 'n' for no.</p>",
  on_finish: function(data){
    data.recognition_correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.haveseen);
    data.testtype = "recognition"
  },
}


var testidentification = {
  type: 'survey-multi-choice',
  questions: [
    {prompt: "<p>Identify the artist who painted this.</p>",
     //name: 'identification',
     options:artists, required:true}
  ],
  preamble: function(){
  return  "<img src=" + jsPsych.timelineVariable('stimulus',true) + ">"
  },
  data: jsPsych.timelineVariable('data'),
  on_finish: function(data){
    data.stimulus = jsPsych.timelineVariable('stimulus',true);
    var response = JSON.parse(data.responses);
    data.identification_correct = response.Q0 == data.artist;
    data.testtype = "identification";

  },
}

var testlikeability = {
  type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('stimulus'),
  choices: ['1','2','3','4','5','6','7','8','9'],
  data: jsPsych.timelineVariable('data'),
  //prompt: jsPsych.timelineVariable('testprompt'),
  prompt: "<p>How much do you like this painting? Choose from 1 to 9 (1: strongly dislike, 9: strongly like).</p>",

  on_finish: function(data){
    switch(data.key_press) {
  case 49:
  data.likeability = 1;
    break;
  case 50:
  data.likeability = 2;
    break;
  case 51:
  data.likeability = 3;
    break;
  case 52:
  data.likeability = 4;
    break;
  case 53:
  data.likeability = 5;
    break;
  case 54:
  data.likeability = 6;
    break;
  case 55:
  data.likeability = 7;
    break;
  case 56:
  data.likeability = 8;
  break;
  case 57:
  data.likeability = 9;
  break;

  default:
    // code block
}
    data.testtype = "likeability"
  }
}



var testingprogress = 0.5;

var test_procedurerecognition = {
  timeline: [fixation, testrecognition],
  //timeline_variables: testing,
  //repetitions: 1,
  on_finish: function(){
    //jsPsych.setProgressBar(0.7);
    testingprogress += 0.4/216;
    jsPsych.setProgressBar(testingprogress);
  }
}

var test_procedureidentification = {
  timeline: [fixation, testidentification],
  //timeline_variables: testing,
  //repetitions: 1,
  on_finish: function(){
    //jsPsych.setProgressBar(0.8);
    testingprogress += 0.4/216;
    jsPsych.setProgressBar(testingprogress);
  }
}


var test_procedurelikeability = {
  timeline: [fixation, testlikeability],
  //timeline_variables: testing,
  //repetitions: 1,
  on_finish: function(){
    //jsPsych.setProgressBar(0.9);
    testingprogress += 0.4/216;
    jsPsych.setProgressBar(testingprogress);
  }
}


var test_procedure = {
  timeline: [test_procedurerecognition, test_procedureidentification, test_procedurelikeability],
  timeline_variables: testing,
  repetitions: 1,
  on_finish: function(){
    jsPsych.setProgressBar(0.9);
  }
}

timeline.push(test_procedure);

/* define debrief */
var pre_survey = {
  type: "html-keyboard-response",
  stimulus:
  "<p>Press any key to complete a short survey, and then we'll show your testing results.</p>"
};

var familiarity_additional = {
  type: 'survey-multi-select',
  questions: [
    { prompt: "<p>If you answered yes, please slects the artist(s) you knew before the experiment.</p>",
      options:artists
    }
  ],
  on_finish: function(data){
    data.stimulus = "If you answered yes, please slects the artist(s) you knew before the experiment.";
  }
}
var familiarity = {
  type: "html-keyboard-response",
  stimulus: "<p>Were you familiar with any of the artists and paintings before this experiment? Please type 'y' for yes and 'n' for no.</p>",
  choices: ['y','n'],
  on_finish: function(data){
    data.stimulus = "Were you familiar with any of the artists and paintings before this experiment?";
    data.responses = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press);
  }
};


var accuracy_metacognition = {
  type: 'survey-text',
  questions: [
    { prompt: "<p>Overall, how accurate do you think you were when recognizing whether you had seen the painting during training or not (Please give a percentage from 0-100)</p>",
      required: true,columns: 3, name: 'recognize'
    },
    { prompt: "<p>Overall, how accurate do you think you were when identifying the artist of paintings that you had seen during training (Please give a percentage from 0-100)</p>",
      required: true,columns: 3, name: 'identify old'
    },
    { prompt: "<p>Overall, how accurate do you think you were when identifying the artist for new paintings (that you did not see during training) (Please give a percentage from 0-100)</p>",
      required: true,columns: 3, name: 'identify novel'
    }
  ],
  on_finish: function(data){
    data.stimulus = "Overall, how accurate do you think you were when...";
  }
};


var instruction_metacognition = {
  type: 'survey-text',
  questions: [
    { prompt: "<p>During training, there were three questions that helped you focus on different aspects of the paintings. Some artists' paintings were learned with just one of the instructions, while other artists' paintings were learned with a variety of the questions.</p>"
      + "<p><strong>Overall, how consistently did you use the questions to guide your attention as you studied a painting?</strong></p>"
      + "<p>1 (mostly ignored the question while studying a painting) - 9 (exclusively focused on answering the question while studying a painting</p>",
      required: true, columns:1, name: 'overall'
    },
    { prompt: "<p>How well do you think each question helped you learn <em>individual paintings that you trained on</em>?</p>"
      + "<p><strong>''What is the dominant color palette in the painting?''</strong></p>"
      + "<p>1 (learned very poorly) - 9 (learned very well)</p>",
      required: true, columns:1, name: 'trained-color'
    },
    { prompt: "<p><strong>''Is there a smooth or abrupt transition between earth and sky in the painting?''</strong></p>"
      + "<p>1 (learned very poorly) - 9 (learned very well)</p>",
      required: true, columns:1, name: 'transition'
    },
    { prompt: "<p><strong>''What is the 'entry point' that leads you into the painting?''</strong></p>"
      + "<p>1 (learned very poorly) - 9 (learned very well)</p>",
      required: true, columns:1, name: 'entry'
    },
    { prompt: "<p><strong>A variety of the questions for different paintings by an artist</strong></p>"
      + "<p>1 (learned very poorly) - 9 (learned very well)</p>",
      required: true, columns:1, name: 'mix'
    },
    { prompt: "<p>How well do you think each question helped you learn to <em>identify which artists painted new pictures that were not shown during training</em>?</p>"
      + "<p><strong>''What is the dominant color palette in the painting?''</strong></p>"
      + "<p>1 (learned very poorly) - 9 (learned very well)</p>",
      required: true, columns:1, name: 'new-color'
    },
    { prompt: "<p><strong>''Is there a smooth or abrupt transition between earth and sky in the painting?''</strong></p>"
      + "<p>1 (learned very poorly) - 9 (learned very well)</p>",
      required: true, columns:1, name: 'transition'
    },
    { prompt: "<p><strong>''What is the 'entry point' that leads you into the painting?''</strong></p>"
      + "<p>1 (learned very poorly) - 9 (learned very well)</p>",
      required: true, columns:1, name: 'entry'
    },
    { prompt: "<p><strong>A variety of the questions for different paintings by an artist</strong></p>"
      + "<p>1 (learned very poorly) - 9 (learned very well)</p>",
      required: true, columns:1, name: 'mix'
    }
  ],
  on_finish: function(data){
    data.stimulus = "How well do you think each question helped you learn individual paintings that you trained on/identify which artists painted new pictures?";
  }
};


var confusion = {
  type: 'survey-text',
  questions: [{ prompt: "<p>Were any of the instructions unclear or confusing? Why is it?</p>"}],
  on_finish: function(data){
    data.stimulus = "Were any of the instructions unclear or confusing? Why is it?";
  }
};

var colorvisition = {
  type: "html-keyboard-response",
  stimulus: "<p>Do you have normal color vision? Please type 'y' for yes and 'n' for no.</p>",
  choices: ['y','n'],
  on_finish: function(data){
    data.responses = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press);
  }
};


var screensize = {
  type: 'survey-multi-choice',
  questions:[{prompt:"How large was the screen that you used while viewing the paintings (approximately)?",required: true,
              options:["Cellphone",	"Tablet", "Medium-sized laptop", "Large monitor"]}],
  on_finish: function(data){
    data.stimulus = "How large was the screen that you used while viewing the paintings?";
  }
};

var age = {
  type: 'survey-text',
  questions: [{ prompt: "<p>How old are you</p>",
      required: true,columns: 2}],
  on_finish: function(data){
    data.stimulus = "How old are you?";
  }
};

var gender = {
  type: 'survey-multi-choice',
  questions:[{prompt:"What is your gender?", options:["Female",	"Male", "Others"]}],
  on_finish: function(data){
    data.stimulus = "What is your gender?";
  }
};

var demographics = {
  timeline: [age,gender]
}

var survey = [pre_survey,familiarity, familiarity_additional, accuracy_metacognition,
    instruction_metacognition, confusion, colorvisition, screensize, demographics];


timeline.push(...survey);

var pre_debrief = {
  type: "html-keyboard-response",
  choices: jsPsych.ALL_KEYS,
  stimulus: function() {

    var recognitiontrials = jsPsych.data.get().filter({testtype: "recognition"});
    var correctrecognition_trials = jsPsych.data.get().filter({recognition_correct: true});
    var recognitionaccuracy = Math.round(correctrecognition_trials.count() / recognitiontrials.count() * 100);

    var identificationtrials = jsPsych.data.get().filter({testtype: "identification"});
    var correctidentification_trials = jsPsych.data.get().filter({identification_correct: true});
    var identificationaccuracy = Math.round(correctidentification_trials.count() / identificationtrials.count() * 100);


    var likeabilityaverage = jsPsych.data.get().filter({testtype: "likeability"}).select('likeability').mean();

    return "<p>As for the recognition testing, you responded correctly on "+recognitionaccuracy+"%</p>"+
    "<p>As for the identification testing, you responded correctly on "+ identificationaccuracy+"%</p>"+
    "<p>As for how well you liked the paintings, your average rating was "+ likeabilityaverage+"</p>"+
    "<p>Press any key to see the debriefing and complete the study.  Thank you very much for participating!!!</p>";

  }
};


var debrief = {
  type: "html-keyboard-response",
  stimulus: '<p class="left">' + "This experiment is an example of inductive learning of categories, where you learn a category via examples of category members.  We are trying to understand what helps people learn categories more effectively.Here the stimuli happen to be paintings by different artists, but we think the most effective approaches may generalize to other types of visual stimuli (e.g., imagine you're learning a mathematical concept, or you're a medical student training to correctly interpret X-rays)." + '</p>' +
  '<p class="left">' + "The data will be analyzed to determine if participants show different performance on the task to identify an artist's style depending on which instructions are paired with the paintings during the training phase. Some instructions may be more effective than others, and for some categories (i.e. some artists), multiple instructions were paired with the paintings by that artist, which may lead learners to look at and learn multiple distinguishing aspects of the artist's style. The information gathered from this and subsequent studies may help determine how bottom-up aspects of a visual scene might influence the perceptual encoding and cognitive evaluation of that scene, including the ability to more effectively learn a set of new visual categories (e.g., artists' styles, diagnoses from x-rays, etc.) The insights could lead to potential applications in generating more memorable visual aids." + '</p>' +
  '<p class="left">' + "Please feel free to contact Dr. Michael Roberts (michaelroberts[at]depauw.edu) if you have any questions about this experiment." + '</p>' +
  '<p class="leftf">' + "Please do not share the details of this study with other potential participants.  That would affect our ability to collect data.  We appreciate your help!  Thank you for taking the time to participate in this study!" + '</P>'

};

timeline.push(...[pre_debrief,debrief]);

/*
var interaction_data = {
    type: 'call-function',
    func: function(){return jsPsych.data.getInteractionData()}
 }

 var myfunc = function() {
     return jsPsych.data.getInteractionData().json()
 }

 var trial = {
     type: 'call-function',
     func: myfunc,
     data: { trialName: "InteractionData" }
}
//timeline.push(trial);
*/

function saveData(name, data){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'write_data.php'); // 'write_data.php' is the path to the php file described above.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({filename: name, filedata: data}));
}

/* start the experiment */
jsPsych.init({
  timeline: timeline,
  preload_images: artistImageArray,
  show_progress_bar: true, //change so that it is based on the actual length of experiment
  auto_update_progress_bar:false,
  /*
  on_interaction_data_update:function(data){

  },
  */
    /*
    if (interaction_data.type == 'blur'){
      alert('You clicked on another window or tab during the experiment');
    }
    else if (interaction_data.type == 'fullscreenexit') {
      alert('Your browser exited the fullscreen mode')
    }
  //Called whenever new interaction data (e.g., the subject enters or exits fullscreen mode) is added.
  },
  on_close: function(){
    alert('Are you sure to finish the experiment?');
  //Called right before the page closes, such as when a subject closes the experiment early.
  },
  */

  //exclusion
  exclusions: {
    //min_width: 800,
    //min_height: 600
  },
  on_finish: function() {
  //Outputs all of the data collected in the experiment to the screen in either JSON or CSV format. This is a useful method for quick debugging when developing an experiment.
    //jsPsych.data.displayData('jason');
    //jsPsych.data.displayData('csv');
    jsPsych.setProgressBar(1.0);

    var interaction_data = jsPsych.data.getInteractionData().json();
    jsPsych.data.get().addToLast({interaction: interaction_data});

    //testing
    jsPsych.data.get().localSave('csv',prolificid + random_string + '.csv');
    //jsPsych.data.get().localSave('json','mydata.json');
    saveData(prolificid + random_string, jsPsych.data.get().csv());

    document.location.href="https://app.prolific.co/submissions/complete?cc=36FA9E89";
    }
});


  /*on_trial_start: function(){
    var progress = jsPsych.progress();
    alert('You have completed approximately '+progress.percent_complete+'% of the experiment');
  }
  */
