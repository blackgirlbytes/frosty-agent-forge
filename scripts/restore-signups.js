const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'data', 'signups.db');
const db = new Database(dbPath);

const signups = [
  { email: "khautharah02@gmail.com", created_at: "2025-11-30 21:35:45" },
  { email: "nick@nickyt.co", created_at: "2025-11-30 21:39:45" },
  { email: "dakota.dux@gmail.com", created_at: "2025-11-30 21:43:11" },
  { email: "chandrapraneeth99@gmail.com", created_at: "2025-11-30 21:53:15" },
  { email: "filip@filiphric.sk", created_at: "2025-11-30 21:54:23" },
  { email: "st.gilles@gmail.com", created_at: "2025-11-30 21:54:42" },
  { email: "jjswigut@gmail.com", created_at: "2025-11-30 21:54:49" },
  { email: "heather@outlawnews.net", created_at: "2025-11-30 21:55:27" },
  { email: "aazamthakur@gmail.com", created_at: "2025-11-30 21:55:29" },
  { email: "amcgrath73@gmail.com", created_at: "2025-11-30 21:55:44" },
  { email: "robert.amanfu@gmail.com", created_at: "2025-11-30 21:55:49" },
  { email: "datapipelinegeek@gmail.com", created_at: "2025-11-30 21:56:43" },
  { email: "daisuke@duck.com", created_at: "2025-11-30 21:56:56" },
  { email: "talc-patrol.5z@icloud.com", created_at: "2025-11-30 21:57:37" },
  { email: "santiago.maniches@gmail.com", created_at: "2025-11-30 21:59:45" },
  { email: "jamal.hinton@gmail.com", created_at: "2025-11-30 22:00:29" },
  { email: "pfleger.will@gmail.com", created_at: "2025-11-30 22:00:33" },
  { email: "jackgilbert8@hotmail.com", created_at: "2025-11-30 22:01:40" },
  { email: "rosswarren63@gmail.com", created_at: "2025-11-30 22:03:46" },
  { email: "barista_yonder850@aleeas.com", created_at: "2025-11-30 22:04:04" },
  { email: "coeus.the.creator@icloud.com", created_at: "2025-11-30 22:05:03" },
  { email: "ademolabuwo@yahoo.com", created_at: "2025-11-30 22:05:25" },
  { email: "cocraider203@gmail.com", created_at: "2025-11-30 22:05:46" },
  { email: "eriharri@gmail.com", created_at: "2025-11-30 22:08:20" },
  { email: "rdsm@rdsm.ie", created_at: "2025-11-30 22:09:14" },
  { email: "dave.tustin@gmail.com", created_at: "2025-11-30 22:11:02" },
  { email: "tj.coles@gmail.com", created_at: "2025-11-30 22:11:36" },
  { email: "braddux@gmail.com", created_at: "2025-11-30 22:19:53" },
  { email: "goose.moneybags@mralias.net", created_at: "2025-11-30 22:21:32" },
  { email: "glasskdj@yahoo.com", created_at: "2025-11-30 22:22:33" },
  { email: "tradunskih@gmail.com", created_at: "2025-11-30 22:25:08" },
  { email: "ekimeu87@gmail.com", created_at: "2025-11-30 22:25:43" },
  { email: "valeriguerrero22@outlook.com", created_at: "2025-11-30 22:26:52" },
  { email: "tchello.mello@gmail.com", created_at: "2025-11-30 22:36:18" },
  { email: "zach.charlop.powers@gmail.com", created_at: "2025-11-30 22:36:19" },
  { email: "jordan@addwonder.com", created_at: "2025-11-30 22:41:28" },
  { email: "adventofai.dev.r@bell.as", created_at: "2025-11-30 22:41:36" },
  { email: "kbates4@gmail.com", created_at: "2025-11-30 22:50:28" },
  { email: "joelgrus@gmail.com", created_at: "2025-11-30 22:59:11" },
  { email: "plata.zach@gmail.com", created_at: "2025-11-30 23:04:51" },
  { email: "gjacolby83@gmail.com", created_at: "2025-11-30 23:06:11" },
  { email: "justin@lenacho.be", created_at: "2025-11-30 23:06:12" },
  { email: "paredeschastity@gmail.com", created_at: "2025-11-30 23:09:03" },
  { email: "calvintrinhvan@gmail.com", created_at: "2025-11-30 23:27:22" },
  { email: "professor.d.nyc@gmail.com", created_at: "2025-11-30 23:40:33" },
  { email: "kendallc@gmail.com", created_at: "2025-11-30 23:45:06" },
  { email: "ssickle@squareup.com", created_at: "2025-11-30 23:51:43" }
];

console.log(`Starting to restore ${signups.length} signups...`);

const insert = db.prepare(`
  INSERT OR IGNORE INTO signups (email, subscribed, created_at)
  VALUES (?, 1, ?)
`);

let added = 0;
let skipped = 0;

for (const signup of signups) {
  const result = insert.run(signup.email.toLowerCase(), signup.created_at);
  if (result.changes > 0) {
    added++;
    console.log(`✅ Added: ${signup.email}`);
  } else {
    skipped++;
    console.log(`⏭️  Skipped (already exists): ${signup.email}`);
  }
}

const total = db.prepare('SELECT COUNT(*) as count FROM signups').get();

console.log('\n📊 Summary:');
console.log(`   Added: ${added}`);
console.log(`   Skipped: ${skipped}`);
console.log(`   Total in database: ${total.count}`);

db.close();
console.log('\n✅ Database restored successfully!');
