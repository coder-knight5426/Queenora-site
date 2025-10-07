import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const search = searchParams.get('search')
  const category = searchParams.get('category')
  const perPage = searchParams.get('per_page')
  const qp = new URLSearchParams()
  if (search) qp.set('search', search)
  if (category) qp.set('category', category)
  if (perPage) qp.set('per_page', perPage)

  const base = `${process.env.WP_URL}/wp-json/wc/v3/products`
  const url = qp.toString() ? `${base}?${qp.toString()}` : base
  const auth = Buffer.from(
    `${process.env.WC_KEY}:${process.env.WC_SECRET}`
  ).toString('base64')

  const res = await fetch(url, {
    headers: { Authorization: `Basic ${auth}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }

  const products = await res.json()
  return NextResponse.json(products)
}
