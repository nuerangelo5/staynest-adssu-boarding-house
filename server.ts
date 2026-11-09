import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Server-Side Proxy Route to bypass browser CORS & Ad-blocker origin restrictions for EmailJS
  app.post('/api/email/send-otp', async (req, res) => {
    try {
      const { email, code, name, privateKey } = req.body;
      if (!email || !code) {
        return res.status(400).json({ success: false, error: 'Email and code parameters are required' });
      }

      const serviceId = process.env.EMAILJS_SERVICE_ID || 'service_qtbnqjp';
      const templateId = process.env.EMAILJS_TEMPLATE_ID || 'template_r4eyr1c';
      const publicKey = process.env.EMAILJS_PUBLIC_KEY || 'ZWNAYhvgarkuw9-2t';
      const accessToken = privateKey || process.env.EMAILJS_PRIVATE_KEY || '1m425JPo85u-kngO2r6DS';

      console.log(`\n==================================================`);
      console.log(`[EmailJS Server Dispatch] Initiating OTP send...`);
      console.log(`Recipient Email: ${email}`);
      console.log(`OTP Code: ${code}`);
      console.log(`Service ID: ${serviceId}`);
      console.log(`Template ID: ${templateId}`);
      console.log(`Public Key: ${publicKey}`);
      console.log(`Private Key (accessToken): ${accessToken ? 'PROVIDED' : 'NOT SET'}`);
      console.log(`==================================================\n`);

      const payload: any = {
        lib_version: '4.4.1',
        user_id: publicKey,
        service_id: serviceId,
        template_id: templateId,
        template_params: {
          to_email: email,
          recipient_email: email,
          user_email: email,
          email: email,
          user_name: name || 'StayNest User',
          to_name: name || 'StayNest User',
          otp_code: code,
          passcode: code,
          otp: code,
          message: `Your StayNest verification PIN is: ${code}`,
        },
      };

      if (accessToken) {
        payload.accessToken = accessToken;
      }

      const emailJsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
        body: JSON.stringify(payload),
      });

      const responseText = await emailJsResponse.text();
      console.log(`[EmailJS API Raw Response] Status: ${emailJsResponse.status}, Text: "${responseText}"`);

      if (emailJsResponse.ok || responseText.includes('OK') || responseText.includes('200')) {
        return res.json({
          success: true,
          message: `OTP email successfully dispatched to ${email}`,
          rawResponse: responseText,
        });
      } else {
        // If strict mode is active and no private key was provided, try alternative template_id without prefix
        if (responseText.includes('The template ID not found')) {
          const rawTemplateId = templateId.replace(/^template_/, '');
          payload.template_id = rawTemplateId;
          const retryRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          const retryText = await retryRes.text();
          if (retryRes.ok || retryText.includes('OK')) {
            return res.json({
              success: true,
              message: `OTP email successfully dispatched to ${email}`,
              rawResponse: retryText,
            });
          }
        }

        console.error(`[EmailJS API Error]: Status ${emailJsResponse.status} - ${responseText}`);
        return res.status(emailJsResponse.status).json({
          success: false,
          error: responseText || `EmailJS returned HTTP status ${emailJsResponse.status}`,
          status: emailJsResponse.status,
          strictModeError: responseText.includes('strict mode'),
        });
      }
    } catch (err: any) {
      console.error('[Server EmailJS Proxy Critical Exception]:', err);
      return res.status(500).json({ success: false, error: err?.message || 'Server email dispatch failed' });
    }
  });

  if (isProduction) {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    // Mount Vite dev server in middleware mode
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`StayNest Full-Stack Express Server running in ${isProduction ? 'production' : 'development'} on http://0.0.0.0:${PORT}`);
  });
}

startServer();
