const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument({ margin: 54, size: 'LETTER' });
doc.pipe(fs.createWriteStream(__dirname + '/BBB_Complaint_Packet.pdf'));

const H1 = (t) => { doc.moveDown(0.6).font('Helvetica-Bold').fontSize(15).fillColor('#10306b').text(t).moveDown(0.3); doc.fillColor('black'); };
const H2 = (t) => { doc.moveDown(0.4).font('Helvetica-Bold').fontSize(11.5).text(t).moveDown(0.15); };
const P = (t) => { doc.font('Helvetica').fontSize(10.5).text(t, { lineGap: 2 }).moveDown(0.4); };
const B = (items) => { doc.font('Helvetica').fontSize(10.5); items.forEach(i => doc.text('•  ' + i, { indent: 10, lineGap: 2 })); doc.moveDown(0.4); };
const table = (rows, widths) => {
  const x0 = doc.page.margins.left;
  rows.forEach((r, ri) => {
    const f = ri ? 'Helvetica' : 'Helvetica-Bold';
    const h = Math.max(...r.map((c, i) => doc.font(f).fontSize(9.5).heightOfString(c, { width: widths[i] - 8 }))) + 8;
    if (doc.y + h > doc.page.height - doc.page.margins.bottom) doc.addPage();
    let x = x0; const y = doc.y;
    r.forEach((c, i) => {
      if (ri === 0) doc.rect(x, y, widths[i], h).fill('#e6ecf7').fillColor('black');
      doc.rect(x, y, widths[i], h).stroke('#999');
      doc.font(f).fontSize(9.5).fillColor('black').text(c, x + 4, y + 4, { width: widths[i] - 8 });
      x += widths[i];
    });
    doc.y = y + h;
  });
  doc.moveDown(0.6);
};

doc.font('Helvetica-Bold').fontSize(22).fillColor('#10306b').text('BBB Complaint Packet', { align: 'center' });
doc.fontSize(12).fillColor('black').font('Helvetica').text('Carl Burger Dodge Chrysler Jeep RAM World', { align: 'center' });
doc.text('8355 Hercules St, La Mesa, CA 91942', { align: 'center' }).moveDown(0.8);
P('Contents: 1. Complaint text  2. Timeline  3. Price discrepancy  4. Exhibit list  5. Letter to dealership  6. Statement templates  7. Filing checklist.\n\nItems in [brackets] must be filled in by you before filing. This packet is not legal advice. California statute citations are from memory and should be verified at bar.ca.gov. Consider a short consult with legal aid or a consumer attorney.');

H1('1. Complaint Text (paste into BBB; reuse for BAR)');
P('Business: Carl Burger Dodge Chrysler Jeep RAM World, 8355 Hercules St, La Mesa, CA 91942\nVehicle: 2020 Jeep Cherokee, VIN [confirm from registration; likely 1C4PJLDB7LD535140]\nAmount in dispute: approximately $6,000 claimed by dealership (estimate $6,789.05)\nAmount paid: $0');
P('On Aug 24, 2026, I brought my 2020 Jeep Cherokee to Carl Burger for service. I did not sign a repair order and was not given a written estimate.');
P('On Aug 25, I texted the service advisor that I wanted no repairs until I was notified. He said nothing would be done. He then said the engine failed a leak-down test and that he needed "further approvals" to remove the cylinder head. He gave no price when he asked. I asked for the estimate first. His quotes were inconsistent: "$4145.99," $260 for inspection, a gasket price he first typed as "25000" and corrected to "250.00," and "another $1250" if the head was damaged.');
P('On Aug 26, the advisor told me the technician had already started taking the engine apart. I did not receive a written estimate until Aug 28, two days after teardown began. It lists "Replace Cylinder Head" at $6,529.05, with a total of $6,789.05. That is far above anything quoted by text.');
P('I never approved this repair or this price. On Sept 1, the dealership took a verbal approval from my daughter, Ashly. She is not the customer, did not have my keys, and I never authorized her to approve work or told the dealership she could. I was not contacted. The dealership has produced no record of the date, time, person, or phone number of any oral authorization. California Business & Professions Code section 9884.9 requires a written estimate and customer authorization before work begins, and documentation of oral approvals.');
P('The dealership now says I owe approximately $6,000 and that the vehicle is ready. I have paid nothing and dispute all charges for work I did not authorize.');
H2('Desired resolution');
P('I will pay only for diagnostic work I authorized, no more than the $260 quoted. Waive all repair and storage charges and release my vehicle.');
H1('2. Timeline');
table([
  ['Date', 'Event', 'Exhibit'],
  ['Mon Aug 24, 4:30 PM', 'Dealership sends automated service welcome text. Car dropped off; no repair order signed.', 'A'],
  ['Tue Aug 25, 12:03 PM', 'I ask for no repairs until notified. Advisor: "NO I WILL NOT." He reports failed leak-down/combustion test.', 'A'],
  ['Aug 25', 'Advisor asks "further approvals" to remove cylinder head, no price. I reply "Ok" / "Yes ok with that." Advisor: estimate is "labor for the most part," parts added "once we are in there," "you pay at the end."', 'A'],
  ['Aug 25', 'Advisor texts "$4145.99." I ask for the estimate first. Inspection: $260. Gasket "25000" then "250.00." Damaged head "another $1250."', 'A'],
  ['Aug 25, 4:29 PM', 'I ask for updates: "I need an update before closing please."', 'A'],
  ['Wed Aug 26, 11:51 AM', 'I ask if anything was done. Advisor: "THE TECH DID START TAKING THINGS APART."', 'A'],
  ['Aug 28', 'I first receive the written Dealer-FX estimate: $6,789.05.', 'B'],
  ['Sept 1', 'My daughter Ashly verbally approves the head repair. She was not authorized. I was not contacted.', 'E'],
  ['Sept 16', 'Advisor texts "HELLO." I reply that I am gathering funds and will come in.', 'C'],
  ['Now', 'Dealership says I owe approx. $6,000; vehicle ready. Paid: $0.', ''],
], [105, 340, 55]);
P('Note: The dealership will cite my "Yes ok with that" text. My position: it covered only removing the head to inspect, no price was disclosed, and I had asked for the estimate first.');

