      import { NextResponse } from 'next/server';
      import fetchData from '@/utils/fetchJson';
      import sendMessage from '@/utils/telegram';
      import fs from 'fs';
      import path from 'path';
      
      const sentPath = path.resolve('data/sent.json');
      
      function loadSent() {
        if (!fs.existsSync(sentPath)) {
          return { "1": [], "2": [], "3": [] };
        }
        return JSON.parse(fs.readFileSync(sentPath, 'utf-8'));
      }
      
      function saveSent(data) {
        fs.writeFileSync(sentPath, JSON.stringify(data, null, 2));
      }
      
      function formatSheet2({ id, quotekr, quotemn }) {
        return `
      🌟 *Өнөөдрийн ишлэл*: ${id}
      
      _"${quotekr}"_
      
      — *${quotemn}*
      `;
      }
      
      
      async function processJob(sheetId, formatter) {
        const sentData = loadSent();
        const data = await fetchData(sheetId);
      
        if (!sentData[sheetId]) {
          sentData[sheetId] = [];
        }
      
        for (const row of data) {
          if (!sentData[sheetId].includes(row.id)) {
            await sendMessage(formatter(row));
            sentData[sheetId].push(row.id);
            saveSent(sentData);
            break;
          }
        }
      }
      
      // Main serverless GET handler
      export async function GET(req) {
        // Authorization check
        if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
          return new Response('Unauthorized', { status: 401 });
        }
      
        try {
          await Promise.all([
            processJob(2, formatSheet2),
          ]);
      
          return NextResponse.json({ message: 'Cron job finished successfully' });
        } catch (error) {
          console.error('❌ Error in cron job:', error);
          return new Response('Internal Server Error', { status: 500 });
        }
      }
      