const {google} = require('googleapis');
const keys = require('./keys.json');
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

var sum_code=0;
var sum_dance=0;
var sum_drama=0;
var sum_publicS=0;
var sum_music=0;
var sum_elec=0;
var sum_visualA=0;
var sum_frisbee=0;
var sum_schoolM=0;
var sentiment = {};

const client = new google.auth.JWT(
    keys.client_email,
    null, 
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets.readonly']    
);
function sentimentAnalysis(mydocx,sum){
    var arr = new Array(mydocx.length);
    // var sum = 0;
    mydocx.forEach(function(s){
        console.log(sentiment.analyze(s));
        sum = sum + sentiment.analyze(s).score;
        // arr.push(sentiment.analyze(s).score);
    })
    sum = sum / mydocx.length;
    return sum;
}
client.authorize(function(err,token){
    if(err){
        console.log("Error");
        return;
    }
    else{
        console.log("Connected");

        gsrun1(client),
        gsrun2(client),
        gsrun3(client),
        gsrun4(client),
        gsrun5(client),
        gsrun6(client),
        gsrun7(client),
        gsrun8(client),
        gsrun9(client)

    }
})

async function gsrun1(cl){
    const gsapi = google.sheets({version:'v4',auth:cl});

    const opt = {
        spreadsheetId:'1vhVR5p84aEnKHneK4-UMaJ4j8skSS9MBVfMgRUGPuAk',
        range: 'C2:C5'
    }
    let code = await gsapi.spreadsheets.values.get(opt);
    // console.log(code.data.values);
    var coding = code.data.values;
    function get1DArray(arr){
        return arr.join().split(",");
    }    
    coding = get1DArray(coding);
    console.log(coding)
    sum_code = sentimentAnalysis(coding,sum_code);
    console.log(sum_code);
    var sentment =
    return sum_code;
}

async function gsrun2(cl){
    const gsapi = google.sheets({version:'v4',auth:cl});

    const opt = {
        spreadsheetId:'1vhVR5p84aEnKHneK4-UMaJ4j8skSS9MBVfMgRUGPuAk',
        range: 'D2:D5'
    }
    let code = await gsapi.spreadsheets.values.get(opt);
    // console.log(code.data.values);
    var dance = code.data.values;
    function get1DArray(arr){
        return arr.join().split(",");
    }    
    dance = get1DArray(dance);
    console.log(dance)
    sum_dance = sentimentAnalysis(dance,sum_dance);
    console.log(sum_dance);
    return sum_dance;
}


async function gsrun3(cl){
    const gsapi = google.sheets({version:'v4',auth:cl});

    const opt = {
        spreadsheetId:'1vhVR5p84aEnKHneK4-UMaJ4j8skSS9MBVfMgRUGPuAk',
        range: 'E2:E5'
    }
    let code = await gsapi.spreadsheets.values.get(opt);
    // console.log(code.data.values);
    var drama = code.data.values;
    function get1DArray(arr){
        return arr.join().split(",");
    }    
    drama = get1DArray(drama);
    console.log(drama)
    sum_drama = sentimentAnalysis(drama,sum_drama);
    console.log(sum_drama);
    return sum_drama;
}

async function gsrun4(cl){
    const gsapi = google.sheets({version:'v4',auth:cl});

    const opt = {
        spreadsheetId:'1vhVR5p84aEnKHneK4-UMaJ4j8skSS9MBVfMgRUGPuAk',
        range: 'F2:F5'
    }
    let code = await gsapi.spreadsheets.values.get(opt);
    // console.log(code.data.values);
    var publicS = code.data.values;
    function get1DArray(arr){
        return arr.join().split(",");
    }    
    publicS = get1DArray(publicS);
    console.log(publicS)
    sum_publicS = sentimentAnalysis(publicS,sum_publicS);
    console.log(sum_publicS);
    return sum_publicS;
}

async function gsrun5(cl){
    const gsapi = google.sheets({version:'v4',auth:cl});

    const opt = {
        spreadsheetId:'1vhVR5p84aEnKHneK4-UMaJ4j8skSS9MBVfMgRUGPuAk',
        range: 'G2:G5'
    }
    let code = await gsapi.spreadsheets.values.get(opt);
    // console.log(code.data.values);
    var music = code.data.values;
    function get1DArray(arr){
        return arr.join().split(",");
    }    
    music = get1DArray(music);
    console.log(music)
    sum_music = sentimentAnalysis(music,sum_music);
    console.log(sum_music);
    return sum_music;
}

async function gsrun6(cl){
    const gsapi = google.sheets({version:'v4',auth:cl});

    const opt = {
        spreadsheetId:'1vhVR5p84aEnKHneK4-UMaJ4j8skSS9MBVfMgRUGPuAk',
        range: 'H2:H5'
    }
    let code = await gsapi.spreadsheets.values.get(opt);
    // console.log(code.data.values);
    var electronic = code.data.values;
    function get1DArray(arr){
        return arr.join().split(",");
    }    
    electronic = get1DArray(electronic);
    console.log(electronic)
    sum_elec = sentimentAnalysis(electronic,sum_elec);
    console.log(sum_elec);
    return sum_elec;
}

async function gsrun7(cl){
    const gsapi = google.sheets({version:'v4',auth:cl});

    const opt = {
        spreadsheetId:'1vhVR5p84aEnKHneK4-UMaJ4j8skSS9MBVfMgRUGPuAk',
        range: 'I2:I5'
    }
    let code = await gsapi.spreadsheets.values.get(opt);
    // console.log(code.data.values);
    var visualA = code.data.values;
    function get1DArray(arr){
        return arr.join().split(",");
    }    
    visualA = get1DArray(visualA);
    console.log(visualA)
    sum_visualA = sentimentAnalysis(visualA,sum_visualA);
    console.log(sum_visualA);
    return sum_visualA;
}

async function gsrun8(cl){
    const gsapi = google.sheets({version:'v4',auth:cl});

    const opt = {
        spreadsheetId:'1vhVR5p84aEnKHneK4-UMaJ4j8skSS9MBVfMgRUGPuAk',
        range: 'J2:J5'
    }
    let code = await gsapi.spreadsheets.values.get(opt);
    // console.log(code.data.values);
    var frisbee = code.data.values;
    function get1DArray(arr){
        return arr.join().split(",");
    }    
    frisbee = get1DArray(frisbee);
    console.log(frisbee)
    sum_frisbee =  sentimentAnalysis(frisbee,sum_frisbee);
    console.log(sum_frisbee);
    return sum_frisbee;
}

async function gsrun9(cl){
    const gsapi = google.sheets({version:'v4',auth:cl});

    const opt = {
        spreadsheetId:'1vhVR5p84aEnKHneK4-UMaJ4j8skSS9MBVfMgRUGPuAk',
        range: 'K2:K5'
    }
    let code = await gsapi.spreadsheets.values.get(opt);
    // console.log(code.data.values);
    var schoolM = code.data.values;
    function get1DArray(arr){
        return arr.join().split(",");
    }    
    schoolM = get1DArray(schoolM);
    console.log(schoolM)
    sum_schoolM = sentimentAnalysis(schoolM,sum_schoolM);
    console.log(sum_schoolM);
    return sum_schoolM;
}

console.log(sentiment);

// module.exports = sentiment;