H1('3. Price Discrepancy');
table([
  ['What I was told', 'Amount'],
  ['Text: "$4145.99" (unexplained)', '$4,145.99'],
  ['Inspection so far', '$260.00'],
  ['Gasket only', '$250.00 (first typed "25000")'],
  ['Damaged head, additional', '$1,250.00'],
  ['Dealer-FX estimate: Replace Cylinder Head', '$6,529.05'],
  ['Dealer-FX estimate: Total', '$6,789.05'],
  ['Declined on estimate: coolant flush $307.74; oil/filter $191.96; coolant system repair $1,226.01', 'Declined'],
  ['Amount dealership now claims', 'approx. $6,000'],
], [330, 170]);

H1('4. Exhibit List');
B(['A: Text thread, Aug 24-26 (screenshots)', 'B: Dealer-FX estimate, 2 screenshots, received Aug 28', 'C: Sept 16 text exchange', 'D: My signed statement: no repair order signed, no written estimate, never authorized Ashly', "E: Ashly's signed, dated statement", 'F: My dispute letter to the dealership, with proof of sending']);

doc.addPage();
H1('5. Letter to Dealership (send by email AND certified mail)');
P('[Date]\n\nCarl Burger Dodge Chrysler Jeep RAM World\nAttn: Service Manager and General Manager\n8355 Hercules St, La Mesa, CA 91942\n\nRe: Dispute of unauthorized repair - 2020 Jeep Cherokee, VIN [VIN], repair order # [if any]');
P('I am the customer who brought this vehicle in on Aug 24, 2026. I am formally disputing the $6,789.05 estimate and the approximately $6,000 you claim I owe.');
P('I never signed a repair order and received no written estimate before work began. On Aug 25 I asked in writing for the estimate first. Your technician began teardown by Aug 26. I first received a written estimate on Aug 28. I never approved the $6,529.05 cylinder head replacement. On Sept 1 you reportedly accepted a verbal approval from my daughter, who is not the customer, was never listed as a contact, and had no authority to approve repairs. I was not contacted.');
P('Under California Business & Professions Code section 9884.9, I request within 10 days:\n1. The signed repair order. If none exists, written confirmation that none exists.\n2. The written estimate and all authorization records.\n3. Documentation of any oral authorization: date, time, person, and phone number.\n4. The Dealer-FX approval log with timestamp, user and device.\n5. An itemized bill for work done before any authorization, the teardown and reassembly costs, and the basis for any storage charges.');
P('I will pay for work I authorized. I do not agree to pay for the cylinder head repair. I intend to retrieve my vehicle and, if necessary, will pay only under protest and reserve all rights, including complaints to the Bureau of Automotive Repair, the BBB, and small claims court.');
P('Sincerely,\n[Name]   [Phone]   [Email]');
H1('6. Statement Templates');
H2('My statement (sign and date)');
P('I, [name], state: I brought my 2020 Jeep Cherokee to Carl Burger on Aug 24, 2026. I did not sign a repair order and was not given a written estimate. I never told the dealership that Ashly could approve work, never listed her as a contact, and never asked her to go there. I did not approve the cylinder head replacement or its price. I first received the estimate on Aug 28. My Sept 16 text about gathering money was about retrieving my vehicle and was not agreement to pay for unauthorized work. [Confirm every statement is true before signing.]\n\nSigned: ____________  Date: ________');
H2("Ashly's statement (sign and date)");
P('I, [Ashly full name], state: On [date/time] I went to Carl Burger Dodge Chrysler Jeep RAM World. I spoke with [name]. I was told [what was said, including whether any price was quoted]. I said [what you said]. I did not sign anything [or: I signed ___]. I was not authorized to speak for the vehicle owner and did not have the vehicle keys. [Include only what is true.]\n\nSigned: ____________  Date: ________');

H1('7. Filing Checklist');
B([
  'Send the dispute letter first (email + certified mail). Keep copies and receipts.',
  'File with BBB San Diego at bbb.org and attach Exhibits A-F.',
  'File with the California Bureau of Automotive Repair at bar.ca.gov (free; no signed repair order is a key point). Optional: California Attorney General consumer complaint.',
  'Do not text the dealership about money. Do not write "I owe $6,000." Write "the dealership claims I owe approximately $6,000."',
  'Before pickup: ask in writing what they say you owe, itemized. If they hold the car for payment, speak to legal aid or a consumer attorney first. If you must pay, use a credit card, write "paid under protest, unauthorized repair" on the receipt, and file with BAR the same day.',
  'Photograph the car and odometer at pickup. California generally requires consent to record calls.',
  'Small claims (limit $12,500 for individuals) is the backup if you pay under protest.',
  'Weak spots to be ready for: your "Yes ok with that" text; Ashly possibly having apparent authority; your Sept 16 text. Be honest and consistent.',
  'Back up the full text thread and keep the Dealer-FX link.'
]);
doc.end();
