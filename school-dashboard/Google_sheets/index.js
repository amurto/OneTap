const {google} = require('googleapis');
const keys = require('./keys.json');

const client = new google.auth.JWT(
    keys.client_email,
    null, 
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets.readonly']    
);

client.authorize(function(err,token){
    if(err){
        console.log("Error");
        return;
    }
    else{
        console.log("Connected");
        gsrun(client);
    }
})

async function gsrun(cl){
    const gsapi = google.sheets({version:'v4',auth:cl});

    const opt = {
        spreadsheetId:'1k9tBkOikyJlcemQx467IudC5rzuhVsL4YIb6hJP0Il8',
        range: 'A1:M2'
    }
    let data = await gsapi.spreadsheets.values.get(opt);
    console.log(data.data.values);



    
}