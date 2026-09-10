import { config } from "../../../../utils/config";
import { formatDate } from "../../../../utils/date-format";
import { formatAmount, numberToWords } from "../../../../utils/helper";
import { ICompany, IInvoice } from "./invoice-slip";

export default function getPdfHtmlContent(
  admin: ICompany,
  invoiceDetails: IInvoice,
) {
  const lineItems = invoiceDetails.lineItems.map(
    (ele) => `<tr style="color: #334155;">
            <td
              style="
                border-top: 1px solid #cbd5e1;
                border-right: 1px solid #cbd5e1;
                padding: 4px 6px;
                font-size: 12px;
                line-height: 16px;
              "
            >
              ${formatDate(ele.fromDate)} to ${formatDate(ele.toDate)}
            </td>

            <td
              style="
                border-top: 1px solid #cbd5e1;
                border-right: 1px solid #cbd5e1;
                padding: 4px 6px;
                text-align: right;
                font-size: 12px;
                line-height: 16px;
              "
            >
              ${ele.days}
            </td>

            <td
              style="
                border-top: 1px solid #cbd5e1;
                border-right: 1px solid #cbd5e1;
                padding: 4px 6px;
                text-align: right;
                font-size: 12px;
                line-height: 16px;
              "
            >
              ${ele.employeeCount}
            </td>

            <td
              style="
                border-top: 1px solid #cbd5e1;
                border-right: 1px solid #cbd5e1;
                padding: 4px 6px;
                text-align: right;
                font-size: 12px;
                line-height: 16px;
              "
            >
              ${ele.employeeRate}
            </td>

            <td
              style="
                border-top: 1px solid #cbd5e1;
                padding: 4px 6px;
                text-align: right;
                font-size: 12px;
                line-height: 16px;
              "
            >
              ${ele.totalAmount}
            </td>
          </tr>`,
  );

  return `<div
  id="invoice-slip"
  style="
    margin: 0 auto;
    min-height: 1123px;
    width: 794px;
    background: #ffffff;
    padding: 48px 52px;
    color: #212936;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  "
>
  <div>
    <!-- HEADER -->
    <div
      style="
        border-bottom: 2px solid #3e7cbe;
        padding-bottom: 8px;
      "
    >
      <div
        style="
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        "
      >
        <!-- Company -->
        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          "
        >
          <img
            src="${config.BACKEND_API_URL}${admin.companyLogo}"
            alt="${admin.companyName}"
            style="
              height: 56px;
              width: 96px;
              object-fit: contain;
              display: block;
            "
          />

          <div style="padding-top: 4px;">
            <h2
              style="
                margin: 0;
                font-size: 16px;
                line-height: 24px;
                font-weight: 500;
                color: #212936;
              "
            >
              ${admin.companyName}
            </h2>

            <p
              style="
                margin: 0;
                font-size: 12px;
                line-height: 16px;
                color: #212936;
              "
            >
              ${admin.companyAddress}
            </p>

            <p
              style="
                margin: 0;
                font-size: 12px;
                line-height: 16px;
                color: #212936;
              "
            >
              Email: ${admin.companyEmail}
            </p>

            
          </div>
        </div>

        <!-- Invoice Information -->
        <div
          style="
            min-width: 150px;
            text-align: right;
          "
        >
          <p
            style="
              margin: 0;
              font-size: 10px;
              line-height: 14px;
              text-transform: uppercase;
              color: #212936;
            "
          >
            Original for Recipient
          </p>

          <h1
            style="
              margin: 4px 0 0 0;
              font-size: 36px;
              line-height: 36px;
              font-weight: 500;
              letter-spacing: 1px;
              color: #212936;
            "
          >
            INVOICE
          </h1>

          <div
            style="
              margin-top: 4px;
              color: #212936;
              font-size: 14px;
              line-height: 20px;
            "
          >
            <p style="margin: 0 0 8px 0;">
              Invoice No :
              <span style="font-weight: 500;">
                ${invoiceDetails.invoiceNumber}
              </span>
            </p>

            <p style="margin: 0 0 8px 0;">
              Date :
              <span style="font-weight: 500;">
                ${formatDate(new Date())}
              </span>
            </p>

            <p style="margin: 0;">
              Billing Month :
              <span style="font-weight: 500;">
                ${invoiceDetails.billingMonth}-${invoiceDetails.billingYear}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- BILL FROM / BILL TO -->
    <div
      style="
        margin-top: 8px;
        display: flex;
        gap: 8px;
      "
    >
      <!-- Bill From -->
      <div
        style="
          flex: 1 1 0%;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          padding: 8px 12px;
          box-sizing: border-box;
        "
      >
        <div
          style="
            border-bottom: 1px solid rgba(203, 213, 225, 0.5);
            padding: 4px 0;
          "
        >
          <p
            style="
              margin: 0;
              font-size: 12px;
              line-height: 16px;
              font-weight: 500;
              text-transform: uppercase;
              color: #3e7cbe;
            "
          >
            Bill From (Supplier)
          </p>
        </div>

        <div
          style="
            display: flex;
            flex-direction: column;
            gap: 4px;
          "
        >
          <h3
            style="
              margin: 0;
              font-size: 14px;
              line-height: 20px;
              font-weight: 500;
              color: #212936;
            "
          >
            ${admin.companyName}
          </h3>

          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              gap: 8px;
              font-size: 12px;
              line-height: 17.4px;
              color: #64748b;
            "
          >
            <p
              style="
                margin: 0;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >${admin.companyAddress ? admin.companyAddress : ""}</p>
          </div>

          ${invoiceDetails.cGST > 0 && invoiceDetails.sGST > 0 ? `<div
            style="
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              gap: 8px;
              font-size: 12px;
              line-height: 17.4px;
              color: #64748b;
            "
          >
            <p
              style="
                margin: 0;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >GSTIN: ${admin.gstin}</p>
          </div>`: ``}
        </div>
      </div>

      <!-- Bill To -->
      <div
        style="
          flex: 1 1 0%;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          padding: 8px 12px;
          box-sizing: border-box;
        "
      >
        <div
          style="
            border-bottom: 1px solid rgba(203, 213, 225, 0.5);
            padding: 4px 0;
          "
        >
          <p
            style="
              margin: 0;
              font-size: 12px;
              line-height: 16px;
              font-weight: 500;
              text-transform: uppercase;
              color: #3e7cbe;
            "
          >
            Bill To (Recipient)
          </p>
        </div>

        <div
          style="
            display: flex;
            flex-direction: column;
            gap: 4px;
          "
        >
          <h3
            style="
              margin: 0;
              font-size: 14px;
              line-height: 20px;
              font-weight: 500;
              color: #212936;
            "
          >
            ${invoiceDetails.companyId.companyName}
          </h3>

          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              gap: 8px;
              font-size: 12px;
              line-height: 17.4px;
              color: #64748b;
            "
          >
            <p
              style="
                margin: 0;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              ${invoiceDetails.companyId.companyAddress}
            </p>
          </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              gap: 8px;
              font-size: 12px;
              line-height: 17.4px;
              color: #64748b;
            "
          >
            <p
              style="
                margin: 0;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              ${ invoiceDetails.companyId.gstin ? `GSTIN: ${invoiceDetails.companyId.gstin}`: ``}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- ITEMS TABLE -->
    <div
      style="
        margin-top: 8px;
        overflow: hidden;
        border: 1px solid #cbd5e1;
      "
    >
      <table
        style="
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
        "
      >
        <thead>
          <tr style="background: #3e7cbe; color: #ffffff;">
            <th
              style="
                border-right: 1px solid rgba(255,255,255,0.3);
                padding: 6px 4px;
                text-align: left;
                font-size: 12px;
                line-height: 16px;
                font-weight: 500;
              "
            >
              DAYS PERIOD
            </th>

            <th
              style="
                border-right: 1px solid rgba(255,255,255,0.3);
                padding: 6px 4px;
                text-align: center;
                font-size: 12px;
                line-height: 16px;
                font-weight: 500;
              "
            >
              ACTIVE DAYS
            </th>

            <th
              style="
                border-right: 1px solid rgba(255,255,255,0.3);
                padding: 6px 4px;
                text-align: center;
                font-size: 12px;
                line-height: 16px;
                font-weight: 500;
              "
            >
              EMP COUNT
            </th>

            <th
              style="
                border-right: 1px solid rgba(255,255,255,0.3);
                padding: 6px 4px;
                text-align: center;
                font-size: 12px;
                line-height: 16px;
                font-weight: 500;
              "
            >
              EMP RATE/MO
            </th>

            <th
              style="
                padding: 6px 4px;
                text-align: right;
                font-size: 12px;
                line-height: 16px;
                font-weight: 500;
              "
            >
              TOTAL AMOUNT (₹)
            </th>
          </tr>
        </thead>

        <tbody>
          ${lineItems}
        </tbody>
      </table>
    </div>

    <!-- TOTALS -->
    <div
      style="
        margin-top: 8px;
        display: flex;
        justify-content: flex-end;
      "
    >
      <div
        style="
          width: 350px;
          border: 1px solid #cbd5e1;
          box-sizing: border-box;
        "
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(203, 213, 225, 0.6);
            padding: 6px 8px;
          "
        >
          <span
            style="
              font-size: 12px;
              line-height: 16px;
              font-weight: 500;
              color: #212936;
            "
          >
            HSN/SAC
          </span>

          <span
            style="
              font-size: 12px;
              line-height: 16px;
              font-weight: 500;
              color: #334155;
            "
          >998313</span>
        </div>

        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(203, 213, 225, 0.6);
            padding: 6px 8px;
          "
        >
          <span
            style="
              font-size: 12px;
              line-height: 16px;
              font-weight: 500;
              color: #212936;
            "
          >
            Subtotal (Taxable)
          </span>

          <span
            style="
              font-size: 12px;
              line-height: 16px;
              font-weight: 500;
              color: #334155;
            "
          >
            ₹ ${invoiceDetails.subtotal}
          </span>
        </div>

        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #cbd5e1;
            padding: 6px 8px;
          "
        >
          <span
            style="
              font-size: 14px;
              line-height: 20px;
              font-weight: 700;
              color: #212936;
            "
          >
            Total
          </span>

          <span
            style="
              font-size: 14px;
              line-height: 20px;
              font-weight: 700;
              color: #212936;
            "
          >
            ${formatAmount(invoiceDetails.totalAmount)}
          </span>
        </div>
      </div>
    </div>

    <!-- AMOUNT IN WORDS -->
    <div
      style="
        margin-top: 12px;
        border: 1px dashed #f59e0b;
        background: #fffbeb;
        padding: 8px;
      "
    >
      <p
        style="
          margin: 0;
          font-size: 12px;
          line-height: 16px;
        "
      >
        <span style="color: #d97706;">
          Amount in words:
        </span>

        <span
          style="
            font-weight: 500;
            color: #212936;
          "
        >
          ${numberToWords(invoiceDetails.totalAmount)} Only
        </span>
      </p>
    </div>

    <!-- BANK + TERMS -->
    <div
      style="
        margin-top: 12px;
        display: flex;
        gap: 8px;
      "
    >
      <!-- Bank Details -->
      <div
        style="
          width: 42%;
          border: 1px solid rgba(203, 213, 225, 0.5);
          box-sizing: border-box;
        "
      >
        <div
          style="
            border-bottom: 1px solid #cbd5e1;
            padding: 6px 8px;
          "
        >
          <h3
            style="
              margin: 0;
              font-size: 12px;
              line-height: 16px;
              font-weight: 500;
              color: #334155;
            "
          >
            BANK DETAILS
          </h3>
        </div>

        <div style="padding: 8px;">
          <div
            style="
              display: grid;
              grid-template-columns: 1.5fr 2fr;
              padding: 2px 0;
              font-size: 12px;
              line-height: 16px;
            "
          >
            <span style="color: #64748b;">
              Account Holder
            </span>

            <span
              style="
                font-weight: 500;
                color: #334155;
              "
            >
              ${invoiceDetails.companyId.assignedBankAccount.accountHolderName}
            </span>
          </div>

          <div
            style="
              display: grid;
              grid-template-columns: 1.5fr 2fr;
              padding: 2px 0;
              font-size: 12px;
              line-height: 16px;
            "
          >
            <span style="color: #64748b;">
              Account No.
            </span>

            <span
              style="
                font-weight: 500;
                color: #334155;
              "
            >
              ${invoiceDetails.companyId.assignedBankAccount.accountNo}
            </span>
          </div>

          <div
            style="
              display: grid;
              grid-template-columns: 1.5fr 2fr;
              padding: 2px 0;
              font-size: 12px;
              line-height: 16px;
            "
          >
            <span style="color: #64748b;">
              $IFSC Code
            </span>

            <span
              style="
                font-weight: 500;
                color: #334155;
              "
            >
              ${invoiceDetails.companyId.assignedBankAccount.ifscCode}
            </span>
          </div>

          <div
            style="
              display: grid;
              grid-template-columns: 1.5fr 2fr;
              padding: 2px 0;
              font-size: 12px;
              line-height: 16px;
            "
          >
            <span style="color: #64748b;">
              Account Type
            </span>

            <span
              style="
                font-weight: 500;
                color: #334155;
              "
            >
              ${invoiceDetails.companyId.assignedBankAccount.accountType}
            </span>
          </div>
        </div>
      </div>

      <!-- Terms -->
      <div
        style="
          flex: 1;
          border: 1px solid #cbd5e1;
          box-sizing: border-box;
        "
      >
        <div
          style="
            border-bottom: 1px solid #cbd5e1;
            padding: 6px 8px;
          "
        >
          <h3
            style="
              margin: 0;
              font-size: 12px;
              line-height: 16px;
              font-weight: 500;
              color: #334155;
            "
          >
            TERMS &amp; CONDITIONS
          </h3>
        </div>

        <div style="padding: 8px;">
          <ol
            style="
              margin: 0;
              padding-left: 12px;
              color: #64748b;
              font-size: 12px;
              line-height: 17.4px;
            "
          >
            <li style="margin-bottom: 4px;">
              Payment is due within the agreed timeframe mentioned on the invoice.
            </li>

            <li style="margin-bottom: 4px;">
              Any additional work beyond the agreed scope will be charged separately.
            </li>

            <li style="margin-bottom: 4px;">
              All deliverables and ownership rights will be transferred only after full payment is received.
            </li>

            <li>
              No refunds will be applicable once the work has commenced or services have been delivered.
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>

  <!-- SIGNATURES -->
  <div>
    <div
      style="
        margin-top: 48px;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
      "
    >
      <!-- Customer Signature -->
      <div style="width: 180px;">
        <div style="height: 32px;"></div>

        <p
          style="
            margin: 0;
            border-top: 1px solid transparent;
            padding-top: 4px;
            font-size: 12px;
            line-height: 16px;
            color: #3e7cbe;
          "
        >
          Customer's Signature
        </p>
      </div>

      <!-- Authorized Signatory -->
      <div
        style="
          width: 150px;
          text-align: center;
        "
      >
        <div
          style="
            height: 32px;
            border-bottom: 1px solid #212936;
          "
        ></div>

        <p
          style="
            margin: 4px 0 0 0;
            font-size: 12px;
            line-height: 16px;
            font-weight: 500;
            color: #212936;
          "
        >
          For Ieka Digital
        </p>

        <p
          style="
            margin: 2px 0 0 0;
            font-size: 12px;
            line-height: 16px;
            color: #64748b;
          "
        >
          Authorized Signatory
        </p>
      </div>
    </div>
  </div>
</div>`;
}
