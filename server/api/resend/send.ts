import { Resend } from 'resend';
import { join } from 'path';
import fs from 'fs';

const resend = new Resend(process.env.NUXT_RESEND_API_KEY);

// 添加新的邮件模板类型
type EmailTemplate = 'welcome' | 'purchase-thanks';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { 
      email, 
      template = 'purchase-thanks', 
      data = {} 
    } = body

    const templatePath = join(
      process.cwd(), 
      'assets', 
      'templates',
      template.startsWith('purchase-thanks-') ? template.split('-').pop() : '', // 直接取最后的部分作为地区代码
      `${template}.html`
    )
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8')

    // 设置默认值
    const defaultData = {
      logo_url: 'https://nuxtpro.com/img/icons/favicon.ico',
      product_name: 'NuxtPro',
      help_url: data.region === 'CN' 
        ? 'https://your-domain.com/zh/help' 
        : 'https://your-domain.com/en/help',
      support_email: 'youremail@gmail.com',
      community_group: data.region === 'CN' 
        ? '微信号：xxxxx' 
        : 'Telegram: @nuxtpro_support',
      discount: '8.5',
      referral_bonus: data.region === 'CN' ? '50元' : '$50',
      promotion_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toLocaleDateString(data.region === 'CN' ? 'zh-CN' : 'en-US'),
      thanksForPurchase: data.region === 'CN' ? '感谢您购买 ' : 'Thank you for purchasing ',
      product1_url: 'https://nuxtPro.com/product1',
      product2_url: 'https://nuxtPro.com/product2',
      product3_url: 'https://nuxtPro.com/product3',
      product4_url: 'https://nuxtPro.com/product4',
      ...data
    }

    // 替换所有模板变量
    Object.entries(defaultData).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g')
      htmlTemplate = htmlTemplate.replace(regex, String(value))
    })
    
    const response = await resend.emails.send({
      from: `${defaultData.product_name} <onboarding@resend.dev>`,
      to: [email],
      subject: data.subject || `${defaultData.thanksForPurchase} ${defaultData.product_name}！`,
      html: htmlTemplate,
    })

    return response
  } catch (error) {
    console.error('Error reading template or sending email:', error)
    return { error }
  }
})