"use client";
import React, { useState, useEffect } from "react";
import { Minus, Plus, ShieldCheck } from "lucide-react";
import axios from "axios";

const CheckoutSection = () => {
  const [quantity, setQuantity] = useState(1);
  const price = 100;

  // Form fields
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [note, setNote] = useState("");

  const [orderId, setOrderId] = useState<string | null>(null); // pending order id
  const [saving, setSaving] = useState(false);

  // Auto save order as pending
  useEffect(() => {
    const savePendingOrder = async () => {
      if (!name || !mobile || !address || !district) return; // required fields check
      setSaving(true);
      try {
        const res = await axios.post("http://localhost:5000/api/orders", {
          name,
          mobile,
          address,
          district,
          note,
          quantity,
          total: quantity * price,
        });
        setOrderId(res.data.id);
      } catch (err) {
        console.error("Error saving pending order:", err);
      }
      setSaving(false);
    };

    const timeout = setTimeout(savePendingOrder, 1000); // debounce 1 sec
    return () => clearTimeout(timeout);
  }, [name, mobile, address, district, note, quantity]);

  // Confirm order
  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return alert("প্রথমে ফর্ম পূরণ করুন।");
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/confirm`);
      alert("অর্ডার কনফার্ম হয়েছে!");
      setName("");
    setMobile("");
    setAddress("");
    setDistrict("");
    setNote("");
    setQuantity(1);
    setOrderId(null);
    } catch (err) {
      console.error(err);
      alert("কনফার্ম করার সময় সমস্যা হয়েছে।");
    }
  };

  return (
    <section id="checkout" className="bg-[#FFF5ED] py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col lg:flex-row">

          {/* Left Side: Product Selection */}
          <div className="bg-[#FFF5ED] flex-1 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-gray-100">
            <h2 className="text-xl font-bold text-[#333] mb-6">প্রোডাক্ট সিলেক্ট করুন</h2>

            {/* Selection Card */}
            <div className="border-2 border-[#F37021] bg-orange-50/50 rounded-2xl p-4 flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2">
                  <img src="/images/1.png" alt="Serum" className="object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-[#333]">ভিটামিন সি সিরাম</h3>
                  <div className="flex gap-2 text-sm">
                    <span className="font-bold text-[#F37021]">৳ {price}</span>
                    <span className="text-gray-400 line-through">৳ ১০০০</span>
                  </div>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full border-4 border-[#F37021] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#F37021]"></div>
              </div>
            </div>

            {/* Product Large Image */}
            <div className="text-center">
              <img src="/images/1.png" alt="Product" className="mx-auto w-48 mb-4" />
              <h3 className="text-xl font-bold text-[#333] mb-1">ভিটামিন সি সিরাম</h3>
              <p className="text-2xl font-bold text-[#F37021]">
                ৳ {price * quantity}{" "}
                <span className="text-sm text-gray-400 line-through">৳ ১০০০</span>
              </p>
            </div>
          </div>

          {/* Right Side: Order Form */}
          <div className="flex-1 p-8 lg:p-12 bg-white">
            <h2 className="text-xl font-bold text-[#333] mb-6">অর্ডার ফর্ম</h2>

            <form className="space-y-4" onSubmit={handleConfirm}>
              <input
                type="text"
                placeholder="নাম *"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-[#F37021]"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="tel"
                placeholder="মোবাইল নাম্বার * (01XXXXXXXXX)"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-[#F37021]"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <input
                type="text"
                placeholder="সম্পূর্ণ ঠিকানা *"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-[#F37021]"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="জেলা/থানা *"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-[#F37021]"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
              <textarea
                placeholder="নোট (ঐচ্ছিক, সর্বোচ্চ ৫০০ অক্ষর)"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl h-24 focus:outline-[#F37021]"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <span className="font-bold text-[#333]">পরিমাণ</span>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold text-lg">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 p-6 rounded-2xl space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>৳ {price * quantity}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery charge</span>
                  <span className="text-green-600">ফ্রি</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-[#333] pt-2 border-t border-gray-200">
                  <span>Total:</span>
                  <span className="text-[#F37021]">৳ {price * quantity}</span>
                </div>
              </div>

              {/* Payment Option */}
              <div className="border-2 border-[#F37021] bg-orange-50/50 rounded-xl p-4 flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg text-[#F37021]">💳</div>
                <div>
                  <p className="text-xs text-gray-500">Payment options</p>
                  <p className="font-bold text-sm">ক্যাশ অন ডেলিভারি (COD)</p>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                type="submit"
                className="w-full bg-[#F37021] hover:bg-orange-600 text-white font-bold py-5 rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-[0.98] uppercase tracking-wide"
              >
                অর্ডার কনফার্ম করুন
              </button>

              <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-medium mt-2">
                <ShieldCheck size={18} />
                সম্পূর্ণ নিরাপদ, ১০০% রিস্কমুক্ত
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSection;

