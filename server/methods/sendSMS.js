var twilioClient = new Twilio({
  from: Meteor.settings.TWILIO.FROM,
  sid: Meteor.settings.TWILIO.SID,
  token: Meteor.settings.TWILIO.TOKEN
});


Meteor.methods({
  // smsParameters should contain
  // smsParameters.to - SMS to phone number
  // smsParameters.message - SMS message
  'sendSMS': function (appUUID, smsParameters) {
    var smsResult = {};
    for (var optsKey in smsParameters)
    {
      console.log(appUUID + ":sendSMS:" + optsKey + "=" + smsParameters[optsKey]);
    }
    // for (twilioClientKey in twilioClient)
    // {
    //   console.log(appUUID + ":sendSMS:" + twilioClientKey + "=" + twilioClient[twilioClientKey]);
    // }

        twilioClient.sendSMS({
            to: smsParameters.to,         
            from: twilioClient.from,      
            body: smsParameters.message  
        }, function(err, responseData) { 
            smsResult.status = ilendbooks.public.status.SUCCESS
            smsResult.responseData = responseData;
            smsResult.err = err;
            if (!err) {   
              for (responseDataKey in responseData)
              {
                console.log(appUUID + ":sendSMS:" + tresponseDataKey + "=" + responseData[responseDataKey]);
              }          
            } else {
              smsResult.status = ilendbooks.public.status.FAILED
              console.log(appUUID + ":sendSMS" + "Oops, something is wrong sending sms... ", err);
              for (errKey in err) {
                console.log(appUUID + ":sendSMS" + errKey + "="+ err[errKey]);
              }
            }
        });
    return smsResult;
  }
});