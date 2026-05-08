export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { source, email, name, company, service, budget, message } = req.body;

  const TG_TOKEN = process.env.TG_TOKEN || '8712326195:AAEd8vAopTAf2_6xvynfrx1JzBDtMemWk-E';
  const CHAT_ID = process.env.CHAT_ID || '380071501';
  const GOOGLE_URL = 'https://script.google.com/macros/s/AKfycbww-5v5B7duMO9wFmT1NJDWE0noC0rpcZORNXGoF7eI-D_F93IEqpjsEs0ZDP9N6etS/exec';

  try {
    // 1. Send to Telegram
    let text = '';
    if (source === 'audit') {
      text = `🔵 <b>НОВА ЗАЯВКА: АУДИТ (ПОПАП)</b>\n\n`;
      text += `📧 Email: ${email}\n`;
    } else {
      text = `🟢 <b>НОВА ЗАЯВКА: КОНТАКТНА ФОРМА</b>\n\n`;
      text += `👤 Ім'я: ${name || '—'}\n`;
      text += `📧 Email: ${email || '—'}\n`;
      text += `🏢 Компанія: ${company || '—'}\n`;
      text += `🛠 Послуга: ${service || '—'}\n`;
      text += `💰 Бюджет: ${budget || '—'}\n`;
      text += `📝 Повідомлення: ${message || '—'}`;
    }

    const tgUrl = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;
    await fetch(tgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'HTML'
      })
    });

    // 2. Send to Google Sheets (Apps Script)
    const googleFormData = new URLSearchParams();
    googleFormData.append('source', source);
    if (source === 'audit') {
      googleFormData.append('email', email);
    } else {
      googleFormData.append('name', name || '');
      googleFormData.append('email', email || '');
      googleFormData.append('company', company || '');
      googleFormData.append('service', service || '');
      googleFormData.append('budget', budget || '');
      googleFormData.append('message', message || '');
    }

    try {
      await fetch(GOOGLE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: googleFormData.toString()
      });
    } catch (gError) {
      console.error('Google Sheets Error:', gError);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
