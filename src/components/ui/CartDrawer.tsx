import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShieldCheck, Sparkles, MessageCircle, Phone } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { Button } from './Button';
import { getAssetPath } from '../../utils/assets';

export const CartDrawer: React.FC = () => {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    totalPrice,
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let orderText = `✨ *LEVIATOR HAUTE PARFUMERIE — ORDER REQUEST* ✨\n`;
    orderText += `----------------------------------\n`;

    if (customerName.trim()) {
      orderText += `👤 *Customer Name:* ${customerName.trim()}\n`;
    }
    if (phoneNumber.trim()) {
      orderText += `📞 *Phone:* ${phoneNumber.trim()}\n`;
    }

    orderText += `\n🛍️ *ITEMS ORDERED:*\n`;
    items.forEach((item, index) => {
      orderText += `${index + 1}. *${item.variant.name}*\n`;
      orderText += `   • Size: ${item.selectedVolume}\n`;
      orderText += `   • Quantity: ${item.quantity}\n`;
      orderText += `   • Unit Price: AED ${item.unitPrice}\n`;
      orderText += `   • Subtotal: AED ${item.unitPrice * item.quantity}\n\n`;
    });

    orderText += `----------------------------------\n`;
    orderText += `💰 *TOTAL AMOUNT:* AED ${totalPrice}\n`;
    orderText += `🚚 *SHIPPING:* Complimentary Worldwide Express\n`;
    orderText += `🎁 *GIFTS:* 2 Free Discovery Samples Included\n`;
    orderText += `----------------------------------\n`;
    orderText += `Please confirm availability and dispatch details. Thank you!`;

    const encodedText = encodeURIComponent(orderText);
    const whatsappUrl = `https://wa.me/971544478456?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Slide Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md glass-panel bg-brand-dark/95 border-l border-white/10 flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  <h2 className="font-serif text-lg tracking-widest text-gradient-gold uppercase">
                    Your Selection
                  </h2>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body - Item List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-neutral-400 space-y-4">
                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center glass-pill">
                      <Sparkles className="w-6 h-6 text-brand-gold/60" />
                    </div>
                    <p className="font-serif text-base text-neutral-300">Your fragrance bag is empty</p>
                    <p className="text-xs text-neutral-500 max-w-xs">
                      Explore our haute parfumerie collection and select your signature olfactory identity.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex gap-4 p-4 rounded-xl glass-pill border border-white/10 relative group bg-black/40 overflow-hidden"
                        >
                          {/* Product Image Thumbnail with getAssetPath */}
                          <div className="w-20 h-24 rounded-lg border border-white/20 overflow-hidden relative shrink-0">
                            <img
                              src={getAssetPath(item.variant.imageFallback)}
                              alt={item.variant.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => {
                                // Fallback image handler
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80';
                              }}
                            />
                            <div
                              className="absolute inset-0 opacity-20 pointer-events-none"
                              style={{ backgroundColor: item.variant.liquidColor }}
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h3 className="font-serif text-sm font-semibold text-white">
                                  {item.variant.name}
                                </h3>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-[11px] text-brand-gold mt-0.5">
                                {item.selectedVolume}
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              {/* Quantity Adjuster */}
                              <div className="flex items-center gap-2 glass-panel px-2.5 py-1 rounded-full border border-white/15">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="text-neutral-400 hover:text-white transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-xs font-semibold px-1 min-w-[16px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="text-neutral-400 hover:text-white transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="font-serif text-sm font-bold text-gradient-gold">
                                AED {item.unitPrice * item.quantity}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Customer Contact Form */}
                    <div className="glass-panel p-4 rounded-xl space-y-3 border border-white/10">
                      <div className="flex items-center gap-2 text-xs font-semibold text-brand-gold uppercase tracking-wider">
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span>Direct WhatsApp Concierge Order</span>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Your Name (Optional)"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-gold/60"
                        />
                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            placeholder="WhatsApp Number (e.g. +971501234567)"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-gold/60"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/10 glass-panel space-y-4">
                  <div className="space-y-2 text-xs text-neutral-300">
                    <div className="flex justify-between">
                      <span>Complimentary Express Shipping</span>
                      <span className="text-emerald-400">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2x Discovery Samples</span>
                      <span className="text-emerald-400">Included</span>
                    </div>
                    <div className="flex justify-between text-base font-serif font-bold text-white pt-2 border-t border-white/10">
                      <span>Total Price</span>
                      <span className="text-gradient-gold">AED {totalPrice}</span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 text-black font-bold shadow-glow-emerald"
                    icon={<MessageCircle className="w-4 h-4 fill-black" />}
                    onClick={handleWhatsAppCheckout}
                  >
                    Checkout via WhatsApp (AED {totalPrice})
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Instant WhatsApp Order Confirmation</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
