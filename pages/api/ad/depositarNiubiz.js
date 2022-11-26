

export default function handler(req, res) {
      // const { token, amount, orderid, ref_code } = req.query
    if (req.method === 'POST') {
      // resolve params from url 
      const { token, amount, orderid, ref_code, user_id } = req.query
      const transactionToken = req.body.transactionToken
       //show the request body
       res.redirect(301,`http://localhost:3000/paymentSuccess?transactionToken=${transactionToken}&token=${token}&amount=${amount}&orderid=${orderid}&ref_code=${ref_code}`);
         
       //redict to success page 
      } else {
        // Handle erorrs
        res.status(500).json({ message: 'Something went wrong' })
      }

}
