import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const productId = Number(formData.get('product_id'))

    if (!productId) {
      return NextResponse.json({ error: 'Missing product_id' }, { status: 400 })
    }

    const base = process.env.WP_URL
    if (!base) {
      return NextResponse.json({ error: 'WP_URL not configured' }, { status: 500 })
    }

    const auth = Buffer.from(
      `${process.env.WC_KEY}:${process.env.WC_SECRET}`
    ).toString('base64')

    // Minimal order creation skeleton: 1 line item for the productId, qty 1
    const res = await fetch(`${base}/wp-json/wc/v3/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        line_items: [{ product_id: productId, quantity: 1 }],
        payment_method: 'razorpay',
        payment_method_title: 'Razorpay',
        set_paid: false
      })
    })

    if (!res.ok) {
      const msg = await res.text()
      return NextResponse.json({ error: 'Failed to create order', details: msg }, { status: 500 })
    }

    const order = await res.json()
    // Woo returns an order object. For redirect flows, we can craft a pay URL:
    // /checkout/order-pay/<order_id>/?pay_for_order=true&key=<order_key>
    const payUrl = `${base}/checkout/order-pay/${order.id}/?pay_for_order=true&key=${order.order_key}`

    return NextResponse.json({ orderId: order.id, payUrl })
  } catch (err: any) {
    return NextResponse.json({ error: 'Unexpected error', message: err?.message }, { status: 500 })
  }
}


