import { NextResponse } from 'next/server'

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const base = process.env.WP_URL
  const { slug } = params

  if (!base) {
    return NextResponse.json({ error: 'WP_URL not configured' }, { status: 500 })
  }

  const auth = Buffer.from(
    `${process.env.WC_KEY}:${process.env.WC_SECRET}`
  ).toString('base64')

  const res = await fetch(
    `${base}/wp-json/wc/v3/products?slug=${encodeURIComponent(slug)}`,
    {
      headers: { Authorization: `Basic ${auth}` },
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }

  const items = await res.json()
  const product = Array.isArray(items) ? items[0] : null
  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(product)
}


