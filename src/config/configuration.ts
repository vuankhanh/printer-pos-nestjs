import { join } from "path";

export default () => {
  const dev = {
    app: {
      port: Number(process.env.DEV_APP_PORT) || 3005
    },
    printer: {
      name: process.env.PRINTER_NAME || 'Xprinter XP-420B',
      size: {
        width: process.env.PRINTER_SIZE_WIDTH || '100mm',
        height: process.env.PRINTER_SIZE_HEIGHT || '150mm'
      }
    }
  };

  const pro = {
    app: {
      port: Number(process.env.PRO_APP_PORT)
    },
    printer: {
      name: process.env.PRINTER_NAME || 'Xprinter XP-420B',
      size: {
        width: process.env.PRINTER_SIZE_WIDTH || '100mm',
        height: process.env.PRINTER_SIZE_HEIGHT || '150mm'
      }
    }
  };

  const folder = {
    temporary: join(__dirname, '../..', process.env.TEMPORARY_FOLDER).replace(/\\/g, "/"),
    assets: join(__dirname, '../..', process.env.ASSETS_FOLDER).replace(/\\/g, "/"),
  }

  const vietQR = {
    url: process.env.VIETQR_API_URL || 'https://api.vietqr.io',
    defaultTemplate: process.env.VIETQR_DEFAULT_TEMPLATE || 'i7Malbk'
  }

  const paymentAccountHolder = {
    bankId: process.env.PAYMENT_ACCOUNT_HOLDER_BANK_ID || '970436',
    accountNumber: process.env.PAYMENT_ACCOUNT_HOLDER_ACCOUNT_NO || '0021000418845',
    accountName: process.env.PAYMENT_ACCOUNT_HOLDER_ACCOUNT_NAME || 'AN THI BICH THUY',
  }

  const brand = {
    name: process.env.BRAND_INFO_NAME,
    address: process.env.BRAND_INFO_ADDRESS,
    phoneNumber: process.env.BRAND_INFO_PHONE_NUMBER,
    email: process.env.BRAND_INFOEMAIL,
    website: process.env.BRAND_INFO_WEBSITE,
  }

  const config = process.env.NODE_ENV?.trim() === 'pro' ? pro : dev;

  return { ...config, folder, vietQR, paymentAccountHolder, brand };
}