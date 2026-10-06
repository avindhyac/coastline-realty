export const siteContactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+94 77 123 4567'

export const siteContactPhoneHref = `tel:${siteContactPhone.replace(/[^+\d]/g, '')}`
