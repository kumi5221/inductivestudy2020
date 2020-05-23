var subjectNum = Math.floor( Math.random() * 4 );// make it global to use for mod3


var artists = ['Bruno Pessani', 'Ciprian Stratulat', 'George Wexler',
'Georges Braque', 'Georges Seurat', 'Henri-Edmond Cross', 'Judy Hawkins',
'Marilyn Mylrea', 'Philip Juras', 'Ron Schlorff', 'Ryan Lewis', 'YieMei'];
var artisShuffled = ['Henri-Edmond Cross', 'Ron Schlorff', 'Marilyn Mylrea',
'Bruno Pessani', 'YieMei', 'Philip Juras',
'Ciprian Stratulat', 'Judy Hawkins', 'Ryan Lewis',
'Georges Seurat', 'George Wexler', 'Georges Braque'];

const isUpperCaseCharCode = c => {
  const codeA = 'A'.charCodeAt()
  const codeZ = 'Z'.charCodeAt()
  const code = c.charCodeAt()
  return codeA <= code && code <= codeZ
}

function createTrials () {
var trial = [];
  if(subjectNum%3 == 0){
    //the array can be repeated if we add more training paintings
    //lower cases for instructions within the mixed condition
    var mixInstructions = ['c','h','e', 'h','e','c', 'e','c','h'];
  } else if (subjectNum%3 == 1) {
    var mixInstructions = ['h','e','c', 'e','c','h', 'c','h','e'];
  } else {
    var mixInstructions = ['e','c','h', 'c','h','e', 'h','e','c'];
  }


  const instructions = ['C','H','E'];
  while(true){

    var originalSeq1 = [' ',' ',' ',' '];
    var mixIndex =   Math.floor( Math.random() * 4 );

    originalSeq1[mixIndex] = mixInstructions[0];//i,j <=3 double loop
    var chosenInstruction = mixInstructions[0].toUpperCase();
    //var indexToDelete = instructions.indexOf(chosenInstruction);
    var remainingInstructions = jsPsych.randomization.shuffle(
      instructions.filter (instruction => instruction !== chosenInstruction));

    if (mixIndex == 0){
      var sameInstructionPos = 2 + Math.floor( Math.random() * 2 ); //2 or 3
      if(sameInstructionPos == 2){
        originalSeq1[2] = chosenInstruction;
        originalSeq1[1] = remainingInstructions[0];
        originalSeq1[3] = remainingInstructions[1];
      }else{
          originalSeq1[3] = chosenInstruction;
          originalSeq1[1] = remainingInstructions[0];
          originalSeq1[2] = remainingInstructions[1];
      }
    }else if(mixIndex == 1){
      originalSeq1[3] = chosenInstruction;
      originalSeq1[0] = remainingInstructions[0];
      originalSeq1[2] = remainingInstructions[1];
    }else if(mixIndex == 2){
      originalSeq1[0] = chosenInstruction;
      originalSeq1[1] = remainingInstructions[0];
      originalSeq1[3] = remainingInstructions[1];
    }else{
      var sameInstructionPos = Math.floor( Math.random() * 2 ); //0 or 1
      if(sameInstructionPos == 0){
        originalSeq1[0] = chosenInstruction;
        originalSeq1[1] = remainingInstructions[0];
        originalSeq1[2] = remainingInstructions[1];
      }else{
          originalSeq1[1] = chosenInstruction;
          originalSeq1[0] = remainingInstructions[0];
          originalSeq1[2] = remainingInstructions[1];
      }
    }

    //there is a lower case (mix)
    if(!originalSeq1.every(isUpperCaseCharCode)){
      break;
    }
  }

  trial = originalSeq1;

  var lastInstruction = originalSeq1[3];
  for(i=1;i<=8; i++){
    var originalSeqNext = [' ',' ',' ',' '];
    var nextMixInstruction = mixInstructions[i];

    inner: while(true){
      if (lastInstruction.toUpperCase() == nextMixInstruction.toUpperCase()){
          //splice(IndexToDelete, 1));//change original instructions?
        var mixIndex =   1 + Math.floor( Math.random() * 3 );
        originalSeqNext[mixIndex] = nextMixInstruction;//i,j <=3 double loop
        var chosenInstruction = nextMixInstruction.toUpperCase();
        //var indexToDelete = instructions.indexOf(chosenInstruction);
        var remainingInstructions = jsPsych.randomization.shuffle(
            instructions.filter (instruction => instruction !== chosenInstruction));

        if (mixIndex == 1){
          originalSeqNext[3] = chosenInstruction;
          originalSeqNext[0] = remainingInstructions[0];
          originalSeqNext[2] = remainingInstructions[1];
        } else if (mixIndex == 2){
          originalSeqNext[0] = chosenInstruction;
          originalSeqNext[1] = remainingInstructions[0];
          originalSeqNext[3] = remainingInstructions[1];
        } else {
          originalSeqNext[1] = chosenInstruction;
          originalSeqNext[0] = remainingInstructions[0];
          originalSeqNext[2] = remainingInstructions[1];
        }

      } else {//last instruction and the next mix instruction are different
        if (!isUpperCaseCharCode(lastInstruction)){//when the last instruction is from the mix condition
          var mixIndex =   1 + Math.floor( Math.random() * 3 );
        }else{
          var mixIndex = Math.floor( Math.random() * 4);
        }

        originalSeqNext[mixIndex] = nextMixInstruction;
        var chosenInstruction = nextMixInstruction.toUpperCase();
        var remainingInstructions = jsPsych.randomization.shuffle(
        instructions.filter (instruction => instruction !== chosenInstruction));

        if (mixIndex == 1){
          originalSeqNext[3] = chosenInstruction;
          originalSeqNext[0] = remainingInstructions[0];
          originalSeqNext[2] = remainingInstructions[1];

        }else if(mixIndex == 0){
          var sameInstructionPos = 2 + Math.floor( Math.random() * 2 ); //2 or 3
          if(sameInstructionPos == 2){
            originalSeqNext[2] = chosenInstruction;
            originalSeqNext[1] = remainingInstructions[0];
            originalSeqNext[3] = remainingInstructions[1];
          }else{
              originalSeqNext[3] = chosenInstruction;
              originalSeqNext[1] = remainingInstructions[0];
              originalSeqNext[2] = remainingInstructions[1];
          }
        }else if(mixIndex == 2){
            originalSeqNext[0] = chosenInstruction;
            originalSeqNext[1] = remainingInstructions[0];
            originalSeqNext[3] = remainingInstructions[1];
        }else{
          var sameInstructionPos = Math.floor( Math.random() * 2 ); //0 or 1
          if(sameInstructionPos == 0){
            originalSeqNext[0] = chosenInstruction;
            originalSeqNext[1] = remainingInstructions[0];
            originalSeqNext[2] = remainingInstructions[1];
          }else{
              originalSeqNext[1] = chosenInstruction;
              originalSeqNext[0] = remainingInstructions[0];
              originalSeqNext[2] = remainingInstructions[1];
          }
        }
      }//else

      if (lastInstruction.toUpperCase() !== originalSeqNext[0].toUpperCase()){
        break inner;
        //continue;//for loop
      }
    }//while

    lastInstruction = originalSeqNext[3];
    trial = trial.concat(originalSeqNext);
  }//for

  return trial;
}//function
  //console.log(trial);



  //5. create an array of 6 paintings for each artist

