import type { RegulerInfoPagesContent } from "../../shared/reguler-info-pages";

export const enRegulerInfoPagesContent: RegulerInfoPagesContent = {
  labels: {
    openAccount: "Online Account Registration",
    demoLogin: "Demo Account Login",
    liveLogin: "Live Account Login",
  },
  pages: {
    karakteristikProduk: {
      meta: {
        title: "Product Characteristics",
        description:
          "Characteristics of PT. Solid Gold Berjangka futures products: capital efficiency, two-way trading, high volatility, and high liquidity.",
      },
      hero: {
        eyebrow: "Products",
        title: "Product Characteristics",
        description:
          "Understand the advantages and key features of futures products before you start trading.",
      },
      blocks: [
        {
          type: "cards",
          items: [
            {
              title: "Capital Efficiency",
              body: "With margin trading (collateral funds), investors can open large positions with relatively small capital. A minimum of 10% of the total transaction value is required instead of 100%.",
            },
            {
              title: "Trading Flexibility",
              body: "Two-way trading lets investors find opportunities whether the market moves up or down.",
            },
            {
              title: "Highly Volatile Price Movement",
              body: "Large daily price moves of roughly 100 - 500 points offer significant profit potential with a contract size of US $5 per point and a transaction fee of only 3 (three) points plus 11% VAT.",
            },
            {
              title: "High Liquidity",
              body: "This product is highly liquid, so investors can buy and sell at any time while the market is open, without queuing at the market price.",
            },
          ],
        },
        {
          type: "cards",
          title: "Investment Types",
          items: [
            {
              title: "Fixed Rate",
              points: [
                "US $1 = Rp. 10,000 (fixed rate)",
                "Protected from losses caused by USD/Rupiah fluctuations",
              ],
            },
            {
              title: "Floating Rate",
              points: [
                "US $1 = US $1 (following the USD/Rupiah rate)",
                "No fee for opening and withdrawing USD funds, in part or in full",
              ],
            },
          ],
        },
      ],
    },

    ilustrasiTransaksi: {
      meta: {
        title: "Transaction Illustration",
        description:
          "Transaction calculation formula, roll over fees, and day trade and overnight examples at PT. Solid Gold Berjangka.",
      },
      hero: {
        eyebrow: "Products",
        title: "Transaction Illustration",
        description:
          "See the calculation formula, fees, and sample transactions to understand potential profit and loss.",
      },
      blocks: [
        {
          type: "formula",
          title: "Transaction Calculation Formula",
          formula:
            "[ (Selling Price – Buying Price) x Contract Size x n Lot ] – [ (Facility Fee + VAT) x n Lot ]",
          notesTitle: "Notes",
          notes: [
            "Contract Size (contract value): US $5 per point for periodic rolling stock index contracts; 100 troy ounces for daily rolling Loco London gold contracts.",
            "n Lot: the number of lots traded.",
            "Facility Fee (commission): US $15 per lot per side (buy/sell). Total commission is US $30 for 1 lot settlement.",
            "VAT (Value Added Tax): 11% of the commission (US $1.65/lot/side). Total VAT is US $3.3 for 1 lot settlement.",
          ],
        },
        {
          type: "table",
          title: "Roll Over (Overnight) Fee",
          columns: ["Contract", "Fee per Night"],
          rows: [
            ["HKK5U and HKK50", "US $3 / night"],
            ["JPK5U and JPK50", "US $2 / night"],
            ["XULF and XUL10", "US $5 / night"],
          ],
        },
        {
          type: "callout",
          title: "Day Trade Example - Profit",
          paragraphs: [
            "A client opens a buy position on HKK5U at 24,600 points for 2 lots, then closes the 2-lot buy position when the index reaches 24,700 points.",
          ],
          results: [{ label: "P/L", value: "US $933.4 (net profit)", tone: "profit" }],
        },
        {
          type: "callout",
          title: "Day Trade Example - Loss",
          paragraphs: [
            "An investor expects the Hang Seng Index to strengthen and opens a buy position on HKK5U at 24,600 points for 1 lot. The forecast is wrong and the position is closed at 24,550 points.",
          ],
          results: [{ label: "P/L", value: "– US $283.3 (net loss)", tone: "loss" }],
        },
        {
          type: "callout",
          title: "Overnight Example",
          paragraphs: [
            "An investor expects the Nikkei 225 to weaken and on June 10 opens a sell position at 14,850 points for 2 lots. Two days later (June 12), the investor closes the 2-lot sell position when the index is at 14,650 points.",
          ],
          results: [
            { label: "Gross profit", value: "US $1933.4" },
            { label: "Roll over fee (US $2 x 2 lots x 2 nights)", value: "– US $8", tone: "loss" },
            { label: "Net profit", value: "US $1925.4", tone: "profit" },
          ],
        },
        {
          type: "table",
          title: "Contract Codes & Types",
          columns: ["Contract Code", "Underlying", "Rates Category", "Contract Type"],
          rows: [
            ["GU1010_BBJ", "GBP/USD", "DIRECT", "Daily Rolling Spot Contract of Great Britain Pound Sterling (GBP) against US Dollar (USD)"],
            ["EU1010_BBJ", "EUR/USD", "DIRECT", "Daily Rolling Spot Contract of Euro (EUR) against US Dollar (USD)"],
            ["AU1010_BBJ", "AUD/USD", "DIRECT", "Daily Rolling Spot Contract of Australian Dollar (AUD) against US Dollar (USD)"],
            ["UC1010_BBJ", "USD/CHF", "INDIRECT", "Daily Rolling Spot Contract of US Dollar (USD) against Swiss Franc (CHF)"],
            ["UJ1010_BBJ", "USD/JPY", "INDIRECT", "Daily Rolling Spot Contract of US Dollar (USD) against Japanese Yen (JPY)"],
          ],
        },
        {
          type: "callout",
          title: "Transaction Calculation Illustration",
          points: [
            "For DIRECT RATES: P/L = (Selling Price - Buying Price) x Contract Size x Number of Lots",
            "For INDIRECT RATES: P/L = (Selling Price - Buying Price) x Contract Size x Number of Lots",
          ],
        },
        {
          type: "callout",
          title: "EU1010_BBJ Example (Day Trade)",
          paragraphs: [
            "A client buys EU1010_BBJ at 1.3530 for 2 lots, then sells at 1.3540. If the price falls to 1.3525 instead, the position is at a loss.",
          ],
          results: [
            { label: "Sell at 1.3540", value: "$133.4 (profit)", tone: "profit" },
            { label: "If it falls to 1.3525", value: "– $166.6 (loss)", tone: "loss" },
          ],
        },
        {
          type: "callout",
          title: "UJ1010_BBJ Example (Day Trade)",
          paragraphs: [
            "A client sells UJ1010_BBJ at 102.20 for 1 lot, then closes at 102.12. If the price rises to 102.27 instead, the position is at a loss.",
          ],
          results: [
            { label: "Close at 102.12", value: "$45.04 (profit)", tone: "profit" },
            { label: "If it rises to 102.27", value: "– $101.74 (loss)", tone: "loss" },
          ],
        },
      ],
    },

    petunjukTransaksi: {
      meta: {
        title: "Transaction Guide",
        description:
          "How to place orders online or by phone at PT. Solid Gold Berjangka.",
      },
      hero: {
        eyebrow: "Procedures",
        title: "Transaction Guide",
        description: "Clients can place orders online and/or by phone.",
      },
      blocks: [
        {
          type: "callout",
          paragraphs: [
            "Clients can place orders online and/or by phone (clients are advised to practice with a simulation before using real online trading).",
          ],
        },
        {
          type: "cards",
          items: [
            {
              title: "Online Trading Access",
              body: "Clients who place orders online will receive a User ID and Password from PT. Solid Gold Berjangka.",
            },
            {
              title: "Online Transaction Requirements",
              points: [
                "An available internet connection",
                "Access to etrade.sgberjangka.com/login",
                "The client already has a User ID and Password from PT. Solid Gold Berjangka (the password can be changed by the client)",
              ],
            },
            {
              title: "Complete Guide",
              body: "For a more complete guide to using the online trading platform, please contact our customer service or visit the nearest branch office.",
            },
          ],
        },
      ],
      cta: {
        title: "Try a Simulation First",
        body: "Use a demo account to practice before trading on a live account.",
      },
    },

    prosedurPenarikan: {
      meta: {
        title: "Withdrawal Procedure",
        description:
          "General information, steps, destination account rules, and processing time for client fund withdrawals at PT. Solid Gold Berjangka.",
      },
      hero: {
        eyebrow: "Procedures",
        title: "Withdrawal Procedure",
        description: "Steps and rules for client fund withdrawals.",
      },
      blocks: [
        {
          type: "callout",
          title: "General Information",
          paragraphs: [
            "Clients can withdraw funds at any time during banking hours, provided the amount does not exceed the effective margin shown in the client's daily statement report.",
          ],
        },
        {
          type: "steps",
          title: "Withdrawal Steps",
          items: [
            {
              title:
                "The client opens the withdrawal menu in their real trading account to submit a withdrawal request, following the applicable terms and conditions.",
            },
            { title: "The client fills in the withdrawal request form." },
          ],
        },
        {
          type: "cards",
          items: [
            {
              title: "Destination Account Rules",
              body: "Withdrawals can only be transferred to an account in the client's own name, as stated in the Client Account Opening Application Document.",
            },
            {
              title: "Processing Time",
              body: "A standard withdrawal takes three business days (T+3), although PT. Solid Gold Berjangka aims to complete withdrawals within one business day (T+1).",
            },
          ],
        },
      ],
    },

    prosedurRegol: {
      meta: {
        title: "Online Registration Procedure",
        description:
          "Online account opening steps at PT. Solid Gold Berjangka, from demo account to live account.",
      },
      hero: {
        eyebrow: "Procedures",
        title: "Online Registration Procedure",
        description:
          "Follow these steps to open a trading account at PT. Solid Gold Berjangka.",
      },
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Open the Company Website",
              body: "Visit the official PT. Solid Gold Berjangka website to start the online registration process.",
            },
            {
              title: "Register a Demo Account",
              points: ["Enter your data", "Demo account", "Run trading simulations"],
            },
            {
              title: "Submit Agreement Documents",
              points: [
                "Agreement Application",
                "Risk Disclosure Document (DPAR)",
                "Order Granting Agreement (PPA)",
                "Transaction Mechanism (Trading Rules)",
                "Supporting data (ID card and others)",
              ],
            },
            {
              title: "Data Verification",
              body: "The appointed Futures Broker Representative verifies the prospective client's data, namely:",
              points: [
                "The prospective client's personal data",
                "Deposit of the prospective client's funds into the broker's segregated account",
                "Send the bank transfer slip by fax/email to PT. Solid Gold Berjangka",
              ],
            },
            {
              title: "Fund Confirmation",
              body: "The client receives confirmation that the funds/margin have been credited to the PT. Solid Gold Berjangka Segregated Account.",
            },
            {
              title: "Account Number",
              body: "The client receives a registered account number from PT. Solid Gold Berjangka.",
            },
            {
              title: "Official Receipt",
              body: "The client receives an Official Receipt from PT. Solid Gold Berjangka.",
            },
            {
              title: "Start Trading",
              body: "Once all procedures above are completed, the client is confirmed to trade after receiving the online trading User ID and Password via the SMS and email stated in the account opening application.",
            },
          ],
        },
        {
          type: "table",
          title: "Transfer Destination Accounts",
          intro:
            "Transfer funds only to the official PT. Solid Gold Berjangka Segregated Accounts below. Never send funds to a personal account.",
          columns: ["Bank", "IDR Account No.", "USD Account No."],
          rows: [
            ["Bank BCA Sudirman Branch, Jakarta", "035-311-596-8", "035-311-797-9"],
            ["Bank CIMB Niaga Gajahmada Branch, Jakarta", "800-12-97469-00", "800-00-06176-40"],
            ["Bank BNI Gambir Branch, Jakarta", "017-068-2500", "017-075-0300"],
            ["Bank Mandiri Imam Bonjol Branch, Jakarta", "122-000-665-6063", "122-000-665-60710"],
            ["Bank Artha Graha KPO Sudirman Branch, Jakarta", "107-996-4073", "-"],
            ["Bank Rakyat Indonesia Ciputat Branch, Tangerang", "038201001510301", "-"],
          ],
        },
      ],
      cta: {
        title: "Ready to Open an Account?",
        body: "Start your online registration or try a demo account first.",
      },
    },

    tampilanTransaksiOnline: {
      meta: {
        title: "Online Trading Display",
        description:
          "What to know and the warnings you may see when using PT. Solid Gold Berjangka online trading.",
      },
      hero: {
        eyebrow: "Education",
        title: "Online Trading Display",
        description:
          "Understand price mechanics, common issues, and warning messages on the online trading platform.",
      },
      blocks: [
        {
          type: "cards",
          title: "What to Know About Online Trading",
          items: [
            {
              title: "Price Updating",
              body: "Price changes in the online trading system follow the moving Winquote price: the last trade plus 10 points for buy and minus 10 points for sell (a 20-point spread).",
            },
            {
              title: "Price Has Change",
              body: "\"Price has change\" can happen to any client or client proxy trading online or manually, because prices keep moving continuously following Winquote.",
            },
            {
              title: "Executed Price Differs from the Done Price",
              body: "When trading online or manually (e-quote), the executed price often differs. This is normal because the displayed price keeps moving following Winquote (up to date).",
            },
            {
              title: "Common Issues in Online Trading",
              body: "Issues can be caused by the hardware and software in use, or by users who do not yet understand how online trading works. We recommend practicing on a demo account first and using a fast, stable internet connection.",
            },
            {
              title: "Slow Loading During Execution",
              body: "Slow loading can occur when the market is busy or the internet connection drops. Please refresh the online trading page or contact the dealing desk.",
              points: [
                "The market is hectic, so entering with a \"Market Order\" may be difficult. Use \"Limit Order\" and \"Stop Order\".",
                "The internet connection is lost or unstable, so make sure your network is reliable.",
              ],
            },
          ],
        },
        {
          type: "cards",
          title: "Online Trading Warnings",
          items: [
            {
              title: "Insufficient Margin",
              body: "The \"Insufficient Margin\" warning appears when your account's Effective Margin is not enough for the number of lots you are trading. Margin can also be held by active Limit or Stop Orders.",
            },
            {
              title: "Price Too Close / Price Too Far",
              body: "Occurs when using limit or stop orders. If the order price is less than 10 points from, or more than 500 points away from, the etrade screen price, the \"Price too close / Price too far\" warning appears.",
            },
            {
              title: "Validation Error",
              body: "Occurs due to a user error, such as a missing field or a position that exceeds the lot limit (above 20 lots).",
            },
            {
              title: "Invalid Stop Order",
              body: "Occurs when using a Limit Order to open a new position at an inappropriate level. Example: Sell New Limit at 20490 while the etrade Sell screen price is 20593.",
            },
          ],
        },
      ],
    },
  },
};
