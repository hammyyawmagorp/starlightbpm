import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface ContactFormData {
  name: string
  email: string
  phone: string
  address?: string
  city?: string
  postalCode?: string
  message?: string
}

export interface EstimatorFormData {
  name: string
  email: string
  phone: string
  address?: string
  city?: string
  postalCode?: string
  windowCount: number
  storyType: string
  cleaningType: string
  priceRange: string
  confNumber: string
}

export async function sendContactFormEmail(data: ContactFormData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Starlight BP Maintenance <noreply@starlightbpm.ca>',
      to: ['starlightbpm@gmail.com'],
      subject: 'New Contact Request for Starlight BP Maintenance',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #1e40af; text-align: center; margin-bottom: 30px;">New Contact Form Submission</h1>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #374151; margin-top: 0;">Contact Information</h2>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone}</p>
              ${data.address ? `<p><strong>Address:</strong> ${data.address}</p>` : ''}
              ${data.city ? `<p><strong>City:</strong> ${data.city}</p>` : ''}
              ${data.postalCode ? `<p><strong>Postal Code:</strong> ${data.postalCode}</p>` : ''}
            </div>
            
            ${
              data.message
                ? `
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
                <h2 style="color: #374151; margin-top: 0;">Message</h2>
                <p style="white-space: pre-wrap;">${data.message}</p>
              </div>
            `
                : ''
            }
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">
                This email was sent from the Starlight Building Maintenance contact form.
              </p>
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Error sending contact form email:', error)
      throw new Error('Failed to send email')
    }

    return emailData
  } catch (error) {
    console.error('Error in sendContactFormEmail:', error)
    throw error
  }
}

export async function sendEstimatorFormEmail(data: EstimatorFormData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Starlight BP Maintenance <noreply@starlightbpm.ca>',
      to: ['starlightbpm@gmail.com'],
      subject: `New Estimator Submission/Inquiry - Confirmation #${data.confNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #1e40af; text-align: center; margin-bottom: 30px;">New Estimator Submission</h1>
            
            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
              <h2 style="color: #92400e; margin: 0;">Confirmation Number: ${data.confNumber}</h2>
            </div>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #374151; margin-top: 0;">Contact Information</h2>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone}</p>
              ${data.address ? `<p><strong>Address:</strong> ${data.address}</p>` : ''}
              ${data.city ? `<p><strong>City:</strong> ${data.city}</p>` : ''}
              ${data.postalCode ? `<p><strong>Postal Code:</strong> ${data.postalCode}</p>` : ''}
            </div>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #374151; margin-top: 0;">Service Details</h2>
              <p><strong>Number of Windows:</strong> ${data.windowCount}</p>
              <p><strong>Story Type:</strong> ${data.storyType === 'one' ? 'One Story' : 'Two+ Stories'}</p>
              <p><strong>Cleaning Type:</strong> ${data.cleaningType === 'full' ? 'Full Cleaning' : 'Exterior Only'}</p>
              <p><strong>Price Range:</strong> ${data.priceRange}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">
                This email was sent from the Starlight Building Maintenance estimator form.
              </p>
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Error sending estimator form email:', error)
      throw new Error('Failed to send email')
    }

    return emailData
  } catch (error) {
    console.error('Error in sendEstimatorFormEmail:', error)
    throw error
  }
}