function createAristArray (artistName, lastName) {

  var artistArray = [];//return different arrays for each artist?
  //only load first 6 now. how to pick 6 of 6-10 paintings in the folder?
  for( i=1; i<=6;i++){
    artistArray.push('img/' + artistName + '/' + lastName + i +'.jpg');
  }
  return artistArray
}

const PessaniPaintings = createAristArray ('Bruno_Pessani','Pessani');
const StratulatPaintings = createAristArray ('Ciprian_Stratulat','Stratulat');
const WexlerPaintings = createAristArray ('George_Wexler','Wexler');

const BraquePaintings = createAristArray ('Georges_Braque','Braque');
const SeuratPaintings = createAristArray ('Georges_Seurat','Seurat');
const CrossPaintings = createAristArray ('Henri-Edmond_Cross','Cross');

const HawkinsPaintings = createAristArray ('Judy_Hawkins','Hawkins');
const MylreaPaintings = createAristArray ('Marilyn_Mylrea','Mylrea');
const JurasPaintings = createAristArray ('Philip_Juras','Juras');

const SchlorffPaintings = createAristArray ('Ron_Schlorff','Schlorff');
const LewisPaintings = createAristArray ('Ryan_Lewis','Lewis');
const MeiPaintings = createAristArray ('Yie_Mei','Mei');

const artistImageArray = PessaniPaintings.concat(StratulatPaintings,WexlerPaintings,BraquePaintings,
SeuratPaintings,CrossPaintings,HawkinsPaintings,MylreaPaintings,JurasPaintings,SchlorffPaintings,
LewisPaintings,MeiPaintings);

