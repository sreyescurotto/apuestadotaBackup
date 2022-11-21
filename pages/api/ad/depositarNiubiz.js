

export default function handler(req, res) {


    if (req.method === 'POST') {
      // resolve params from url 
      const { token, amount, orderid, api_token, ref_code } = req.query
      const transactionToken = req.body.transactionToken
      res.status(200).json({ message: 'success' });
       //show the request body
        res.redirect(`http://localhost:3000/paymentSuccess?transactionToken=${transactionToken}&token=${token}&amount=${amount}&orderid=${orderid}&api_token=${api_token}&ref_code=${ref_code}`);
        
      } else {
        // Handle erorrs
        res.status(500).json({ message: 'Something went wrong' })
      }


      return (
        <h1> Loading ...</h1>
      )
}
