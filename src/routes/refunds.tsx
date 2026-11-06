import { createFileRoute, Link } from "@tanstack/react-router";
import { DocPage } from "@/components/site/layout";
import { seo } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site";

export const Route = createFileRoute("/refunds")({
  head: () => seo({ path: "/refunds", title: "Refund Policy for Atlas Pro | Atlas New Tab for Chrome", description: "How refunds work for Atlas Pro subscriptions bought through Paddle, and how to ask for one." }),
  component: Refunds,
});

function Refunds() {
  return (
    <DocPage title="Refund policy" updated="October 2, 2026">
      <p>
        If Atlas Pro isn't right for you, you can ask for a full refund within 14 days of your first payment, or of a
        renewal. No questions asked.
      </p>
      <h2>What this covers</h2>
      <p>
        This policy applies to Atlas Pro, the optional subscription for the Atlas New Tab Chrome extension, on both the
        monthly and the yearly plan. The extension itself is free to install and use, so there is nothing to refund if
        you only use the free features.
      </p>
      <p>
        Our order process is run by our online reseller Paddle.com, which is the Merchant of Record for all Atlas Pro
        orders. That means Paddle takes the payment, sends your receipt, and issues any refund.
      </p>
      <h2>Free trial</h2>
      <p>
        New accounts may get a free trial of Pro. You aren't charged during a trial, so there's nothing to refund for it.
        When the trial ends, Pro features stop unless you choose to subscribe.
      </p>
      <h2>How to ask</h2>
      <p>
        Reply to your Paddle receipt email, or find your order at{" "}
        <a href="https://paddle.net" target="_blank" rel="noreferrer">
          paddle.net
        </a>{" "}
        and request a refund there. You can also email us at <a href={"mailto:" + CONTACT_EMAIL}>{CONTACT_EMAIL}</a> with
        the email address you paid with.
      </p>
      <h2>What happens next</h2>
      <p>
        Paddle, our merchant of record, processes the refund to your original payment method, usually within 5–10
        business days. Your subscription is cancelled and your account goes back to the free plan. Your settings stay as
        they are.
      </p>
      <h2>Cancelling instead</h2>
      <p>
        If you'd just like to stop future payments, cancel from Customize › Account › Manage subscription. You'll keep Pro
        until the end of the period you've already paid for.
      </p>
      <h2>Questions</h2>
      <p>
        If something about a charge looks wrong, or you aren't sure which plan you're on, email{" "}
        <a href={"mailto:" + CONTACT_EMAIL}>{CONTACT_EMAIL}</a> and we'll help you sort it out. The full terms for Atlas
        Pro are in our <Link to="/terms">terms of service</Link>.
      </p>
    </DocPage>
  );
}