//4 decide which 3 of 6 paintings for each artist will be used as training images
var PessaniTraining  = jsPsych.randomization.shuffle(PessaniPaintings.slice(0,3));
var StratulatTraining = jsPsych.randomization.shuffle(StratulatPaintings.slice(0,3));
var WexlerTraining   = jsPsych.randomization.shuffle(WexlerPaintings.slice(0,3));

var BraqueTraining =   jsPsych.randomization.shuffle(BraquePaintings.slice(0,3));
var SeuratTraining =   jsPsych.randomization.shuffle(SeuratPaintings.slice(0,3));
var CrossTraining  =   jsPsych.randomization.shuffle(CrossPaintings.slice(0,3));

var HawkinsTraining = jsPsych.randomization.shuffle(HawkinsPaintings.slice(0,3));
var MylreaTraining  = jsPsych.randomization.shuffle(MylreaPaintings.slice(0,3));
var JurasTraining   = jsPsych.randomization.shuffle(JurasPaintings.slice(0,3));

var SchlorffTraining = jsPsych.randomization.shuffle(SchlorffPaintings.slice(0,3));
var LewisTraining    = jsPsych.randomization.shuffle(LewisPaintings.slice(0,3));
var MeiTraining      = jsPsych.randomization.shuffle(MeiPaintings.slice(0,3));

var trainingPaintings =
  {
   "Bruno Pessani":    PessaniTraining,
   "Ciprian Stratulat": StratulatTraining,
   "George Wexler":    WexlerTraining,

   "Georges Braque":   BraqueTraining,
   "Georges Seurat":   SeuratTraining,
   "Henri-Edmond Cross":CrossTraining,

   "Judy Hawkins":     HawkinsTraining,
   "Marilyn Mylrea":   MylreaTraining,
   "Philip Juras":     JurasTraining,

   "Ron Schlorff":     SchlorffTraining,
   "Ryan Lewis":       LewisTraining,
   "Yie Mei":          MeiTraining
 }

//3. divide 12 artists into 4 sets of 3 artists
const artistArray_a = ['Henri-Edmond Cross', 'Ron Schlorff', 'Marilyn Mylrea']
const artistArray_b = ['Bruno Pessani', 'Yie Mei', 'Philip Juras']
const artistArray_c = ['Ciprian Stratulat', 'Judy Hawkins', 'Ryan Lewis']
const artistArray_d = ['Georges Seurat', 'George Wexler', 'Georges Braque']


var artistsArray = [];
if (subjectNum%4 == 0){
  artistsArray = [artistArray_a,artistArray_b,artistArray_c,artistArray_d];
} else if (subjectNum%4 == 1){
  artistsArray = [artistArray_b,artistArray_c,artistArray_d,artistArray_a];
} else if (subjectNum%4 == 2){
  artistsArray = [artistArray_c,artistArray_d,artistArray_a,artistArray_b];
} else {
  artistsArray = [artistArray_d,artistArray_a,artistArray_b,artistArray_c];
}

var trials = createTrials();
var colorArtists = artistsArray[0];
var horizonArists = artistsArray[1];
var entryArtists = artistsArray[2];
var mixArtists = artistsArray[3];


var horizonInstruction = "<p>Is there a smooth or abrupt transition between earth and sky in the painting?</p>"+"<p>Artist: ";
var entryInstruction = "<p>What is the 'entry point' that leads you into the painting?</p>"+"<p>Artist: ";
var colorInstruction = "<p>What is the dominant color palette in the painting?</p>"+"<p>Artist: ";

var experiment = [];

