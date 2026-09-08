// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Payment Checkout
// Paystack integration for Ghana (MoMo, Bank Transfer, Card)
// ──────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Smartphone, Building2, Lock, CheckCircle, ArrowLeft, Shield, Clock } from "lucide-react";

type PaymentMethod = "card" | "momo" | "bank";

interface CheckoutItem {
  name: string;
  description: string;
  amount: number;
  currency: string;
}

interface PaymentCheckoutProps {
  item: CheckoutItem;
  onSuccess: () => void;
  onBack: () => void;
}

export function PaymentCheckout({ item, onSuccess, onBack }: PaymentCheckoutProps) {
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<"method" | "details" | "confirm" | "success">("method");

  // Form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [momoNumber, setMomoNumber] = useState("");
  const [momoProvider, setMomoProvider] = useState<"mtn" | "vodafone" | "airteltigo">("mtn");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");

  const formatCurrency = (amount: number) => `GH₵ ${amount.toLocaleString()}`;

  const handlePay = async () => {
    setProcessing(true);
    // Simulate Paystack API call
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setProcessing(false);
    setStep("success");
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "").slice(0, 16);
    return v.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/[^0-9]/g, "").slice(0, 4);
    if (v.length >= 2) return v.slice(0, 2) + " / " + v.slice(2);
    return v;
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-400 mb-2">You've been enrolled in</p>
          <p className="text-xl font-semibold text-indigo-300 mb-6">{item.name}</p>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-8">
            <div className="text-sm text-gray-400">Amount Paid</div>
            <div className="text-2xl font-bold">{formatCurrency(item.amount)}</div>
            <div className="text-xs text-gray-500 mt-1">Payment reference: PB-{Date.now().toString(36).toUpperCase()}</div>
          </div>
          <div className="space-y-3">
            <button onClick={onSuccess} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition">
              Go to My Dashboard
            </button>
            <button onClick={onBack} className="w-full border border-white/20 hover:bg-white/10 text-white py-3 rounded-lg font-semibold transition">
              Browse More Programmes
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          {step === "method" && (
            <>
              <h2 className="text-lg font-semibold mb-4">Select Payment Method</h2>
              <div className="space-y-3 mb-8">
                {[
                  { id: "card" as PaymentMethod, label: "Debit/Credit Card", icon: <CreditCard className="w-5 h-5" />, desc: "Visa, Mastercard, Vodafone Cash Card" },
                  { id: "momo" as PaymentMethod, label: "Mobile Money", icon: <Smartphone className="w-5 h-5" />, desc: "MTN MoMo, Vodafone Cash, AirtelTigo Money" },
                  { id: "bank" as PaymentMethod, label: "Bank Transfer", icon: <Building2 className="w-5 h-5" />, desc: "Direct bank transfer (instant verification)" },
                ].map((m) => (
                  <button key={m.id} onClick={() => { setMethod(m.id); setStep("details"); }}
                    className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all text-left ${
                      method === m.id ? "border-indigo-500 bg-indigo-500/20" : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}>
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">{m.icon}</div>
                    <div>
                      <div className="font-medium">{m.label}</div>
                      <div className="text-sm text-gray-400">{m.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === "details" && (
            <>
              <h2 className="text-lg font-semibold mb-4">
                {method === "card" ? "Card Details" : method === "momo" ? "Mobile Money Details" : "Bank Transfer Details"}
              </h2>

              {method === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Cardholder Name</label>
                    <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Kwame Mensah"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Card Number</label>
                    <input type="text" value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} placeholder="4242 4242 4242 4242"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Expiry</label>
                      <input type="text" value={cardExpiry} onChange={(e) => setCardExpiry(formatExpiry(e.target.value))} placeholder="MM / YY"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 font-mono" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">CVV</label>
                      <input type="text" value={cardCvv} onChange={(e) => setCardCvv(e.target.value.slice(0, 4))} placeholder="123"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 font-mono" />
                    </div>
                  </div>
                </div>
              )}

              {method === "momo" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Mobile Money Provider</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "mtn" as const, label: "MTN MoMo", color: "bg-yellow-500" },
                        { id: "vodafone" as const, label: "Vodafone Cash", color: "bg-red-500" },
                        { id: "airteltigo" as const, label: "AirtelTigo", color: "bg-blue-500" },
                      ].map((p) => (
                        <button key={p.id} onClick={() => setMomoProvider(p.id)}
                          className={`p-4 rounded-lg border-2 text-center transition ${
                            momoProvider === p.id ? "border-indigo-500 bg-indigo-500/20" : "border-white/10 bg-white/5"
                          }`}>
                          <div className={`w-8 h-8 ${p.color} rounded-full mx-auto mb-2`} />
                          <div className="text-sm font-medium">{p.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Mobile Money Number</label>
                    <input type="tel" value={momoNumber} onChange={(e) => setMomoNumber(e.target.value)} placeholder="024 123 4567"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500" />
                    <p className="text-xs text-gray-500 mt-1">You'll receive a prompt on your phone to confirm the payment.</p>
                  </div>
                </div>
              )}

              {method === "bank" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Select Bank</label>
                    <select value={bankName} onChange={(e) => setBankName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500">
                      <option value="">Choose your bank</option>
                      <option value="gcb">GCB Bank</option>
                      <option value="ecobank">Ecobank</option>
                      <option value="stanbic">Stanbic Bank</option>
                      <option value="absa">Absa Bank</option>
                      <option value="fidelity">Fidelity Bank</option>
                      <option value="cal">CAL Bank</option>
                      <option value="uba">United Bank for Africa</option>
                      <option value="enterprise">Enterprise Bank</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Account Number</label>
                    <input type="text" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} placeholder="1234567890"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 font-mono" />
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-sm text-yellow-300">
                    ⚠️ Bank transfers are verified within 30 minutes. Your enrollment will activate once payment is confirmed.
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep("method")} className="border border-white/20 hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition">
                  Change Method
                </button>
                <button onClick={() => setStep("confirm")} disabled={!cardNumber && !momoNumber && !bankAccount}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-white/10 disabled:text-gray-500 px-8 py-3 rounded-lg font-semibold transition">
                  Review & Pay
                </button>
              </div>
            </>
          )}

          {step === "confirm" && (
            <>
              <h2 className="text-lg font-semibold mb-4">Confirm Payment</h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                  <span className="text-gray-400">Payment Method</span>
                  <span className="font-medium capitalize">{method === "momo" ? `Mobile Money (${momoProvider})` : method}</span>
                </div>
                {method === "card" && (
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                    <span className="text-gray-400">Card</span>
                    <span className="font-mono">•••• •••• •••• {cardNumber.slice(-4)}</span>
                  </div>
                )}
                {method === "momo" && (
                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                    <span className="text-gray-400">Number</span>
                    <span className="font-mono">{momoNumber}</span>
                  </div>
                )}
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                  <span className="text-gray-400">Item</span>
                  <span>{item.name}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total</span>
                  <span className="text-indigo-400">{formatCurrency(item.amount)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
                <Lock className="w-3 h-3" /> Secured by Paystack. Your payment details are encrypted.
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep("details")} className="border border-white/20 hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition">
                  Edit Details
                </button>
                <button onClick={handlePay} disabled={processing}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 px-8 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                  {processing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" /> Pay {formatCurrency(item.amount)}
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 sticky top-8">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="pb-4 border-b border-white/10 mb-4">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-400 mt-1">{item.description}</div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span>{formatCurrency(item.amount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Platform fee</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                <span>Total</span>
                <span className="text-indigo-400">{formatCurrency(item.amount)}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield className="w-3 h-3" /> 256-bit SSL encryption
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" /> Instant enrollment after payment
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <CheckCircle className="w-3 h-3" /> 7-day money-back guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
