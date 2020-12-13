const { default: Axios } = require('axios')
const nodeMailer = require('nodemailer')
const shcedule = require('node-schedule')
const moment = require('moment')
const rainbowUrl = `https://chp.shadiao.app/api.php`
// 你的邮箱
const fromAccount = {
    email: 'xxx@qq.com',
    pass: '', //qq邮箱授权码，非qq账号密码，例如：kidvbpmskvkabbgd
  }

// 要发送的邮箱
const toAccount = {
  email: 'xxx@qq.com'
}

// 生成彩虹屁&发送（彩虹屁🌈🌈🌈）
async function sendHoneyWords() {
  const { data } = await Axios.get(rainbowUrl)
  sendMail(
    `🌈🌈🌈 ${data} 🦄🦄🦄\n
    <hr style="border: 1px solid #eee;margin:0;padding:0;"/>
    <p style="margin:0;padding:0;text-align:right;">${moment(new Date()).format("YYYY-MM-DD")}</p>
    <p style="margin:0;padding:0;text-align:right;">: )</p>`
    )
}

// 发送邮件主体
async function sendMail(text) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodeMailer.createTransport({
    host: "smtp.qq.com",
    port: 587,
    secure: false,
    auth: {
      user: fromAccount.email,
      pass: fromAccount.pass
    }
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `from黑土 to白云<${fromAccount.email}>`,
    to: `白云<${toAccount.email}>`,
    subject: `您今日的新鲜彩虹屁已送达 : ) `,
    text
  })

  console.log(`发送成功! ${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}`)
}

shcedule.scheduleJob({ hour: 9, minute: 0 }, function() {
  sendHoneyWords()
})