for (i=0; i<36; i++){
  var conditions = trials[i];

  if((0<=i&&i<=3)||(12<=i&&i<=15)||(24<=i&&i<=27)){
    if (!isUpperCaseCharCode(conditions)){
      var artistname = mixArtists[0];
    } else if (conditions=='C'){
        var artistname = colorArtists[0];
      //var paintingIndex = 1;//first painting "Artist1"
      //how to know which picture is used=>use stimulus
    } else if (conditions=='H'){
        var artistname = horizonArists[0];
    } else{
        var artistname = entryArtists[0];
    }
  }else if((4<=i&&i<=7)||(16<=i&&i<=19)||(28<=i&&i<=31)){
    if (!isUpperCaseCharCode(conditions)){
      var artistname = mixArtists[1];
    } else if (conditions=='C'){
        var artistname = colorArtists[1];
    } else if (conditions=='H'){
        var artistname = horizonArists[1];
    } else{
        var artistname = entryArtists[1];
    }
  }else{
    if (!isUpperCaseCharCode(conditions)){
      var artistname = mixArtists[2];
    } else if (conditions=='C'){
        var artistname = colorArtists[2];
    } else if (conditions=='H'){
        var artistname = horizonArists[2];
    } else{
        var artistname = entryArtists[2];
    }
  }


    //instructions
    if (conditions.toUpperCase()=='C'){
        var instructions = colorInstruction + artistname + "</p>"
    } else if (conditions.toUpperCase()=='H'){
        var instructions = horizonInstruction + artistname + "</p>"
    } else if (conditions.toUpperCase()=='E'){
        var instructions = entryInstruction + artistname + "</p>"
    } else {}

    //stimulus
    var trainingPainting = trainingPaintings[artistname];
    if (0<=i&&i<=11){
      //var stimulus = "<img src=" + trainingPainting[0] + ">";
      var stimulus = trainingPainting[0];
    }else if (12<=i&&i<=23){
      //var stimulus = "<img src=" + trainingPainting[1] + ">";
      var stimulus = trainingPainting[1];
    }else{
      //var stimulus = "<img src=" + trainingPainting[2] + ">";
      var stimulus = trainingPainting[2];
    }

  experiment.push({stimulus:stimulus,
    data:{test_part:'training',artist:artistname, condition: conditions},
    instruction:instructions})
}

//test ends



//testlogistics
var PessaniTesting  = PessaniPaintings.slice(3,6);
var StratulatTesting = StratulatPaintings.slice(3,6);
var WexlerTesting   = WexlerPaintings.slice(3,6);

var BraqueTesting  =   BraquePaintings.slice(3,6);
var SeuratTesting  =   SeuratPaintings.slice(3,6);
var CrossTesting   =   CrossPaintings.slice(3,6);

var HawkinsTesting = HawkinsPaintings.slice(3,6);
var MylreaTesting  = MylreaPaintings.slice(3,6);
var JurasTesting   = JurasPaintings.slice(3,6);

var SchlorffTesting = SchlorffPaintings.slice(3,6);
var LewisTesting    = LewisPaintings.slice(3,6);
var MeiTesting      = MeiPaintings.slice(3,6);

var testingPaintings =
  {
   "Bruno Pessani":    PessaniTesting,
   "Ciprian Stratulat": StratulatTesting,
   "George Wexler":    WexlerTesting,

   "Georges Braque":   BraqueTesting,
   "Georges Seurat":   SeuratTesting,
   "Henri-Edmond Cross":CrossTesting,

   "Judy Hawkins":     HawkinsTesting,
   "Marilyn Mylrea":   MylreaTesting,
   "Philip Juras":     JurasTesting,

   "Ron Schlorff":     SchlorffTesting,
   "Ryan Lewis":       LewisTesting,
   "Yie Mei":          MeiTesting
 }

var testing1 = [];//old paintings
var testing2 = [];
var testing3 = [];

for (i=0; i<experiment.length; i++){
  var artistname = experiment[i].data.artist;
  var conditions = experiment[i].data.condition;
  var oldStimulus = experiment[i].stimulus;

  if(0<=i&&i<=11){
    var newStimulus = testingPaintings[artistname][0];
    testing1.push({stimulus:oldStimulus,data:{haveseen:'y',artist:artistname, condition: conditions}});
    testing1.push({stimulus:newStimulus,data:{haveseen:'n',artist:artistname, condition: conditions}});

    //no testing
  }else if(12<=i&&i<=23){
    var newStimulus = testingPaintings[artistname][1];
    testing2.push({stimulus:oldStimulus,data:{haveseen:'y',artist:artistname, condition: conditions}});
    testing2.push({stimulus:newStimulus,data:{haveseen:'n',artist:artistname, condition: conditions}});
    //empty
  }else{
    var newStimulus = testingPaintings[artistname][2];
    testing3.push({stimulus:oldStimulus,data:{haveseen:'y',artist:artistname, condition: conditions}});
    testing3.push({stimulus:newStimulus,data:{haveseen:'n',artist:artistname, condition: conditions}});
  }
}

//unspecified
var testing = jsPsych.randomization.shuffle(testing1).concat(
  jsPsych.randomization.shuffle(testing2)).concat(
  jsPsych.randomization.shuffle(testing3));
