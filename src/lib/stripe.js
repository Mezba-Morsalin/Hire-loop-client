import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    "seeker_pro" : "price_1TihQrRwcwO7Y0z26ku2g8Tx",
    "seeker_premium" : "price_1TiuofRwcwO7Y0z2d0JSgQn6",
    "recruiter_growth" : "price_1TiusbRwcwO7Y0z21lnyWc8b",
    "recruiter_enterprise" : "price_1TiusbRwcwO7Y0z21lnyWc8b"
}