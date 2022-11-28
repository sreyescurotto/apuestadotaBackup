import excuteQuery from "../../../lb/db";

export default async function handler(req, res) {
    const { user_id, amount, orderid, ref_code, card, brand, trans_date } = req.body;
   try {
        const result = await excuteQuery({
            query: 'INSERT INTO deposito (concepto, usuario_id, monto, ref_code, tipo, estado, proveedor, orden_id, tarjeta_marca, tarjeta_numero, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            values: ['DEPÓSITO', user_id, amount, ref_code, 1, 1, 'izipay', orderid, brand, card, trans_date ]
            });

        const result2 = await excuteQuery({
            query: 'UPDATE usuario SET balance = balance + ? WHERE id = ?',
            values: [amount, user_id]
            });
       

            res.status(200).json({ message: 'success' });
    } catch ( error ) {
        console.log( error );
    }

//  res.status(200).json(req.body.user_id);
}