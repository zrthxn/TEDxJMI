const crypto = require('crypto')

exports.launchPortal = (payment, userdata, callbacks) => {
  console.log(userdata)
  console.log(payment)

  window.bolt.launch({
    key: payment.key,
    txnid: payment.txnid,
    hash: generatePaymentHash(payment, userdata),
    amount: payment.amount,
    firstname: (userdata.name).split(' ')[0],
    email: userdata.email,
    phone: userdata.phone,
    productinfo: userdata.productinfo,
    // udf1: 'Heelo',
    surl : '/_payment/success',
    furl: '/_payment/failure'
  },
  { 
    responseHandler: callbacks.responseHandler,
    catchException: callbacks.catchException
  })
}

function generatePaymentHash(payment, userdata) {
  const hashSequence = `${payment.key}|${payment.txnid}|${payment.amount}|` + 
    `${userdata.productinfo}|${(userdata.name).split(' ')[0]}|${userdata.email}|` + 
    `||||||||||` + 
    // `udf1|udf2|udf3|udf4|udf5||||||` + 
    `${payment.salt}`

  const hash = crypto.createHash('sha512').update(hashSequence).digest('hex')
  return hash
}