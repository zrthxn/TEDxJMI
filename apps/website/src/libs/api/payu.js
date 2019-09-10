const crypto = require('crypto')

exports.launchPortal = (payment, userdata, callbacks) => {
  window.bolt.launch({
    key: payment.key,
    txnid: payment.txnid,
    hash: generatePaymentHash(payment, userdata),
    amount: payment.amount,
    firstname: (userdata.name).split(' ')[0],
    email: userdata.email,
    phone: userdata.phone,
    productinfo: userdata.info,
    // udf1: 'Heelo',
    surl : '/_payments/verify',
    furl: '/_payments/verify'
  },
  { 
    responseHandler: callbacks.responseHandler,
    catchException: callbacks.catchException
  })
}

function generatePaymentHash(payment, userdata) {
  const hashSequence = `${payment.key}|${payment.txnid}|${payment.amount}|` + 
    `${userdata.info}|${(userdata.name).split(' ')[0]}|${userdata.email}|` + 
    `||||||||||` + 
    // `udf1|udf2|udf3|udf4|udf5||||||` + 
    `${payment.salt}`

  const hash = crypto.createHash('sha512').update(hashSequence).digest('hex')
  return hash
}