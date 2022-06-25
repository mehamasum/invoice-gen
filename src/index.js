const fs = require("fs");

require('dotenv').config();

// https://day.js.org/docs/en/display/format
const dayjs = require('dayjs');

// https://www.npmjs.com/package/pdf-creator-node
const pdf = require("pdf-creator-node");

const html = fs.readFileSync("index.html", "utf8");

const today = process.argv[2] ? dayjs(process.argv[2]) : dayjs();
const date = today.format('MMM D, YYYY');
const monthWithYear = today.format('MMMM YYYY');
const year = today.year();
const month = today.month() + 1;
const formattedMonthNumber = `${month > 9 ? "" : "0"}${month}`;

const outputDir = './invoices';
fs.rmSync(outputDir, { recursive: true, force: true });

const env = process.env;

const options = {
  format: "A4",
  orientation: "portrait",
};

const document = {
  html: html,
  // TODO: VAT support
  data: {
    date,
    contractor: env.CONTRACTOR.toUpperCase(),
    contractorAddressLine1: env.CONTRACTOR_ADDR_1,
    contractorAddressLine2: env.CONTRACTOR_ADDR_2,
    contractorAddressLine3: env.CONTRACTOR_ADDR_3,
    contractorIdType: env.CONTRACTOR_ID_TYPE,
    contractorId: env.CONTRACTOR_ID,
    invoiceNumber: `${env.INVOICE_NUM_PREFIX}${year}/0${formattedMonthNumber}`,
    company: env.COMPANY,
    companyAddressLine1: env.COMPANY_ADDR_1,
    companyAddressLine2: env.COMPANY_ADDR_2,
    companyAddressLine3: env.COMPANY_ADDR_3,
    accountHolder: env.CONTRACTOR,
    bankName: env.BANK_NAME,
    bankSwift: env.BANK_SWIFT,
    bankIban: env.BANK_IBAN,
    bankAddress: env.BANK_ADDR,
    invoiceLine: env.INVOICE_LINE,
    invoiceCurrency: env.INVOICE_CURRENCY,
    invoiceTotal: env.INVOICE_TOTAL,
  },
  path: `${outputDir}/${env.CONTRACTOR.replace(/\s/g, '-')}_${year}_${formattedMonthNumber}.pdf`,
  type: "",
};

pdf
  .create(document, options)
  .then((res) => {
    console.log(`File: ${res.filename}`);

    if (env.EMAIL_RECIPIENT) {
      console.log(`To: ${env.EMAIL_RECIPIENT}`);
      console.log(`Subject: Invoice ${monthWithYear.toUpperCase()} ${env.CONTRACTOR.toUpperCase()}`);
      console.log(`Body:\nHi team,\n\nThe invoice for ${monthWithYear} is attached to this email.\n\nThanks!\n\nBest,\n${env.CONTRACTOR}`);
    }
  })
  .catch((error) => {
    console.error(error);
  });