import nodemailer from 'nodemailer'
import mustache from 'mustache'

const Gmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'womanrpl@gmail.com',
    pass: process.env.EMAIL_SECRET
  }
})

const mailOptions = {
  from: 'womanrpl@gmail.com'
}

const sendMailProjectCreated = async payload => {
  const template =
    '<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title></head><body> <!-- © 2018 Shift Technologies. All rights reserved. --> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable"> <tbody> <tr> <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px"> <tbody> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;"> <tbody> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td> </tr> <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableHeader"> </td> </tr> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="imgHero"> <a href="#" style="text-decoration:none" target="_blank"> <img alt="" border="0" src={{logo}} style="width:30%;max-width:600px;height:auto;display:block;color: #f9f9f9;" width="0"> </a> </td> </tr> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> New Project </span> </h4> </td> </tr> <tr> <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle"> <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> You have been invited to a new project </td> </tr> <!-- meeting detaill --> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h3 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> {{title}} </span> </h3> </td> </tr> <!-- start and end date --> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> <span> Start Date : {{startdate}} </span> </h4> </td> </tr> <tr> <td style="padding-bottom: 35px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> <span> End Date : {{enddate}} </span> </h4> </td> <tr > <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> <span> Description </span> </h4> </td> </tr> <tr> <td style="padding-bottom: 20px; padding-left: 80px; padding-right: 80px;" align="center" valign="top" class="subTitle"> <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> {{description}} </td> </tr> <!-- attachment --> <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton" > <tbody> <tr> <td style="padding-top:20px;padding-bottom:20px" align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" align="center"> <tbody> <tr> <td style="background-color: #EB891B; padding: 12px 35px; border-radius: 50px;" align="center" class="ctaButton"> <a href={{link}} style="color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-transform:uppercase;text-decoration:none;display:block" target="_blank" class="text"> Project Detail </a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td> </tr> <tr> <!-- simple footer copyright --> <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription"> <tbody> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> <p class="text" style="color:#666;font-family:"Open Sans" ,Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0"> © 2022 Woman App </p> </td> </tr> </tbody> </table> </td> </tr> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table></body></html>'

  payload.logo = 'cid:womanrpl@gmail.com'

  const mail = {
    to: payload.to,
    from: payload.from,
    subject: payload.subject,
    html: mustache.render(template, { ...payload }),
    attachments: [
      {
        filename: 'logo.png',
        path: `${process.env.BASE_URL}/images/logo.png`,
        cid: 'womanrpl@gmail.com'
      }
    ]
  }

  Gmail.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

const sendMailNewParticipantAdded = async payload => {
  const template =
    '<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title></head><body> <!-- © 2018 Shift Technologies. All rights reserved. --> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable"> <tbody> <tr> <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px"> <tbody> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;"> <tbody> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td> </tr> <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableHeader"> </td> </tr> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="imgHero"> <a href="#" style="text-decoration:none" target="_blank"> <img alt="" border="0" src={{logo}} style="width:30%;max-width:600px;height:auto;display:block;color: #f9f9f9;" width="0"> </a> </td> </tr> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> New Project </span> </h4> </td> </tr> <tr> <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle"> <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> You have been invited to a new project </td> </tr> <!-- meeting detaill --> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h3 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> {{title}} </span> </h3> </td> </tr> <!-- start and end date --> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> <span> Start Date : {{startdate}} </span> </h4> </td> </tr> <tr> <td style="padding-bottom: 35px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> <span> End Date : {{enddate}} </span> </h4> </td> <tr > <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> <span> Description </span> </h4> </td> </tr> <tr> <td style="padding-bottom: 20px; padding-left: 80px; padding-right: 80px;" align="center" valign="top" class="subTitle"> <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> {{description}} </td> </tr> <!-- attachment --> <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton" > <tbody> <tr> <td style="padding-top:20px;padding-bottom:20px" align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" align="center"> <tbody> <tr> <td style="background-color: #EB891B; padding: 12px 35px; border-radius: 50px;" align="center" class="ctaButton"> <a href={{link}} style="color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-transform:uppercase;text-decoration:none;display:block" target="_blank" class="text"> Project Detail </a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td> </tr> <tr> <!-- simple footer copyright --> <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription"> <tbody> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> <p class="text" style="color:#666;font-family:"Open Sans" ,Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0"> © 2022 Woman App </p> </td> </tr> </tbody> </table> </td> </tr> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table></body></html>'

  payload.logo = 'cid:womanrpl@gmail.com'

  const mail = {
    to: payload.to,
    from: payload.from,
    subject: payload.subject,
    html: mustache.render(template, { ...payload }),
    attachments: [
      {
        filename: 'logo.png',
        path: `${process.env.BASE_URL}/images/logo.png`,
        cid: 'womanrpl@gmail.com'
      }
    ]
  }

  Gmail.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

const sendMailMeetCreated = async payload => {
  const template =
    '<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title></head><body> <!-- © 2018 Shift Technologies. All rights reserved. --> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable"> <tbody> <tr> <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px"> <tbody> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;"> <tbody> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td> </tr> <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableHeader"> </td> </tr> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="imgHero"> <a href="#" style="text-decoration:none" target="_blank"> <img alt="" border="0" src={{logo}} style="width:30%;max-width:600px;height:auto;display:block;color: #f9f9f9;" width="0"> </a> </td> </tr> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> New Meeting </span> </h4> </td> </tr> <tr> <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle"> <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> You have been invited to join a meeting </h4> </td> </tr> <!-- meeting detaill --> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h3 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> {{title}} </span> </h3> </td> </tr> <!-- tanggal dan jam --> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> {{startdate}}, {{starttime}} - {{endtime}} </span> </h2> </td> </tr> <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" > <tbody> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> <p class="text" style="color:#666;font-family:"Open Sans",Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0"> to join the meeting, click the button below </p> </td> </tr> </tbody> </table> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton"> <tbody> <tr> <td style="padding-top:20px;padding-bottom:20px" align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" align="center"> <tbody> <tr> <td style="background-color: #EB891B; padding: 12px 35px; border-radius: 50px;" align="center" class="ctaButton"> <a href={{link}} style="color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-transform:uppercase;text-decoration:none;display:block" target="_blank" class="text">Join Meeting</a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td> </tr> <tr> <!-- simple footer copyright --> <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" > <tbody> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> <p class="text" style="color:#666;font-family:"Open Sans",Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0"> © 2022 Woman App </p> </td> </tr> </tbody> </table> </td> </tr> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table></body></html>'

  payload.logo = 'cid:womanrpl@gmail.com'

  const mail = {
    to: payload.to,
    from: payload.from,
    subject: payload.subject,
    html: mustache.render(template, { ...payload }),
    attachments: [
      {
        filename: 'logo.png',
        path: `${process.env.BASE_URL}/images/logo.png`,
        cid: 'womanrpl@gmail.com'
      }
    ]
  }

  Gmail.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

const sendMailTaskAssigned = async payload => {
  const template =
    '<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title></head><body> <!-- © 2018 Shift Technologies. All rights reserved. --> <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable"> <tbody> <tr> <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px"> <tbody> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;"> <tbody> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td> </tr> <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableHeader"> </td> </tr> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="imgHero"> <a href="#" style="text-decoration:none" target="_blank"> <img alt="" border="0" src={{logo}} style="width:30%;max-width:600px;height:auto;display:block;color: #f9f9f9;" width="0"> </a> </td> </tr> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> {{username}} </span> </h4> </td> </tr> <tr> <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle"> <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> You have been assigned to a task </td> </tr> <!-- task priority level --> <tr> <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle"> <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:22px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0;text-transform: uppercase;"> <span style="color: #EB891B;"> {{priority}} priority </span> </td> </tr> <tr> <td style="padding-bottom: 15px; padding-left: 80px; padding-right: 80px;" align="center" valign="top" class="mainTitle"> <h3 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0;text-transform: capitalize;"> <span> {{title}} </span> </h3> </td> </tr> <!-- start and end date --> <tr> <td style="padding-bottom: 25px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> <span> Deadline : {{duedate}} </span> </h4> </td> </tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> <span> Description </span> </h4> </td> </tr> <tr> <td style="padding-bottom: 20px; padding-left: 80px; padding-right: 80px;" align="center" valign="top" class="subTitle"> <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:300;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> {{description}} </td> </tr> <!-- attachment --> <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton"> <tbody> <tr> <td style="padding-top:20px;padding-bottom:20px" align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" align="center"> <tbody> <tr> <td style="background-color: #EB891B; padding: 12px 35px; border-radius: 50px;" align="center" class="ctaButton"> <a href={{link}} style="color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-transform:uppercase;text-decoration:none;display:block" target="_blank" class="text"> Open Task </a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td> </tr> <tr> <!-- simple footer copyright --> <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription"> <tbody> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> <p class="text" style="color:#666;font-family:"Open Sans",Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0"> © 2022 Woman App </p> </td> </tr> </tbody> </table> </td> </tr> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp; </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table></body></html>'

  payload.logo = 'cid:womanrpl@gmail.com'

  const mail = {
    to: payload.to,
    from: payload.from,
    subject: payload.subject,
    html: mustache.render(template, { ...payload }),
    attachments: [
      {
        filename: 'logo.png',
        path: `${process.env.BASE_URL}/images/logo.png`,
        cid: 'womanrpl@gmail.com'
      }
    ]
  }

  Gmail.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

const sendMailTaskComment = async payload => {
  const template =
    '<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title></head><body> <!-- © 2018 Shift Technologies. All rights reserved. --> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable"> <tbody> <tr> <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px"> <tbody> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;"> <tbody> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td> </tr> <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableHeader"> </td> </tr> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="imgHero"> <a href="#" style="text-decoration:none" target="_blank"> <img alt="" border="0" src={{logo}} style="width:30%;max-width:600px;height:auto;display:block;color: #f9f9f9;" width="0"> </a> </td> </tr> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> New comment </span> </h4> </td> </tr> <tr> <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle"> <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> <!-- got comment --> <span> Someone has commented on your work </span> </td> </tr> <tr> <td style="padding-bottom: 10px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> <!-- got comment --> <span> {{user}} says, </span> </td> </tr> <tr> <td style="padding-bottom: 10px; padding-left: 80px; padding-right: 80px;" align="center" valign="top" class="subTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> <!-- got comment --> <span> {{comment}} </span> </td> </tr> <tr> <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle"> <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> <!-- got comment --> <span> <a href={{link}} style="color:#EB891B;font-style: italic;font-size:18px;" target="_blank"> Click here for detail </a> </span> </td> </tr> </tr> <tr> <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td> </tr> <tr> <!-- simple footer copyright --> <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" > <tbody> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> <p class="text" style="color:#666;font-family:\'Open Sans\',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0"> © 2022 Woman App </p> </td> </tr> </tbody> </table> </td> </tr> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp; </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table></body></html>'

  payload.logo = 'cid:womanrpl@gmail.com'

  const mail = {
    to: payload.to,
    from: payload.from,
    subject: payload.subject,
    html: mustache.render(template, { ...payload }),
    attachments: [
      {
        filename: 'logo.png',
        path: `${process.env.BASE_URL}/images/logo.png`,
        cid: 'womanrpl@gmail.com'
      }
    ]
  }

  Gmail.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}


const sendMailTaskSubmitted = async (payload) => {
  const template ='<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title></head><body> <!-- © 2018 Shift Technologies. All rights reserved. --> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable"> <tbody> <tr> <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px"> <tbody> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;"> <tbody> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td> </tr> <tr> <td> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableHeader"> </td> </tr> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="imgHero"> <a href="#" style="text-decoration:none" target="_blank"> <img alt="" border="0" src={{logo}} style="width:30%;max-width:600px;height:auto;display:block;color: #f9f9f9;" width="0"> </a> </td> </tr> <tr> <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0"> <span> {{leader}} </span> </h4> </td> </tr> <tr> <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle"> <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:18px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> <span> {{user}} </span> <span> has submitted for a task </span> </td> </tr> <tr > <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle"> <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> <span> Task Title : </span> </h4> </td> </tr> <tr> <td style="padding-bottom: 25px; padding-left: 80px; padding-right: 80px;" align="center" valign="top" class="mainTitle"> <h3 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0;text-transform: capitalize;"> <span> {{title}} </span> </h3> </td> </tr> <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle"> <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> <span> <a href={{link}}style="color:#EB891B;font-style: italic;font-size:16px;" target="_blank"> Click here for detail </a> </span> </td> </tr> </tr> <tr> <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td> </tr> <tr> <!-- simple footer copyright --> <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"> <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription"> <tbody> <tr> <td style="padding-bottom: 20px;" align="center" valign="top" class="description"> <p class="text" style="color:#666;font-family:"Open Sans",Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0"> © 2022 Woman App </p> </td> </tr> </tbody> </table> </td> </tr> <tr> <td style="background-color:#EB891B;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp; </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table></body></html>'

  payload.logo = 'cid:womanrpl@gmail.com'

  const mail = {
    to: payload.to,
    from: payload.from,
    subject: payload.subject,
    html: mustache.render(template, { ...payload }),
    attachments: [
      {
        filename: 'logo.png',
        path: `${process.env.BASE_URL}/images/logo.png`,
        cid: 'womanrpl@gmail.com'
      }
    ]
  }

  Gmail.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

const sendMailTaskStatus = (payload) => {
  // const template
  payload.logo = 'cid:womanrpl@gmail.com'

  const mail = {
    to: payload.to,
    from: payload.from,
    subject: payload.subject,
    html: mustache.render(template, { ...payload }),
    attachments: [
      {
        filename: 'logo.png',
        path: `${process.env.BASE_URL}/images/logo.png`,
        cid: 'womanrpl@gmail.com'
      }
    ]
  }

  Gmail.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}



export {
  sendMailProjectCreated,
  sendMailMeetCreated,
  sendMailTaskAssigned,
  sendMailTaskComment,
  sendMailNewParticipantAdded,
  sendMailTaskSubmitted,
  sendMailTaskStatus,
  Gmail,
  mailOptions
}
